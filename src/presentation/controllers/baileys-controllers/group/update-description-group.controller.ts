import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { ControllerInterface } from '../../../interfaces/controller.interface';
import { updateDescriptionGroupValidator } from '../../../validators/baileys/group/update-description-group.validator';
import { Config } from '../../../../modules/@shared/infra/config';

export class UpdateDescriptionGroupController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { groupId, description } = request.body;

    updateDescriptionGroupValidator.validateSync({ id, groupId, description });

    const execute = await this.usecase.groupUpdateDescription({
      id,
      groupId,
      description,
    });

    return new HttpResponse(
      {
        message: 'Baileys update description group successfully',
        data: execute,
        routingKey: Config.routingKey()
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
