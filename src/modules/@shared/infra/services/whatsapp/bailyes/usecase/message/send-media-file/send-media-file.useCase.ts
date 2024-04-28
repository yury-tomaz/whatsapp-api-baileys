import {SendMediaFileDto} from "./send-media-file.dto";
import {BaileysManager} from "../../../baileys-manager";
import {getWhatsAppId} from "../../../helpers/get-whats-app-Id";
import {checkInstance} from "../../../validate/check-Instance";


export class SendMediaFileUseCase {
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: SendMediaFileDto) {
        const result = await checkInstance(input.id, this.baileysManager)

        const sock = result.waSocket!

        const whatsappId = getWhatsAppId(input.to);
        await result.verifyId(whatsappId);


        await sock.sendMessage(whatsappId,
            // @ts-ignore
            {
                mimetype: input.file.mimetype,
                caption: input.caption ?? '',
                fileName: input.file.originalname,
                ptt: input.type === 'audio',
                [input.type]: input.file.buffer
            })
    }
}