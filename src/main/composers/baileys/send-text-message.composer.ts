import { SendTextMessageUseCase } from "../../../application/features/commands/baileys/send-text-message/send-text-message.usecase";
import { BaileysInMemoryRepository } from "../../../infrastructure/persistence/repositories/baileys-in-memory.repository";
import { SendTextMessageController } from "../../../presentation/controllers/baileys/commands/send-text-message.controller";


export const sendTextMessageCompose =  () => {
    const repository = BaileysInMemoryRepository.getInstance();
    const usecase = new SendTextMessageUseCase(repository);
    const controller = new SendTextMessageController(usecase);

    return controller;
}