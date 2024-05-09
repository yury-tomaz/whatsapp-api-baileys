import {Router, Request, Response} from "express";
import {BaileysComposer} from "../compose/baileys/bailyes.composer";
import {requestAdapter} from "../adapters/request-adapter";

const instanceRoute = Router();
const controller = BaileysComposer.create()

instanceRoute.post(
    '/instance',
    (req: Request, res: Response) =>  requestAdapter(req, res, controller.init)
)
instanceRoute.delete(
    '/instance/:id',
    (req: Request, res: Response) => requestAdapter(req, res, controller.delete)
)

instanceRoute.get(
    '/instance/:id/qr',
    (req: Request, res: Response) =>  requestAdapter(req, res, controller.qr)
)

instanceRoute.post(
  '/instance/:id/logout',
  (req: Request, res: Response) => requestAdapter(req, res, controller.logout)
)

instanceRoute.get(
  'instance/:id/info',
  (req: Request, res: Response) => requestAdapter(req, res, controller.info)
)


export default instanceRoute;