import { ObjectId } from "mongodb";

export default class Baileys {
    constructor(
        public key: string,
        public webhook: string,
        public allowWebhook: boolean,
        public heardEvents: string[],
        public markMessagesRead: boolean,
        public isWebhookBase64: boolean,
        public apiKey?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        public _id?: ObjectId,
    ) { }
}