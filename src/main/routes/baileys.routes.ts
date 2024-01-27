import { Router } from "express";
import { routesVersioning } from "../middlewares/route-versioning.middleware";
import { initBaileysInstanceComposer } from "../composers/baileys/Init-baileys-instance.composer";
import { GetQrCodeComposer } from "../composers/baileys/get-QrCode.composer";

const baileysRoute = Router();

baileysRoute.post("/", (request, response) =>
    routesVersioning(request, response, {
        '1.0.0': initBaileysInstanceComposer()
    })
);

baileysRoute.get("/:key/QRCode", (request, response) =>
    routesVersioning(request, response, {
        '1.0.0': GetQrCodeComposer()
    })
);

export default baileysRoute as Router;