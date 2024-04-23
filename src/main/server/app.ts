import "express-async-errors";
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pinoHttp from 'pino-http';
import compression from 'compression';
import { logger } from '../../modules/@shared/infra/logger';
import { dbConnect } from '../../modules/@shared/infra/persistence/settings/connection';
import { AppError } from '../../modules/@shared/domain/exceptions/app-error';
import { errorHandler } from '../../modules/@shared/domain/exceptions/error-handler';
import './process';
import { MongoClient } from "mongodb";
import { router } from "../routes";
import path from "path";
import { config } from "dotenv";
import {AMQPMessageQueue} from "../../modules/@shared/infra/services/messaging/AMQPMessageQueue";
import environment from "../../modules/@shared/infra/environment";
config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(pinoHttp({ logger }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let client: MongoClient;
let messageQueue: AMQPMessageQueue

(async () => {
    client = await dbConnect();
    messageQueue = new AMQPMessageQueue(environment.AMQPM_URL)
})()

app.use(router);

app.use(express.static(path.join(__dirname, '..', '..', 'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', '..', 'public'));


app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    errorHandler.handleError(err, res);
});


export { app, client, messageQueue };