import { SendContactMessageUseCaseInterface } from "../../../../application/contracts/send-contact-message-usecase.Interface";
import { HttpCode } from "../../../../domain/exceptions/app-error";
import { HttpRequest } from "../../../http-types/http-request";
import { HttpResponse } from "../../../http-types/http-response";


export class SendContactMessageController {
    constructor(
        private readonly usecase: SendContactMessageUseCaseInterface
    ) { }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { key } = request.params;
        const { to, vcard } = request.body;

        await this.usecase.execute({ key, to, vcard });

        const baseUrl = `${request.protocol}://${request.headers.host}`;
        const headers = { "Content-Type": "application/json" }

        return new HttpResponse({
            message: "Message sent",
            _links: {
                self: `${baseUrl}/api/baileys/${key}/message/contact`,
            }
        }, headers, HttpCode['OK'])
    }
}