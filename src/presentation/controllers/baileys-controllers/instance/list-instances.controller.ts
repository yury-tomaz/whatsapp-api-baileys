import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { Config } from '../../../../modules/@shared/infra/config';

export class ListInstancesController{
  constructor(private usecase: WhatsappService) {}
  async handle(request: HttpRequest): Promise<HttpResponse>{

    const execute = await this.usecase.list();

    return new HttpResponse(
      {
        message: 'Success when listing instances',
        data: execute,
        routingKey: Config.routingKey(),
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}