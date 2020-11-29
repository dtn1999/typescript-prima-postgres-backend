import Joi from '@hapi/joi';
import { TMeeting } from '../models';

const createMeetingPayloadSchema = Joi.object<TMeeting>().keys({
  theme: Joi.string().required(),
  title: Joi.string().required(),
  meetingDetails: Joi.string().required(),
});
const MeetingParamSchema = Joi.object({
  hostId: Joi.string().pattern(/^\d+$/),
});
export { createMeetingPayloadSchema, MeetingParamSchema };
