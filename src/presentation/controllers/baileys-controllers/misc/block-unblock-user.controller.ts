import { ControllerInterface } from '../../../interfaces/controller.interface';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { blockUnblockUserValidator } from '../../../validators/baileys/misc/block-unblock-user.validator';
import { Config } from '../../../../modules/@shared/infra/config';

export class BlockUnblockUserController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { to, action } = request.body;

    blockUnblockUserValidator.validateSync({
      id,
      to,
      action,
    });

    const execute = await this.usecase.blockUnblock({
      id,
      to,
      action,
    });

    return new HttpResponse(
      {
        message: 'Block and Unblock Successfully',
        data: execute,
        routingKey: Config.routingKey()
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
