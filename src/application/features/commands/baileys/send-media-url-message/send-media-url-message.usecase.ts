import { AppError } from "../../../../../domain/exceptions/app-error";
import { BaileysInstanceRepositoryInterface } from "../../../../../domain/repositories/baileys-instance.repository.interface";
import { SendMediaUrlMessageUseCaseInterface } from "../../../../contracts/send-media-url-message-usecase.interface";
import { SendMediaUrlMessageInputDTO } from "./send-media-url-message.dto";

type input = SendMediaUrlMessageInputDTO;

export class SendMediaUrlMessageUseCase implements SendMediaUrlMessageUseCaseInterface {
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

        await sock.sendMessage(
            this.getWhatsAppId(input.to),
            this.generateMediaOption(input)
        );
    }

    private getWhatsAppId(id: string) {
        if (id.includes('@g.us') || id.includes('@s.whatsapp.net')) return id
        return id.includes('-') ? `${id}@g.us` : `${id}@s.whatsapp.net`
    }

    private generateMediaOption(input: input) {

        switch (input.type) {
            case 'image':
                return {
                    image: {
                        url: input.url,
                    },
                    caption: input.caption ?? '',
                    mimetype: input.mimetype,
                }
            case 'video':
                return {
                    video: {
                        url: input.url,
                    },
                    caption: input.caption ?? '',
                    mimetype: input.mimetype,
                }
            case 'audio':
                return {
                    audio: {
                        url: input.url,
                    },
                    caption: input.caption ?? '',
                    mimetype: input.mimetype,
                }
            case 'document':
                return {
                    document: {
                        url: input.url,
                    },
                    caption: input.caption ?? '',
                    mimetype: input.mimetype,
                }
            default:
                throw new AppError({
                    message: "Invalid media type",
                    statusCode: 400,
                    isOperational: true
                });
        }


    }
}