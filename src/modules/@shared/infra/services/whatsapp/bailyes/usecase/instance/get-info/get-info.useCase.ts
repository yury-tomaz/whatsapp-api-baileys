import {BaileysManager} from "../../../baileys-manager";
import {checkInstance} from "../../../validate/check-Instance";

interface GetInfoUseCaseDTO{
    id: string
}
export class GetInfoUseCase{
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: GetInfoUseCaseDTO){
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