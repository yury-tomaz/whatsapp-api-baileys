import {BaileysManager} from "../../../baileys-manager";
import {checkInstance} from "../../../validate/check-Instance";
import {qrInstanceDto} from "../../../../../../../application/abstractions/whatsapp-lib/whatsapp-lib.dto";


export class GetQrCodeUseCase{
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: qrInstanceDto){
        const result = await checkInstance(input.id, this.baileysManager)

        return result.qr;
    }
}