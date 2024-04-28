import {BaileysManager} from "../../../baileys-manager";
import { getWhatsAppId } from "../../../helpers/get-whats-app-Id";
import {checkInstance} from "../../../validate/check-Instance";
import { LeaveGroupDto } from "./leave-group.dto";


export class LeaveGroupUseCase {
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: LeaveGroupDto) {
        const result = await checkInstance(input.id, this.baileysManager)

        const sock = result.waSocket!

        const whatsappId = getWhatsAppId(input.groupId);
        await result.verifyId(whatsappId);
        
        await sock.groupLeave(whatsappId);
    }
}