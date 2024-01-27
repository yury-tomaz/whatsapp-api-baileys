import { GetQrCodeUseCaseInterface } from "../../../../application/contracts/get-QRcode-usecase.interface";
import { AppError, HttpCode } from "../../../../domain/exceptions/app-error";
import { HttpRequest } from "../../../http-types/http-request";
import { HttpResponse } from "../../../http-types/http-response";

export class GetQrCodeController {
    constructor(
        private readonly usecase: GetQrCodeUseCaseInterface
    ) { }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { key } = request.params;

        if (!key) {
            throw new AppError({
                message: 'Key is required',
                statusCode: HttpCode['BAD_REQUEST'],
                isOperational: true
            })

        }

        const execute = await this.usecase.execute({ key });
        const baseUrl = `${request.protocol}://${request.headers.host}`;

        const data = {
            message: 'QR Code generated successfully',
            content: execute.qrCode,
            _links: {
                self: `${baseUrl}/api/baileys/instances/${key}/QRCode`,
                baileys_instance: `${baseUrl}/api/baileys/instances/${key}`,
            }
        }

        const headers = { "Content-Type": "application/json" }

        return new HttpResponse(data, headers, 200);
    }
}