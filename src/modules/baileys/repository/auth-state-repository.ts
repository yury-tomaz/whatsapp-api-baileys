import { AuthStateRepositoryInterface } from '../gateway/auth-state-repository.interface';
import { BufferJSON } from '@whiskeysockets/baileys';
import { mongoClient } from '../../@shared/infra/persistence/settings/connection';
import { logger } from '../../@shared/infra/logger';

export class AuthStateRepository implements AuthStateRepositoryInterface {
  async writeData(instanceId: string, data: any, key: string) {
    const coll = mongoClient
      .db('whatsapp-api')
      .collection(`session-${instanceId}`);

    try {
      let msgParsed = JSON.parse(JSON.stringify(data, BufferJSON.replacer));
      if (Array.isArray(msgParsed)) {
        msgParsed = {
          _id: key,
          content_array: msgParsed,
        };
      }
      // @ts-ignore
      return await coll.replaceOne({ _id: key }, msgParsed, { upsert: true });
    } catch (error) {
      logger.error(error);
    }
  }
  async readData(instanceId: string, key: string) {
    const coll = mongoClient
      .db('whatsapp-api')
      .collection(`session-${instanceId}`);

    try {
      // @ts-ignore
      let data = (await coll.findOne({ _id: key })) as any;
      if (data?.content_array) {
        data = data.content_array;
      }
      const creds = JSON.stringify(data);
      return JSON.parse(creds, BufferJSON.reviver);
    } catch (error) {
      logger.error(error);
    }
  }
  async removeData(instanceId: string, key: string) {
    const coll = mongoClient
      .db('whatsapp-api')
      .collection(`session-${instanceId}`);

    try {
      // @ts-ignore
      return await coll.deleteOne({ _id: key });
    } catch (error) {
      logger.error(error);
    }
  }
}
