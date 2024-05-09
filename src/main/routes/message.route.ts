import {Router} from "express";
import {requestAdapter} from "../adapters/request-adapter";
import {controller} from "./index";

const messageRoute = Router();

messageRoute.post(
  '/instance/:id/message',
  (req, res) =>  requestAdapter(req, res, controller.sendTextMessage))


export default messageRoute;