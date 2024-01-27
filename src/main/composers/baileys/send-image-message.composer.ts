import { SendImageMessageUseCase } from "../../../application/features/commands/baileys/send-Image-mesage/send-image-message.usecase";
import { BaileysInMemoryRepository } from "../../../infrastructure/persistence/repositories/baileys-in-memory.repository";
import { SendImageMessageUseCaseController } from "../../../presentation/controllers/baileys/commands/send-image-message.controller";


export const sendImageMessageComposer = () => {
    const repositoryInMemory = BaileysInMemoryRepository.getInstance();
    const useCase = new SendImageMessageUseCase(repositoryInMemory);
    const controller = new SendImageMessageUseCaseController(useCase);

    return controller;
}