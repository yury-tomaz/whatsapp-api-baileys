import { Router } from "express";
import miscRoute from "./misc.route";
import groupRoute from "./group.route";
import messageRoute from "./message.route";
import instanceRoute from "./instance.route";
const router = Router();

router.use('/api/whatsapp/instances', instanceRoute);
router.use('/api/whatsapp/message', messageRoute);
router.use('/api/whatsapp/group', groupRoute);
router.use('/api/whatsapp/misc', miscRoute );

export { router };