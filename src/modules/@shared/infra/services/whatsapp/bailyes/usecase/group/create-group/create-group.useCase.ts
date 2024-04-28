import {BaileysManager} from "../../../baileys-manager";
import {getWhatsAppId} from "../../../helpers/get-whats-app-Id";
import {checkInstance} from "../../../validate/check-Instance";
import { CreateGroupDto } from "./create-group.dto";


export class CreateGroupUseCase {
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: CreateGroupDto) {
        const result = await checkInstance(input.id, this.baileysManager)

        const sock = result.waSocket!
        
        sock.groupCreate(
          input.name,
          input.users.map(getWhatsAppId)
        )
    }
}