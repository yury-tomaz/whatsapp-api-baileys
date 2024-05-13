import EventHandlerInterface from '../../../@shared/domain/events/event-handler.interface';
import { BaileysEvent } from '../baileys.event';
import { messageBroker } from '../../../../main/server/app';
import { logger } from '../../../@shared/infra/logger';
export class BaileysEventHandler implements EventHandlerInterface<BaileysEvent>{

  async handle(event: BaileysEvent){
    const queuename = `baileys`

    messageBroker.publishEvent(event, queuename)
      .then(() =>  logger.info(`Event ${queuename} successfully published.`))
      .catch(error => logger.error(`Error publishing event ${queuename}: ${error}`))
  }

}