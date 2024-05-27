import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import { checkInstance } from '../../../helpers/check-Instance';
import AcceptInviteGroupDto from './accept-invite-group.dto';

export class AcceptInviteGroupUseCase {
  constructor(private baileysManager: BaileysInstanceRepositoryInMemory) {}

  async execute(input: AcceptInviteGroupDto) {
    const result = await checkInstance(input.id, this.baileysManager);

    const sock = result.waSocket!;

    return await sock.groupAcceptInvite(input.code);
  }
}
