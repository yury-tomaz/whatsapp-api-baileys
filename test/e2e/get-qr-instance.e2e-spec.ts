import request from 'supertest';
import {IncomingMessage, Server, ServerResponse} from 'http';
import {app} from '../../src/main/server/app'
import {faker} from '@faker-js/faker';
import TestAgent from 'supertest/lib/agent';
import {logger} from "../../src/modules/@shared/infra/logger";
import {dbConnect, dbDisconnect} from "../../src/modules/@shared/infra/persistence/settings/connection";

describe('Get Qr Code', () => {
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


    it('should return 200 when GET /instance/:id/qr', async () => {
        const body = {
            name: faker.animal.bear(),
            belongsTo: faker.string.uuid()
        }

        const header = {
            'Authorization': `Bearer ${process.env.TOKEN}`
        }

        const create = await api.post('/instance')
            .set(header)
            .send(body)

        await aguardarDezSegundos()

        const T = await api.get(`/instance/${create.body.data.id}/qr?belongsTo=${body.belongsTo}`)
        expect(T.status).toBe(200);
        expect(T.body.data).toHaveProperty('qr')

    }, 6000);

});

function aguardarDezSegundos(): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 5000);
    });
}