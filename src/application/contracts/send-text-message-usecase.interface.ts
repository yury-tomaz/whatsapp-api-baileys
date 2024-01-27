import { SendTextMessageUseCaseInputDTO } from "../features/commands/baileys/send-text-message/send-text-message.dto";

export interface SendTextMessageUseCaseInterface {
    execute(input: SendTextMessageUseCaseInputDTO): Promise<void>;
}