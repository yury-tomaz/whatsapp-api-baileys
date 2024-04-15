import { SendDocumentMessageUseCase } from "../../../application/features/commands/baileys/send-document-message/send-document-message.usecase";
import { BaileysInMemoryRepository } from "../../../infrastructure/persistence/repositories/baileys-in-memory.repository";
import { SendDocumentMessageController } from "../../../presentation/controllers/baileys/commands/send-document-message.composer";

export const sendDocumentMessageComposer = () => {
    const repositoryInMemory = BaileysInMemoryRepository.getInstance();
    const usecase = new SendDocumentMessageUseCase(repositoryInMemory);
    const controller = new SendDocumentMessageController(usecase);

    return controller;
}