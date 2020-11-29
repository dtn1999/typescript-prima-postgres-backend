/* eslint-disable no-shadow */
import Boom from '@hapi/boom';
import Hapi from '@hapi/hapi';
import { TMeeting } from '../models';
import { createMeetingPayloadSchema, MeetingParamSchema } from '../validations';

export default {
  createMeetingHandler: async (request:Hapi.Request, h:Hapi.ResponseToolkit) => {
    const { prisma } = request.server.app;
    const payload = request.payload as TMeeting;
    const { errors, error } = createMeetingPayloadSchema.validate(payload);

    if (error || errors) {
      return Boom.badRequest('The given payload is not valis');
    }

    try {
      const createdMeeting = await prisma.meeting.create({
        data: {
          ...payload,
          User: {
            connect: { id: 1 },
          },
        },
      });
      return h.response({ meeting: createdMeeting }).code(201);
    } catch (error) {
      console.error(error);
      return Boom.badImplementation('error occured con the server');
    }
  },
  /** delete a meeting */
  deleteMeetingHandler: async (
    request:Hapi.Request,
    h:Hapi.ResponseToolkit,
  ) => {
    const { prisma } = request.server.app;
    const { params } = request;
    const { error, errors } = MeetingParamSchema.validate(params);

    if (error || errors) {
      return Boom.badRequest('Make sure the parameter your past with your request are correct');
    }

    try {
      const meetingId = parseInt(params.meetingId, 10);
      await prisma.meeting.delete({
        where: { id: meetingId },
      });
      return h.response().code(204);
    } catch (error) {
      console.error(error);
      return Boom.notFound('There is no meeting with the given id');
    }
  },

  /** get a meeting by id */
  getMeetingById: async (
    request:Hapi.Request,
    h:Hapi.ResponseToolkit,
  ) => {
    const { prisma } = request.server.app;
    const { params } = request;
    const { error, errors } = MeetingParamSchema.validate(params);

    if (error || errors) {
      return Boom.badRequest('Make sure the parameter your past with your request are correct');
    }

    try {
      const meetingId = parseInt(params.meetingId, 10);
      await prisma.meeting.delete({
        where: { id: meetingId },
      });
      return h.response().code(204);
    } catch (error) {
      console.error(error);
      return Boom.notFound('There is no meeting with the given id');
    }
  },
};
