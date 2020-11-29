import jwt from 'jsonwebtoken';
import Hapi from '@hapi/hapi';
import { APITokenPayload, JWT_ALGORITHM, JWT_SECRET } from '../models/auth';
import { apiTokenSchema } from '../validations';

export function generateApiToken(tokenId:number) {
  const jwtPayload = { tokenId };

  return jwt.sign(jwtPayload, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
  });
}

// Generate a random 8 digit number as the email token
export function generateEmailToken(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

export async function validateAPIToken(
  decoded: APITokenPayload,
  request:Hapi.Request,
  // eslint-disable-next-line no-unused-vars
  h:Hapi.ResponseToolkit,
) {
  const { prisma } = request.server.app;
  const { error, errors } = apiTokenSchema.validate(decoded);
  if (error || errors) {
    return { isValid: false };
  }
  const { tokenId } = decoded;
  try {
    const fetchedToken = await prisma.token.findUnique({
      where: {
        id: tokenId,
      },
      include: {
        user: true,
      },
    });

    if (!fetchedToken || !fetchedToken.valid) {
      return {
        isValid: false,
      };
    }

    if (fetchedToken.expiration < new Date()) {
      return {
        isValid: false,
        errorMessage: 'Token expired',
      };
    }
    // find all meetings where authenticated user is host
    const hostOf = await prisma.meeting.findMany({
      where: {
        hostId: fetchedToken.userId,
      },
    });

    // token is still valid
    return {
      isValid: true,
      creadentials: {
        tokenId,
        user: fetchedToken.user,
        hostOf,
      },
    };
  // eslint-disable-next-line no-shadow
  } catch (error) {
    return { isValid: false };
  }
}
