import {ControllerInterface} from "../../../interfaces/controller.interface";
import {HttpRequest} from "../../../http-types/http-request";
import {HttpResponse} from "../../../http-types/http-response";
import {WhatsappService} from "../../../../modules/baileys/facade/baileys.facade.interface";
import {getQrCodeValidator} from "../../../validators/get-qr-code.validator";

export class GetQrCodeController implements ControllerInterface {
    constructor(
        private usecase: WhatsappService
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {

        const {id} = request.params;
        const {belongsTo} = request.query;
        getQrCodeValidator.validateSync({id, belongsTo});

        const execute = await this.usecase.qr({id})

        return new HttpResponse(
            {
                message: 'Successfully obtained QR Code',
                data: execute
            },
            {"Content-Type": "application/json"},
            200
        )
    }
}