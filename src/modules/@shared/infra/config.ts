import { config as readEnv } from 'dotenv';
import { join } from 'path';
export class Config {
  static env: any = null;

  static port() {
    Config.readEnv();

    return Config.env.PORT;
  }

  static instanceHash() {
    Config.readEnv();

    return Config.env.INSTANCE_HASH;
  }

  static rabbitmqUri() {
    Config.readEnv();

    return Config.env.RABBITMQ_URI;
  }

  static db() {
    Config.readEnv();

    return {
      uri: Config.env.MONGO_URI,
      dbName: Config.env.MONGO_DB_NAME,
      colection: Config.env.MONGO_DB_COLLECTION,
    };
  }

  static jwtSecretKey(){
    Config.readEnv();

    return  Config.env.PRIVATE_KEY
  }

  static readEnv() {
    if (Config.env) {
      return;
    }

    const { parsed } = readEnv({
      path: join(__dirname, `../../../../envs/.env.${process.env.NODE_ENV}`),
    });

    Config.env = {
      ...parsed,
      ...process.env,
    };
  }
}
