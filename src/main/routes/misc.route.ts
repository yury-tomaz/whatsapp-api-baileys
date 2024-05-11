import {Request, Response, Router} from "express";
import { controller } from ".";
import { requestAdapter } from "../adapters/request-adapter";

const miscRoute = Router();

miscRoute.patch('/:id/misc/block-unblock', (req: Request, res: Response) =>  requestAdapter(req, res, controller.blockUnblockUser))

export default miscRoute;