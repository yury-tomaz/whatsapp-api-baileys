import {BaileysInstanceRepositoryInMemory} from "../../../repository/baileys-instance-repository-in-memory";
import {getWhatsAppId} from "../../../helpers/get-whats-app-Id";
import {checkInstance} from "../../../helpers/check-Instance";
import {SendTextMessageDto} from "../../../../../../../application/abstractions/whatsapp-lib/whatsapp-lib.dto";

export class SendTextMessageUseCase {
    constructor(
        private baileysManager: BaileysInstanceRepositoryInMemory
    ) {
    }

    async execute(input: SendTextMessageDto) {
        const result= await checkInstance(input.id, this.baileysManager)

        const sock = result.waSocket!

        const whatsappId = getWhatsAppId(input.to);
        await result.verifyId(whatsappId);

        await sock.sendMessage(whatsappId, {
            text: input.message
        });
    }
}