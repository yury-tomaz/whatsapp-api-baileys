import request from 'supertest';
import { IncomingMessage, Server, ServerResponse } from 'http';
import {app, mongoClient} from '../../src/main/server/app'
import { faker } from '@faker-js/faker';
import TestAgent from 'supertest/lib/agent';
import {logger} from "../../src/modules/@shared/infra/logger";

describe('Baileys instance ini', () => {
    let server: Server<typeof IncomingMessage, typeof ServerResponse>;
    let api: TestAgent;

    beforeAll(async () => {
        server = app.listen(() => logger.info('Server is running on port'));
        api = request(server);
    });

    afterAll(async () => {
        await mongoClient.close()
        server.close();
    });

    it('should return 200 when POST /instance', async () => {
        const body = {
            name: faker.animal.bear(),
            belongsTo: faker.string.uuid()
        }

        const header = {
            'Authorization' : `Bearer ${process.env.TOKEN}`
        }

        const response = await api.post('/instance')
            .set(header)
            .send(body)

        expect(response.status).toBe(200);
    });

});