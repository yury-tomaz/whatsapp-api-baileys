import { sendAudioMessageUseCaseInterface } from "../../../../application/contracts/send-audio-message-usecase.Interface";
import { AppError } from "../../../../domain/exceptions/app-error";
import { HttpRequest } from "../../../http-types/http-request";
import { HttpResponse } from "../../../http-types/http-response";


export class SendAudioMessageController {
    constructor(
        private readonly usecase: sendAudioMessageUseCaseInterface
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
            message: "Audio message sent successfully",
            _links: {
                self: `${baseUrl}/api/baileys/${key}/message/audio`,
            }
        }

        const headers = { "Content-Type": "application/json" }

        return new HttpResponse(data, headers, 200);
    }
}