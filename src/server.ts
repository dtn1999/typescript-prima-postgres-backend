import Hapi from '@hapi/hapi';
import {
  statusPlugin,
  prismaPlugin,
  usersPlugin,
  coursesPlugin,
} from './plugins';

export async function createServer():Promise<Hapi.Server> {
  console.log('========== server is being created =================');
  const server:Hapi.Server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
  });
  await server.register([
    statusPlugin,
    prismaPlugin,
    usersPlugin,
    coursesPlugin,
  ]);
  await server.initialize();
  return server;
}
export async function startServer(server:Hapi.Server):Promise<Hapi.Server> {
  await server.start();
  console.log(`🚀 Server is running on ${server.info.uri}`);
  return server;
}

process.on('unhandledRejection', (error) => {
  console.error(error);
  process.exit(1);
});
