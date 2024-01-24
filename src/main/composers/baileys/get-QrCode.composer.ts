import { getQrCodeUseCase } from "../../../application/features/queries/baileys/get-qrCode/get-qrCode.usecase";
import { BaileysInMemoryRepository } from "../../../infrastructure/persistence/repositories/baileys-in-memory.repository";
import { GetQrCodeController } from "../../../presentation/controllers/baileys/queries/get-QrCode.controller";


export const GetQrCodeComposer = () => {
    const repository = BaileysInMemoryRepository.getInstance();
    const usecase = new getQrCodeUseCase(repository);
    const controller = new GetQrCodeController(usecase);

    return controller;
}