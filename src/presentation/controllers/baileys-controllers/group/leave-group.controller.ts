import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { ControllerInterface } from '../../../interfaces/controller.interface';
import { leaveGroupValidator } from '../../../validators/baileys/group/leave-group.validator';

export class LeaveGroupController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { groupId } = request.query;

    leaveGroupValidator.validateSync({ id, groupId });

    const execute = await this.usecase.leaveGroup({
      id,
      groupId,
    });

    return new HttpResponse(
      {
        message: 'Baileys leave group successfully',
        data: execute,
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
