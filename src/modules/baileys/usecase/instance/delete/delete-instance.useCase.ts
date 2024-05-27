import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import DeleteInstanceUseCaseDto from './delete-instance.usecase.dto';
import { BaileysInstanceRepositoryInterface } from '../../../domain/repository/baileys-instance.repository.interface';
export class DeleteInstanceUseCase {
  constructor(
    private instanceRepository: BaileysInstanceRepositoryInterface,
    private baileysManager: BaileysInstanceRepositoryInMemory,
  ) {}

  async execute(input: DeleteInstanceUseCaseDto) {
    await this.instanceRepository.delete(input.id);
    await this.baileysManager.delete(input.id);
  }
}
