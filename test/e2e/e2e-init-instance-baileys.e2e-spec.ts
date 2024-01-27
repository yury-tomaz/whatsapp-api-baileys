import request from 'supertest';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { app, client } from '../../src/main/server/app'
import { logger } from '../../src/infrastructure/logger';
import TestAgent from 'supertest/lib/agent';
import { faker } from '@faker-js/faker';

describe('init Baileys instance e2e test', () => {
    let server: Server<typeof IncomingMessage, typeof ServerResponse>;
    let api: TestAgent;

    beforeAll(async () => {
        server = app.listen(() => logger.info('Server is running on port'));
        api = request(server);
    });

    afterAll(async () => {
        client.close();
        server.close();
    });

    it('should be possible to start an instance of Baileys', async () => {

        const data = {
            key: faker.string.uuid(),
            webhook: faker.internet.url(),
            allowWebhook: false,
            heardEvents: ['all'],
            isWebhookBase64: false,
            markMessagesRead: false,
            apiKey: faker.string.uuid()
        }

        const response = await api.post('/api/baileys')
        .send(data)
        .set('Accept-Version', '1.0.0');

        expect(response.status).toBe(200);
    });
});