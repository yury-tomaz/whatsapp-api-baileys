import { logger } from '../../modules/@shared/infra/logger';
import { app } from './app';
import { Config } from '../../modules/@shared/infra/config';
import { mongoDBManager } from '../../modules/@shared/infra/persistence/settings/connection';
import { RabbitmqMessageBroker } from '../../modules/@shared/infra/services/message-broker/rabbitmq-message-broker';
import EventDispatcher from '../../modules/@shared/domain/events/event-dispatcher';
import { PublicMessageWhenWhatsappUpdatedHandler } from '../../modules/baileys/events/handlers/public-message-when-whatsapp-updated.handler';

const port = Config.port();
const messageBroker = new RabbitmqMessageBroker(Config.rabbitmqUri());
const eventDispatcher = new EventDispatcher();

app.listen(Config.port(), async () => {
  try {
    await mongoDBManager.connect();
    await messageBroker.start();

    eventDispatcher.register(
      'EventOccurredWhatsappEvent',
      new PublicMessageWhenWhatsappUpdatedHandler(),
    );

    logger.info(`Server is running on port ${port}`);
  } catch (error) {
    logger.error('Failed to start the server', error);
    process.exit(1);
  }
});

export { messageBroker, eventDispatcher };
