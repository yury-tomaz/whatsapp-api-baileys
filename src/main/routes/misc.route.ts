import { Request, Response, Router } from 'express';
import { controller } from '.';
import { requestAdapter } from '../adapters/request-adapter';

const miscRoute = Router();

miscRoute.patch(
  '/instance/:id/misc/block-unblock',
  (req: Request, res: Response) =>
    requestAdapter(req, res, controller.blockUnblockUser),
);
miscRoute.get(
  '/instance/:id/misc/profile-picture',
  (req: Request, res: Response) =>
    requestAdapter(req, res, controller.profilePicture),
);
miscRoute.get('/instance/:id/misc/verify-wpp', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.isOnWhatsap),
);

export default miscRoute;
