import {Router, Request, Response} from "express";
import { requestAdapter } from "../adapters/request-adapter";
import { BaileysComposer } from "../compose/baileys/bailyes.composer";

const groupRoute = Router();
const controller = BaileysComposer.create();

groupRoute.patch('/:id/accept-invite', (req: Request, res: Response) =>  requestAdapter(req, res, controller.acceptInviteGroup))
groupRoute.post('/:id', (req: Request, res: Response) =>  requestAdapter(req, res, controller.createGroup))


export default groupRoute;