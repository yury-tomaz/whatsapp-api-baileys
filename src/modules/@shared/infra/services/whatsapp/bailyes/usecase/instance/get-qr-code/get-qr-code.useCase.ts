import {BaileysManager} from "../../../baileys-manager";
import {checkInstance} from "../../../validate/check-Instance";

interface GetQrCodeUseCaseDTO{
    id: string
}
export class GetQrCodeUseCase{
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: GetQrCodeUseCaseDTO){
        const result = await checkInstance(input.id, this.baileysManager)

        return result.qr;
    }
}