import { BaileysInstanceRepositoryInterface } from "../../../../../domain/repositories/baileys-instance.repository.interface";
import { SendMediaUrlMessageInputDTO } from "./send-media-url-message.dto";
import { SendMediaUrlMessageUseCase } from "./send-media-url-message.usecase";

jest.mock("../../../../../domain/repositories/baileys-instance.repository.interface");

describe('SendMediaUrlMessageUseCase', () => {
    let usecase: SendMediaUrlMessageUseCase;
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

        usecase = new SendMediaUrlMessageUseCase(mockRepository);
    });

    it('should be able to send an media url message', async () => {
        const input: SendMediaUrlMessageInputDTO = {
            key: 'non-existent-key',
            to: 'user-id',
            mimetype: 'image/jpeg',
            type: 'image',
            url: 'https://example.com/image.jpg',
            caption: 'Image caption'
        };

        await expect(usecase.execute(input)).resolves.not.toThrow();
    });
});