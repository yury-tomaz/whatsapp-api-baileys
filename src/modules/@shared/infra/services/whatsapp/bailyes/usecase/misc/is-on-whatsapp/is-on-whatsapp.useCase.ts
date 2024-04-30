import {BaileysManager} from "../../../baileys-manager";
import {getWhatsAppId} from "../../../helpers/get-whats-app-Id";
import {checkInstance} from "../../../validate/check-Instance";
import { IsOnWhatsappDto } from "./is-on-whatsapp.dto";

export class IsOnWhatsappUseCase {
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: IsOnWhatsappDto) {
        const result = await checkInstance(input.id, this.baileysManager)

        const sock = result.waSocket!

        const whatsappId = getWhatsAppId(input.to);
        await result.verifyId(whatsappId);
        
        const response =  await sock.onWhatsApp(whatsappId)

        return response;
    }
}