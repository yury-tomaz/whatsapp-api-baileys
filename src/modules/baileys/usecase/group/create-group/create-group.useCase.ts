import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import { getWhatsAppId } from '../../../helpers/get-whats-app-Id';
import { checkInstance } from '../../../helpers/check-Instance';
import CreateGroupDto from './create-group.dto';

export class CreateGroupUseCase {
  constructor(private baileysManager: BaileysInstanceRepositoryInMemory) {}

  async execute(input: CreateGroupDto) {
    const result = await checkInstance(input.id, this.baileysManager);

    const sock = result.waSocket!;

    const response = await sock.groupCreate(
      input.name,
      input.users.map(getWhatsAppId),
    );

    return response;
  }
}
