import { startServer, createServer } from './server';

createServer().then(startServer)
  .catch((error) => {
    console.error(error);
  });
