import Hapi from '@hapi/hapi';
import { coursesController } from '../controllers';

const coursesPlugin: Hapi.Plugin<undefined> = {
  name: 'app/course',
  dependencies: ['prisma'],
  register: async (server:Hapi.Server) => {
    /**
     * route the users
     */
    server.route([
      // create users
      {
        method: 'POST',
        path: '/api/{userId}/courses',
        handler: coursesController.createCourseHandler,
        options: {
          validate: {
            params: undefined, // TODO Joi validation schema,
            payload: undefined, // TODO Joi validation
            failAction: (request, response, error) => {
              throw error;
            },
          },
        },
      },
      // get all courses
      {
        method: 'GET',
        path: '/api/{userId}/courses',
        handler: coursesController.getAllCoursesHandler,
        options: {
          validate: {
            params: undefined, // TODO add Joi validation schema
            failAction: (req, rep, error) => {
              throw error;
            },
          },
        },
      },
      // get courses by id
      {
        method: 'GET',
        path: '/api/{userId}/courses/{courseId}',
        handler: coursesController.getCourseByIdHandler,
        options: {
          validate: {
            params: undefined, // TODO add Joi validation schema
            failAction: (req, rep, error) => {
              throw error;
            },
          },
        },
      },
    ]);
  },
};

export default coursesPlugin;
