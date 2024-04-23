import makeWASocket, {
    AuthenticationState, BaileysEventMap,
    Browsers,
    fetchLatestBaileysVersion,
    makeInMemoryStore,
    SocketConfig,
    WABrowserDescription
} from "@whiskeysockets/baileys";
import MAIN_LOGGER from "@whiskeysockets/baileys/lib/Utils/logger";
import {logger} from "../../../logger";
import EventDispatcherInterface from "../../../../domain/events/event-dispatcher.interface";
import {authState, AuthStateRepositoryInterface} from "./auth-state-db";
import NodeCache from 'node-cache';
import {Chat} from "@whiskeysockets/baileys/lib/Types/Chat";
import Id from "../../../../domain/value-object/id.value-object";

const loggerBaileys = MAIN_LOGGER.child({});
loggerBaileys.level = "error";

interface CustomSocketConfig extends Partial<SocketConfig> {
    auth: AuthenticationState;
    browser: WABrowserDescription;
}

interface Props {
    id: Id;
    eventDispatcher: EventDispatcherInterface;
    authStateRepository: AuthStateRepositoryInterface;
}

export class Baileys {
    private readonly _id: Id;
    private _socketConfig: CustomSocketConfig | undefined;
    private _waSocket: ReturnType<typeof makeWASocket> | undefined;
    private readonly eventDispatcher: EventDispatcherInterface;
    private readonly authStateRepository: AuthStateRepositoryInterface;
    private msgRetryCounterCache = new NodeCache();
    private _qrRetry: number = 0;
    private _qrCode: string | undefined;
    private _chats: Chat[] = []
    private _only: boolean = false

    get id(){
        return this._id
    }
    get qrCode() {return this._qrCode}

    get waSocket() {
        return this._waSocket
    }

    get only(){
        return this._only
    }

    constructor(props: Props) {
        this._id = props.id;
        this.eventDispatcher = props.eventDispatcher;
        this.authStateRepository = props.authStateRepository;
    }

    async init() {
        const store = makeInMemoryStore({
            logger: loggerBaileys
        });
        const {version, isLatest} = await fetchLatestBaileysVersion();
        const {state, saveCreds} = await authState(this.authStateRepository);

        this._socketConfig = {
            version,
            logger: loggerBaileys,
            printQRInTerminal: false,
            browser: Browsers.ubuntu("Chrome"),
            auth: state,
            msgRetryCounterCache: this.msgRetryCounterCache
        };

        this._waSocket = makeWASocket(this._socketConfig);
        store.bind(this._waSocket.ev);

        if (this._waSocket) {
            this._waSocket.ev.on('creds.update', saveCreds);
            logger.info('Baileys instance initialized');
        }
    }

    private async listeningEvents(socket: ReturnType<typeof makeWASocket>) {
        socket.ev.on('chats.upsert', async (chats) => {
            socket.ev.on('chats.upsert', (newChat) => {
                this._chats = this._chats.map((chat) => {
                        return {
                            ...chat,
                            messages: []
                        };
                    }
                );
            });
        });

        socket.ev.on('connection.update', async (update) => {
            //TODO: handle event
        });

        socket.ev.on('presence.update', async (json) => {
            //TODO: handle event
        });

        socket.ev.on('chats.update', async (message) => {
            //TODO: handle event
        });

        socket.ev.on('messaging-history.set', async ({chats}) => {
            //TODO: handle event
        });

        socket.ev.on('messages.upsert', async ({messages, type}) => {
            //TODO: handle event
        });

        socket.ev.on('messages.update', async (messages) => {
            //TODO: handle event
        });

        socket.ev.on('contacts.upsert', async (contacts) => {
            //TODO: handle event
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
            'blocklist.update', 'call', 'labels.edit', 'labels.association',
        ]
        events.forEach(event => {
            sock.ev.removeAllListeners(event);
        });
    }


}