
import { InitBaileysInstanceUseCaseInputDTO } from "../../../../../application/contracts/usecase.interface";
import { InitBailesInstanceUseCase } from "./init-baileys-instance.usecase";

const mockRepository = jest.fn(() => ({
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
}));

// TODO: implement validate heardEvents
// TODO: implement validate webhook

describe('Init baileys instance unit test',  () => {
    let useCase: InitBailesInstanceUseCase;

    beforeAll(() => {
        useCase = new InitBailesInstanceUseCase(mockRepository());
    });

    it('should be able to start an instance of baileys', async () => {
        
        const input: InitBaileysInstanceUseCaseInputDTO = {
            key: 'key',
            allowWebhook: true,
            heardEvents: ['all'],
            isWebhookBase64: true,
            markMessagesRead: true,
            webhook: 'https://webhook.site/test',
            apiKey: 'apiKey',
        };

        const result = await useCase.execute(input);

        expect(result).toHaveProperty('key');
        expect(result).toHaveProperty('allowWebhook');
        expect(result).toHaveProperty('heardEvents');
        expect(result).toHaveProperty('webhook');
        expect(result).toHaveProperty('isOn');
    });
});