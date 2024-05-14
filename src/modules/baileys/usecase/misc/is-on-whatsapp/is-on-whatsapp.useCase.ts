import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import { getWhatsAppId } from '../../../helpers/get-whats-app-Id';
import { checkInstance } from '../../../helpers/check-Instance';
import { IsOnWhatsappDto } from './is-on-whatsapp.dto';

export class IsOnWhatsappUseCase {
  constructor(private baileysManager: BaileysInstanceRepositoryInMemory) {}

  async execute(input: IsOnWhatsappDto) {
    const result = await checkInstance(input.id, this.baileysManager);

    const sock = result.waSocket!;

    const whatsappId = getWhatsAppId(input.to);
    await result.verifyId(whatsappId);

    const response = await sock.onWhatsApp(whatsappId);

    return response;
  }
}
