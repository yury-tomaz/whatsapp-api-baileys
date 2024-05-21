import { BaileysEventEmitter, BaileysEventMap, toNumber } from "@whiskeysockets/baileys";
import { mongoDBManager } from "../../../@shared/infra/persistence/settings/connection";

export type BaileysEventHandler<T extends keyof BaileysEventMap> = (
    args: BaileysEventMap[T]
  ) => void;
  
  import { Binary, Long } from 'mongodb';
import { logger } from "../../../@shared/infra/logger";

  type MakeTransformedMongo<T> = {
    [K in keyof T]: T[K] extends Uint8Array ? Buffer :
                    T[K] extends number | Long ? number :
                    T[K];
  };
  

export function transformMongo<T extends Record<string, any>>(
    data: T,
    removeNullable = true
  ): MakeTransformedMongo<T> {
    const obj: any = { ...data };
  
    for (const [key, val] of Object.entries(obj)) {
      if (val instanceof Uint8Array || val instanceof Binary) {
        obj[key] = Buffer.from(val.buffer); // MongoDB Binary type should be converted to Buffer
      } else if (typeof val === 'number' || val instanceof Long) {
        obj[key] = toNumber(val);
      } else if (removeNullable && (val === undefined || val === null)) {
        delete obj[key];
      }
    }
  
    return obj as MakeTransformedMongo<T>;
}
  

export default function chatHandler(sessionId: string, event: BaileysEventEmitter) {
    const client = mongoDBManager.client;
    const chatCollection = mongoDBManager.db.collection('chat');
    const session = client.startSession();
    let listening = false;

    const set: BaileysEventHandler<'messaging-history.set'> = async ({ chats, isLatest }) => {
        try{
            
            if (isLatest) {
                await chatCollection.deleteMany({ sessionId }, { session });
            }

            const existingIdsCursor = chatCollection.find(
              { id: { $in: chats.map((c) => c.id) }, sessionId },
              { projection: { id: 1 }, session },
            );

            const existingIds = await existingIdsCursor.map((doc) => doc.id).toArray();

            const newChats = chats
            .filter((c) => !existingIds.includes(c.id))
            .map((c) => ({ ...transformMongo(c), sessionId }));

            const result = await chatCollection.insertMany(newChats, { session });
            const chatsAdded = result.insertedCount;

            logger.info({ chatsAdded }, 'Synced chats');
            
        }catch(err){
            logger.error(err, 'An error occured during chats set');
        }
    }

    const upsert: BaileysEventHandler<'chats.upsert'> = async (chats) => {
        try {
            await Promise.all(
                chats
                .map((c) => transformMongo(c))
                .map((data) => {
                    chatCollection.updateOne(
                        { sessionId_id: { id: data.id, sessionId } },
                        {
                            $set: data,
                            $setOnInsert: { sessionId }, 
                        },
                        { upsert: true }
                    )
                })
            )
        }catch(err){
            logger.error(err, 'An error occured during chats upsert');
        }
    }

    const update: BaileysEventHandler<'chats.update'> = async (updates) => {
        for (const update of updates) {
            try {
                const data = transformMongo(update);
                const filter = { sessionId_id: { id: update.id, sessionId } };
                const updateOperation = {
                    $set: data,
                    $setOnInsert: { sessionId },
                    $inc: { unreadCount: typeof data.unreadCount === 'number' && data.unreadCount > 0 ? data.unreadCount : 0 }
                  };

                const result = await chatCollection.updateOne(filter, updateOperation,  { upsert: true });

                if (result.modifiedCount === 0) {
                    logger.info({ update }, 'Got update for non-existent chat');
                }
            }catch(err){
                logger.error(err, 'An error occurred during chat update');
            }
        }
    }

    const del: BaileysEventHandler<'chats.delete'> = async (ids) => {
        try {
            const filter = { sessionId_id: { id: { $in: ids }, sessionId } };
            await chatCollection.deleteMany(filter);
        }catch(err){
            logger.error(err, 'An error occurred during chats delete');
        }
    }

    const listen = () => {
        if (listening) return;
    
        event.on('messaging-history.set', set);
        event.on('chats.upsert', upsert);
        event.on('chats.update', update);
        event.on('chats.delete', del);
        listening = true;
    };

    const unlisten = () => {
        if (!listening) return;
    
        event.off('messaging-history.set', set);
        event.off('chats.upsert', upsert);
        event.off('chats.update', update);
        event.off('chats.delete', del);
        listening = false;
    };

    return { listen, unlisten };
}