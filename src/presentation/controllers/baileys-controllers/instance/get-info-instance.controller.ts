import { ControllerInterface } from '../../../interfaces/controller.interface';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import {
  AppError,
  HttpCode,
} from '../../../../modules/@shared/domain/exceptions/app-error';
import { Config } from '../../../../modules/@shared/infra/config';

export class GetInfoInstanceController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;

    if (!id)
      throw new AppError({
        message: 'id is required',
        statusCode: HttpCode['BAD_REQUEST'],
        isOperational: true,
      });

    const execute = await this.usecase.info({ id });

    return new HttpResponse(
      {
        message: 'Get Info Successful',
        data: execute,
        routingKey: Config.routingKey()
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
