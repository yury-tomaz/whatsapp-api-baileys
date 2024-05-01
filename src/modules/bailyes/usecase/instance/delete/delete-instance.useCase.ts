import {BaileysInstanceRepositoryInMemory} from "../../../repository/baileys-instance-repository-in-memory";
import {DeleteInstanceDto} from "../../../../../../../application/abstractions/whatsapp-lib/whatsapp-lib.dto";


export class DeleteInstanceUseCase{
    constructor(
        private baileysManager: BaileysInstanceRepositoryInMemory
    ) {
    }

    async execute(input: DeleteInstanceDto){
       return  await this.baileysManager.delete(input.id)
    }
}