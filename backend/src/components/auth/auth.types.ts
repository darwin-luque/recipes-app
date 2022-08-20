import { User } from '../../infrastructure/entities/user.entity';

export interface UserToken {
  user: User;
  token: string;
}
