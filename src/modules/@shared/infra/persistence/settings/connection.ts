import * as mongoDB from 'mongodb';
import { Config } from '../../config';
import { logger } from '../../logger';

let mongoClient: mongoDB.MongoClient | null = null;
const MongoDBManager = () => {
  try {
    if (!mongoClient) {
      mongoClient = new mongoDB.MongoClient(Config.db().uri);
      logger.info('STATE: Connecting to MongoDB...');
      mongoClient.connect().then((client) => {
        mongoClient = client;
      });
      logger.info('STATE: Successfully connected to MongoDB');
    }
    return mongoClient;
  } catch (err) {
    logger.error('STATE: Connection to MongoDB failed!', err);
    process.exit(1);
  }
};
export const mongoDBManager = MongoDBManager();
