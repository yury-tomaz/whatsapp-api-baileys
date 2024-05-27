import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import { getWhatsAppId } from '../../../helpers/get-whats-app-Id';
import { checkInstance } from '../../../helpers/check-Instance';
import SendMediaFileUseCaseDto  from './send-media-file.usecase.dto';
import { AppError, HttpCode } from '../../../../@shared/domain/exceptions/app-error';

export class SendMediaFileUseCase {
  constructor(private baileysManager: BaileysInstanceRepositoryInMemory) {}

  async execute(input: SendMediaFileUseCaseDto) {
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

    await sock.sendMessage(
      whatsappId,
      // @ts-ignore
      {
        mimetype: input.file.mimetype,
        caption: input.caption ?? '',
        fileName: input.file.originalname,
        ptt: input.type === 'audio',
        [input.type]: input.file.buffer,
      },
    );
  }
}
