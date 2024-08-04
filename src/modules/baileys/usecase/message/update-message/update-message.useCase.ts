import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import { getWhatsAppId } from '../../../helpers/get-whats-app-Id';
import { checkInstance } from '../../../helpers/check-Instance';
import UpdateTextMessageUseCaseDto from './update-message.usecase.dto';

export class UpdateTextMessageUseCase {
  constructor(private baileysManager: BaileysInstanceRepositoryInMemory) {}

  async execute(input: UpdateTextMessageUseCaseDto) {
    const result = await checkInstance(input.id, this.baileysManager);

    const sock = result.waSocket!;

    const whatsappId = getWhatsAppId(input.to);
    await result.verifyId(whatsappId);

    const key = {
      remoteJid: whatsappId,
      fromMe: input.key.fromMe,
      id: input.key.messageId,
    };

    await sock.sendMessage(whatsappId, {
      text: input.message,
      edit: key,
    });
  }
}
