import { Connection, Channel, connect, Message } from 'amqplib';
import {
  MessageBrokerInterface,
  exchangeType,
} from '../../../application/abstractions/message-broker.interface';

export class RabbitmqMessageBroker implements MessageBrokerInterface {
  private conn: Connection;
  private channel: Channel;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async publishInQueue(queue: string, message: string): Promise<boolean> {
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    message: string,
  ): Promise<boolean> {
    return this.channel.publish(exchange, routingKey, Buffer.from(message));
  }

  async consume(queue: string, callback: (message: Message) => void) {
    return this.channel.consume(queue, (message) => {
      if (!message) return;

      callback(message);
      this.channel.ack(message);
    });
  }

  async createExchange(
    exchange: string,
    type: exchangeType,
    options: object = {},
  ): Promise<void> {
    await this.channel.assertExchange(exchange, type, options);
  }
  async createQueue(queue: string, options: object = {}): Promise<void> {
    await this.channel.assertQueue(queue, options);
  }

  async bindQueue(
    queue: string,
    exchange: string,
    routingKey: string,
  ): Promise<void> {
    await this.channel.bindQueue(queue, exchange, routingKey);
  }
}
