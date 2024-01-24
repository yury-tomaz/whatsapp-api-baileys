

import { errorHandler } from "../../domain/exceptions/error-handler";
import { logger } from "../../infrastructure/logger";

process.on('unhandledRejection', (error: Error) => {
 logger.error(`Unhandled Rejection: ${error.message || error}`);

 errorHandler.handleError(error);
});