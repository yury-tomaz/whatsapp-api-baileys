import { ControllerInterface } from '../../../interfaces/controller.interface';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { Config } from '../../../../modules/@shared/infra/config';
import { updateTextMessageValidator } from '../../../validators/baileys/message/update-text-message.validator';

export class UpdateTextMessageController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { message, to, key } = request.body;
    const { id } = request.params;

    updateTextMessageValidator.validateSync({ message, to, id, key });

    const execute = await this.usecase.updateMessage({
      id,
      message,
      to,
      key,
    });

    return new HttpResponse(
      {
        message: 'Text Message update Successfully',
        data: execute,
        routingKey: Config.routingKey(),
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
