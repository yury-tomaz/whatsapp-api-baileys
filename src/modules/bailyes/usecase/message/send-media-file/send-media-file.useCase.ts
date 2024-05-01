import {BaileysInstanceRepositoryInMemory} from "../../../repository/baileys-instance-repository-in-memory";
import {getWhatsAppId} from "../../../helpers/get-whats-app-Id";
import {checkInstance} from "../../../helpers/check-Instance";
import {
    SendMediaFileDto
} from "../../../../../../../application/abstractions/whatsapp-lib/whatsapp-lib.dto";


export class SendMediaFileUseCase {
    constructor(
        private baileysManager: BaileysInstanceRepositoryInMemory
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