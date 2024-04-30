import {BaileysManager} from "../../../baileys-manager";
import {getWhatsAppId} from "../../../helpers/get-whats-app-Id";
import {checkInstance} from "../../../validate/check-Instance";
import { UpdateSubjectGroupDto } from "./update-subject-group.dto";


export class UpdateSubjectGroupUseCase {
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: UpdateSubjectGroupDto) {
        const result = await checkInstance(input.id, this.baileysManager)

        const sock = result.waSocket!
        
        const whatsappId = getWhatsAppId(input.groupId);
        await result.verifyId(whatsappId);

        const response =  await sock.groupUpdateSubject(
          whatsappId,
          input.subject
        )

        return response;
    }
}