import {logger} from '../../logger';
import environment from '../../environment';

import * as mongoDB from "mongodb";
import {MongoClient} from "mongodb";

interface CollectionsInterface {
    baileys?: mongoDB.Collection;
}
export const collections: CollectionsInterface = {}
let mongoClient: MongoClient
export const dbConnect = async () => {
    try {
        mongoClient = new mongoDB.MongoClient(environment.MONGO_URL);
        await mongoClient.connect();
        const db: mongoDB.Db = mongoClient.db(environment.MONGO_DB);

        collections.baileys = db.collection('baileys');
        logger.info(`Successfully connected to database: ${db.databaseName}`);

        return mongoClient;
    } catch (err) {
        logger.error('STATE: Connection to MongoDB failed!', err);
        process.exit()
    }
}

export const dbDisconnect = async () => {
    logger.info('Successfully disconnected to database')
    await mongoClient.close()
}


export {mongoClient }
