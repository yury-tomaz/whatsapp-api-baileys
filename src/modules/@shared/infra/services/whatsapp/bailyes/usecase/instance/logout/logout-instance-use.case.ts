import {BaileysManager} from "../../../baileys-manager";
import {checkInstance} from "../../../validate/check-Instance";

export class LogoutInstanceUseCase {
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(id: string){
        const result = await checkInstance(id, this.baileysManager);

        const sock = result.waSocket!

        await sock.logout()
    }
}