import {BaileysManager} from "../../../baileys-manager";
import {checkInstance} from "../../../validate/check-Instance";
import {InfoInstanceDto} from "../../../../../../../application/abstractions/whatsapp-lib/whatsapp-lib.dto";

export class GetInfoUseCase{
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: InfoInstanceDto){
        const result = await checkInstance(input.id, this.baileysManager)

        const sock = result.waSocket!
        
        return {
            id: result.id,
            isOn: result.isOn,
            qrRetry: result.qrRetry,
            user: result.isOn ? sock.user : {}
        }
    }
}