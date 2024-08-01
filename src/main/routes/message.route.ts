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

messageRoute.put('/instance/:id/message/text', (req, res) =>
  requestAdapter(req, res, controller.updateMessage),
);

messageRoute.patch('/instance/:id/message/text', (req, res) =>
  requestAdapter(req, res, controller.deleteMessage),
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

messageRoute.get('/instance/:id/message/contacts', (req, res) =>
  requestAdapter(req, res, controller.findAllContacts),
);

messageRoute.get('/instance/:id/message/chats', (req, res) =>
  requestAdapter(req, res, controller.findAllChats),
);

export default messageRoute;
