import { BaileysInstanceRepositoryInMemory } from '../repository/baileys-instance-repository-in-memory';
import { AppError, HttpCode } from '../../@shared/domain/exceptions/app-error';

export const checkInstance = async (
  id: string,
  baileysManager: BaileysInstanceRepositoryInMemory,
) => {
  const instance = await baileysManager.find(id);

  if (!instance) {
    throw new AppError({
      message: 'Baileys instance not found',
      statusCode: HttpCode['NOT_FOUND'],
      isOperational: true,
    });
  }

  if (!instance.waSocket) {
    throw new AppError({
      message: 'Baileys instance not initialized',
      statusCode: HttpCode['NOT_FOUND'],
      isOperational: true,
    });
  }


  return instance;
};
