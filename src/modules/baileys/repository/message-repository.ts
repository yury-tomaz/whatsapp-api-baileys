import { mongoDBManager } from '../../@shared/infra/persistence/settings/connection';
import { Collection } from 'mongodb';

interface MessageParams {
  sessionId: string;
  page: number;
  limit: number;
  to: string;
}

export class MessageRepository {
  private messageCollection: Collection;
  constructor() {
    mongoDBManager.ensureConnection().then(() => {
      this.messageCollection = mongoDBManager.db.collection('message');
    });
  }

  async find({ limit, page, sessionId, to }: MessageParams) {
    const skip = page === 1 ? page - 1 : (page - 1) * limit;

    console.log({ skip });

    const messages = await this.messageCollection
      .find({ sessionId, remoteJid: to }, { limit, skip })
      .sort({ 'messageTimestamp.low': -1, messageTimestamp: 1 })
      .toArray();

    console.log(messages);

    return messages;
  }
}
