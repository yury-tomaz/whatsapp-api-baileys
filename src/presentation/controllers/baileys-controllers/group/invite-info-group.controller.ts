import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { ControllerInterface } from '../../../interfaces/controller.interface';
import { inviteInfoGroupValidator } from '../../../validators/baileys/group/invite-info-group.validator';

export class InviteInfoGroupController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { code } = request.query;

    inviteInfoGroupValidator.validateSync({ id, code });

    const execute = await this.usecase.groupGetInviteInfo({
      id,
      code,
    });

    return new HttpResponse(
      {
        message: 'Baileys invite info group successfully',
        data: execute,
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
