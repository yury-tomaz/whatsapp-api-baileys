import { sendAudioMessageUseCaseInputDTO } from "../features/commands/baileys/send-audio-message/send-audio-message.dto";

export interface sendAudioMessageUseCaseInterface{
    execute(input: sendAudioMessageUseCaseInputDTO): Promise<void>;
}