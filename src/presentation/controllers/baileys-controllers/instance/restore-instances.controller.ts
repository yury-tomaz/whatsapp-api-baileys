import { ControllerInterface } from '../../../interfaces/controller.interface';
import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { Config } from '../../../../modules/@shared/infra/config';

export class RestoreInstancesController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    await this.usecase.restore();

    return new HttpResponse(
      {
        message: 'Sessions Restored Successfully',
        routingKey: Config.routingKey(),
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
