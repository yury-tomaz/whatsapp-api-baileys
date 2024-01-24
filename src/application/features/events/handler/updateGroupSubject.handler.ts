import EventHandlerInterface from "../../../../domain/events/event-handler.interface";
import { UpdateGroupSubjectEvent } from "../update-group-subject.event";
import { BaileysRepository } from "../../../../infrastructure/persistence/repositories/baileys.repository";
import { logger } from "../../../../infrastructure/logger";


export class UpdateGroupSubjectEventHandler implements EventHandlerInterface<UpdateGroupSubjectEvent>{

    private readonly repository: BaileysRepository;

    constructor(repository: BaileysRepository) {
        this.repository = repository;
    }

    async handle(event: UpdateGroupSubjectEvent) {
        const { key, newChat } = event.eventData;

        try {
            if (newChat[0] && newChat[0].subject) {
                console.log('Updating group subject');

                const result = await this.repository.find(key);
                if (!result) return;
                let chat = result.chats

                chat.find((c: any) => c.id === newChat[0].id).name = newChat[0].subject;

                result.chats = chat;

                await this.repository.update(result);
            }

        } catch (err) {
            if (err) logger.error(err)
            logger.error('Error updating document failed')
        }
    }
}