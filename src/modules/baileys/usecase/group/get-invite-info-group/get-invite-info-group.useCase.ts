import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import { checkInstance } from '../../../helpers/check-Instance';
import GetInviteInGroupDto  from './get-invite-info-group.dto';

export class GetInviteInfoGroupUseCase {
  constructor(private baileysManager: BaileysInstanceRepositoryInMemory) {}

  async execute(input: GetInviteInGroupDto) {
    const result = await checkInstance(input.id, this.baileysManager);

    const sock = result.waSocket!;

    const response = await sock.groupGetInviteInfo(input.code);

    return response;
  }
}
