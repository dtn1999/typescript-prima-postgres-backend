import Hapi from '@hapi/hapi';
import { apiStatusPlugin } from './plugins';

export async function createServer():Promise<Hapi.Server> {
  console.log('Server is Starting ...');
  const server:Hapi.Server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
  });
  await server.register([apiStatusPlugin], {
    routes: {
      prefix: '/api',
    },
  });
  await server.initialize();
  return server;
}

export async function startServer(server:Hapi.Server):Promise<Hapi.Server> {
  await server.start();
  console.log(`🚀 server has started on location : ${server.info.uri}`);
  return server;
}

process.on('unhandledRejection', (error) => {
  console.error('Server has failled to start ', error);
  process.exit(1);
});
