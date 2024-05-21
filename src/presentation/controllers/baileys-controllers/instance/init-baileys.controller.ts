import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { initBaileysValidator } from '../../../validators/init-baileys.validator';
import { ControllerInterface } from '../../../interfaces/controller.interface';
import { Config } from '../../../../modules/@shared/infra/config';

export class InitBaileysController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { name, belongsTo } = request.body;

    initBaileysValidator.validateSync({ name, belongsTo });

    const execute = await this.usecase.init({ name, belongsTo });

    return new HttpResponse(
      {
        message: 'Baileys instance initialized successfully',
        data: execute,
        routingKey: Config.routingKey()
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
