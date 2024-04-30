import {BaileysManager} from "../../../baileys-manager";
import {getWhatsAppId} from "../../../helpers/get-whats-app-Id";
import {checkInstance} from "../../../validate/check-Instance";
import { AcceptInviteGroupDto } from "./accept-invite-group.dto";

export class AcceptInviteGroupUseCase {
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: AcceptInviteGroupDto) {
        const result = await checkInstance(input.id, this.baileysManager)

        const sock = result.waSocket!
        
        const response =  await sock.groupAcceptInvite(input.codeGroup);

        return response;
    }
}