import { logger } from "../../infrastructure/logger";
import { app } from "./app";

app.listen(3000, () => {
    logger.info('Server is running on port 3000');
});