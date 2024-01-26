import { Router } from "express";
import { initBaileysInstanceComposer } from "../composers/baileys/Init-baileys-instance.composer";
import { GetQrCodeComposer } from "../composers/baileys/get-QrCode.composer";
import { sendTextMessageCompose } from "../composers/baileys/send-text-message.composer";
import { routesVersioning } from "../middlewares/route-versioning.middleware";

const router = Router();

router.post("/api/baileys", (request, response) =>
    routesVersioning(request, response, {
        '1.0.0': initBaileysInstanceComposer()
    })
);

router.get("/api/baileys/:key/QRCode", (request, response) =>
    routesVersioning(request, response, {
        '1.0.0': GetQrCodeComposer()
    })
);

router.post("/api/baileys/:key/message/text", (request, response) => 
    routesVersioning(request, response, {
        '1.0.0': sendTextMessageCompose()
    })
);

export { router };