import EventHandlerInterface from "../../../../domain/events/event-handler.interface";
import { BaileysIsUpdatedEvent } from "../baileys-Is-updated.event";
import axios from "axios";
import { logger } from "../../../../infrastructure/logger";

export class SendWebhookWhenBaileysIsUpdated implements EventHandlerInterface<BaileysIsUpdatedEvent>{

    handle(event: BaileysIsUpdatedEvent): void {
        const api = axios.create({
            baseURL: event.eventData.webhook,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Baileys-Webhook-Client',
                'Authorization': `Bearer ${event.eventData.apikey}`
            }
        });

        api.post('/', event.eventData.body)
            .then(response => {
                logger.info(`Webhook sent to ${event.eventData.webhook}`);
            })
            .catch(error => {
                logger.error(`Error sending webhook to ${event.eventData.webhook}`);
            });
    }
}