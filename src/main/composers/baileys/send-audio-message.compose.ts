
import { SendAudioMessageUseCase } from "../../../application/features/commands/baileys/send-audio-message/send-audio-message.usecase";
import { BaileysInMemoryRepository } from "../../../infrastructure/persistence/repositories/baileys-in-memory.repository";
import { SendAudioMessageController } from "../../../presentation/controllers/baileys/commands/send-audio-message.controller";

export const sendAudioMessageCompose = () => {
    const repositoryInMemory = BaileysInMemoryRepository.getInstance();
    const useCase = new SendAudioMessageUseCase(repositoryInMemory);
    const controller = new SendAudioMessageController(useCase);

    return controller;
};