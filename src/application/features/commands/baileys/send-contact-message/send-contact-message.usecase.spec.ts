import { BaileysInstanceRepositoryInterface } from "../../../../../domain/repositories/baileys-instance.repository.interface";
import { SendContactMessageUseCaseInputDTO } from "./send-contact-message.dto";
import { SendContactMessageUseCase } from "./send-contact-message.usecase";


jest.mock("../../../../../domain/repositories/baileys-instance.repository.interface");

describe('SendContactMessageUseCase', () => {
    let usecase: SendContactMessageUseCase;
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

        usecase = new SendContactMessageUseCase(mockRepository);
    });

    it('should be able to send an contact message', async () => {
        const input: SendContactMessageUseCaseInputDTO = {
            key: 'non-existent-key',
            to: 'user-id',
            vcard:{
                fullName: 'John Doe',
                organization: 'ACME',
                phoneNumber: '1234567890',
            }
        };

        await expect(usecase.execute(input)).resolves.not.toThrow();
    });
});