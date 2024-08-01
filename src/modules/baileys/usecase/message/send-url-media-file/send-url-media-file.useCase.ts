import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import { getWhatsAppId } from '../../../helpers/get-whats-app-Id';
import { checkInstance } from '../../../helpers/check-Instance';
import SendUrlMediaFileUseCaseDto from './send-url-media-file.usecase.dto';
import {
  AppError,
  HttpCode,
} from '../../../../@shared/domain/exceptions/app-error';

export class SendUrlMediaFileUseCase {
  constructor(private baileysManager: BaileysInstanceRepositoryInMemory) {}

  async execute(input: SendUrlMediaFileUseCaseDto) {
    const result = await checkInstance(input.id, this.baileysManager);

    if (!result.isOn) {
      throw new AppError({
        message: 'Baileys instance offline, please start the instance again',
        statusCode: HttpCode['NOT_FOUND'],
        isOperational: true,
      });
    }

    const sock = result.waSocket!;

    const whatsappId = getWhatsAppId(input.to);
    await result.verifyId(whatsappId);

    await sock.sendMessage(
      whatsappId,
      // @ts-ignore
      {
        [input.type]: {
          url: input.url,
        },
        caption: input.caption,
        mimetype: input.mimetype,
      },
    );
  }
}
