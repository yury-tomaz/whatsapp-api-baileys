import { Baileys } from '../../../domain/baileys.entity';
import { ProcessSocketEvent } from '../../../domain/process-socket-event';
import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import { AuthStateRepositoryInterface } from '../../../gateway/auth-state-repository.interface';
import { InitInstanceInputDto } from './init-instance.dto';

export class InitInstanceUseCase {
  constructor(
    private authStateRepository: AuthStateRepositoryInterface,
    private processSocketEvent: ProcessSocketEvent,
    private baileysManager: BaileysInstanceRepositoryInMemory,
  ) {}

  async execute(input: InitInstanceInputDto) {
    const baileys = new Baileys({
      belongsTo: input.belongsTo,
      name: input.name,
      authStateRepository: this.authStateRepository,
      processSocketEvent: this.processSocketEvent,
    });

    await baileys.init();
    await this.baileysManager.create(baileys);

    return {
      id: baileys.id.id,
      name: baileys.name,
      qr: baileys.qr,
      belongsTo: baileys.belongsTo,
    };
  }
}
