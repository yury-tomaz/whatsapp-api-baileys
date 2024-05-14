import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import { DeleteInstanceUseCaseDto } from './delete-instance.usecase.dto';
export class DeleteInstanceUseCase {
  constructor(private baileysManager: BaileysInstanceRepositoryInMemory) {}

  async execute(input: DeleteInstanceUseCaseDto) {
    return await this.baileysManager.delete(input.id);
  }
}
