import EventInterface from "../../../domain/events/event.interface";
import { GroupMetadata } from "@whiskeysockets/baileys";

interface Props {
    key: string;
    newChat: GroupMetadata[];
}

export class CreatedGroupEvent implements EventInterface {
    dateTimeOccurred: Date;
    eventData: Props;

    constructor(eventData: Props) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }
}