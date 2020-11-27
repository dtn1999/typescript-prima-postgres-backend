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
  let lastEmail: string;

  test('POST /api/users : Create user', async () => {
    lastEmail = `john${Date.now().toString()}@email.com`;

    const response = await server.inject({
      method: 'POST',
      url: '/api/users',
      payload: {
        email: lastEmail,
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
  test('POST /api/users : failled because of email violation constraint', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/users',
      payload: {
        email: lastEmail,
        lastName: 'john',
        firstName: 'doe',
        social: {
          facebook: 'danyls',
        },
      },
    });
    expect(response.statusCode).toEqual(500);
    const responsePayload = JSON.parse(response.payload);
    expect(responsePayload.error).toBeTruthy();
  });

  test('delete user', async () => {
    const response = await server.inject({
      method: 'DELETE',
      url: `/api/users/${userId}`,
    });

    expect(response.statusCode).toEqual(204);
  });
});
