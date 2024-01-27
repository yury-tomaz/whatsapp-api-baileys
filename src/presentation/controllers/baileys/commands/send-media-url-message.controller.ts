import { SendMediaUrlMessageUseCaseInterface } from "../../../../application/contracts/send-media-url-message-usecase.interface";
import { HttpCode } from "../../../../domain/exceptions/app-error";
import { HttpRequest } from "../../../http-types/http-request";
import { HttpResponse } from "../../../http-types/http-response";

export class SendMediaUrlMessageController {
    constructor(
        private useCase: SendMediaUrlMessageUseCaseInterface
    ) { }

    async handle(request: HttpRequest): Promise<HttpResponse> {

        const { key } = request.params;
        const { to, type, url, caption, mimetype } = request.body;

        await this.useCase.execute({
            key,
            to,
            type,
            url,
            caption,
            mimetype
        });

        const baseUrl = `${request.protocol}://${request.headers.host}`;
        const headers = { "Content-Type": "application/json" }
        const data = {
            message: "Media message sent successfully",
            _links: {
                self: `${baseUrl}/api/baileys/${key}/message/media`
            }
        }

        return new HttpResponse(data, headers, HttpCode['OK'])
    }
}
