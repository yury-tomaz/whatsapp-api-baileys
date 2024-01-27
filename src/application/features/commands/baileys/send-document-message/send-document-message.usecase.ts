import { AppError } from "../../../../../domain/exceptions/app-error";
import { BaileysInstanceRepositoryInterface } from "../../../../../domain/repositories/baileys-instance.repository.interface";
import { SendDocumentMessageUseCaseInterface } from "../../../../contracts/send-document-message.interface";
import { SendDocumentMessageUseCaseInputDTO } from "./send-document-message.dto";

type input = SendDocumentMessageUseCaseInputDTO;

export class SendDocumentMessageUseCase implements SendDocumentMessageUseCaseInterface {
    constructor(
        private readonly baileysInstanceRepository: BaileysInstanceRepositoryInterface
    ) { }

    async execute(input: input): Promise<void> {
        const result = await this.baileysInstanceRepository.find(input.key);

        if (!result || !result.waSocket) {
            throw new AppError({
                message: "Baileys instance not found or not initialized",
                statusCode: 204,
                isOperational: true
            });
        }

        const sock = result.waSocket;
        await result.verifyId(this.getWhatsAppId(input.to));

        await sock.sendMessage(this.getWhatsAppId(input.to), {
            mimetype: input.file.mimetype,
            document: input.file.buffer,
            caption: input.caption ?? '',
            fileName: input.file.originalname
        });

    }

    private getWhatsAppId(id: string) {
        if (id.includes('@g.us') || id.includes('@s.whatsapp.net')) return id
        return id.includes('-') ? `${id}@g.us` : `${id}@s.whatsapp.net`
    }
}
