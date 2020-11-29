/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import Hapi from '@hapi/hapi';
import {
  API_AUTH_STRATEGEY,
  JWT_ALGORITHM, JWT_SECRET,
} from '../models/auth';
import { authController } from '../controllers';
import { validateAPIToken } from '../auth';

const authPlugin:Hapi.Plugin<undefined> = {
  name: 'app/auth',
  dependencies: ['app/prisma', 'hapi-auth-jwt2'],
  register: async (server:Hapi.Server) => {
    if (!process.env.JWT_SECRET) {
      console.warn('the JWT_SECRET env var is not set. This is unsafe! If running in prodution set it');
    }

    server.auth.strategy(API_AUTH_STRATEGEY, 'jwt', {
      key: JWT_SECRET,
      verifyOptions: {
        algorithms: [JWT_ALGORITHM],
      },
      validate: validateAPIToken,
    });
    server.auth.default(API_AUTH_STRATEGEY);
    /** authentication endpoints */
    server.route([
      /** login endpoint */
      {
        method: 'POST',
        path: '/login',
        handler: authController.loginHaldler,
        options: {
          auth: false,
        },
      },
      /** authenticate endpoint to validate the token */
      {
        method: 'POST',
        path: '/authenticate',
        handler: authController.authenticateHandler,
        options: {
          auth: false,
        },
      },
    ]);
  },
};

export default authPlugin;
