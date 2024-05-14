import { DisconnectReason, WAMessage } from '@whiskeysockets/baileys';
import { Baileys } from './baileys.entity';

import QRCode from 'qrcode';
import { downloadMessage } from '../helpers/download-message.helper';
import { BaileysInstanceRepositoryInMemory } from '../repository/baileys-instance-repository-in-memory';
import { logger } from '../../@shared/infra/logger';
import EventDispatcherInterface from '../../@shared/domain/events/event-dispatcher.interface';
import { BaileysEvent } from '../events/baileys.event';

interface CustomError extends Error {
  output?: {
    statusCode: number;
  };
}

interface NotifyData extends WAMessage {
  instanceKey: string;
  text: WAMessage[];
  msgContent: string | undefined;
}

export class ProcessSocketEvent {
  constructor(
    private readonly baileysRepository: BaileysInstanceRepositoryInMemory,
    private readonly eventDispatcher: EventDispatcherInterface,
  ) {}

  private eventNotify(type: string, body: any, instanceKey: string) {
    this.eventDispatcher.notify(
      new BaileysEvent({
        type: type,
        body: body,
        instanceKey,
      }),
    );
  }

  async execute(baileys: Baileys) {
    const socket = baileys.waSocket;

    if (!socket) {
      logger.warn('Socket Baileys não iniciado');
      return;
    }

    socket.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;
      if (connection === 'connecting') return;

      if (connection === 'close') {
        const { error } = lastDisconnect as { error: CustomError };

        if (error.output?.statusCode !== DisconnectReason.loggedOut) {
          await baileys.init();
        } else {
          baileys.isOn = false;
        }

        this.eventNotify(
          'connection',
          {
            connection: connection,
          },
          baileys.id.id,
        );
      } else if (connection === 'open') {
        logger.info('Connection open');

        const alreadyThere = await this.baileysRepository.find(baileys.id.id);

        if (!alreadyThere) {
          await this.baileysRepository.create(baileys);
        }

        baileys.isOn = true;

        this.eventNotify(
          'connection',
          {
            connection: connection,
          },
          baileys.id.id,
        );
      }

      if (qr) {
        baileys.qr = await QRCode.toDataURL(qr);

        if (baileys.qrRetry > 3) {
          baileys.closeWebSocketConnection();
          logger.info('QRCode expired');
        }
      }
    });

    socket.ev.on('presence.update', async (json) => {
      this.eventNotify('presence', json, baileys.id.id);
    });

    socket.ev.on('messaging-history.set', async ({ chats }) => {
      baileys.chats = chats.map((chat) => {
        return {
          ...chat,
          messages: [],
        };
      });
    });

    socket.ev.on('chats.upsert', async (chats) => {
      baileys.chats = chats.map((chat) => {
        return {
          ...chat,
          messages: [],
        };
      });
    });

    socket.ev.on('chats.update', async (changedChats) => {
      changedChats.forEach((changedChat) => {
        const chatIndex = baileys.chats.findIndex(
          (chat) => chat.id === changedChat.id,
        );

        if (chatIndex >= 0) {
          baileys.chats[chatIndex] = {
            ...baileys.chats[chatIndex],
            ...changedChat,
          };
        }
      });
    });

    socket.ev.on('chats.delete', (deletedChats) => {
      deletedChats.forEach((deletedChat) => {
        const chatIndex = baileys.chats.findIndex((c) => c.id === deletedChat);
        if (chatIndex >= 0) {
          baileys.chats.splice(chatIndex, 1);
        }
      });
    });

    socket.ev.on('messages.upsert', async ({ messages, type }) => {
      const currentMessages = baileys.messages;
      if (type === 'append') {
        baileys.messages = [...currentMessages, ...messages];
      }

      if (type !== 'notify') return;

      const unreadMessages = messages.map((message) => {
        return {
          remoteJid: message.key.remoteJid,
          id: message.key.id,
          participant: message.key.participant,
        };
      });

      baileys.waSocket?.readMessages(unreadMessages);

      baileys.messages = messages.concat(currentMessages);

      baileys.messages.map(async (message: WAMessage) => {
        if (!message.message) return;

        const messageType = Object.keys(message.message)[0];

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
                directPath: message.message.imageMessage?.directPath,
                mediaKey: message.message.imageMessage?.mediaKey,
                url: message.message.imageMessage?.url,
              },
              'image',
            );
            break;
          case 'videoMessage':
            notifyData.msgContent = await downloadMessage(
              {
                directPath: message.message.videoMessage?.directPath,
                mediaKey: message.message.videoMessage?.mediaKey,
                url: message.message.videoMessage?.url,
              },
              'video',
            );
            break;
          case 'audioMessage':
            notifyData.msgContent = await downloadMessage(
              {
                directPath: message.message.audioMessage?.directPath,
                mediaKey: message.message.audioMessage?.mediaKey,
                url: message.message.audioMessage?.url,
              },
              'audio',
            );
            break;
          default:
            notifyData.msgContent = '';
            break;
        }

        this.eventNotify('message', notifyData, baileys.id.id);
      });
    });

    socket.ev.on('messages.update', async (messages) => {
      //TODO: handle event
    });

    socket.ev.on('contacts.upsert', async (contacts) => {
      //TODO: handle event
    });

    socket.ev.on('groups.upsert', async (newChat) => {
      this.eventNotify('group_created', newChat, baileys.id.id);
    });

    socket.ev.on('groups.update', async (newChat) => {
      this.eventNotify('group_updated', newChat, baileys.id.id);
    });

    socket.ev.on('group-participants.update', async (newChat) => {
      this.eventNotify('group_participants_updated', newChat, baileys.id.id);
    });
  }
}
