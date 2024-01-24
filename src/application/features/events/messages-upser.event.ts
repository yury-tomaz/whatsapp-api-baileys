import { Baileys } from "../../../domain/entities/baileys.entity";
import EventInterface from "../../../domain/events/event.interface";
import { MessageUpsertType, proto } from "@whiskeysockets/baileys";

interface Props {
    messages: proto.IWebMessageInfo[];
    type: MessageUpsertType;
    baileys: Baileys;
}

export class MessagesUpsertedEvent implements EventInterface {
    dateTimeOccurred: Date;
    eventData: Props;

    constructor(eventData: Props) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }
}