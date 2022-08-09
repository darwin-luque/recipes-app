import { User } from '../../infrastructure/entities/user.entity';

export const dumpTokenPayload = (user: User): TokenPayload => {
  const now = new Date().getTime() / 1000;
  return {
    aud: process.env.JWT_AUDIENCE ?? '',
    iss: process.env.JWT_ISSUER ?? '',
    sub: user.id,
    alg: 'HS256',
    iat: now,
    exp: now + Number(process.env.JWT_EXPIRATION_TIME ?? '3600'),
    email: user.email,
    role: user.role,
    family_name: user.lastName,
    given_name: user.firstName,
    name: `${user.firstName} ${user.lastName}`,
  };
};
