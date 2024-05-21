import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { ControllerInterface } from '../../../interfaces/controller.interface';
import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import {
  AppError,
  HttpCode,
} from '../../../../modules/@shared/domain/exceptions/app-error';
import { Config } from '../../../../modules/@shared/infra/config';

export class LogoutInstanceController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;

    if (!id)
      throw new AppError({
        message: 'id is required',
        statusCode: HttpCode['BAD_REQUEST'],
        isOperational: true,
      });

    await this.usecase.logout({
      id,
    });

    return new HttpResponse(
      {
        message: 'Successful logout',
        routingKey: Config.routingKey(),
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
