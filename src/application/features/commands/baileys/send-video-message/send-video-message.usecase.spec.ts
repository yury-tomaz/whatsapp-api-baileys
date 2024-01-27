import { BaileysInstanceRepositoryInterface } from "../../../../../domain/repositories/baileys-instance.repository.interface";
import { SendVideoMessageUseCaseInputDTO } from "./send-video-message.dto";
import { SendVideoMessageUseCase } from "./send-video-message.usecase";

jest.mock("../../../../../domain/repositories/baileys-instance.repository.interface");

describe('SendVideoMessageUseCase', () => {
    let usecase: SendVideoMessageUseCase;
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

        usecase = new SendVideoMessageUseCase(mockRepository);
    });

    it('should be able to send video message', async () => {
        const input: SendVideoMessageUseCaseInputDTO = {
            key: 'non-existent-key',
            to: 'user-id',
            file: {
                buffer: Buffer.from(''),
                mimetype: 'video/mp4',
                originalname: 'video.mp4',
                destination: '',
                fieldname: '',
                filename: '',
                path: '',
                size: 0,
                stream: {} as any,
                encoding: ''
            },
            caption: 'Video caption'
        };

        await expect(usecase.execute(input)).resolves.not.toThrow();
    });
});