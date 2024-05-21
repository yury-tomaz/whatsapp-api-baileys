import { ControllerInterface } from '../../../interfaces/controller.interface';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { Config } from '../../../../modules/@shared/infra/config';
import { findAllMessagesValidator } from '../../../validators/baileys/message/find-all-messages.validator';

export class FindAllMessagesController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { page, limit, to } = request.query;

    findAllMessagesValidator.validateSync({
      id,
      page,
      limit,
      to,
    });

    const execute = await this.usecase.findAllMessages({
      id,
      page,
      limit,
      to,
    });

    return new HttpResponse(
      {
        message: 'Send Media File Successfully',
        data: execute,
        routingKey: Config.routingKey(),
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
