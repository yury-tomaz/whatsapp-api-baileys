import {
  AuthenticationCreds,
  AuthenticationState,
  BufferJSON,
  initAuthCreds,
  proto,
  SignalDataTypeMap,
} from '@whiskeysockets/baileys';
import { Collection } from 'mongodb';
import { logger } from '../../@shared/infra/logger';

export async function useMultiFileAuthStateDb(coll: Collection<any>): Promise<{
  state: AuthenticationState;
  saveCreds: () => Promise<void>;
}> {
  const writeData = async (data: any, key: string): Promise<any> => {
    try {
      let msgParsed = JSON.parse(JSON.stringify(data, BufferJSON.replacer));
      if (Array.isArray(msgParsed)) {
        msgParsed = {
          _id: key,
          content_array: msgParsed,
        };
      }
      return await coll.replaceOne({ _id: key }, msgParsed, { upsert: true });
    } catch (error) {
      logger.error(error);
    }
  };

  const readData = async (key: string): Promise<any> => {
    try {
      let data = (await coll.findOne({ _id: key })) as any;
      if (data?.content_array) {
        data = data.content_array;
      }
      const creds = JSON.stringify(data);
      return JSON.parse(creds, BufferJSON.reviver);
    } catch (error) {
      logger.error(error);
    }
  };

  const removeData = async (key: string) => {
    try {
      return await coll.deleteOne({ _id: key });
    } catch (error) {
      logger.error(error);
    }
  };

  const creds: AuthenticationCreds =
    (await readData('creds')) || initAuthCreds();

  return {
    state: {
      creds,
      keys: {
        get: async (type, ids: string[]) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const data: { [_: string]: SignalDataTypeMap[type] } = {};
          await Promise.all(
            ids.map(async (id) => {
              let value = await readData(`${type}-${id}`);
              if (type === 'app-state-sync-key' && value) {
                value = proto.Message.AppStateSyncKeyData.fromObject(value);
              }

              data[id] = value;
            }),
          );

          return data;
        },
        set: async (data: any) => {
          const tasks: Promise<void>[] = [];
          for (const category in data) {
            for (const id in data[category]) {
              const value = data[category][id];
              const key = `${category}-${id}`;
              tasks.push(value ? writeData(value, key) : removeData(key));
            }
          }

          await Promise.all(tasks);
        },
      },
    },
    saveCreds: async () => {
      return await writeData(creds, 'creds');
    },
  };
}
