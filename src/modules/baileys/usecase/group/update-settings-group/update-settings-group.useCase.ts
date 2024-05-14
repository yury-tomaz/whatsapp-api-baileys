import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import { getWhatsAppId } from '../../../helpers/get-whats-app-Id';
import { checkInstance } from '../../../helpers/check-Instance';
import { UpdateSettingsGroupDto } from './update-settings-group.dto';

export class UpdateSettingsGroupUseCase {
  constructor(private baileysManager: BaileysInstanceRepositoryInMemory) {}

  async execute(input: UpdateSettingsGroupDto) {
    const result = await checkInstance(input.id, this.baileysManager);

    const sock = result.waSocket!;

    const whatsappId = getWhatsAppId(input.groupId);
    await result.verifyId(whatsappId);

    const response = await sock.groupSettingUpdate(whatsappId, input.action);

    return response;
  }
}
