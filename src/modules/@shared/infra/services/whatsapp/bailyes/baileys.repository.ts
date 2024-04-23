import {Baileys} from "../../../../../../domain/entities/baileys.entity";
import sem from "semaphore";
import {logger} from "../../../../../../infrastructure/logger";

export class BaileysRepository{
    private static instance: BaileysRepository | undefined;
    private repository: Map<string, Baileys> = new Map();
    private semaphore = sem(1);

    private constructor() { }

    static getInstance(): BaileysRepository {
        if (!BaileysRepository.instance) {
            BaileysRepository.instance = new BaileysRepository();
        }
        return BaileysRepository.instance;
    }

    async create(entity: Baileys): Promise<void> {
        this.semaphore.take(async () => {
            if (this.repository.has(entity.key)) {
                logger.warn(`Baileys with key ${entity.key} already exists`);
                this.update(entity);
                this.semaphore.leave();
                return;
            }

            this.repository.set(entity.key, entity);
            this.semaphore.leave();
        });
    }

    async find(id: string): Promise<Baileys | undefined> {
        return this.repository.get(id);
    }

    async update(entity: Baileys): Promise<void> {
        this.semaphore.take(async () => {
            if (!this.repository.has(entity.key)) {
                logger.warn(`Baileys with key ${entity.key} does not exist`);
                throw new Error(`Baileys with key ${entity.key} does not exist`);
            }

            this.repository.set(entity.key, entity);
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
                throw new Error(`Baileys with key ${id} does not exist`);
            }

            this.repository.delete(id);
            this.semaphore.leave();
        });
    }
}