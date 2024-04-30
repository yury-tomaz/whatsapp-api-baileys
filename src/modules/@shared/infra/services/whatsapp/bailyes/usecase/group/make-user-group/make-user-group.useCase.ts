import {BaileysManager} from "../../../baileys-manager";
import {getWhatsAppId} from "../../../helpers/get-whats-app-Id";
import {checkInstance} from "../../../validate/check-Instance";
import { MakeUserGroupDto } from "./make-user-group.dto";


export class MakeUserGroupUseCase {
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: MakeUserGroupDto) {
        const result = await checkInstance(input.id, this.baileysManager)

        const sock = result.waSocket!

        await sock.groupParticipantsUpdate(
          result.id.id, 
          input.users.map(getWhatsAppId), 
          input.type
        )
    }
}