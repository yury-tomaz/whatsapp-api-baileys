import { AppError } from "../../../../../domain/exceptions/app-error";
import { BaileysInstanceRepositoryInterface } from "../../../../../domain/repositories/baileys-instance.repository.interface";

interface SendTextMessageUseCaseInputDTO {
    key: string;
    to: string;
    message: string;
}

export class SendTextMessageUseCase {
    constructor(
        private readonly baileysInstanceRepository: BaileysInstanceRepositoryInterface
    ) { }

    async execute(input: SendTextMessageUseCaseInputDTO): Promise<void> {

        const result = await this.baileysInstanceRepository.find(input.key);

        if (!result) {
            throw new Error('Baileys instance not found');
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

        sock.sendMessage(input.to, {
            text: input.message
        });
    }

    private getWhatsAppId(id: string) {
        if (id.includes('@g.us') || id.includes('@s.whatsapp.net')) return id
        return id.includes('-') ? `${id}@g.us` : `${id}@s.whatsapp.net`
    }
}