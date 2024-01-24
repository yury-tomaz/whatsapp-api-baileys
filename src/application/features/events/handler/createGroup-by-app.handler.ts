import EventHandlerInterface from "../../../../domain/events/event-handler.interface";
import { CreatedGroupEvent } from "../created-group.event";
import { logger } from "../../../../infrastructure/logger";
import { Baileys } from "../../../../domain/entities/baileys.entity";
import { BaileysRepository } from "../../../../infrastructure/persistence/repositories/baileys.repository";
import EventDispatcher from "../../../../domain/events/event-dispatcher";


export class CreateGroupByAppEventHandler implements EventHandlerInterface<CreatedGroupEvent>{
    private readonly repository = new BaileysRepository();

    constructor(repository: BaileysRepository) {
        this.repository = repository;
    }

    async handle(event: CreatedGroupEvent) {
        const { key, newChat } = event.eventData;

        try {
            const result = await this.repository.find(key);
            if (!result) return;

            let chat = result.chats;
            logger.info('Creating group');

            if (chat) {
                let group = {
                    id: newChat[0].id,
                    name: newChat[0].subject,
                    participant: newChat[0].participants,
                    messages: [],
                    creation: newChat[0].creation,
                    subjectOwner: newChat[0].subjectOwner,
                }

                chat.push(group);

                const baileys = new Baileys({
                    id: result.id,
                    key: result.key,
                    allowWebhook: result.allowWebhook,
                    heardEvents: result.heardEvents,
                    isWebhookBase64: result.isWebhookBase64,
                    markMessagesRead: result.markMessagesRead,
                    webhook: result.webhook,
                    apiKey: result.apiKey,
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt,
                    eventDispatcher: new EventDispatcher(),
                })

                baileys.chats = chat;

                await this.repository.update(baileys);
                logger.info('Group created');
            }

        } catch (err) {
            if(err) logger.error(err);

            logger.error('Error updating document failed')
        }
    }
}