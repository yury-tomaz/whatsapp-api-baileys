import EventInterface from "../../../domain/events/event.interface";

interface Props {
    key: string,
    type: string,
    body: any,
    webhook: string,
    apikey?: string,
}

export class BaileysIsUpdatedEvent implements EventInterface {
    dateTimeOccurred: Date;
    eventData: Props;

    constructor(eventData: Props) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }
}