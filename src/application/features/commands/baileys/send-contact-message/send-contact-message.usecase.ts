import { AppError } from "../../../../../domain/exceptions/app-error";
import { BaileysInstanceRepositoryInterface } from "../../../../../domain/repositories/baileys-instance.repository.interface";
import { SendContactMessageUseCaseInterface } from "../../../../contracts/send-contact-message-usecase.Interface";
import { generateVC } from "../../../../helper/genCv";
import { SendContactMessageUseCaseInputDTO } from "./send-contact-message.dto";

type input = SendContactMessageUseCaseInputDTO;


export class SendContactMessageUseCase implements SendContactMessageUseCaseInterface {
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
        const vcard = generateVC(input.vcard);

        await sock.sendMessage(this.getWhatsAppId(input.to), {
            contacts: {
                displayName: input.vcard.fullName,
                contacts: [{ displayName: input.vcard.fullName, vcard: vcard }]
            }
        });
    }

    private getWhatsAppId(id: string): string {
        if (id.includes('@g.us') || id.includes('@s.whatsapp.net')) return id
        return id.includes('-') ? `${id}@g.us` : `${id}@s.whatsapp.net`
    }
}