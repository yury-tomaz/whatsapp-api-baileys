import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import { getWhatsAppId } from '../../../helpers/get-whats-app-Id';
import { checkInstance } from '../../../helpers/check-Instance';
import { SendListMessageUseCaseDto } from './send-list-message.dto';

export class SendListMessageUseCase {
  constructor(private baileysManager: BaileysInstanceRepositoryInMemory) {}

  async execute(input: SendListMessageUseCaseDto) {
    const result = await checkInstance(input.id, this.baileysManager);

    const sock = result.waSocket!;

    const whatsappId = getWhatsAppId(input.to);
    await result.verifyId(whatsappId);

    const response = await sock.sendMessage(whatsappId, {
      text: input.text,
      buttonText: input.buttonText,
      footer: input.description,
      title: input.title,
      sections: input.sections,
      viewOnce: true,
    });

    return response;
  }
}
