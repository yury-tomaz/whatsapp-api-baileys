import { AppError, HttpCode } from "../../../../../domain/exceptions/app-error";
import { BaileysInstanceRepositoryInterface } from "../../../../../domain/repositories/baileys-instance.repository.interface";
import { GetQrCodeUseCaseInputDTO, GetQrCodeUseCaseInterface } from "../../../../contracts/get-QRcode-usecase.interface";

export class getQrCodeUseCase implements GetQrCodeUseCaseInterface {
    constructor(
        private readonly baileysInstanceRepository: BaileysInstanceRepositoryInterface
    ) { }

    async execute(input: GetQrCodeUseCaseInputDTO): Promise<{ qrCode: string }> {

        const result = await this.baileysInstanceRepository.find(input.key);

        if (!result) {
            throw new AppError({
                message: `Baileys instance with key ${input.key} not found`,
                statusCode: HttpCode['NOT_FOUND'],
                isOperational: true
            })
        }

        if (!result.qrCode) {
            throw new AppError({
                message: 'Baileys instance not initialized',
                statusCode: HttpCode['NO_CONTENT'],
                isOperational: true
            })
        }

        return {
            qrCode: result.qrCode,
        }
    }
}