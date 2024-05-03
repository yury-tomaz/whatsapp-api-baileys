import {ControllerInterface} from "../../../interfaces/controller.interface";
import {HttpRequest} from "../../../http-types/http-request";
import {HttpResponse} from "../../../http-types/http-response";
import {WhatsappService} from "../../../../modules/baileys/facade/baileys.facade.interface";

export class GetQrCodeController implements ControllerInterface {
    constructor(
        private usecase: WhatsappService
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        // TODO: add belongsTo
        const {id} = request.params

        const execute = await this.usecase.qr({id})

        return new HttpResponse(
            {
                message: 'Successfully obtained QR Code',
                data: execute
            },
            {},
            200
        )
    }
}