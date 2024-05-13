import EventHandlerInterface from '../../../@shared/domain/events/event-handler.interface';
import { BaileysEvent } from '../baileys.event';
import { messageBroker } from '../../../../main/server/app';
import { logger } from '../../../@shared/infra/logger';
import { Config } from '../../../@shared/infra/config';
export class BaileysEventHandler implements EventHandlerInterface<BaileysEvent>{

  async handle(event: BaileysEvent){
    const routingKey = `baileys-event.${Config.instanceHash()}.${event.eventData.instanceKey}`

    messageBroker.publishEvent(event, routingKey)
      .then(() =>  logger.info(`Event ${routingKey} successfully published.`))
      .catch(error => logger.error(`Error publishing event ${routingKey}: ${error}`))
  }

}