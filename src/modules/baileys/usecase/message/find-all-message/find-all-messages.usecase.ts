import FindAllMessageUseCaseDto from './find-all-message.dto';
import { MessageRepository } from '../../../repository/message-repository';
import { getWhatsAppId } from '../../../helpers/get-whats-app-Id';

export class FindAllMessageUseCase {
  constructor(private messageRepository: MessageRepository) {}

  async execute(input: FindAllMessageUseCaseDto) {
    const whatsappId = getWhatsAppId(input.to);

    const messages = await this.messageRepository.find({
      sessionId: input.id,
      page: Number(input.page),
      limit: Number(input.limit),
      to: whatsappId,
    });

    return messages;
  }
}
