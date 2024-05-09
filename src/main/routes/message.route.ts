import {Router} from "express";
import {requestAdapter} from "../adapters/request-adapter";
import {controller} from "./index";

const messageRoute = Router();

messageRoute.post(
  '/instance/:id/message/text',
  (req, res) =>  requestAdapter(req, res, controller.sendTextMessage))
messageRoute.post(
  '/instance/:id/message/media-url',
  (req, res) =>  requestAdapter(req, res, controller.sendTextMessage))


export default messageRoute;