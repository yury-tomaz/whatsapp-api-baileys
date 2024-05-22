import { ControllerInterface } from '../../../interfaces/controller.interface';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { Config } from '../../../../modules/@shared/infra/config';
import { findAllContactsValidator } from '../../../validators/baileys/message/find-all-contacts.validator';

export class FindAllContactsController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { page, limit } = request.query;

    findAllContactsValidator.validateSync({
      id,
      page,
      limit,
    });

    const execute = await this.usecase.findAllContacts({
      id,
      page,
      limit,
    });

    return new HttpResponse(
      {
        message: 'Contacts Successfully',
        data: execute,
        routingKey: Config.routingKey(),
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
