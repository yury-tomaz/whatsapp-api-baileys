import { Router } from "express";
import { routesVersioning } from "../middlewares/route-versioning.middleware";
import { initBaileysInstanceComposer } from "../composers/baileys/Init-baileys-instance.composer";
import { GetQrCodeComposer } from "../composers/baileys/get-QrCode.composer";
import { requestAdapter } from "../adapters/request-adapter";
import environment from "../../infrastructure/environment";

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

if (environment.NODE_ENV === 'development') {
    baileysRoute.get("/:key/QRCode/render", (request, response) => requestAdapter(request, response, GetQrCodeComposer(), 'index'));
}

export default baileysRoute as Router;