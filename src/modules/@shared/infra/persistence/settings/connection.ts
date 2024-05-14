import * as mongoDB from 'mongodb';
import { MongoClient } from 'mongodb';
import { Config } from '../../config';
import { logger } from '../../logger';

interface CollectionsInterface {
  baileys?: mongoDB.Collection;
}
export const collections: CollectionsInterface = {};
let mongoClient: MongoClient;
export const dbConnect = async () => {
  try {
    mongoClient = new mongoDB.MongoClient(Config.db().uri);
    await mongoClient.connect();
    const db: mongoDB.Db = mongoClient.db(Config.db().dbName);

    collections.baileys = db.collection(Config.db().colection);

    logger.info(`Successfully connected to database: ${db.databaseName}`);

    return mongoClient;
  } catch (err) {
    logger.error('STATE: Connection to MongoDB failed!', err);
    process.exit();
  }
};

export const dbDisconnect = async () => {
  logger.info('Successfully disconnected to database');
  await mongoClient.close();
};

export { mongoClient };
