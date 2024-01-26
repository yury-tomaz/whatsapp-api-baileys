import { SendTextMessageUseCaseInterface } from "../../../../application/contracts/send-text-message-usecase.interface";
import { HttpCode } from "../../../../domain/exceptions/app-error";
import { HttpRequest } from "../../../http-types/http-request";
import { HttpResponse } from "../../../http-types/http-response";

export class SendTextMessageController {
    constructor(
        private readonly usecase: SendTextMessageUseCaseInterface
    ) { }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { key } = request.params;
        const { to, message } = request.body;

        await this.usecase.execute({
            key,
            to,
            message
        });

        const data = {
            message: "Message sent successfully",
            _links: {
                self: `${request.protocol}://${request.headers.host}/api/baileys/${key}/message/text/`,
                audio: `${request.protocol}://${request.headers.host}/api/baileys/${key}/message/audio/`,
                document: `${request.protocol}://${request.headers.host}/api/baileys/${key}/message/document/`,
                image: `${request.protocol}://${request.headers.host}/api/baileys/${key}/message/image/`,
                video: `${request.protocol}://${request.headers.host}/api/baileys/${key}/message/video/`,
                sticker: `${request.protocol}://${request.headers.host}/api/baileys/${key}/message/sticker/`,
                location: `${request.protocol}://${request.headers.host}/api/baileys/${key}/message/location/`,
                contact: `${request.protocol}://${request.headers.host}/api/baileys/${key}/message/contact/`,
                link: `${request.protocol}://${request.headers.host}/api/baileys/${key}/message/link/`,
                buttons: `${request.protocol}://${request.headers.host}/api/baileys/${key}/message/buttons/`,
                list: `${request.protocol}://${request.headers.host}/api/baileys/${key}/message/list/`,
            }
        }

        const headers = { "Content-Type": "application/json" }

        return new HttpResponse(data, headers, HttpCode['OK'])
    }
}