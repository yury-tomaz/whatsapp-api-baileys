import { Response } from 'express';
import { AppError, HttpCode } from './app-error';
import { ValidationError } from 'yup';
import { logger } from '../../infra/logger';

class ErrorHandler {
  private isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }

  private handleTrustedError(error: AppError, response: Response): void {
    response.status(error.statusCode).json({
      message: error.message,
      code: error.statusCode,
    });
  }

  private handleCriticalError(
    error: Error | AppError,
    response?: Response,
  ): void {
    if (response) {
      response
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
    process.exit(1);
  }

  private handleYupError(error: ValidationError, response: Response) {
    response.status(HttpCode['BAD_REQUEST']).json({
      message: error,
      code: HttpCode['BAD_REQUEST'],
    });
  }

  public handleError(
    error: Error | AppError | ValidationError,
    response?: Response,
  ): void {
    logger.error(error);

    if (error instanceof ValidationError && response) {
      this.handleYupError(error as ValidationError, response);
    }

    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as AppError, response);
    } else {
      this.handleCriticalError(error, response);
    }
  }
}

export const errorHandler = new ErrorHandler();
