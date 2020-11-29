import { createUserPayloadSchema, UserIdParamSchema } from './usersValidations';
import { MeetingParamSchema, createMeetingPayloadSchema } from './meetingsValidations';
import {
  AuthenticateInputSchema,
  LoginInputSchema,
  apiTokenSchema,
} from './authValidations';

// eslint-disable-next-line import/prefer-default-export
export {
  createUserPayloadSchema,
  UserIdParamSchema,
  MeetingParamSchema,
  createMeetingPayloadSchema,
  AuthenticateInputSchema,
  LoginInputSchema,
  apiTokenSchema,
};
