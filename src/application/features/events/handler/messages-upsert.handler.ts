import EventHandlerInterface from "../../../../domain/events/event-handler.interface";
import { MessagesUpsertedEvent } from "../messages-upser.event";
import { WAMessage } from "@whiskeysockets/baileys";
import { downloadMessage } from "../helpers/download-message.helper";
import EventDispatcher from "../../../../domain/events/event-dispatcher";
import { BaileysIsUpdatedEvent } from "../baileys-Is-updated.event";


interface WebhookData extends WAMessage {
    instanceKey: string,
    text: WAMessage[],
    msgContent: string | undefined
}

export class MessagesUpsertedEventHandler implements EventHandlerInterface<MessagesUpsertedEvent>{
    private eventDispatcher = new EventDispatcher();

    async handle(event: MessagesUpsertedEvent) {
        const { messages, type, baileys } = event.eventData;
        const currentMessages = baileys.messages;  

        if (type === "append") {
            baileys.messages = [...currentMessages, ...messages];
        }

        if (type !== 'notify') return;


        if (baileys.markMessagesRead) {
            const unreadMessages = messages.map(message => {
                return {
                    remoteJid: message.key.remoteJid,
                    id: message.key.id,
                    participant: message.key.participant,
                }
            })

            baileys.waSocket?.readMessages(unreadMessages);
        }

        baileys.messages = messages.concat(currentMessages);

        baileys.messages.map(async (message:any) => {
            if (!message.message) return;

            if(!baileys.allowWebhook || !baileys.webhook) return;

            const messageType = Object.keys(message.message)[0];
            const isProtocolOrKeyDistributionMessage: boolean = ['protocolMessage', 'senderKeyDistributionMessage',].includes(messageType);
            if (isProtocolOrKeyDistributionMessage) return;

            const webhookData = {
                ...message,
            } as WebhookData;

            if (messageType === 'conversation') {
                webhookData['text'] = messages;
            }

            if (baileys.isWebhookBase64) {
                switch (messageType) {
                    case 'imageMessage':
                        webhookData['msgContent'] = await downloadMessage({
                            directPath: message.message.imageMessage?.directPath,
                            mediaKey: message.message.imageMessage?.mediaKey,
                            url: message.message.imageMessage?.url,
                        }, 'image')
                        break
                    case 'videoMessage':
                        webhookData['msgContent'] = await downloadMessage({
                            directPath: message.message.videoMessage?.directPath,
                            mediaKey: message.message.videoMessage?.mediaKey,
                            url: message.message.videoMessage?.url,
                        }, 'video')
                        break
                    case 'audioMessage':
                        webhookData['msgContent'] = await downloadMessage({
                            directPath: message.message.audioMessage?.directPath,
                            mediaKey: message.message.audioMessage?.mediaKey,
                            url: message.message.audioMessage?.url,
                        }, 'audio')
                        break
                    default:
                        webhookData['msgContent'] = '';
                        break
                }
            }

            const isRelevantEvent = ['all', 'message', 'message.new'].some(event => baileys.heardEvents.includes(event));

            if (isRelevantEvent) {
                this.eventDispatcher.notify(new BaileysIsUpdatedEvent({
                    key: baileys.key,
                    type: 'message',
                    body: webhookData,
                    webhook: baileys.webhook,
                }))
            }
        });
    }
}