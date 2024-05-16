import { NextFunction, Request, Response } from 'express';
import { AppError, HttpCode } from '../../modules/@shared/domain/exceptions/app-error';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Config } from '../../modules/@shared/infra/config';

interface DecodedToken extends JwtPayload {
  realm_access: {
    roles: string[];
  };
}
export function ensureAuthenticateMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if(!authHeader){
    return response.status(HttpCode.UNAUTHORIZED).json({
      message: 'header authorization is missing',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, Config.jwtSecretKey()) as DecodedToken;

    if (decoded && decoded.realm_access && decoded.realm_access.roles) {
      request.user = {
        realm_access: {
          roles: decoded.realm_access.roles
        }
      };
      return next();
    }else {
      return response.status(HttpCode.UNAUTHORIZED).json({
        message: 'Invalid token structure',
      });
    }

  }catch (err){
    return response.status(HttpCode.UNAUTHORIZED).json({
      message: 'Invalid or expired token',
    });
  }
}