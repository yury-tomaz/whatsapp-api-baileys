import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { ControllerInterface } from '../../../interfaces/controller.interface';
import { accepInviteGroupValidator } from '../../../validators/baileys/group/accep-invite-group.validator';

export class AcceptInviteGroupController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { code } = request.query;

    accepInviteGroupValidator.validateSync({ id, code });

    const execute = await this.usecase.groupAcceptInvite({
      id,
      code,
    });

    return new HttpResponse(
      {
        message: 'Baileys accept invite group successfully',
        data: execute,
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
