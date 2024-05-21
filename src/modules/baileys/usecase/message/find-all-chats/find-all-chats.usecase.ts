import FindAllChatsUseCaseDto from './find-all-chats.dto';
import { ChatRepository } from '../../../repository/chat-repository';

export class FindAllContactsUseCase {
  constructor(private chatRepository: ChatRepository) {}

  async execute(input: FindAllChatsUseCaseDto) {
    const chats = await this.chatRepository.find({
      sessionId: input.id,
      page: Number(input.page),
      limit: Number(input.limit),
    });

    return chats;
  }
}
