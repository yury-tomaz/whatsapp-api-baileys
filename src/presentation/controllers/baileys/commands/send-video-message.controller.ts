import { SendVideoMessageUseCaseInterface } from "../../../../application/contracts/send-video-message-usecase.interface";
import { AppError, HttpCode } from "../../../../domain/exceptions/app-error";
import { HttpRequest } from "../../../http-types/http-request";
import { HttpResponse } from "../../../http-types/http-response";

export class SendVideoMessageController {
    constructor(
        private readonly usecase: SendVideoMessageUseCaseInterface
    ) { }

    async handle(request: HttpRequest): Promise<HttpResponse> {

        const { key } = request.params;
        const { file } = request;
        const { to } = request.body;

        if(!file) throw new AppError({
            message: 'File not found',
            statusCode: 204,
            isOperational: true
        });
        
        await this.usecase.execute({
            key, to, file
        });

        const baseUrl = `${request.protocol}://${request.headers.host}`;

        const data = {
            message: "Video message sent successfully",
            _links: {
                self: `${baseUrl}/api/baileys/${key}/message/video`,
            }
        }

        const headers = { "Content-Type": "application/json" }

        return new HttpResponse(data, headers, HttpCode['OK']);
    }
}