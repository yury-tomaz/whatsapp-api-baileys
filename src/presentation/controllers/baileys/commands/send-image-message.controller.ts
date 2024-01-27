import { P } from "pino";
import { SendImageMessageUseCaseInterface } from "../../../../application/contracts/send-image-message-usecase.interface";
import { HttpResponse } from "../../../http-types/http-response";
import { HttpRequest } from "../../../http-types/http-request";
import { HttpCode } from "../../../../domain/exceptions/app-error";

export class SendImageMessageUseCaseController {
    constructor(
        private readonly usecase: SendImageMessageUseCaseInterface
    ) { }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { key } = request.params;
        const { file } = request;
        const { to } = request.body;

        await this.usecase.execute({
            key, to, file
        });

        const baseUrl = `${request.protocol}://${request.headers.host}`;

        const data = {
            message: "Image message sent successfully",
            _links: {
                self: `${baseUrl}/api/baileys/${key}/message/image`,
            }
        }

        const headers = { "Content-Type": "application/json" }

        return new HttpResponse(data, headers, HttpCode['OK']);
    }

}