// import { jwtconfig } from '../../config/auth/jwt.config';
import { User } from '../../infrastructure/entities/user.entity';

export const dumpTokenPayload = (user: User): Partial<TokenPayload> => {
  const now = new Date().getTime() / 1000;
  return {
    iat: Number(now.toFixed(0)),
    email: user.email,
    role: user.role,
    family_name: user.lastName,
    given_name: user.firstName,
    name: `${user.firstName} ${user.lastName}`,
  };
};
