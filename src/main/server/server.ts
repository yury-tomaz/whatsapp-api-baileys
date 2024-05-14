import { logger } from '../../modules/@shared/infra/logger';
import { app } from './app';
import { dbConnect } from '../../modules/@shared/infra/persistence/settings/connection';
import { Config } from '../../modules/@shared/infra/config';

const port = Config.port();
app.listen(Config.port(), async () => {
  await dbConnect();
  logger.info(`Server is running on port ${port}`);
});
