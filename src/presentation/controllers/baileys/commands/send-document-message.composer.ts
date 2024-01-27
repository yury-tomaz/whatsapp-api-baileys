import { SendDocumentMessageUseCaseInterface } from "../../../../application/contracts/send-document-message.interface";
import { HttpCode } from "../../../../domain/exceptions/app-error";
import { HttpRequest } from "../../../http-types/http-request";
import { HttpResponse } from "../../../http-types/http-response";

export class SendDocumentMessageController {
    constructor(
        private readonly usecase: SendDocumentMessageUseCaseInterface
    ) { }

    async handle(request: HttpRequest): Promise<HttpResponse> {

        const { key } = request.params;
        const { to, caption, file } = request.body;

        await this.usecase.execute({
            key,
            to,
            caption,
            file
        });

        const baseUrl = `${request.protocol}://${request.headers.host}`;
        const headers = {'Content-Type': 'application/json'};
        const data = {
            message: "Message sent",
            _links: {
                self: `${baseUrl}/api/baileys/${key}/message/document`,
            }
        }

        return new HttpResponse(data, headers, HttpCode['OK']);
    }
}
