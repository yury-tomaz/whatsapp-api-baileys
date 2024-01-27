import { BaileysInstanceRepositoryInterface } from "../../../../../domain/repositories/baileys-instance.repository.interface";
import { sendAudioMessageUseCaseInputDTO } from "./send-audio-message.dto";
import { SendAudioMessageUseCase } from "./send-audio-message.usecase";

jest.mock("../../../../../domain/repositories/baileys-instance.repository.interface");

describe('SendAudioMessageUseCase', () => {
    let usecase: SendAudioMessageUseCase;
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

        usecase = new SendAudioMessageUseCase(mockRepository);
    });

    it('should be able to send an audio message', async () => {
        const input: sendAudioMessageUseCaseInputDTO = {
            key: 'non-existent-key',
            to: 'user-id',
            file: {
                buffer: Buffer.from(''),
                stream: {} as any,
                destination: '',
                fieldname: '',
                filename: '',
                mimetype: '',
                originalname: '',
                path: '',
                size: 0,
                encoding: '',
            },
            caption: 'A caption for the audio'
        };


        await expect(usecase.execute(input)).resolves.not.toThrow();
    });
});