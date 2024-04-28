import sem from "semaphore";
import {BaileysInstance} from "./bailyes.instance";
import {logger} from "../../../logger";

export class BaileysManager {
    private static instance: BaileysManager | undefined;
    private repository: Map<string, BaileysInstance> = new Map();
    private semaphore = sem(1);

    private constructor() { }

    static getInstance(): BaileysManager {
        if (!BaileysManager.instance) {
            BaileysManager.instance = new BaileysManager();
        }
        return BaileysManager.instance;
    }

    async create(entity: BaileysInstance): Promise<void> {
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

    async find(id: string): Promise<BaileysInstance | undefined> {
        return this.repository.get(id);
    }

    async update(entity: BaileysInstance): Promise<void> {
        this.semaphore.take(async () => {
            if (!this.repository.has(entity.id.id)) {
                logger.warn(`Baileys with key ${entity.id.id} does not exist`);
                throw new Error(`Baileys with key ${entity.id.id} does not exist`);
            }

            this.repository.set(entity.id.id, entity);
            this.semaphore.leave();
        });
    }

    async findAll(): Promise<BaileysInstance[]> {
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