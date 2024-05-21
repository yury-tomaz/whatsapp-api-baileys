import { ControllerInterface } from '../../../interfaces/controller.interface';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { getProfilePictureValidator } from '../../../validators/baileys/misc/get-profile-picture.validator';
import { Config } from '../../../../modules/@shared/infra/config';

export class GetProfilePictureController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { to } = request.query;

    getProfilePictureValidator.validateSync({
      id,
      to,
    });

    const execute = await this.usecase.downloadProfile({
      id,
      to,
    });

    return new HttpResponse(
      {
        message: 'Profile picture successfully',
        data: {
          url: execute,
        },
        routingKey: Config.routingKey()
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
