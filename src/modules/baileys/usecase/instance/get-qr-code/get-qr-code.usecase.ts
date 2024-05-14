import { BaileysInstanceRepositoryInMemory } from '../../../repository/baileys-instance-repository-in-memory';
import { checkInstance } from '../../../helpers/check-Instance';
import {
  GetQrCodeUseCaseInputDTO,
  GetQrCodeUseCaseOutPutDTO,
} from './get-qr-code.usecase.dto';

export class GetQrCodeUsecase {
  constructor(private baileysManager: BaileysInstanceRepositoryInMemory) {}

  async execute(
    input: GetQrCodeUseCaseInputDTO,
  ): Promise<GetQrCodeUseCaseOutPutDTO> {
    const result = await checkInstance(input.id, this.baileysManager);

    return {
      qr: result.qr,
    };
  }
}
