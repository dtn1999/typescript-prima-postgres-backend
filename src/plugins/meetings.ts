import Hapi from '@hapi/hapi';
import { meetingsController } from '../controllers';

const meetingsPlugin:Hapi.Plugin<undefined> = {
  name: 'app/meetings',
  dependencies: ['app/prisma'],
  register: async (server:Hapi.Server) => {
    /** create routes for meeting endpoints */
    server.route([
      /** create a meeting */
      {
        method: 'POST',
        path: '/meetings',
        handler: meetingsController.createMeetingHandler,
      },
    ]);
  },
};

export default meetingsPlugin;
