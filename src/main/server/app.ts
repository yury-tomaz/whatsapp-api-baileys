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
import { router } from "../routes";
import path from "path";
import { GetQrCodeComposer } from "../composers/baileys/get-QrCode.composer";
import { InitBailesInstanceUseCase } from "../../application/features/commands/baileys/init-baileys-instance/init-baileys-instance.usecase";
import { BaileysInMemoryRepository } from "../../infrastructure/persistence/repositories/baileys-in-memory.repository";
import { HttpRequest } from "../../presentation/http-types/http-request";
import { getQrCodeUseCase } from "../../application/features/queries/baileys/get-qrCode/get-qrCode.usecase";
import { GetQrCodeController } from "../../presentation/controllers/baileys/queries/get-QrCode.controller";

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