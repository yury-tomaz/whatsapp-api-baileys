import { mongoDBManager } from '../../@shared/infra/persistence/settings/connection';
import { Collection } from 'mongodb';

interface ContactParams {
  sessionId: string;
  page: number;
  limit: number;
}

export class ContactRepository {
  private contactCollection: Collection;
  constructor() {
    mongoDBManager.ensureConnection().then(() => {
      this.contactCollection = mongoDBManager.db.collection('contact');
    });
  }

  async find({ limit, page, sessionId }: ContactParams) {
    const offset = page === 1 ? page - 1 : (page - 1) * limit;

    const contacts = this.contactCollection
      .find({ sessionId }, { limit, skip: offset })
      .toArray();

    return contacts;
  }
}
