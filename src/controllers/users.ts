/* eslint-disable no-shadow */
import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import { TUser } from '../models/user';
import { createUserPayloadSchema } from '../validations';

export default {
  createUserHandler: async (request:Hapi.Request, h:Hapi.ResponseToolkit) => {
    const { prisma } = request.server.app;
    const payload = request.payload as TUser;
    const { error, errors } = createUserPayloadSchema.validate(payload);

    if (error || errors) {
      return Boom.badRequest('Make sure the data you gave in the payload of your request are correct');
    }

    try {
      const createdUser = await prisma.user.create({
        data: {
          ...payload,
        },
      });
      return h.response({ user: createdUser }).code(201);
    } catch (error) {
      console.log(error.message);
      return Boom.badData('the user you want to create seems to already exist');
    }
  },
};
