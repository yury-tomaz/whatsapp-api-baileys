import { BaileysInstanceRepositoryInterface } from "../../../../../domain/repositories/baileys-instance.repository.interface";
import { SendImageMessageUseCaseInputDTO } from "./send-image-message.dto";
import { SendImageMessageUseCase } from "./send-image-message.usecase";



jest.mock("../../../../../domain/repositories/baileys-instance.repository.interface");

describe('SendImageMessageUseCase', () => {
    let usecase: SendImageMessageUseCase;
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

        usecase = new SendImageMessageUseCase(mockRepository);
    });

    it('should be able to send an image message', async () => {
        const input: SendImageMessageUseCaseInputDTO = {
            key: 'non-existent-key',
            to: 'user-id',
            file: {
                buffer: Buffer.from(''),
                destination: '',
                encoding: '',
                fieldname: '',
                filename: '',
                mimetype: 'image/jpeg',
                originalname: 'image.jpg',
                path: '',
                size: 0,
                stream: {} as any
            },
            caption: 'Audio caption'
        };

        await expect(usecase.execute(input)).resolves.not.toThrow();
    });
});