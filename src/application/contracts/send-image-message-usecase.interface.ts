import { SendImageMessageUseCaseInputDTO } from "../features/commands/baileys/send-Image-mesage/send-image-message.dto";

export interface SendImageMessageUseCaseInterface {
    execute(input: SendImageMessageUseCaseInputDTO): Promise<void>;
}