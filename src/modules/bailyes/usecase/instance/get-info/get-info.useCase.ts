import {BaileysInstanceRepositoryInMemory} from "../../../repository/baileys-instance-repository-in-memory";
import {checkInstance} from "../../../helpers/check-Instance";
import {InfoInstanceDto} from "../../../../../../../application/abstractions/whatsapp-lib/whatsapp-lib.dto";

export class GetInfoUseCase{
    constructor(
        private baileysManager: BaileysInstanceRepositoryInMemory
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