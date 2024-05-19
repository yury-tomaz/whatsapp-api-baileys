import { BaileysEventEmitter } from '@whiskeysockets/baileys';
import * as handlers from './handlers';

export class Store {
    private readonly chatHandler;
    private readonly messageHandler;
    private readonly contactHandler;

    constructor(sessionId: string, event: BaileysEventEmitter) {
        this.chatHandler = handlers.chatHandler(sessionId, event);
        this.messageHandler = handlers.messageHandler(sessionId, event);
        this.contactHandler = handlers.contactHandler(sessionId, event);
        this.listen();
    }

    public listen() {
        this.chatHandler.listen();
        this.messageHandler.listen();
        this.contactHandler.listen();
    }

    public unlisten() {
        this.chatHandler.unlisten();
        this.messageHandler.unlisten();
        this.contactHandler.unlisten();
    }
}