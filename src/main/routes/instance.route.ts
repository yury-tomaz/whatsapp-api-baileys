import { Router, Request, Response } from 'express';
import { requestAdapter } from '../adapters/request-adapter';
import { controller } from './index';

const instanceRoute = Router();

instanceRoute.post('/instance', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.init),
);
instanceRoute.delete('/instance/:id', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.delete),
);

instanceRoute.get('/instance/:id/qr', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.qr),
);

instanceRoute.post('/instance/:id/logout', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.logout),
);

instanceRoute.get('/instance/:id/info', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.info),
);

instanceRoute.post('/instance/restore', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.restore),
);

instanceRoute.get('/instances', (req: Request, res: Response) =>
  requestAdapter(req, res, controller.listInstances),
);

export default instanceRoute;
