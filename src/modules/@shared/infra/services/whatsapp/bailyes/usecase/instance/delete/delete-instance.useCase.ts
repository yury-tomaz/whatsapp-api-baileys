import {BaileysManager} from "../../../baileys-manager";

interface DeleteInstanceUseCaseDTO{
    id: string
}
export class DeleteInstanceUseCase{
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: DeleteInstanceUseCaseDTO){
       return  await this.baileysManager.delete(input.id)
    }
}