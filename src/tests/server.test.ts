/* eslint-disable no-undef */
import Hapi from '@hapi/hapi';
import { createServer } from '../server';

describe('Test if server starting', async () => {
  const server = await createServer();

  test('createServer: Should return instance of server', async () => {
    const isInstanceOfServer = server instanceof Hapi.Server;
    expect(isInstanceOfServer).toEqual(true);
  });
});
