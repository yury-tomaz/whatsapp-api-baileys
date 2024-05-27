import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import ListInstancesUsecaseOutpuDto from './list-instances.dto';


export class ListInstancesUsecase{
  constructor(private baileysManager: BaileysInstanceRepositoryInMemory) {}

  async execute(): Promise<ListInstancesUsecaseOutpuDto[]>{
    const result =  await this.baileysManager.findAll()

    return result.map( instance => {
      return {
        sessionId: instance.sessionId,
        isOn: instance.isOn,
        name: instance.name,
        belongsTo: instance.belongsTo,
        createdAt: instance.createdAt,
        updatedAt: instance.updatedAt
      }
    })
  }
}