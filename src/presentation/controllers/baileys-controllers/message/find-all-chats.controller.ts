import { ControllerInterface } from '../../../interfaces/controller.interface';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { Config } from '../../../../modules/@shared/infra/config';
import { findAllChatsValidator } from '../../../validators/baileys/message/find-all-chats.validator';

export class FindAllChatsController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { page, limit } = request.query;

    findAllChatsValidator.validateSync({
      id,
      page,
      limit,
    });

    const execute = await this.usecase.findAllChats({
      id,
      page,
      limit,
    });

    return new HttpResponse(
      {
        message: 'Chats Successfully',
        data: execute,
        routingKey: Config.routingKey(),
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
