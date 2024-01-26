import { SendVideoMessageUseCaseInputDTO } from "../features/commands/baileys/send-video-message/send-video-message.dto";

export interface SendVideoMessageUseCaseInterface {
    execute(input: SendVideoMessageUseCaseInputDTO): Promise<void>;
}
