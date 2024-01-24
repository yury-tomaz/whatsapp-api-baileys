import EventInterface from "../../../domain/events/event.interface";
import { GroupMetadata } from "@whiskeysockets/baileys";

export interface Props {
    key: string;
    newChat: Partial<GroupMetadata>[];
}

export class UpdateGroupSubjectEvent implements EventInterface {
    dateTimeOccurred: Date;
    eventData: Props;

    constructor(eventData: Props) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }
}