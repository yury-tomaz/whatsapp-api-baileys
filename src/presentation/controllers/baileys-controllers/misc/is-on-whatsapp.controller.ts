import {ControllerInterface} from "../../../interfaces/controller.interface";
import {WhatsappService} from "../../../../modules/baileys/facade/baileys.facade.interface";
import {HttpRequest} from "../../../http-types/http-request";
import {HttpResponse} from "../../../http-types/http-response";
import { isOnWhatsappValidator } from "../../../validators/baileys/misc/is-on-whatsapp.validator";

export class IsOnWhatsappController implements ControllerInterface {
  constructor(
    private usecase: WhatsappService
  ) {
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const {id} = request.params;
    const {to} = request.query;

    isOnWhatsappValidator.validateSync({
      id,to
    })

    const execute= await this.usecase.verifyId({
      id, to
    });

    return new HttpResponse(
      {
        message: 'Is on whatsapp successfully',
        data: execute
      },
      {"Content-Type": "application/json"},
      200
    )

  }
}