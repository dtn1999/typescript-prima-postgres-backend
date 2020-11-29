/* eslint-disable no-shadow */
import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';
import Boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import { add } from 'date-fns';

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
        handler: async (request:Hapi.Request, h:Hapi.ResponseToolkit) => {
          const { prisma, sendEmailToken } = request.server.app;
          const payload = request.payload as LoginInput;
          const { errors, error } = LoginInputSchema.validate(payload);
          if (errors || error) {
            return Boom.badRequest('make use you are passing your email in the request payload');
          }
          const emailToken = generateEmailToken();
          const tokenExpiration = add(new Date(), { minutes: EMAIL_TOKEN_EXPIRATION_MINUTE });

          try {
            const createdToken = await prisma.token.create({
              data: {
                emailToken,
                expiration: tokenExpiration,
                tokenType: 'EMAIL',
                user: {
                  connectOrCreate: {
                    create: {
                      email: payload.email,
                    },
                    where: {
                      email: payload.email,
                    },
                  },
                },
              },
            });

            // TODO remove todo after
            console.log(createdToken);
            await sendEmailToken(payload.email, emailToken);
            return h.response().code(200);
          } catch (error) {
            console.error(error);
            return Boom.badImplementation(error.message);
          }
        },
        options: {
          auth: false,
        },
      },
      /** authenticate endpoint to validate the token */
      {
        method: 'POST',
        path: '/authenticate',
        handler: async (request:Hapi.Request, h:Hapi.ResponseToolkit) => {
          const { prisma } = request.server.app;
        },
        options: {
          auth: false,
        },
      },
    ]);
  },
};

async function validateAPIToken(
  decoded: APITokenPayload,
  request:Hapi.Request,
  h:Hapi.ResponseToolkit,
) {
  const { prisma } = request.server.app;
  const { tokenId } = decoded;

  const { error, errors } = apiTokenSchema.validate(decoded);
  if (error || errors) {
    return { isValid: false };
  }
  //   try {
  //       const
  //   } catch (error) {

//   }
}

function generateApiToken(tokenId:number) {
  const jwtPayload = { tokenId };

  return jwt.sign(jwtPayload, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
  });
}

// Generate a random 8 digit number as the email token
function generateEmailToken(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}
export default authPlugin;

const JWT_SECRET = process.env.JWT_SECRET || 'THIS IS A RANDOM SECRET TOKEN ADD YOUR OWN';
const API_AUTH_STRATEGEY = 'API';
const JWT_ALGORITHM = 'HS256';

const EMAIL_TOKEN_EXPIRATION_MINUTE = 10;
const AUTHENTICATION_TOKEN_EXPRIRATION_HOURS = 12;

const apiTokenSchema = Joi.object({
  tokenId: Joi.number().integer().required(),
  iat: Joi.any(),
  exp: Joi.any(),
});

type APITokenPayload = {
    tokenId: number,
    iat: string,
    exp: string
}

type LoginInput = {
    email: string
}

type AuthenticateInput= {
    email: string,
    emailToken: string
}

const LoginInputSchema = Joi.object({
  email: Joi.string().email().required(),
});
const AuthenticateInputSchema = Joi.object({
  email: Joi.string().email().required(),
  emailToken: Joi.string().alphanum(),
});
