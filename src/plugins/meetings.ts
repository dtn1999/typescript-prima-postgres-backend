import Hapi from '@hapi/hapi';
import { meetingsController } from '../controllers';
import { API_AUTH_STRATEGEY } from '../models/auth';

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
        options: {
          auth: {
            mode: 'required',
            strategy: API_AUTH_STRATEGEY,
          },
        },
        handler: meetingsController.createMeetingHandler,
      },
    ]);
  },
};

export default meetingsPlugin;
