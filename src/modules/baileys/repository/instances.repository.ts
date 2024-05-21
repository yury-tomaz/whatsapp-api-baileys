import { Collection } from 'mongodb';
import { mongoDBManager } from '../../@shared/infra/persistence/settings/connection';
import { BaileysInstance } from '../domain/baileys-instance.entity';
import Id from '../../@shared/domain/value-object/id.value-object';
import { BaileysInstanceRepositoryInterface } from '../domain/repository/baileys-instance.repository.interface';

export class InstancesRepository implements BaileysInstanceRepositoryInterface {
  private instancesCollection: Collection;

  constructor() {
    mongoDBManager.ensureConnection().then(()=> {
      this.instancesCollection = mongoDBManager.db.collection('instances');
    })
  }

  async create(entity: BaileysInstance) {
    await this.instancesCollection.insertOne({
      sessionId: entity.sessionId,
      routingKey: entity.routingKey,
      name: entity.name,
      belongsTo: entity.belongsTo,
    });
  }

  async update(entity: BaileysInstance) {
    await this.instancesCollection.updateOne(
      { sessionId: entity.sessionId },
      {
        sessionId: entity.sessionId,
        routingKey: entity.routingKey,
        name: entity.name,
        belongsTo: entity.belongsTo,
      },
    );
  }

  async find(id: string) {
    const cursor = await this.instancesCollection.findOne({
      sessionId: id,
    });
    if (!cursor) return undefined;

    return new BaileysInstance({
      id: new Id(cursor._id.toHexString()),
      routingKey: cursor.routingKey,
      name: cursor.name,
      sessionId: cursor.sessionId,
      belongsTo: cursor.belongsTo,
    });
  }

  async findAll() {
    const cursor = this.instancesCollection.find();
    const instancesArray = await cursor.toArray();

    return instancesArray.map(instance => {
      return new BaileysInstance({
        id: new Id(instance._id.toHexString()),
        routingKey: instance.routingKey,
        name: instance.name,
        sessionId: instance.sessionId,
        belongsTo: instance.belongsTo,
      });
    });
  }

  async delete(id: string) {
    await this.instancesCollection.deleteOne({
      sessionId: id,
    });
  }
}