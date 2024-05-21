import { ControllerInterface } from '../../../interfaces/controller.interface';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { getStatusUserValidator } from '../../../validators/baileys/misc/get-status-user.validator';
import { Config } from '../../../../modules/@shared/infra/config';

export class GetStatusUserController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { to } = request.query;

    getStatusUserValidator.validateSync({
      id,
      to,
    });

    const execute = await this.usecase.getUserStatus({
      id,
      to,
    });

    return new HttpResponse(
      {
        message: 'Get status user successfully',
        data: execute,
        routingKey: Config.routingKey(),
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
