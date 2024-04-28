import {BaileysManager} from "../../../baileys-manager";
import {SendMediaUrlMessageInputDTO} from "./send-url-media-file.dto";
import {getWhatsAppId} from "../../../helpers/get-whats-app-Id";
import {checkInstance} from "../../../validate/check-Instance";

export class SendUrlMediaFileUseCase {
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: SendMediaUrlMessageInputDTO) {
        const result = await checkInstance(input.id, this.baileysManager)

        const sock = result.waSocket!

        const whatsappId = getWhatsAppId(input.to);
        await result.verifyId(whatsappId);

        await sock.sendMessage(whatsappId,
            // @ts-ignore
            {
                [input.type]: {
                    url: input.url,
                },
                caption: input.caption,
                mimetype: input.mimetype,
            })

    }
}