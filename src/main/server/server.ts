import environment from "../../modules/@shared/infra/environment";
import {logger} from "../../modules/@shared/infra/logger";
import {app} from "./app";
import {dbConnect} from "../../modules/@shared/infra/persistence/settings/connection";


app.listen(environment.PORT, async () => {
    await dbConnect();
    logger.info(`Server is running on port ${environment.PORT}`);
});
