import EventHandlerInterface from "../../../../domain/events/event-handler.interface";
import { UpdateGroupParticipantsEvent } from "../update-group-participants.event";
import { BaileysRepository } from "../../../../infrastructure/persistence/repositories/baileys.repository";
import { logger } from "../../../../infrastructure/logger";

export class UpdateGroupParticipantsHandler implements EventHandlerInterface<UpdateGroupParticipantsEvent>{
    private readonly repository = new BaileysRepository();

    async handle(event: UpdateGroupParticipantsEvent) {

        const { key, newChat } = event.eventData;
        try {

            const result = await this.repository.find(key);

            if (!result) return;
            let chat = result.chats;

            const index = chat.find((c: any) => c.id === newChat.id);
            let is_owner = false;

            if (index) {
                if (!index.participant) index.participant = [];
                if (index.participant && newChat.action == 'add') {
                    for (const participant of newChat.participants) {
                        index.participant.push({
                            id: participant,
                            admin: null,
                        })
                    }
                }

                if (index.participant && newChat.action == 'remove') {
                    for (const participant of newChat.participants) {
                        // remove group if they are owner
                        if (index.subjectOwner == participant) {
                            is_owner = true
                        }
                        index.participant = index.participant.filter(
                            (p: any) => p.id != participant
                        )
                    }
                }

                if (index.participant && newChat.action == 'demote') {
                    for (const participant of newChat.participants) {
                        if (
                            index.participant.filter(
                                (p: any) => p.id == participant
                            )[0]
                        ) {
                            index.participant.filter(
                                (p: any) => p.id == participant
                            )[0].admin = null
                        }
                    }
                }

                if (index.participant && newChat.action == 'promote') {
                    for (const participant of newChat.participants) {
                        if (
                            index.participant.filter(
                                (p: any) => p.id == participant
                            )[0]
                        ) {
                            index.participant.filter(
                                (p: any) => p.id == participant
                            )[0].admin = 'superadmin'
                        }
                    }
                }

                if (is_owner) {
                    chat = chat.filter((c: any) => c.id !== newChat.id)
                } else {
                    chat.filter((c: any) => c.id === newChat.id)[0] = chat
                }

                result.chats = chat;
                await this.repository.update(result);
            }

        } catch (err) {
            if (err) logger.error(err)
            logger.error('Error updating document failed')
        }
    }

}