import {BaileysManager} from "../baileys-manager";
import {AppError, HttpCode} from "../../../../../domain/exceptions/app-error";

export const checkInstance = async (id: string, baileysManager: BaileysManager) =>{
    const instance = await baileysManager.find(id);

    if (!instance) {
        throw new AppError({
            message: 'Baileys instance not found',
            statusCode: HttpCode['NOT_FOUND'],
            isOperational: true
        });
    }

    if (!instance.waSocket) {
        throw new AppError({
            message: 'Baileys instance not initialized',
            statusCode: HttpCode['NO_CONTENT'],
            isOperational: true
        });
    }

    return instance
}