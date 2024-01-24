import { BaileysRepositoryInterface } from "../../../domain/repositories/baileys.repository.interface";
import { collections } from "../settings/connection";
import { Baileys } from "../../../domain/entities/baileys.entity";
import BaileysModel from "../entity-configurations/baileys-model";
import Id from "../../../domain/value-object/id.value-object";
import EventDispatcher from "../../../domain/events/event-dispatcher";

export class BaileysRepository implements BaileysRepositoryInterface {

    async create(baileys: Baileys): Promise<void> {
        await collections.baileys!.insertOne(baileys.toPrimitives());
    }

    async update(baileys: Baileys): Promise<void> {
        await collections.baileys!.updateOne({ key: baileys.key }, { $set: baileys.toPrimitives() });
    }

    async delete(key: string): Promise<void> {
        await collections.baileys!.deleteOne({ key });
    }

    async find(key: string): Promise<Baileys | undefined> {
        const baileys = await collections.baileys!.findOne({ key }) as BaileysModel;
        if (!baileys) return undefined;
        return this.instantiateBaileys(baileys);
    }

    async findAll(): Promise<Baileys[]> {
        const baileys = await collections.baileys!.find().toArray() as BaileysModel[];

        return baileys.map(bailey => {
            return this.instantiateBaileys(bailey);
        });
    }


    private instantiateBaileys(baileys: BaileysModel): Baileys {
        return new Baileys({
            id: new Id(baileys._id?.toHexString()),
            key: baileys.key,
            allowWebhook: baileys.allowWebhook,
            heardEvents: baileys.heardEvents,
            isWebhookBase64: baileys.isWebhookBase64,
            markMessagesRead: baileys.markMessagesRead,
            webhook: baileys.webhook,
            apiKey: baileys.apiKey,
            createdAt: baileys.createdAt,
            updatedAt: baileys.updatedAt,
            eventDispatcher: new EventDispatcher(),
        });
    }
}