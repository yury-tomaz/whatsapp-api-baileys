import { Baileys } from '../../../domain/baileys.entity';
import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import InitInstanceInputDto from './init-instance.dto';

export class InitInstanceUseCase {
  constructor(private baileysManager: BaileysInstanceRepositoryInMemory) {}

  async execute(input: InitInstanceInputDto) {
    const baileys = new Baileys({
      belongsTo: input.belongsTo,
      name: input.name,
      sessionId: input.sessionId,
    });

    await this.baileysManager.create(baileys);

    return {
      sessionId: baileys.sessionId,
      name: baileys.name,
      qr: baileys.qr,
      belongsTo: baileys.belongsTo,
    };
  }
}
