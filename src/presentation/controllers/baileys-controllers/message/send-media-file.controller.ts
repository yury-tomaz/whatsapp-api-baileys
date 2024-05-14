import { ControllerInterface } from '../../../interfaces/controller.interface';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { sendMediaFileValidator } from '../../../validators/baileys/message/send-media-file.validator';

export class SendMediaFileController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { to, type, caption } = request.body;
    const file = request.file as Express.Multer.File;

    sendMediaFileValidator.validateSync({
      id,
      to,
      type,
      caption,
      file,
    });

    const execute = await this.usecase.sendMediaFile({
      id,
      type,
      caption,
      file,
      to,
    });

    return new HttpResponse(
      {
        message: 'Send Media File Successfully',
        data: execute,
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
