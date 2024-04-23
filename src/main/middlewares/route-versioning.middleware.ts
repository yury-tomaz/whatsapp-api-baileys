import { Request, Response } from "express";
import { AppError, HttpCode } from "../../modules/@shared/domain/exceptions/app-error";
import { ControllerInterface, requestAdapter } from "../adapters/request-adapter";


interface RouteVersioningInterface {
    [key: string]: ControllerInterface;
}

export const routesVersioning = (req: Request, res: Response, versioning: RouteVersioningInterface) => {
    const version = req.headers['accept-version'];
    
    if (!version || typeof version !== 'string' || !validateVersion(version) ) {
        throw new AppError({
            message: `Invalid or unsupported version: ${version}`,
            statusCode: HttpCode.BAD_REQUEST,
            isOperational: true,
        });
    }

    const controller = versioning[version];

    requestAdapter(req, res, controller)
};


const validateVersion = (version: string): boolean => {
    const regex = new RegExp('^\\d+\\.\\d+\\.\\d+$');
    return regex.test(version);
}