import { ControllerInterface } from '../../../interfaces/controller.interface';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { sendTextMessageValidator } from '../../../validators/baileys/message/send-text-message.validator';
import { Config } from '../../../../modules/@shared/infra/config';

export class SendTextMessageController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { message, to } = request.body;
    const { id } = request.params;

    sendTextMessageValidator.validateSync({ message, to, id });

    const execute = await this.usecase.sendTextMessage({
      id,
      message,
      to,
    });

    return new HttpResponse(
      {
        message: 'Text Message Sent Successfully',
        data: execute,
        routingKey: Config.routingKey()
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
