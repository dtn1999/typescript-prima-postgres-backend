/* eslint-disable no-undef */
import Hapi from '@hapi/hapi';
import { createServer } from '../server';

describe('POST /api/users - create user', () => {
  // eslint-disable-next-line no-unused-vars
  let server:Hapi.Server;

  beforeAll(async () => {
    server = await createServer();
  });

  afterAll(async () => {
    await server.stop();
  });

  let userId: number;
  test('POST /api/users : Create user', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/users',
      payload: {
        email: `john${Date.now().toString()}@email.com`,
        lastName: 'john',
        firstName: 'doe',
        social: {
          facebook: 'danyls',
        },
      },
    });
    expect(response.statusCode).toEqual(201);
    const responsePayload = JSON.parse(response.payload);
    userId = responsePayload.user.id;
    expect(userId).toBeTruthy();
  });
});
