import { Message, Replies } from 'amqplib';
export type exchangeType = "direct" | "fanout" | "topic";

export interface MessageBrokerInterface {
  start(): Promise<void>;
  publishInQueue(queue: string, message: string):  Promise<boolean>;
  publishInExchange(exchange: exchangeType, routingKey: string, message: string): Promise<boolean>;
  consume(queue: string, callback: (message: Message) => void): Promise<Replies.Consume>;
}