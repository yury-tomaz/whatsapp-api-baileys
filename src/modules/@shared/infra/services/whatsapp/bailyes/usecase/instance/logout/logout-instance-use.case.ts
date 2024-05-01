import {BaileysManager} from "../../../baileys-manager";
import {checkInstance} from "../../../validate/check-Instance";
import {logoutInstanceDto} from "../../../../../../../application/abstractions/whatsapp-lib/whatsapp-lib.dto";

export class LogoutInstanceUseCase {
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: logoutInstanceDto){
        const result = await checkInstance(input.id, this.baileysManager);

        const sock = result.waSocket!

        await sock.logout()
    }
}