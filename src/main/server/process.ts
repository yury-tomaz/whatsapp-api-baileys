

import { errorHandler } from "../../modules/@shared/domain/exceptions/error-handler";
import { logger } from "../../modules/@shared/infra/logger";

process.on('unhandledRejection', (error: Error) => {
 logger.error(`Unhandled Rejection: ${error.message || error}`);

 errorHandler.handleError(error);
});