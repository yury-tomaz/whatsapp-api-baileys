import {BaileysManager} from "../../../baileys-manager";
import {DeleteInstanceDto} from "../../../../../../../application/abstractions/whatsapp-lib/whatsapp-lib.dto";


export class DeleteInstanceUseCase{
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: DeleteInstanceDto){
       return  await this.baileysManager.delete(input.id)
    }
}