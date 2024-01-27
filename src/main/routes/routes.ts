import { Router } from "express";
import messageRouter from "./message.routes";
import baileysRoute from "./baileys.routes";
const router = Router();

router.use('/api/baileys/instances', baileysRoute);
router.use('/api/baileys/:key/message', messageRouter);

export { router };