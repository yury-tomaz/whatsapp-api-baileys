import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { ControllerInterface } from '../../../interfaces/controller.interface';
import { createGroupValidator } from '../../../validators/baileys/group/create-group.validator';

export class CreateGroupController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { users, name } = request.body;

    createGroupValidator.validateSync({ id, users, name });

    const execute = await this.usecase.createNewGroup({
      id,
      name,
      users,
    });

    return new HttpResponse(
      {
        message: 'Baileys create group successfully',
        data: execute,
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
