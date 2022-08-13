import * as dotenv from 'dotenv';

dotenv.config();

export const jwtconfig = {
  secret: process.env.JWT_TOKEN_SECRET,
  signOptions: {
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    expiresIn: Number(process.env.JWT_EXPIRATION_TIME),
    algorithm: 'HS256',
  },
};
