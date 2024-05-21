import { FindAllMessageUseCaseDto } from './find-all-message.dto';
import { MessageRepository } from '../../../repository/message-repository';

export class FindAllMessageUseCase {
  constructor(private messageRepository: MessageRepository) {}

  async execute(input: FindAllMessageUseCaseDto) {
    const messages = await this.messageRepository.find({
      sessionId: input.id,
      page: Number(input.page),
      limit: Number(input.limit),
      to: input.to,
    });

    return messages;
  }
}
