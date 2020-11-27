// eslint-disable-next-line no-unused-vars
import Hapi from '@hapi/hapi';
import boom from '@hapi/boom';

// TODO Implement Tests
type CourseInput={
    name: string,
    courseDetails: string
}
export default {
  createCourseHandler: async (
    request:Hapi.Request,
    h:Hapi.ResponseToolkit,
  ) => {
    const { prisma } = request.server.app;
    const payload = request.payload as CourseInput;
    const userId = parseInt(request.params.userId, 10);
    console.log(payload.courseDetails);
    try {
      const createdCourse = await prisma.course.create({
        data: {
          name: payload.name,
          coursDetails: payload.courseDetails,
          members: {
            create: [{
              role: 'TEACHER',
              user: { connect: { id: userId } },
            }],
          },
        },
      });

      //
      return h.response({ course: createdCourse }).code(201);
    } catch (error) {
      console.error(error);
      return boom.badImplementation('Error while trying');
    }
  },
  getAllCoursesHandler: async (request:Hapi.Request, h:Hapi.ResponseToolkit) => {
    const { prisma } = request.server.app;
    try {
      const courses = await prisma.course.findMany();
      return h.response({ courses }).code(200);
    } catch (error) {
      console.error(error);
      return boom.badImplementation('Error occured while trying to get all the courese');
    }
  },
  getCourseByIdHandler: async (request:Hapi.Request, h:Hapi.ResponseToolkit) => {
    const { prisma } = request.server.app;
    const courseId = parseInt(request.params.courseId, 10);
    try {
      const course = await prisma.course.findUnique({ where: { id: courseId } });
      if (!course) {
        throw new Error('DONT_EXIST');
      }
      return h.response({ course }).code(200);
    } catch (error) {
      console.error(error);
      if (error.message === 'DONT_EXIST') {
        return boom.notFound('The course you are looking at don\'t seems to exist');
      }
      return boom.badImplementation(error.message || 'Error occured while trying to get all the courese');
    }
  },
};

//
