import {BaileysInstanceRepositoryInMemory} from "../../../repository/baileys-instance-repository-in-memory";
import {checkInstance} from "../../../helpers/check-Instance";
import {qrInstanceDto} from "../../../../../../../application/abstractions/whatsapp-lib/whatsapp-lib.dto";


export class GetQrCodeUseCase{
    constructor(
        private baileysManager: BaileysInstanceRepositoryInMemory
    ) {
    }

    async execute(input: qrInstanceDto){
        const result = await checkInstance(input.id, this.baileysManager)

        return result.qr;
    }
}