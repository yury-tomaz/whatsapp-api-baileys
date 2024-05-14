import * as amqp from 'amqplib';
import { AppError, HttpCode } from '../../../domain/exceptions/app-error';
import { logger } from '../../logger';
import { Config } from '../../config';
import { MessageBrokerInterface } from '../../../application/abstractions/message-broker.interface';
import EventInterface from '../../../domain/events/event.interface';

export class RabbitmqMessageBroker implements MessageBrokerInterface {
  private channel: amqp.Channel | null = null;
  private exchangeName: string = 'baileys-api';

  constructor() {
    this.connect()
      .then((r) => logger.info('AMQP initialized'))
      .catch((error) =>
        logger.error('Erro ao inicializar AMQP:', error.message),
      );
  }

  private async connect() {
    logger.info('RabbitmqMessageBroker connecting...');
    const connection = await amqp.connect(Config.rabbitmqUri());
    this.channel = await connection.createChannel();

    await this.channel.assertExchange(this.exchangeName, 'topic', {
      durable: true,
      autoDelete: false,
    });
  }

  async publishEvent(event: EventInterface, routingKey: string): Promise<void> {
    if (!this.channel) {
      throw new AppError({
        message:
          'The connection has not been established. Call connect() before sending messages.',
        isOperational: true,
        statusCode: HttpCode['NOT_FOUND'],
      });
    }

    this.channel.publish(
      this.exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(event)),
    );
    logger.info(
      `Message sent to exchange ${this.exchangeName} with routing key ${routingKey}: ${JSON.stringify(event)}`,
    );
  }
}
