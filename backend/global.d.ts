import { UserRole } from './src/infrastructure/entities/user.entity';

declare global {
  interface IDTokenPayload {
    sub: string;
    iss: string;
    aud: string;
    exp: number;
    iat: number;
    role: UserRole;
    name: string;
    email: string;
    given_name: string;
    family_name: string;
  }
}
