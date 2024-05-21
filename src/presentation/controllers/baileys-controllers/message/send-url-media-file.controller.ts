import { ControllerInterface } from '../../../interfaces/controller.interface';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { sendUrlMediaFileValidator } from '../../../validators/baileys/message/send-url-media-file.validator';
import { Config } from '../../../../modules/@shared/infra/config';

export class SendUrlMediaFileController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { url, caption, mimetype, to, type } = request.body;

    sendUrlMediaFileValidator.validateSync({
      id,
      url,
      caption,
      mimetype,
      to,
      type,
    });

    const execute = await this.usecase.sendUrlMediaFile({
      id,
      url,
      caption,
      mimetype,
      to,
      type,
    });

    return new HttpResponse(
      {
        message: 'Media url Sent Successfully',
        data: execute,
        routingKey: Config.routingKey(),
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
