import 'dotenv/config';
import {AMQPMessageQueue} from "../services/messaging/AMQPMessageQueue";
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const MONGO_DB = process.env.MONGO_DB || 'whiskey';
const AMQPM_URL = process.env.AMQPM_URL || 'amqp://localhost'

export default {
    PORT,
    MONGO_URL,
    MONGO_DB,
    NODE_ENV,
    AMQPM_URL
}