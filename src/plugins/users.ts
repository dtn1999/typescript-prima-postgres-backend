import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';
import usersContoller from '../controllers';
import { createUserPayloadSchema } from '../validations';

const usersPlugin:Hapi.Plugin<undefined> = {
  name: 'app/user',
  dependencies: ['prisma'],
  register: async (server:Hapi.Server) => {
    /**
      * pos method to create new users
      */
    server.route([{
      method: 'POST',
      path: '/api/users',
      handler: usersContoller.createUserHandler,
      options: {
        validate: {
          payload: undefined,
          failAction: (request, h, error) => {
            throw error;
          },
        },
      },
    },
    // get user handler
    {
      method: 'GET',
      path: '/api/users/{id}',
      handler: usersContoller.getUserByIdHandler,
      options: {
        validate: {
          params: undefined,
          failAction: (request, h, error) => {
            throw error;
          },
        },
      },
    },

    ]);
  },
};

export default usersPlugin;
