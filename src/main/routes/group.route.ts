import { Router, Request, Response } from 'express';
import { requestAdapter } from '../adapters/request-adapter';
import { BaileysComposer } from '../compose/baileys/bailyes.composer';
import { controller } from './index';

const groupRoute = Router();

groupRoute.use('/instance');

groupRoute.patch('/:id/group/leave', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.leaveGroup),
);
groupRoute.patch('/:id/group/accept-invite', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.acceptInviteGroup),
);
groupRoute.patch('/:id/group/make-user', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.makeUserGroup),
);
groupRoute.patch('/:id/group/description', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.updateDescriptionGroup),
);
groupRoute.patch('/:id/group/subject', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.updateSubjectGroup),
);
groupRoute.patch('/:id/group/settings', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.updateSettingsGroup),
);
groupRoute.get('/:id/group/info-invite', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.inviteInfoGroup),
);
groupRoute.get('/:id/group/code-invite', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.inviteCodeGroup),
);
groupRoute.post('/:id/group', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.createGroup),
);

export default groupRoute;
