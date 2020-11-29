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
        handler: usersContoller.createUserHandler,
      },
      // Get: get user by id route
      {
        method: 'GET',
        path: '/users/{userId}',
        handler: usersContoller.getUserByIdHandler,
      },
      // Get: get all users route
      {
        method: 'GET',
        path: '/users',
        handler: usersContoller.getUserAllHandler,
      },
      // Put: update existing user by id

      // Delete: delete existing user by id route
      {
        method: 'DELETE',
        path: '/users/{userId}',
        handler: usersContoller.deleteUserByIdHandler,
      },

    ]);
  },
};

export default usersPlugin;
