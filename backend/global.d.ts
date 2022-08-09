import type { UserRole } from './src/infrastructure/entities/user.entity';
import type { Algorithm } from 'jsonwebtoken';

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
}
