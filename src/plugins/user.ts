import Hapi from '@hapi/hapi';
import { usersContoller } from '../controllers';

const usersPlugin:Hapi.Plugin<undefined> = {
  name: 'app/users',
  dependencies: ['app/prisma'],
  register: (server:Hapi.Server) => {
    server.route([
      // Post: create user route
      {
        method: 'POST',
        path: '/users',
        handler: sersContoller.createUserHandleru,
      },
      // Get: get user by id route

      // Get: get all users route

      // Put: update existing user by id

      // Delete: delete existing user by id route

    ]);
  },
};

export default usersPlugin;
