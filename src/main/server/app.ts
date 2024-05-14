import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pinoHttp from 'pino-http';
import compression from 'compression';
import { logger } from '../../modules/@shared/infra/logger';
import { AppError } from '../../modules/@shared/domain/exceptions/app-error';
import { errorHandler } from '../../modules/@shared/domain/exceptions/error-handler';
import './process';
import { router } from '../routes';
import path from 'path';
import { config } from 'dotenv';
import { RabbitmqMessageBroker } from '../../modules/@shared/infra/services/message-broker/rabbitmq-message-broker';
import EventDispatcher from '../../modules/@shared/domain/events/event-dispatcher';
import { BaileysEventHandler } from '../../modules/baileys/events/handler/baileys-event-handler';

config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(pinoHttp({ logger }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const messageBroker = new RabbitmqMessageBroker();


app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', '..', 'public'));

app.use(router);

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

export { app, messageBroker };
