import {BaileysManager} from "../../../baileys-manager";
import {getWhatsAppId} from "../../../helpers/get-whats-app-Id";
import {checkInstance} from "../../../validate/check-Instance";
import { InviteCodeGroupDto } from "./invite-code-group.dto";


export class InviteCodeGroupUseCase {
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: InviteCodeGroupDto) {
        const result = await checkInstance(input.id, this.baileysManager)

        const sock = result.waSocket!
        
        const whatsappId = getWhatsAppId(input.groupId);
        await result.verifyId(whatsappId);

        const response =  await sock.groupInviteCode(whatsappId);

        return response;
    }
}