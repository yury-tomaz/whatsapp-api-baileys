import request from 'supertest';
import { IncomingMessage, Server, ServerResponse } from 'http';
import {app} from '../../src/main/server/app'
import TestAgent from 'supertest/lib/agent';
import {logger} from "../../src/modules/@shared/infra/logger";

describe.skip('Base e2e test', () => {
    let server: Server<typeof IncomingMessage, typeof ServerResponse>;
    let api: TestAgent;

    beforeAll(async () => {
        server = app.listen(() => logger.info('Server is running on port'));
        api = request(server);
    });

    afterAll(async () => {
        server.close();
    });

    it('should return 200 when GET /', async () => {
        const response = await api.get('/');

        expect(response.status).toBe(200);
    });

});