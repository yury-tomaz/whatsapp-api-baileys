import { SendMediaUrlMessageInputDTO } from "../features/commands/baileys/send-media-url-message/send-media-url-message.dto";

export interface SendMediaUrlMessageUseCaseInterface {
    execute(input: SendMediaUrlMessageInputDTO): Promise<void>;
}
