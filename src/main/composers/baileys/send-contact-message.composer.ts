import { SendContactMessageUseCase } from "../../../application/features/commands/baileys/send-contact-message/send-contact-message.usecase";
import { BaileysInMemoryRepository } from "../../../infrastructure/persistence/repositories/baileys-in-memory.repository";
import { SendContactMessageController } from "../../../presentation/controllers/baileys/commands/send-contact-message.controller";


export const sendContactMessageComposer = () => {
    const repositoryInMemory = BaileysInMemoryRepository.getInstance();
    const usecase = new SendContactMessageUseCase(repositoryInMemory);
    const controller = new SendContactMessageController(usecase);

    return controller;
}