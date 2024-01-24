import EventInterface from "../../../domain/events/event.interface";
import { GroupMetadata, ParticipantAction } from "@whiskeysockets/baileys";

interface GroupParticipantsUpdateType {
    id: string;
    participants: string[];
    action: ParticipantAction;
  }

interface Props {
    key: string;
    newChat: GroupParticipantsUpdateType;
}

export class UpdateGroupParticipantsEvent implements EventInterface {
    dateTimeOccurred: Date;
    eventData: Props;

    constructor(eventData: Props) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }
}