import { AppError } from "../../../../../domain/exceptions/app-error";
import { BaileysInstanceRepositoryInterface } from "../../../../../domain/repositories/baileys-instance.repository.interface";
import { SendTextMessageUseCaseInterface } from "../../../../contracts/send-text-message-usecase.interface";

export interface SendTextMessageUseCaseInputDTO {
    key: string;
    to: string;
    message: string;
}

type input = SendTextMessageUseCaseInputDTO;

export class SendTextMessageUseCase implements SendTextMessageUseCaseInterface {
    constructor(
        private readonly baileysInstanceRepository: BaileysInstanceRepositoryInterface
    ) { }

    async execute(input: input): Promise<void> {

        const result = await this.baileysInstanceRepository.find(input.key);

        if (!result) {
            throw new AppError({
        }

        if (!result.waSocket) {
            throw new AppError({
                message: 'Baileys instance not initialized',
                statusCode: 204,
                isOperational: true
            });
        }

        const sock = result.waSocket;

        await result.verifyId(this.getWhatsAppId(input.to));

        await sock.sendMessage( this.getWhatsAppId(input.to), {
            text: input.message
        });
    }

    private getWhatsAppId(id: string) {
        if (id.includes('@g.us') || id.includes('@s.whatsapp.net')) return id
        return id.includes('-') ? `${id}@g.us` : `${id}@s.whatsapp.net`
    }
}