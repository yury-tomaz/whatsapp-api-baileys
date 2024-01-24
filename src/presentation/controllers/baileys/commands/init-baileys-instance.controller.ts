import { InitBailesInstanceUseCaseInterface } from "../../../../application/contracts/usecase.interface";
import { HttpRequest } from "../../../../presentation/http-types/http-request";
import { HttpResponse } from "../../../../presentation/http-types/http-response";
import { initBaileysValidator } from "../../../validators/init-baileys.validator";

export class InitBaileysInstanceController {
    constructor(
        private usecase: InitBailesInstanceUseCaseInterface
    ) { }

    async handle(request: HttpRequest): Promise<HttpResponse> {

        const { key, webhook, allowWebhook, heardEvents, isWebhookBase64, markMessagesRead, apiKey } = request.body;

        initBaileysValidator.validateSync({
            key, webhook, allowWebhook, heardEvents, isWebhookBase64, markMessagesRead, apiKey
        });

        const execute = await this.usecase.execute({
            key, webhook, allowWebhook, heardEvents, isWebhookBase64, markMessagesRead, apiKey
        });

        const baseUrl = `${request.protocol}://${request.headers.host}`;

        const data = {
            message: "Baileys instance initialized successfully",
            _links: {
                self: `${baseUrl}/api/v1/baileys/instances/${execute.key}`,
                baileys_instance_QRCode: `${baseUrl}/api/v1/baileys/instances/${execute.key}/QRCode`,
            }
        }

        const headers = { "Content-Type": "application/json" }

        return new HttpResponse(data, headers, 200);
    }
}