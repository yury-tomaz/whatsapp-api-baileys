import { Router } from "express";
import { requestAdapter } from "../adapters/request-adapter";
import { initBaileysInstanceComposer } from "../composers/baileys/Init-baileys-instance.composer";
import { GetQrCodeComposer } from "../composers/baileys/get-QrCode.composer";

const router = Router();

router.post("/api/v1/baileys", (request, response) => requestAdapter(request, response,  initBaileysInstanceComposer()));
router.get("/api/v1/baileys/:key/QRCode", (request, response) => requestAdapter(request, response,  GetQrCodeComposer()));

export { router };