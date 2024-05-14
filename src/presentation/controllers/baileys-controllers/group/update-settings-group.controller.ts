import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { ControllerInterface } from '../../../interfaces/controller.interface';
import { updateSettingsGroupValidator } from '../../../validators/baileys/group/update-settings-group.validator';

export class UpdateSettingGroupController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { groupId, action } = request.body;

    updateSettingsGroupValidator.validateSync({ id, groupId, action });

    const execute = await this.usecase.groupSettingUpdate({
      id,
      groupId,
      action,
    });

    return new HttpResponse(
      {
        message: 'Baileys update settings group successfully',
        data: execute,
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
