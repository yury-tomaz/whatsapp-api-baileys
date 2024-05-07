import request from 'supertest';
import {IncomingMessage, Server, ServerResponse} from 'http';
import {app} from '../../../src/main/server/app'
import TestAgent from 'supertest/lib/agent';
import {logger} from "../../../src/modules/@shared/infra/logger";
import {dbConnect, dbDisconnect} from "../../../src/modules/@shared/infra/persistence/settings/connection";

describe.skip('Baileys accept invite group', () => {
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


    it('should return 200 when POST /api/whatsapp/group/1/accept-invite', async () => {
        const header = {
            'Authorization': `Bearer ${process.env.TOKEN}`
        }

        const response = await api.post('/api/whatsapp/group/1/accept-invite')
            .set(header)
            .query({
              codeGroup: "1"
            })

        expect(response.status).toBe(200);
    });

    it('should return 400 when POST /api/whatsapp/group/1/accept-invite with missing codeGroup', async () => {
        const header = {
            'Authorization': `Bearer ${process.env.TOKEN}`
        }

        const response = await api.post('/api/whatsapp/group/1/accept-invite')
            .set(header)

        expect(response.status).toBe(400);
    });

});