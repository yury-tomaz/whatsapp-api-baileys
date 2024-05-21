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
messageRoute.post(
  '/instance/:id/message/media-url',
  upload.none(),
  (req, res) => requestAdapter(req, res, controller.sendUrlMediaFile),
);

messageRoute.post(
  '/instance/:id/message/media',
  upload.single('file'),
  (req, res) => requestAdapter(req, res, controller.sendMediaFile),
);

messageRoute.get('/instance/:id/messages', (req, res) =>
  requestAdapter(req, res, controller.findAllMessages),
);

export default messageRoute;
