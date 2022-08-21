import type { User, UserRole } from './src/infrastructure/entities/user.entity';
import type { Algorithm } from 'jsonwebtoken';
import { Request } from 'express';

declare global {
  interface TokenPayload {
    sub: string;
    iss: string;
    aud: string;
    exp: number;
    iat: number;
    alg: Algorithm;
    role: UserRole;
    name: string;
    email: string;
    given_name: string;
    family_name: string;
  }

  interface ExpressRequest extends Request {
    user?: User | null;
  }
}
