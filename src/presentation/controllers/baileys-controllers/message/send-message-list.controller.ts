import { ControllerInterface } from '../../../interfaces/controller.interface';
import { WhatsappService } from '../../../../modules/baileys/facade/baileys.facade.interface';
import { HttpRequest } from '../../../http-types/http-request';
import { HttpResponse } from '../../../http-types/http-response';
import { sendMessageListValidator } from '../../../validators/baileys/message/send-message-list.validator';

export class SendMessageListController implements ControllerInterface {
  constructor(private usecase: WhatsappService) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { to, title, description, buttonText, sections, text } = request.body;

    sendMessageListValidator.validateSync({
      title,
      to,
      id,
      description,
      buttonText,
      sections,
      text,
    });

    const execute = await this.usecase.sendListMessage({
      title,
      to,
      id,
      description,
      buttonText,
      sections,
      text,
    });

    return new HttpResponse(
      {
        message: 'Message list Sent Successfully',
        data: execute,
      },
      { 'Content-Type': 'application/json' },
      200,
    );
  }
}
