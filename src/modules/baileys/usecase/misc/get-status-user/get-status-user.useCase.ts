import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import { getWhatsAppId } from '../../../helpers/get-whats-app-Id';
import { checkInstance } from '../../../helpers/check-Instance';
import { GetUserStatusDto } from './get-status-user.dto';

export class GetUserStatusUseCase {
  constructor(private baileysManager: BaileysInstanceRepositoryInMemory) {}

  async execute(input: GetUserStatusDto) {
    const result = await checkInstance(input.id, this.baileysManager);

    const sock = result.waSocket!;

    const whatsappId = getWhatsAppId(input.to);
    await result.verifyId(whatsappId);

    const response = await sock.fetchStatus(whatsappId);

    return response;
  }
}
