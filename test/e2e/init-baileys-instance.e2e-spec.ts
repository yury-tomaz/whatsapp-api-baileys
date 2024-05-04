import request from 'supertest';
import {IncomingMessage, Server, ServerResponse} from 'http';
import {app} from '../../src/main/server/app'
import {faker} from '@faker-js/faker';
import TestAgent from 'supertest/lib/agent';
import {logger} from "../../src/modules/@shared/infra/logger";
import {dbConnect, dbDisconnect} from "../../src/modules/@shared/infra/persistence/settings/connection";

describe('Baileys instance ini', () => {
    let server: Server<typeof IncomingMessage, typeof ServerResponse>;
    let api: TestAgent;

    beforeAll(async () => {
        await dbConnect()
        server = app.listen(() => logger.info('Server is running on port'));
        api = request(server);
    });

    afterAll(async () => {
        await dbDisconnect()
        server.close();
    });


    it('should return 200 when POST /instance', async () => {
        const body = {
            name: faker.animal.bear(),
            belongsTo: faker.string.uuid()
        }

        const header = {
            'Authorization': `Bearer ${process.env.TOKEN}`
        }

        const response = await api.post('/instance')
            .set(header)
            .send(body)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
    });

    it('should return 400 when POST /instance with missing name', async () => {
        const body = {
            belongsTo: faker.string.uuid()
        }

        const header = {
            'Authorization': `Bearer ${process.env.TOKEN}`
        }

        const response = await api.post('/instance')
            .set(header)
            .send(body)

        expect(response.status).toBe(400);
    });

});