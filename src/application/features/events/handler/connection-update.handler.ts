import EventHandlerInterface from "../../../../domain/events/event-handler.interface";
import { ConnectionUpdateEvent } from "../connection-update.event";
import { DisconnectReason } from "@whiskeysockets/baileys";
import { logger } from "../../../../infrastructure/logger";
import QRCode from 'qrcode';
import EventDispatcher from "../../../../domain/events/event-dispatcher";
import { BaileysIsUpdatedEvent } from "../baileys-Is-updated.event";
import { BaileysRepositoryInterface } from "../../../../domain/repositories/baileys.repository.interface";

interface CustomError extends Error {
    output?: {
        statusCode: number;
    };
}

export class ConnectionUpdateHandler implements EventHandlerInterface<ConnectionUpdateEvent>{
    private eventDispatcher = new EventDispatcher();

    constructor(
        private readonly baileysRepository: BaileysRepositoryInterface,
    ) { }

    async handle(event: ConnectionUpdateEvent) {

        const { connection, lastDisconnect, qr, baileys } = event.eventData;

        if (connection === 'close') {
            const { error } = lastDisconnect as { error: CustomError };

            if (error.output?.statusCode !== DisconnectReason.loggedOut) {
                await baileys.init();
            } else {
                baileys.isOn = false
            }



            const isRelevantEvent = ['all', 'connection', 'connection.update', 'connection:close'].some(event => baileys.heardEvents.includes(event));

            if (isRelevantEvent) {
                if (baileys.allowWebhook && baileys.webhook) {
                    this.eventDispatcher.notify(new BaileysIsUpdatedEvent({
                        key: baileys.key,
                        type: 'connection',
                        body: {
                            connection: connection,
                        },
                        webhook: baileys.webhook,
                    }))
                }
            }
        } else if (connection === 'open') {
            logger.info('Connection open');

            const alreadyThere = await this.baileysRepository.find(baileys.key)

            if (!alreadyThere) {
                await this.baileysRepository.create(baileys)
            }

            baileys.isOn = true


            const isRelevantEvent = ['all', 'connection', 'connection.update', 'connection:open'].some(event => baileys.heardEvents.includes(event));

            if (isRelevantEvent) {
                if (baileys.allowWebhook && baileys.webhook) {
                    this.eventDispatcher.notify(new BaileysIsUpdatedEvent({
                        key: baileys.key,
                        type: 'connection',
                        body: {
                            connection: connection,
                        },
                        webhook: baileys.webhook,
                    }))
                }
            }

        }
        
        if (qr) {
            const qrCode = await QRCode.toDataURL(qr);

            baileys.updateQrCode(qrCode);

            if (baileys.qrRetry > 3) {
                baileys.closeWebSocketConnection();
                logger.info('QRCode expired');
            }
        }
    }
}