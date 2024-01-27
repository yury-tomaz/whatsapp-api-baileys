import "express-async-errors";
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pinoHttp from 'pino-http';
import compression from 'compression';
import { logger } from '../../infrastructure/logger';
import { dbConnect } from '../../infrastructure/persistence/settings/connection';
import { AppError } from '../../domain/exceptions/app-error';
import { errorHandler } from '../../domain/exceptions/error-handler';
import './process';
import { MongoClient } from "mongodb";
import { router } from "../routes/routes";
import path from "path";


const app = express();

app.use(helmet());
app.use(cors());
app.use(pinoHttp({ logger }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let client: MongoClient;

(async () => {
    client = await dbConnect()
})()

app.use(router);


app.use(express.static(path.join(__dirname, "..", "public")))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'public'));


app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    errorHandler.handleError(err, res);
});


export { app, client };