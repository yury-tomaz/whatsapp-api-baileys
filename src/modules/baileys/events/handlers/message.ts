import {
  BaileysEventEmitter,
  WAMessage,
  WAMessageKey,
  jidNormalizedUser,
  toNumber,
} from '@whiskeysockets/baileys';
import { BaileysEventHandler, transformMongo } from './chat';
import { mongoDBManager } from '../../../@shared/infra/persistence/settings/connection';
import { logger } from '../../../@shared/infra/logger';
import { downloadMessage } from '../../helpers/download-message.helper';
import { eventDispatcher } from '../../../../main/server/server';
import { EventOccurredWhatsappEvent } from '../event-occurred-whatsapp.event';

const getKeyAuthor = (key: WAMessageKey | undefined | null) =>
  (key?.fromMe ? 'me' : key?.participant || key?.remoteJid) || '';

interface NotifyData extends WAMessage {
  instanceKey: string;
  text: WAMessage[];
  msgContent: string | undefined;
}

export default function messageHandler(
  sessionId: string,
  event: BaileysEventEmitter,
) {
  const client = mongoDBManager.client;
  const messageCollection = mongoDBManager.db.collection('message');
  const chatCollection = mongoDBManager.db.collection('chat');
  const session = client.startSession();
  let listening = false;

  const set: BaileysEventHandler<'messaging-history.set'> = async ({
    messages,
    isLatest,
  }) => {
    if (isLatest) {
      await messageCollection.deleteMany({ sessionId });
    }

    await messageCollection.insertMany(
      messages.map((message) => ({
        ...transformMongo(message),
        remoteJid: message.key.remoteJid,
        id: message.key.id,
        sessionId,
      })),
    );

    logger.info({ messages: messages.length }, 'Synced messages');
  };

  const upsert: BaileysEventHandler<'messages.upsert'> = async ({
    messages,
    type,
  }) => {
    for (const message of messages) {
      try {
        const jid = jidNormalizedUser(message.key.remoteJid!);
        const data = transformMongo(message);

        await messageCollection.updateOne(
          {
            sessionId_remoteJid_id: {
              remoteJid: jid,
              id: message.key.id,
              sessionId,
            },
          },
          { $set: { ...data, remoteJid: jid, id: message.key.id, sessionId } },
          { upsert: true },
        );

        const chatExists = await chatCollection.countDocuments({
          id: jid,
          sessionId,
        });

        if (type === 'notify' && chatExists === 0) {
          event.emit('chats.upsert', [
            {
              id: jid,
              conversationTimestamp: toNumber(message.messageTimestamp),
              unreadCount: 1,
            },
          ]);

          const messageType = Object.keys(message)[0];

          const isProtocolOrKeyMessage: boolean = [
            'protocolMessage',
            'senderKeyDistributionMessage',
          ].includes(messageType);

          if (isProtocolOrKeyMessage) return;

          const notifyData = {
            ...message,
          } as NotifyData;

          switch (messageType) {
            case 'imageMessage':
              notifyData.msgContent = await downloadMessage(
                {
                  directPath: message.message?.imageMessage?.directPath,
                  mediaKey: message.message?.imageMessage?.mediaKey,
                  url: message.message?.imageMessage?.url,
                },
                'image',
              );
              break;
            case 'videoMessage':
              notifyData.msgContent = await downloadMessage(
                {
                  directPath: message.message?.videoMessage?.directPath,
                  mediaKey: message.message?.videoMessage?.mediaKey,
                  url: message.message?.videoMessage?.url,
                },
                'video',
              );
              break;
            case 'audioMessage':
              notifyData.msgContent = await downloadMessage(
                {
                  directPath: message.message?.audioMessage?.directPath,
                  mediaKey: message.message?.audioMessage?.mediaKey,
                  url: message.message?.audioMessage?.url,
                },
                'audio',
              );
              break;
            default:
              notifyData.msgContent = '';
              break;
          }

          eventDispatcher.notify(
            new EventOccurredWhatsappEvent({
              routingKey: 'baileys.event.message',
              data: {
                ...notifyData,
                sessionId: sessionId,
              },
            }),
          );
        }
      } catch (err) {
        logger.error(err, 'An error occurred during message upsert');
      }
    }
  };

  const update: BaileysEventHandler<'messages.update'> = async (updates) => {
    for (const { update, key } of updates) {
      try {
        const prevData = await messageCollection.findOne({
          id: key.id,
          remoteJid: key.remoteJid,
          sessionId,
        });

        if (!prevData) {
          logger.info({ update }, 'Got update for non existent message');
          return;
        }

        const newData = { ...prevData, ...update };

        await messageCollection.deleteOne({
          id: key.id,
          remoteJid: key.remoteJid,
          sessionId,
        });

        await messageCollection.insertOne({
          ...transformMongo(newData),
          id: newData.key!.id,
          remoteJid: newData.key!.remoteJid,
          sessionId,
        });
      } catch (err) {
        logger.error(err, 'An error occurred during message update');
      }
    }
  };

  const del: BaileysEventHandler<'messages.delete'> = async (item) => {
    try {
      if ('all' in item) {
        await messageCollection.deleteMany({ remoteJid: item.jid, sessionId });
        return;
      }

      const messageIds = item.keys.map((k) => k.id);
      const jid = item.keys[0].remoteJid;

      await messageCollection.deleteMany({
        id: { $in: messageIds },
        remoteJid: jid,
        sessionId,
      });
    } catch (err) {
      logger.error(err, 'An error occured during message delete');
    }
  };

  const updateReceipt: BaileysEventHandler<'message-receipt.update'> = async (
    updates,
  ) => {
    for (const { key, receipt } of updates) {
      try {
        const message = await messageCollection.findOne({
          id: key.id,
          remoteJid: key.remoteJid,
          sessionId,
        });

        if (!message) {
          logger.debug(
            { update },
            'Got receipt update for non existent message',
          );
          return;
        }

        const userReceipts = message.userReceipt || [];
        const existingReceiptIndex = userReceipts.findIndex(
          (r: any) => r.userJid === receipt.userJid,
        );

        if (existingReceiptIndex !== -1) {
          userReceipts[existingReceiptIndex] = receipt;
        } else {
          userReceipts.push(receipt);
        }

        await messageCollection.updateOne(
          {
            id: key.id,
            remoteJid: key.remoteJid,
            sessionId,
          },
          { $set: { userReceipt: userReceipts } },
        );
      } catch (err) {
        logger.error(err, 'An error occurred during message receipt update');
      }
    }
  };

  const updateReaction: BaileysEventHandler<'messages.reaction'> = async (
    reactions,
  ) => {
    for (const { key, reaction } of reactions) {
      try {
        const message = await messageCollection.findOne({
          id: key.id,
          remoteJid: key.remoteJid,
          sessionId,
        });

        if (!message) {
          logger.debug(
            { update },
            'Got reaction update for non existent message',
          );
          return;
        }

        const authorID = getKeyAuthor(reaction.key);
        const existingReactions = message.reactions || [];
        const filteredReactions = existingReactions.filter(
          (r: any) => getKeyAuthor(r.key) !== authorID,
        );

        if (reaction.text) {
          filteredReactions.push(reaction);
        }

        await messageCollection.updateOne(
          {
            id: key.id,
            remoteJid: key.remoteJid,
            sessionId,
          },
          { $set: { reactions: filteredReactions } },
        );
      } catch (err) {
        logger.error(err, 'An error occurred during message reaction update');
      }
    }
  };

  const listen = () => {
    if (listening) return;

    event.on('messaging-history.set', set);
    event.on('messages.upsert', upsert);
    event.on('messages.update', update);
    event.on('messages.delete', del);
    event.on('message-receipt.update', updateReceipt);
    event.on('messages.reaction', updateReaction);
    listening = true;
  };

  const unlisten = () => {
    if (!listening) return;

    event.off('messaging-history.set', set);
    event.off('messages.upsert', upsert);
    event.off('messages.update', update);
    event.off('messages.delete', del);
    event.off('message-receipt.update', updateReceipt);
    event.off('messages.reaction', updateReaction);
    listening = false;
  };

  return { listen, unlisten };
}
