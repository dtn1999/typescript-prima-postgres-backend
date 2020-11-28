import Joi from '@hapi/joi';
import { TUser } from '../models';

export default Joi.object<TUser>().keys({
  lastName: Joi.string().required(),
  firstName: Joi.string().required(),
  email: Joi.string().email().required(),
  social: Joi.object({
    facebook: Joi.string().optional(),
    tweeter: Joi.string().optional(),
    tiktok: Joi.string().optional(),
    website: Joi.string().uri().optional(),
    github: Joi.string().optional(),
  }).optional(),
});
