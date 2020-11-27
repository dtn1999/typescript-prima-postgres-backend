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

  getUserByIdHandler: async (
    request:Hapi.Request,
    h:Hapi.ResponseToolkit,
  ) => {
    const { prisma } = request.server.app;
    const { userId } = request.params;
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          id: parseInt(userId, 10),
        },
      });
      if (!existingUser) {
        throw new Error("User doesn't exist");
      }
      return h.response({ user: existingUser }).code(200);
    } catch (error) {
      console.error(error);
      return boom.notFound(error.message || 'User does   nt exist');
    }
  },

  deletUserByIdHandler: async (
    request:Hapi.Request,
    h:Hapi.ResponseToolkit,
  ) => {
    const { prisma } = request.server.app;
    const { userId } = request.params;
    console.log('hello');
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: parseInt(userId, 10) },
      });
      if (!deletedUser) {
        throw new Error('No user with the given ID');
      }
      return h.response().code(204);
    } catch (error) {
      console.error(error);
      return boom.notFound(error.message || 'User to deleted wasn\'t found');
    }
  },
};
