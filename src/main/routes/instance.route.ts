import {Router, Request, Response} from "express";
import {BaileysComposer} from "../compose/baileys/bailyes.composer";
import {requestAdapter} from "../adapters/request-adapter";

const instanceRoute = Router();
const controller = BaileysComposer.create()

instanceRoute.post(
    '/instance',
    (req: Request, res: Response) =>  requestAdapter(req, res, controller.init)
)

instanceRoute.get(
    '/instance/:id/qr',
    (req: Request, res: Response) =>  requestAdapter(req, res, controller.qr)
)

export default instanceRoute;