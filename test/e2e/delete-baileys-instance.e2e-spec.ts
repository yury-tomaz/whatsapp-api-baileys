import request from 'supertest';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { app } from '../../src/main/server/app';
import { faker } from '@faker-js/faker';
import TestAgent from 'supertest/lib/agent';
import { logger } from '../../src/modules/@shared/infra/logger';
import {
  dbConnect,
  dbDisconnect,
} from '../../src/modules/@shared/infra/persistence/settings/connection';
import { delay } from './helper/delay';

describe('Delete baileys instance', () => {
  let server: Server<typeof IncomingMessage, typeof ServerResponse>;
  let api: TestAgent;

  beforeAll(async () => {
    await dbConnect();
    server = app.listen(() => logger.info('Server is running on port'));
    api = request(server);
  });

  afterAll(async () => {
    await dbDisconnect();
    server.close();
  });

  it('should return 200 when DELETE /instance/:id', async () => {
    const body = {
      name: faker.animal.bear(),
      belongsTo: faker.string.uuid(),
    };

    const header = {
      Authorization: `Bearer ${process.env.TOKEN}`,
    };

    const create = await api.post('/instance').set(header).send(body);

    await delay(5);

    const T = await api.delete(`/instance/${create.body.data.id}`);
    expect(T.status).toBe(200);
  }, 6000);
});
