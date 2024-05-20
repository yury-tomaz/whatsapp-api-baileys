import * as mongoDB from 'mongodb';
import { Config } from '../../config';
import { logger } from '../../logger';

class MongoDBManager {
  private readonly _client: mongoDB.MongoClient;
  private _db: mongoDB.Db;

  constructor(){
    this._client = new mongoDB.MongoClient(Config.db().uri);
  }

  get db():mongoDB.Db {
    return this._db
  }

  get client(){
    return this._client
  }

  async connect(){
    try {
      await this._client.connect();
      this._db = this._client.db(Config.db().dbName);
      logger.info(`Successfully connected to database: ${this.db.databaseName}`);
    }catch(err){
      logger.error('STATE: Connection to MongoDB failed!', err);
      process.exit();
    }
  }

  async desconnect(){
    await this._client.close()
  }
}

export const mongoDBManager = new MongoDBManager();