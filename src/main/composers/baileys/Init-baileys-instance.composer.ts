import { InitBailesInstanceUseCase } from "../../../application/features/commands/baileys/init-baileys-instance/init-baileys-instance.usecase";
import { ConnectionUpdateHandler } from "../../../application/features/events/handler/connection-update.handler";
import { CreateGroupByAppEventHandler } from "../../../application/features/events/handler/createGroup-by-app.handler";
import { MessagesUpsertedEventHandler } from "../../../application/features/events/handler/messages-upsert.handler";
import { SendWebhookWhenBaileysIsUpdated } from "../../../application/features/events/handler/send-webhook-when-baileys-is-updated";
import { UpdateGroupParticipantsHandler } from "../../../application/features/events/handler/updateGroupParticipants.handler";
import { UpdateGroupSubjectEventHandler } from "../../../application/features/events/handler/updateGroupSubject.handler";
import EventDispatcher from "../../../domain/events/event-dispatcher";
import { BaileysInMemoryRepository } from "../../../infrastructure/persistence/repositories/baileys-in-memory.repository";
import { BaileysRepository } from "../../../infrastructure/persistence/repositories/baileys.repository";
import { InitBaileysInstanceController } from "../../../presentation/controllers/baileys/commands/init-baileys-instance.controller";

export const initBaileysInstanceComposer = () => {
    const repositoryInMemory = BaileysInMemoryRepository.getInstance();
    const repository = new BaileysRepository();
    const eventDispatcher = new EventDispatcher();

    eventDispatcher.register('ConnectionUpdateEvent', new ConnectionUpdateHandler(repository))
    eventDispatcher.register('CreatedGroupEvent', new CreateGroupByAppEventHandler(repository))
    eventDispatcher.register('MessagesUpsertedEvent', new MessagesUpsertedEventHandler())
    eventDispatcher.register('BaileysIsUpdatedEvent', new SendWebhookWhenBaileysIsUpdated())
    eventDispatcher.register('UpdateGroupParticipantsEvent', new UpdateGroupParticipantsHandler())
    eventDispatcher.register('UpdateGroupSubjectEvent', new UpdateGroupSubjectEventHandler(repository))
    
    const usecase = new InitBailesInstanceUseCase(repositoryInMemory, eventDispatcher);
    const controller = new InitBaileysInstanceController(usecase);

    return controller;
}