import { SendContactMessageUseCaseInputDTO } from "../features/commands/baileys/send-contact-message/send-contact-message.dto";

export interface SendContactMessageUseCaseInterface {
    execute(input: SendContactMessageUseCaseInputDTO): Promise<void>;
}
