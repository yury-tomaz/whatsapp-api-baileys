import { Baileys } from "../../../domain/entities/baileys.entity";
import EventInterface from "../../../domain/events/event.interface";

interface Props {
    connection: string | undefined,
    lastDisconnect: { error: Error | undefined; date: Date } | undefined,
    qr: string | undefined,
    baileys: Baileys,
}

export class ConnectionUpdateEvent implements EventInterface {
    dateTimeOccurred: Date;
    eventData: Props;

    constructor(eventData: Props) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }
}