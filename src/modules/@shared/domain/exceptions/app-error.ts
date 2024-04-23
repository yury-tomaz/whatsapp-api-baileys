const HttpCode = {
 OK: 200,
 CREATED: 201,
 ACCEPTED: 202,
 NO_CONTENT: 204,
 BAD_REQUEST: 400,
 UNAUTHORIZED: 401,
 FORBIDDEN: 403,
 NOT_FOUND: 404,
 METHOD_NOT_ALLOWED: 405,
 CONFLICT: 409,
 INTERNAL_SERVER_ERROR: 500,
 BAD_GATEWAY: 502,
 SERVICE_UNAVAILABLE: 503,
 GATEWAY_TIMEOUT: 504,
};


interface AppErrorInputDTO {
 statusCode: number,
 message: string,
 error?: any,
 isOperational?: boolean
}

class AppError extends Error {
 public error: any;
 public isOperational: boolean = false;
 public name = 'AppError';
 public statusCode: number;

 constructor(props: AppErrorInputDTO) {
  super(props.message);
  this.error = props.error;
  this.isOperational = !!props.isOperational;
  this.statusCode =  props.statusCode 
 }
}
export { AppError, HttpCode }