import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import { Baileys } from '../../../domain/baileys.entity';
import { BaileysInstanceRepositoryInterface } from '../../../domain/repository/baileys-instance.repository.interface';
import { logger } from '../../../../@shared/infra/logger';
export class RestoreAllInstanceUsecase {
  constructor(
    private instanceRepository: BaileysInstanceRepositoryInterface,
    private baileysManager: BaileysInstanceRepositoryInMemory,
  ) {
  }
  async  execute(){
    const instances = await this.instanceRepository.findAll();

    for (const instance of instances) {
      const start = new Baileys({
        id: instance.id,
        name: instance.name,
        belongsTo: instance.belongsTo,
        createdAt: instance.createdAt,
        updatedAt: instance.updatedAt
      })

      try {
        await this.baileysManager.create(start)
      }catch (e) {
        logger.error(`Error restoring Baileys section: ${instance.name} `)
      }
    }
  }
}