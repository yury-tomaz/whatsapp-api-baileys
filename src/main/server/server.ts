import environment from "../../modules/@shared/infra/environment";
import { logger } from "../../modules/@shared/infra/logger";
import { app } from "./app";

app.listen(environment.PORT , () => {
    logger.info(`Server is running on port ${environment.PORT}`);
});