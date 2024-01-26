import { SendVideoMessageUseCase } from "../../../application/features/commands/baileys/send-video-message/send-video-message.usecase"
import { BaileysInMemoryRepository } from "../../../infrastructure/persistence/repositories/baileys-in-memory.repository";
import { SendVideoMessageController } from "../../../presentation/controllers/baileys/commands/send-video-message.controller";


export const sendVideoMessageComposer = () => {
    const repository = BaileysInMemoryRepository.getInstance();
    const useCase = new SendVideoMessageUseCase(repository);
    const controller = new SendVideoMessageController(useCase);

    return controller;
}