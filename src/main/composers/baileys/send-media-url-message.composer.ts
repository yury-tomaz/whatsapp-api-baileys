import { SendMediaUrlMessageUseCase } from "../../../application/features/commands/baileys/send-media-url-message/send-media-url-message.usecase";
import { BaileysInMemoryRepository } from "../../../infrastructure/persistence/repositories/baileys-in-memory.repository";
import { SendMediaUrlMessageController } from "../../../presentation/controllers/baileys/commands/send-media-url-message.controller";

export const sendMediaUrlMessageComposer = () => {
    const repositoryInMemory = BaileysInMemoryRepository.getInstance()
    const usecase = new SendMediaUrlMessageUseCase(repositoryInMemory);
    const controller = new SendMediaUrlMessageController(usecase);

    return controller;

}