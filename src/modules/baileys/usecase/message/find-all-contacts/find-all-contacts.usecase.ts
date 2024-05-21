import FindAllContactsUseCaseDto from './find-all-contacts.dto';
import { ContactRepository } from '../../../repository/contact-repository';

export class FindAllContactsUseCase {
  constructor(private contactRepository: ContactRepository) {}

  async execute(input: FindAllContactsUseCaseDto) {
    const contacts = await this.contactRepository.find({
      sessionId: input.id,
      page: Number(input.page),
      limit: Number(input.limit),
    });

    return contacts;
  }
}
