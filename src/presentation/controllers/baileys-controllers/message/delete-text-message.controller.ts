import { ControllerInterface } from '../../../interfaces/controller.interface';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { Config } from '../../../../modules/@shared/infra/config';
import { deleteTextMessageValidator } from '../../../validators/baileys/message/delete-text-message.validator';

export class DeleteTextMessageController implements ControllerInterface {
  constructor(private usecase: WhatsappService) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { to, key } = request.body;
    const { id } = request.params;

    deleteTextMessageValidator.validateSync({ key, to, id });

    const execute = await this.usecase.deleteMessage({
      id,
      to,
      key
    });

    return new HttpResponse(
      {
        message: 'Text Message delete Successfully',
        data: execute,
        routingKey: Config.routingKey(),
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
