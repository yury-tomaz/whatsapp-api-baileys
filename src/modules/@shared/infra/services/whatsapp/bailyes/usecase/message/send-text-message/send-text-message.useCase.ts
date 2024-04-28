import {SendTextMessageUseCaseInputDTO} from "./send-text-message.dto";
import {BaileysManager} from "../../../baileys-manager";
import {getWhatsAppId} from "../../../helpers/get-whats-app-Id";
import {checkInstance} from "../../../validate/check-Instance";

export class SendTextMessageUseCase {
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: SendTextMessageUseCaseInputDTO) {
        const result= await checkInstance(input.id, this.baileysManager)

        const sock = result.waSocket!

        const whatsappId = getWhatsAppId(input.to);
        await result.verifyId(whatsappId);

        await sock.sendMessage(whatsappId, {
            text: input.message
        });
    }
}