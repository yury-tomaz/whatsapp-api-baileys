import { logger } from '../../modules/@shared/infra/logger';
import { app } from './app';

import { Config } from '../../modules/@shared/infra/config';
import { mongoDBManager } from '../../modules/@shared/infra/persistence/settings/connection';

const port = Config.port();
app.listen(Config.port(), async () => {
  await mongoDBManager.connect();
  logger.info(`Server is running on port ${port}`);
});
