import sem from 'semaphore';
import { Baileys } from '../domain/baileys.entity';
import { logger } from '../../@shared/infra/logger';
import { AppError, HttpCode } from '../../@shared/domain/exceptions/app-error';

export class BaileysInstanceRepositoryInMemory {
  private static instance: BaileysInstanceRepositoryInMemory | undefined;
  private repository: Map<string, Baileys> = new Map();
  private semaphore = sem(1);

  private constructor() {}

  static getInstance(): BaileysInstanceRepositoryInMemory {
    if (!BaileysInstanceRepositoryInMemory.instance) {
      BaileysInstanceRepositoryInMemory.instance =
        new BaileysInstanceRepositoryInMemory();
    }
    return BaileysInstanceRepositoryInMemory.instance;
  }

  async create(entity: Baileys): Promise<void> {
    this.semaphore.take(async () => {
      if (this.repository.has(entity.id.id)) {
        logger.warn(`Baileys with key ${entity.id} already exists`);
        await this.update(entity);
        this.semaphore.leave();
        return;
      }

      this.repository.set(entity.id.id, entity);
      this.semaphore.leave();
    });
  }

  async find(id: string): Promise<Baileys | undefined> {
    return this.repository.get(id);
  }

  async update(entity: Baileys): Promise<void> {
    this.semaphore.take(async () => {
      if (!this.repository.has(entity.id.id)) {
        logger.warn(`Baileys with key ${entity.id.id} does not exist`);
        throw new AppError({
          message: `Baileys with key ${entity.id.id} does not exist`,
          statusCode: HttpCode['NOT_FOUND'],
          isOperational: true,
        });
      }

      this.repository.set(entity.id.id, entity);
      this.semaphore.leave();
    });
  }

  async findAll(): Promise<Baileys[]> {
    return Array.from(this.repository.values());
  }

  async delete(id: string): Promise<void> {
    this.semaphore.take(async () => {
      if (!this.repository.has(id)) {
        logger.warn(`Baileys with key ${id} does not exist`);
        throw new AppError({
          message: `Baileys with key ${id} does not exist`,
          statusCode: HttpCode['NOT_FOUND'],
          isOperational: true,
        });
      }

      this.repository.delete(id);
      this.semaphore.leave();
    });
  }
}
