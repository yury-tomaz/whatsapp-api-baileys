import { ControllerInterface } from '../../../interfaces/controller.interface';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { updateProfilePictureValidator } from '../../../validators/baileys/misc/update-profile-picture.validator';
import { Config } from '../../../../modules/@shared/infra/config';

export class UpdateProfilePictureController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { to, url } = request.body;

    updateProfilePictureValidator.validateSync({
      id,
      to,
      url,
    });

    const execute = await this.usecase.updateProfilePicture({
      id,
      to,
      url,
    });

    return new HttpResponse(
      {
        message: 'Update profile picture successfully',
        data: execute,
        routingKey: Config.routingKey()
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
