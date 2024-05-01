import {BaileysInstanceRepositoryInMemory} from "../../../repository/baileys-instance-repository-in-memory";
import {checkInstance} from "../../../helpers/check-Instance";
import {GetQrCodeUseCaseDTO} from "./get-qr-code.usecase.dto";

export class GetQrCodeUsecase {
    constructor(
        private baileysManager: BaileysInstanceRepositoryInMemory
    ) {
    }

    async execute(input: GetQrCodeUseCaseDTO){
        const result = await checkInstance(input.id, this.baileysManager)

        return result.qr;
    }
}