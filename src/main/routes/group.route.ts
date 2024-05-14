import { Router, Request, Response } from 'express';
import { requestAdapter } from '../adapters/request-adapter';
import { BaileysComposer } from '../compose/baileys/bailyes.composer';
import { controller } from './index';

const groupRoute = Router();

groupRoute.patch('/instance/:id/group/leave', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.leaveGroup),
);
groupRoute.patch(
  '/instance/:id/group/accept-invite',
  (req: Request, res: Response) =>
    requestAdapter(req, res, controller.acceptInviteGroup),
);
groupRoute.patch(
  '/instance/:id/group/make-user',
  (req: Request, res: Response) =>
    requestAdapter(req, res, controller.makeUserGroup),
);
groupRoute.patch(
  '/instance/:id/group/description',
  (req: Request, res: Response) =>
    requestAdapter(req, res, controller.updateDescriptionGroup),
);
groupRoute.patch('/instance/:id/group/subject', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.updateSubjectGroup),
);
groupRoute.patch(
  '/instance/:id/group/settings',
  (req: Request, res: Response) =>
    requestAdapter(req, res, controller.updateSettingsGroup),
);
groupRoute.get(
  '/instance/:id/group/info-invite',
  (req: Request, res: Response) =>
    requestAdapter(req, res, controller.inviteInfoGroup),
);
groupRoute.get(
  '/instance/:id/group/code-invite',
  (req: Request, res: Response) =>
    requestAdapter(req, res, controller.inviteCodeGroup),
);
groupRoute.post('/instance/:id/group', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.createGroup),
);

export default groupRoute;
