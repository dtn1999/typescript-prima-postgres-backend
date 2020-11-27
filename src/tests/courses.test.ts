/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import Hapi from '@hapi/hapi';
import { createServer } from '../server';
// TODO Implement tests

describe('POST /api/courses create courses', () => {
  let server:Hapi.Server;

  beforeAll(async () => {
    server = await createServer();
  });
  afterAll(async () => {
    await server.stop();
  });

  test('POST /api/{userId}/courses : should works', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/30/courses',
      payload: {
        name: 'IMPLEMENTATION OF MODER BACKEND',
        courseDetails: 'This course show how to implement a modern backend using the a type safe develeppemnt stack',
      },
    });
    // results
    expect(response.statusCode).toEqual(201);
    const responsePayload = JSON.parse(response.payload);
    expect(responsePayload.course).toBeTruthy();
  });

  test('POST /api/{userId}/courses : shouldn\'t works', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/3000/courses',
      payload: {
        name: 'IMPLEMENTATION OF MODER BACKEND',
        courseDetails: 'This course show how to implement a modern backend using the a type safe develeppemnt stack',
      },
    });
      // results
    expect(response.statusCode).toEqual(500);
    const responsePayload = JSON.parse(response.payload);
    expect(responsePayload.error).toBeTruthy();
  });
});

// test get endpoint

describe('GET /api/courses get courses', () => {
  let server:Hapi.Server;

  beforeAll(async () => {
    server = await createServer();
  });
  afterAll(async () => {
    await server.stop();
  });

  test('GET /api/{userId}/courses : should works', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/30/courses',
    });
    // results
    expect(response.statusCode).toEqual(200);
    const responsePayload = JSON.parse(response.payload);
    expect(responsePayload.courses).toBeTruthy();
  });

  test('GET /api/{userId}/courses : false path should failled', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/courses',
    });
    // results
    expect(response.statusCode).toEqual(404);
    const responsePayload = JSON.parse(response.payload);
    expect(responsePayload.courses).toBeFalsy();
  });
  // get course by id
  test('GET /api/{userId}/courses/{courseId} : courses id doen\'t exist', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/30/courses/1',
    });
    // results
    expect(response.statusCode).toEqual(404);
    const responsePayload = JSON.parse(response.payload);
    expect(responsePayload.error).toBeTruthy();
  });

  // get course by id
  test('GET /api/{userId}/courses/{courseId} : should works', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/30/courses/37',
    });
    // results
    expect(response.statusCode).toEqual(200);
    const responsePayload = JSON.parse(response.payload);
    expect(responsePayload.course).toBeTruthy();
  });
});
