import 'dotenv/config';
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const MONGO_DB = process.env.MONGO_DB || 'whiskey';

export default {
    PORT,
    MONGO_URL,
    MONGO_DB,
    NODE_ENV
}