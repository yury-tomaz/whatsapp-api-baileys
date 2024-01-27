import { BaileysInstanceRepositoryInterface } from "../../../../../domain/repositories/baileys-instance.repository.interface";
import { SendTextMessageUseCaseInputDTO } from "./send-text-message.dto";
import { SendTextMessageUseCase } from "./send-text-message.usecase";


jest.mock("../../../../../domain/repositories/baileys-instance.repository.interface");

describe('SendTextMessageUseCase', () => {
    let usecase: SendTextMessageUseCase;
    let mockRepository: jest.Mocked<BaileysInstanceRepositoryInterface>;

    beforeAll(() => {
        mockRepository = new (jest.fn(() => ({
            find: jest.fn().mockResolvedValue({
                waSocket: {
                    sendMessage: jest.fn(),
                },
                verifyId: jest.fn(),
            }),
            create: jest.fn().mockResolvedValue(undefined),
            update: jest.fn().mockResolvedValue(undefined),
            findAll: jest.fn().mockResolvedValue([]),
            delete: jest.fn().mockResolvedValue(undefined),
        })))() as jest.Mocked<BaileysInstanceRepositoryInterface>;

        usecase = new SendTextMessageUseCase(mockRepository);
    });

    it('should be able to send an text message', async () => {
        const input: SendTextMessageUseCaseInputDTO = {
            key: 'non-existent-key',
            message: 'Hello World',
            to: 'user-id',
        };

        await expect(usecase.execute(input)).resolves.not.toThrow();
    });
});