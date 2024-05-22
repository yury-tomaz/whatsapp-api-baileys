import { mongoDBManager } from '../../@shared/infra/persistence/settings/connection';
import { Collection } from 'mongodb';

interface ChatParams {
  sessionId: string;
  page: number;
  limit: number;
}

export class ChatRepository {
  private chatCollection: Collection;
  constructor() {
    mongoDBManager.ensureConnection().then(() => {
      this.chatCollection = mongoDBManager.db.collection('chat');
    });
  }

  async find({ limit, page, sessionId }: ChatParams) {
    const skip = page === 1 ? page - 1 : (page - 1) * limit;

    const chat = this.chatCollection
      .find({ sessionId }, { limit, skip })
      .sort({ 'conversationTimestamp.low': -1 })
      .toArray();

    return chat;
  }
}
