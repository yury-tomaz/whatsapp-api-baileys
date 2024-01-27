import {
    InitBailesInstanceUseCaseOutputDTO,
    InitBaileysInstanceUseCaseInputDTO
} from "../features/commands/baileys/init-baileys-instance/init-baileys-instance.dto";

export interface InitBailesInstanceUseCaseInterface {
    execute(input: InitBaileysInstanceUseCaseInputDTO): Promise<InitBailesInstanceUseCaseOutputDTO>;
}