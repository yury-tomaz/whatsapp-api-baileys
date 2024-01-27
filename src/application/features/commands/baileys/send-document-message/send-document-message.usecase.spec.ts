import { BaileysInstanceRepositoryInterface } from "../../../../../domain/repositories/baileys-instance.repository.interface";
import { SendDocumentMessageUseCaseInputDTO } from "./send-document-message.dto";
import { SendDocumentMessageUseCase } from "./send-document-message.usecase";


jest.mock("../../../../../domain/repositories/baileys-instance.repository.interface");

describe('SendDocumentMessageUseCase', () => {
    let usecase: SendDocumentMessageUseCase;
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

        usecase = new SendDocumentMessageUseCase(mockRepository);
    });

    it('should be able to send an document message', async () => {
        const input: SendDocumentMessageUseCaseInputDTO = {
            key: 'non-existent-key',
            to: 'user-id',
            file:{
                buffer: Buffer.from(''),
                mimetype: 'audio/mpeg',
                originalname: 'audio.mp3'
            },
            caption: 'document caption'
        };

        await expect(usecase.execute(input)).resolves.not.toThrow();
    });
});