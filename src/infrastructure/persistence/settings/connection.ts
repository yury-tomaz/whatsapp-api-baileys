import { logger } from '../../../infrastructure/logger';
import environment from '../../../infrastructure/environment';

import * as mongoDB from "mongodb";

interface CollectionsInterface {
    baileys?: mongoDB.Collection;
}
export const collections: CollectionsInterface = {}

export async function dbConnect() {

    try {
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(environment.MONGO_URL);

        await client.connect();

        const db: mongoDB.Db = client.db(environment.MONGO_DB);

        const baileysCollection: mongoDB.Collection = db.collection('baileys');

        collections.baileys = baileysCollection;
        logger.info(`Successfully connected to database: ${db.databaseName}`);

        return client;
    } catch (err) {
        logger.error('STATE: Connection to MongoDB failed!', err);
        process.exit()
    }
}