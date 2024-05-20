import EventHandlerInterface from '../../../@shared/domain/events/event-handler.interface';
import { EventOccurredWhatsappEvent } from '../event-occurred-whatsapp.event';
import { logger } from '../../../@shared/infra/logger';
import { messageBroker } from '../../../../main/server/server';


export class PublicMessageWhenWhatsappUpdatedHandler implements  EventHandlerInterface<EventOccurredWhatsappEvent>{
  handle(event: EventOccurredWhatsappEvent) {
    const {routingKey, data} = event.eventData;

    messageBroker.publishInExchange(
      'baileys.topic.exchange',
      routingKey,
      JSON.stringify(data)
    )
      .then(r => {
      if(!r){
        logger.error('Error posting message')
        return;
      }
      logger.info('Message Published Successfully')
    });
  }
}