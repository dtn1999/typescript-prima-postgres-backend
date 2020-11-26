/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import Hapi from '@hapi/hapi';
import { PrismaClient } from '@prisma/client';

declare module '@hapi/hapi' {
    interface ServerApplicationState{
       prisma: PrismaClient
    }
}

const prismaPlugin: Hapi.Plugin<undefined> = {
  name: 'prisma',
  register: (server:Hapi.Server) => {
    const prisma = new PrismaClient();

    // define a global accessible install of prisma for all the other routes
    server.app.prisma = prisma;

    server.ext({
      type: 'onPostStop',
      method: async (server:Hapi.Server) => {
        server.app.prisma.$disconnect();
      },
    });
  },
};

export default prismaPlugin;
