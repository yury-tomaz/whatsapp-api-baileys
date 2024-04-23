import {logger} from '../../logger';
import environment from '../../environment';

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

        collections.baileys = db.collection('baileys');
        logger.info(`Successfully connected to database: ${db.databaseName}`);

        return client;
    } catch (err) {
        logger.error('STATE: Connection to MongoDB failed!', err);
        process.exit()
    }
}