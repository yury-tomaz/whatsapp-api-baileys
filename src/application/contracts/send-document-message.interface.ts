import { SendDocumentMessageUseCaseInputDTO } from "../features/commands/baileys/send-document-message/send-document-message.dto";

export interface SendDocumentMessageUseCaseInterface {
    execute(input: SendDocumentMessageUseCaseInputDTO): Promise<void>;
}