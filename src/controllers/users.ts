import Hapi from '@hapi/hapi';
import boom from '@hapi/boom';

export type UserInput ={
    email: string,
    firstName : string,
    lastName : string,
    social : {
        facebook?: string,
        tweeter?: string,
        tiktok?: string,
        website?: string,
        github?: string
    }
}
export default {
  createUserHandler: async (request:Hapi.Request, h:Hapi.ResponseToolkit) => {
    const { prisma } = request.server.app;
    const payload = request.payload as UserInput;
    try {
      const createdUser = await prisma.user.create({
        data: {
          email: payload.email,
          lastName: payload.lastName,
          firstName: payload.firstName,
          social: payload.social,
        },
      });

      return h.response({ user: createdUser }).code(201);
    } catch (error) {
      console.error(error);
      return boom.badImplementation('Error while creating the user');
    }
  },

  getUserByIdHandler: (request:Hapi.Request, h:Hapi.ResponseToolkit) => {
    const { prisma } = request.server.app;
    const { userId } = request.params;
    try {
      const existingUser = prisma.user.findUnique({
        where: {
          id: parseInt(userId, 10),
        },
      });
      h.response({ user: existingUser }).code(200);
    } catch (error) {
      console.error(error);
      return boom.badImplementation('Error while creating the user');
    }
  },
};
