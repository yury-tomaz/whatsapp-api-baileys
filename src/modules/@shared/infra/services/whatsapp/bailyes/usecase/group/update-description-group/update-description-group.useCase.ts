import {BaileysManager} from "../../../baileys-manager";
import {getWhatsAppId} from "../../../helpers/get-whats-app-Id";
import {checkInstance} from "../../../validate/check-Instance";
import { UpdateDescriptionGroupDto } from "./update-description-group.dto";


export class UpdateDescriptionGroupUseCase {
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: UpdateDescriptionGroupDto) {
        const result = await checkInstance(input.id, this.baileysManager)

        const sock = result.waSocket!
        
        const whatsappId = getWhatsAppId(input.groupId);
        await result.verifyId(whatsappId);

        const response =  await sock.groupUpdateDescription(
          whatsappId,
          input.description
        )

        return response;
    }
}