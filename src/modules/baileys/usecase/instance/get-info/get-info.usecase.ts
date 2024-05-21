import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import { checkInstance } from '../../../helpers/check-Instance';
import { GetInfoUseCaseDTO } from './get-instance-info.dto';

export class GetInfoUseCase {
  constructor(private baileysManager: BaileysInstanceRepositoryInMemory) {}

  async execute(input: GetInfoUseCaseDTO) {
    const result = await checkInstance(input.id, this.baileysManager);

    const sock = result.waSocket!;

    return {
      id: result.id,
      isOn: result.isOn,
      user: result.isOn ? sock.user : {},
    };
  }
}
