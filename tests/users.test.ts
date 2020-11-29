/* eslint-disable no-undef */
import Hapi from '@hapi/hapi';
import { createServer } from '../src/server';

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

  // const user
  const goodUser = {
    email: '',
    lastName: 'john',
    firstName: 'doe',
    social: {
      facebook: 'danyls',
    },
  };

  const badUser = {
    email: '',
    firstName: 'doe',
    social: {
      facebook: 'danyls',
    },
  };
  /**
   * succeed
   */
  test('endpoint /api/users : Create user', async () => {
    lastEmail = `john${Date.now().toString()}@email.com`;
    goodUser.email = lastEmail;
    const response = await server.inject({
      method: 'POST',
      url: '/api/users',
      payload: {
        ...goodUser,
      },
    });
    expect(response.statusCode).toEqual(201);
    const responsePayload = JSON.parse(response.payload);
    userId = responsePayload.user.id;
    expect(userId).toBeTruthy();
  });

  /**
   *  failled because bad user payload
   */

  test('POST /api/users : failled because of bad payload ', async () => {
    badUser.email = `john${Date.now().toString()}@email.com`;

    const response = await server.inject({
      method: 'POST',
      url: '/api/users',
      payload: {
        ...badUser,
      },
    });
    expect(response.statusCode).toEqual(400);
    const responsePayload = JSON.parse(response.payload);
    expect(responsePayload.error).toBeTruthy();
  });

  /**
   * failled because of email violation constraints
   */
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
    expect(response.statusCode).toEqual(422);
    const responsePayload = JSON.parse(response.payload);
    expect(responsePayload.error).toBeTruthy();
  });

  test('get all the user', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/users',
    });

    expect(response.statusCode).toEqual(200);
    const responsePayload = JSON.parse(response.payload);
    expect(responsePayload.users).toBeTruthy();
  });

  test('get  user with a wrong id: failled bad id', async () => {
    const response = await server.inject({
      method: 'GET',
      url: `/api/users/${-userId}`,
    });

    expect(response.statusCode).toEqual(401);
    const responsePayload = JSON.parse(response.payload);
    expect(responsePayload.error).toBeTruthy();
  });

  test('get  user with a good id but unautorized', async () => {
    const response = await server.inject({
      method: 'GET',
      url: `/api/users/${userId}`,
    });

    expect(response.statusCode).toEqual(401);
    const responsePayload = JSON.parse(response.payload);
    expect(responsePayload.user).toBeFalsy();
  });

  test('delete user', async () => {
    const response = await server.inject({
      method: 'DELETE',
      url: `/api/users/${userId}`,
    });

    expect(response.statusCode).toEqual(401);
  });

  test('delete user, but passing wrong parameter', async () => {
    const response = await server.inject({
      method: 'DELETE',
      url: `/api/users/${'userId'}`,
    });

    expect(response.statusCode).toEqual(401);
  });

  test('delete user that doesn t exist on the server', async () => {
    const response = await server.inject({
      method: 'DELETE',
      url: `/api/users/${userId}`,
    });

    expect(response.statusCode).toEqual(401);
  });
});
