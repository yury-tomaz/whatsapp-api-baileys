import {BaileysInstanceRepositoryInMemory} from "../../../repository/baileys-instance-repository-in-memory";
import {checkInstance} from "../../../helpers/check-Instance";
import {logoutInstanceDto} from "../../../../../../../application/abstractions/whatsapp-lib/whatsapp-lib.dto";

export class LogoutInstanceUseCase {
    constructor(
        private baileysManager: BaileysInstanceRepositoryInMemory
    ) {
    }

    async execute(input: logoutInstanceDto){
        const result = await checkInstance(input.id, this.baileysManager);

        const sock = result.waSocket!

        await sock.logout()
    }
}