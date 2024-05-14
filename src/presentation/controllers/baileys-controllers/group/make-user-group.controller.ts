import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { ControllerInterface } from '../../../interfaces/controller.interface';
import { makeUserGroupValidator } from '../../../validators/baileys/group/make-user-grop.validator';

export class MakeUserGroupController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { groupId, users, type } = request.body;

    makeUserGroupValidator.validateSync({ id, groupId, users, type });

    const execute = await this.usecase.makeUserGroup({
      id,
      groupId,
      users,
      type,
    });

    return new HttpResponse(
      {
        message: 'Baileys make userr group successfully',
        data: execute,
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
