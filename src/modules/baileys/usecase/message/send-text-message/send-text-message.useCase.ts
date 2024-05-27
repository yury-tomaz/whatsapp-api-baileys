import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import { getWhatsAppId } from '../../../helpers/get-whats-app-Id';
import { checkInstance } from '../../../helpers/check-Instance';
import SendTextMessageUseCaseDto  from './send-text-message.dto';
import { AppError, HttpCode } from '../../../../@shared/domain/exceptions/app-error';

export class SendTextMessageUseCase {
  constructor(private baileysManager: BaileysInstanceRepositoryInMemory) {}

  async execute(input: SendTextMessageUseCaseDto) {
    const result = await checkInstance(input.id, this.baileysManager);

    if (!result.isOn){
      throw new AppError({
        message: 'Baileys instance offline, please start the instance again',
        statusCode: HttpCode['NOT_FOUND'],
        isOperational: true,
      });
    }

    const sock = result.waSocket!;

    const whatsappId = getWhatsAppId(input.to);
    await result.verifyId(whatsappId);

    await sock.sendMessage(whatsappId, {
      text: input.message,
    });
  }
}
