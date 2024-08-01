import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import { getWhatsAppId } from '../../../helpers/get-whats-app-Id';
import { checkInstance } from '../../../helpers/check-Instance';
import MakeUserGroupDto from './make-user-group.dto';

export class MakeUserGroupUseCase {
  constructor(private baileysManager: BaileysInstanceRepositoryInMemory) {}

  async execute(input: MakeUserGroupDto) {
    const result = await checkInstance(input.id, this.baileysManager);

    const sock = result.waSocket!;

    const whatsappId = getWhatsAppId(input.groupId);
    await result.verifyId(whatsappId);

    await sock.groupParticipantsUpdate(
      whatsappId,
      input.users.map(getWhatsAppId),
      input.type,
    );
  }
}
