import { BaileysEventEmitter, BaileysEventMap } from '@whiskeysockets/baileys';
import { mongoDBManager } from '../../../@shared/infra/persistence/settings/connection';
import { transformMongo } from './chat';
import { logger } from '../../../@shared/infra/logger';

export type BaileysEventHandler<T extends keyof BaileysEventMap> = (
  args: BaileysEventMap[T],
) => void;

export default function contactHandler(
  sessionId: string,
  event: BaileysEventEmitter,
) {
  const contactCollection = mongoDBManager.db.collection('contact');
  let listening = false;

  const set: BaileysEventHandler<'messaging-history.set'> = async ({
    contacts,
  }) => {
    try {
      const contactIds = contacts.map((c) => c.id);

      const existingContacts = await contactCollection
        .find(
          { id: { $nin: contactIds }, sessionId_id: sessionId },
          { projection: { _id: 0, id: 1 } },
        )
        .toArray();

      const deletedOldContactIds = existingContacts.map((c: any) => c.id);

      const upsertPromises = contacts.map(async (contact) => {
        const data = transformMongo(contact);
        const filter = { sessionId_id: { id: contact.id, sessionId } };

        await contactCollection.updateOne(
          filter,
          { $set: { ...data, sessionId } },
          { upsert: true },
        );
      });

      await Promise.all([...upsertPromises]);

      await contactCollection.deleteMany({
        id: { $in: deletedOldContactIds },
        sessionId_id: sessionId,
      });

      logger.info(
        {
          deletedContacts: deletedOldContactIds.length,
          newContacts: contacts.length,
        },
        'Synced contacts',
      );
    } catch (err) {
      logger.error(err, 'An error occurred during contacts set');
    }
  };

  const upsert: BaileysEventHandler<'contacts.upsert'> = async (contacts) => {
    const transformedContacts = contacts.map(async (contact) => {
      return transformMongo(contact);
    });

    const upsertPromises = transformedContacts.map(async (contact) => {
      const filter = { sessionId_id: { id: (await contact).id, sessionId } };

      await contactCollection.updateOne(
        filter,
        { $set: { ...contact, sessionId } },
        { upsert: true },
      );
    });

    await Promise.all([...upsertPromises]);
  };

  const update: BaileysEventHandler<'contacts.update'> = async (updates) => {
    for (const update of updates) {
      try {
        const data = transformMongo(update);
        const filter = { sessionId_id: { id: update.id, sessionId } };

        await contactCollection.updateOne(filter, { $set: data });
        const result = await contactCollection.findOne(filter);
        if (!result) {
          logger.info({ update }, 'Got update for non-existent contact');
        }
      } catch (err) {
        logger.error(err, 'An error occurred during contact update');
      }
    }
  };

  const listen = () => {
    if (listening) return;

    event.on('messaging-history.set', set);
    event.on('contacts.upsert', upsert);
    event.on('contacts.update', update);
    listening = true;
  };

  const unlisten = () => {
    if (!listening) return;

    event.off('messaging-history.set', set);
    event.off('contacts.upsert', upsert);
    event.off('contacts.update', update);
    listening = false;
  };

  return { listen, unlisten };
}
