import environment from "../../infrastructure/environment";
import { logger } from "../../infrastructure/logger";
import { app } from "./app";

app.listen(environment.PORT , () => {
    logger.info(`Server is running on port ${environment.PORT}`);
});