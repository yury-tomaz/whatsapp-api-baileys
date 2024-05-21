import { logger } from '../../modules/@shared/infra/logger';
import { app } from './app';
import { Config } from '../../modules/@shared/infra/config';
import { mongoDBManager } from '../../modules/@shared/infra/persistence/settings/connection';
import { RabbitmqMessageBroker } from '../../modules/@shared/infra/services/message-broker/rabbitmq-message-broker';
import EventDispatcher from '../../modules/@shared/domain/events/event-dispatcher';
import { PublicMessageWhenWhatsappUpdatedHandler } from '../../modules/baileys/events/handlers/public-message-when-whatsapp-updated.handler';

const port = Config.port();
const messageBroker = new RabbitmqMessageBroker(Config.rabbitmqUri());
export const eventDispatcher = new EventDispatcher();
app.listen(Config.port(), async () => {
  try {
    await mongoDBManager.connect();
    await messageBroker.start();

    const exchangeName = 'baileys.topic.exchange';

    const queues = [
      // ALL
      { name: 'baileys-event', routingKey: 'baileys.event.*' },
      // CONECTION
      {
        name: 'baileys-event-connection-open',
        routingKey: 'baileys.event.connection.open',
      },
      {
        name: 'baileys-event-connection-close',
        routingKey: 'baileys.event.connection.close',
      },
      {
        name: 'baileys-event-connection-all',
        routingKey: 'baileys.event.connection.*',
      },
      // PRESENCE
      { name: 'baileys-event-presence', routingKey: 'baileys.event.presence' },
      // MESSAGE
      { name: 'baileys-event-message', routingKey: 'baileys.event.message' },
      // CALL
      {
        name: 'baileys-event-call-offer',
        routingKey: 'baileys.event.call.offer',
      },
      {
        name: 'baileys-event-call-terminate',
        routingKey: 'baileys.event.call.terminate',
      },
      { name: 'baileys-event-call', routingKey: 'baileys.event.call.*' },
      // GROUP
      {
        name: 'baileys-event-group-created',
        routingKey: 'baileys.event.group.created',
      },
      {
        name: 'baileys-event-group-updated',
        routingKey: 'baileys.event.group.updated',
      },
      {
        name: 'baileys-event-group-participants-updated',
        routingKey: 'baileys.event.group.participants-updated',
      },
      { name: 'baileys-event-group', routingKey: 'baileys.event.group.*' },
    ];

    await messageBroker.createExchange(exchangeName, 'topic', {
      durable: true,
    });

    for (const queue of queues) {
      await messageBroker.createQueue(queue.name, { durable: true });
      await messageBroker.bindQueue(queue.name, exchangeName, queue.routingKey);
    }

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

export { messageBroker };
