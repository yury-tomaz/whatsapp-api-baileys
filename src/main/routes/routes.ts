import { Router } from "express";
import messageRouter from "./message.routes";
import baileysRoute from "./baileys.routes";

const router = Router();

router.use('/api/baileys', baileysRoute);
router.use('/api/baileys/:key/message', messageRouter);

export { router };