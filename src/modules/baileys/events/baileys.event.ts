import EventInterface from '../../@shared/domain/events/event.interface';

export class BaileysEvent implements  EventInterface{
  dateTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}