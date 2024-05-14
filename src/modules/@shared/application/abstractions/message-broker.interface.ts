import EventInterface from '../../domain/events/event.interface';

export interface MessageBrokerInterface {
  publishEvent(event: EventInterface, queueName: string): Promise<void>;
}
