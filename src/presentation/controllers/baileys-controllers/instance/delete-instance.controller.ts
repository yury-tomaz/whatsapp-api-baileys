import { Config } from '../../../../modules/@shared/infra/config';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { deleteInstanceValidator } from '../../../validators/delete-instance.validator';

export class DeleteInstanceController {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    deleteInstanceValidator.validateSync({ id });

    await this.usecase.delete({
      id,
    });

    return new HttpResponse(
      {
        message: 'Instance successfully deleted.',
        routingKey: Config.routingKey()
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
