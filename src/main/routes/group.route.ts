import {Router, Request, Response} from "express";
import { requestAdapter } from "../adapters/request-adapter";
import { BaileysComposer } from "../compose/baileys/bailyes.composer";
import {controller} from "./index";

const groupRoute = Router();

groupRoute.patch('/:id/accept-invite', (req: Request, res: Response) =>  requestAdapter(req, res, controller.acceptInviteGroup))
groupRoute.patch('/:id/make-user', (req: Request, res: Response) =>  requestAdapter(req, res, controller.makeUserGroup))
groupRoute.post('/:id', (req: Request, res: Response) =>  requestAdapter(req, res, controller.createGroup))


export default groupRoute;