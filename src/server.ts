import Hapi from '@hapi/hapi';
import { statusPlugin, prismaPlugin, usersPlugin } from './plugins';

const server:Hapi.Server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
});

export default async function start():Promise<Hapi.Server> {
  await server.register([statusPlugin, prismaPlugin, usersPlugin]);
  await server.start();
  console.log(`🚀 Server is running on ${server.info.uri}`);
  return server;
}

process.on('unhandledRejection', (error) => {
  console.error(error);
  process.exit(1);
});
start()
  .catch((error) => {
    console.error(error);
  });
