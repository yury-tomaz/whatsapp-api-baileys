import { Router } from 'express';
import { requestAdapter } from '../adapters/request-adapter';
import { controller } from './index';
import multer from 'multer';

const messageRoute = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

messageRoute.post('/instance/:id/message/text', (req, res) =>
  requestAdapter(req, res, controller.sendTextMessage),
);
messageRoute.post('/instance/:id/message/media-url', (req, res) =>
  requestAdapter(req, res, controller.sendTextMessage),
);

messageRoute.post(
  '/instance/:id/message/media',
  upload.single('file'),
  (req, res) => requestAdapter(req, res, controller.sendTextMessage),
);

export default messageRoute;
