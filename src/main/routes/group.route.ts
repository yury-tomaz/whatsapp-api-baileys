import {Router, Request, Response} from "express";
import { requestAdapter } from "../adapters/request-adapter";
import { BaileysComposer } from "../compose/baileys/bailyes.composer";
import {controller} from "./index";

const groupRoute = Router();

groupRoute.patch('/:id/accept-invite', (req: Request, res: Response) =>  requestAdapter(req, res, controller.acceptInviteGroup))
groupRoute.patch('/:id/make-user', (req: Request, res: Response) =>  requestAdapter(req, res, controller.makeUserGroup))
groupRoute.patch('/:id/description', (req: Request, res: Response) =>  requestAdapter(req, res, controller.updateDescriptionGroup))
groupRoute.patch('/:id/subject', (req: Request, res: Response) =>  requestAdapter(req, res, controller.updateSubjectGroup))
groupRoute.patch('/:id/settings', (req: Request, res: Response) =>  requestAdapter(req, res, controller.updateSettingsGroup))
groupRoute.post('/:id', (req: Request, res: Response) =>  requestAdapter(req, res, controller.createGroup))


export default groupRoute;