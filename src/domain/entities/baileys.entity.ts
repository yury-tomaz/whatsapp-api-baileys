import makeWASocket, { AuthenticationState, BaileysEventMap, ConnectionState, GroupMetadata, SocketConfig, WABrowserDescription, useMultiFileAuthState } from "@whiskeysockets/baileys";
import Id from "../value-object/id.value-object";
import { ConnectionUpdateEvent } from "../../application/features/events/connection-update.event";
import { BaileysIsUpdatedEvent } from "../../application/features/events/baileys-Is-updated.event";
import { MessagesUpsertedEvent } from "../../application/features/events/messages-upser.event";
import { CreatedGroupEvent } from "../../application/features/events/created-group.event";
import { UpdateGroupSubjectEvent } from "../../application/features/events/update-group-subject.event";
import { UpdateGroupParticipantsEvent } from "../../application/features/events/update-group-participants.event";
import { logger } from "../../infrastructure/logger";
import { AppError } from "../exceptions/app-error";
import EventDispatcherInterface from "../events/event-dispatcher.interface";
import BaseEntity from "../@shared/base.entity";

interface BaileysProps {
    id?: Id;
    key: string;
    webhook?: string;
    allowWebhook?: boolean;
    heardEvents?: string[];
    markMessagesRead?: boolean;
    isWebhookBase64?: boolean;
    apiKey?: string;
    createdAt?: Date;
    updatedAt?: Date;
    eventDispatcher: EventDispatcherInterface
}

interface CustomSocketConfig extends Partial<SocketConfig> {
    auth: AuthenticationState;
    browser: WABrowserDescription;
}

export class Baileys extends BaseEntity {
    private _key: string;
    private _webhook: string | undefined;
    private _allowWebhook: boolean = false;
    private _heardEvents: string[] = [];
    private _markMessagesRead: boolean = false;
    private _isWebhookBase64: boolean = false;
    private _chats: any[] = [];
    private _messages: any[] = [];
    private _qrRetry: number = 0;
    private _waSocket: ReturnType<typeof makeWASocket> | undefined;
    private ws: ReturnType<typeof makeWASocket> | undefined;
    private _qrCode: string | null = null;
    private _isOn: boolean = false;
    private _apiKey: string | undefined;
    private eventDispatcher: EventDispatcherInterface

    constructor(props: BaileysProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._key = props.key;
        this._webhook = props.webhook
        this._allowWebhook = props.allowWebhook || false;
        this._heardEvents = props.heardEvents || [];
        this._markMessagesRead = props.markMessagesRead || false;
        this._isWebhookBase64 = props.isWebhookBase64 || false;
        this._apiKey = props.apiKey
        this.eventDispatcher = props.eventDispatcher
    }

    async init() {
        const { state, saveCreds } = await useMultiFileAuthState(this._key);

        const socketConfig: CustomSocketConfig = {
            defaultQueryTimeoutMs: 60000,
            printQRInTerminal: true,
            auth: state,
            browser: ['Whatsapp MD', 'Chrome', '4.0.0'] as WABrowserDescription,
        };

        this._waSocket = makeWASocket(socketConfig);

        if (this._waSocket) {
            this._waSocket.ev.on('creds.update', () => {
                saveCreds();
            });

            logger.info('Baileys instance initialized');

            this.listeningEvents();
        }
    }

    closeWebSocketConnection() {
        this._waSocket?.ws.close();
        this.removeAllListeners();
        this._qrCode = null;
    }

    get key() {
        return this._key;
    }

    get webhook() {
        return this._webhook;
    }

    get allowWebhook() {
        return this._allowWebhook;
    }

    get heardEvents() {
        return this._heardEvents;
    }

    get waSocket() {
        return this._waSocket;
    }

    get qrCode() {
        return this._qrCode;
    }

    get qrRetry() {
        return this._qrRetry;
    }

    get chats() {
        return this._chats;
    }

    set chats(chats: any[]) {
        this._chats = chats;
    }

    get markMessagesRead() {
        return this._markMessagesRead;
    }

    get messages() {
        return this._messages;
    }

    get isWebhookBase64(): boolean {
        return this._isWebhookBase64;
    }

    set messages(messages: any[]) {
        this._messages = messages;
    }

    updateQrCode(qrCode: string) {
        logger.info('Updating QRCode');
        this._qrCode = qrCode;
        this._qrRetry++;
    }

    get isOn() {
        return this._isOn;
    }

    get apiKey() {
        return this._apiKey;
    }

    set isOn(value: boolean) {
        this._isOn = value;
    }


    async verifyId(id:string){
        if (id.includes('@g.us')) return true

        if(!this._waSocket) throw new AppError({
            message: 'Baileys instance not initialized',
            statusCode: 204,
            isOperational: true
        });
        
        const [result] = await this._waSocket.onWhatsApp(id)
        if (result?.exists) return true

        throw new AppError({
            message: 'no account exists',
            statusCode: 204,
            isOperational: true
        })

    }

    private async listeningEvents() {
        const socket = this._waSocket;

        if (!socket) return;

        socket.ev.on('connection.update', async (update: Partial<ConnectionState>) => {
            const { connection, lastDisconnect, qr } = update;
            this.eventDispatcher.notify(new ConnectionUpdateEvent({
                baileys: this,
                connection: connection,
                lastDisconnect: lastDisconnect,
                qr: qr,
            }));
        });

        socket.ev.on('presence.update', async (json) => {
            const isRelevantEvent = ['all', 'presence', 'presence.update'].some((key) => this._heardEvents.includes(key));

            if (this._allowWebhook && this._webhook) {
                if (isRelevantEvent) {
                    this.eventDispatcher.notify(new BaileysIsUpdatedEvent({
                        key: this._key,
                        type: 'presence',
                        body: json,
                        webhook: this._webhook,
                        apikey: this._apiKey,
                    }));
                }
            }
        });

        socket.ev.on('messaging-history.set', async ({ chats }) => {
            this._chats = chats.map((chat) => {
                return {
                    ...chat,
                    messages: []
                };
            });
        });

        socket.ev.on('chats.upsert', (newChat) => {
            this._chats = this._chats.map((chat) => {
                return {
                    ...chat,
                    messages: []
                };
            }
            );
        });

        socket.ev.on('chats.update', (changedChats) => {
            changedChats.forEach((changedChat) => {
                const chatIndex = this._chats.findIndex((chat) => chat.id === changedChat.id);

                if (chatIndex >= 0) {
                    this._chats[chatIndex] = {
                        ...this._chats[chatIndex],
                        ...changedChat
                    };
                }
            });
        });

        socket.ev.on('chats.delete', (deletedChats) => {
            deletedChats.forEach((deletedChat) => {
                const chatIndex = this._chats.findIndex((c) => c.id === deletedChat);

                if (chatIndex >= 0) {
                    this._chats.splice(chatIndex, 1);
                }
            });
        });

        socket.ev.on('messages.upsert', async ({ messages, type }) => {
            this.eventDispatcher.notify(new MessagesUpsertedEvent({
                baileys: this,
                messages: messages,
                type: type,
            }));
        });

        socket.ev.on('messages.update', async (messages) => {
            logger.debug('messages.update', messages);
        });

        socket.ws.on('CB:call', (data: any) => {
            if (!data) return;
            const contentOffer = data.content.find((e: any) => e.tag === 'offer');
            const contentTerminate = data.content.find((e: any) => e.tag === 'terminate');

            if (contentOffer) {
                if (!this._allowWebhook || !this._webhook) return;

                const isRelevantEvent = ['all', 'call', 'CB:call', 'call:offer'].some((key) => this._heardEvents.includes(key));

                if (isRelevantEvent) {
                    this.eventDispatcher.notify(new BaileysIsUpdatedEvent({
                        key: this._key,
                        type: 'call_offer',
                        body: {
                            id: contentOffer.attrs['call-id'],
                            timestamp: parseInt(data.attrs.t),
                            user: {
                                id: data.attrs.from,
                                platform: data.attrs.platform,
                                platform_version: data.attrs.version,
                            },
                        },
                        webhook: this._webhook,
                        apikey: this._apiKey,
                    }));
                }
            } else if (contentTerminate) {
                if (!this._allowWebhook || !this._webhook) return;

                const isRelevantEvent = ['all', 'call', 'CB:call', 'call:terminate'].some((key) => this._heardEvents.includes(key));

                if (isRelevantEvent) {
                    this.eventDispatcher.notify(new BaileysIsUpdatedEvent({
                        key: this._key,
                        type: 'call_terminate',
                        body: {
                            id: contentTerminate.attrs['call-id'],
                            timestamp: parseInt(data.attrs.t),
                            user: {
                                id: data.attrs.from,
                                platform: data.attrs.platform,
                                platform_version: data.attrs.version,
                            },
                        },
                        webhook: this._webhook,
                        apikey: this._apiKey,
                    }));
                }
            }
        });

        socket.ev.on('groups.upsert', async (newChat: GroupMetadata[]) => {

            this.eventDispatcher.notify(new CreatedGroupEvent({
                key: this._key,
                newChat: newChat,
            }));

            if (!this._allowWebhook || !this._webhook) return;

            const isRelevantEvent = ['all', 'groups', 'groups.upsert'].some((key) => this._heardEvents.includes(key));

            if (isRelevantEvent) {
                this.eventDispatcher.notify(new BaileysIsUpdatedEvent({
                    key: this._key,
                    type: 'group_created',
                    body: {
                        data: newChat,
                    },
                    webhook: this._webhook,
                    apikey: this._apiKey,
                }));
            }
        });

        socket.ev.on('groups.update', async (newChat) => {
            this.eventDispatcher.notify(new UpdateGroupSubjectEvent({
                key: this._key,
                newChat: newChat,
            }));

            if (!this._allowWebhook || !this._webhook) return;
            const isRelevantEvent = ['all', 'groups', 'groups.update'].some((key) => this._heardEvents.includes(key));

            if (isRelevantEvent) {
                this.eventDispatcher.notify(new BaileysIsUpdatedEvent({
                    key: this._key,
                    type: 'group_updated',
                    body: {
                        data: newChat,
                    },
                    webhook: this._webhook,
                    apikey: this._apiKey,
                }));
            }

        });

        socket.ev.on('group-participants.update', async (newChat) => {
            this.eventDispatcher.notify(new UpdateGroupParticipantsEvent({
                key: this._key,
                newChat: newChat,
            }));

            if (!this._allowWebhook || !this._webhook) return;

            const isRelevantEvent = ['all', 'groups', 'group_participants', 'group-participants.update',].some((key) => this._heardEvents.includes(key));

            if (isRelevantEvent) {
                this.eventDispatcher.notify(new BaileysIsUpdatedEvent({
                    key: this._key,
                    type: 'group_participants_updated',
                    body: {
                        data: newChat,
                    },
                    webhook: this._webhook,
                    apikey: this._apiKey,
                }));
            }
        });
    }

    private removeAllListeners() {
        const sock = this._waSocket;
        if (!sock) return;

        const events: (keyof BaileysEventMap)[] = [
            'connection.update', 'creds.update', 'messaging-history.set',
            'chats.upsert', 'chats.update', 'chats.delete', 'presence.update',
            'contacts.upsert', 'contacts.update', 'messages.delete', 'messages.update',
            'messages.media-update', 'messages.upsert', 'messages.reaction', 'message-receipt.update',
            'groups.upsert', 'groups.update', 'group-participants.update', 'blocklist.set',
            'blocklist.update', 'call', 'labels.edit', 'labels.association'
        ]
        events.forEach(event => {
            sock.ev.removeAllListeners(event);
        });
    }

    toPrimitives() {
        return {
            id: this.id.id,
            key: this._key,
            webhook: this._webhook,
            allowWebhook: this._allowWebhook,
            heardEvents: this._heardEvents,
            markMessagesRead: this._markMessagesRead,
            isWebhookBase64: this._isWebhookBase64,
            apiKey: this._apiKey,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}