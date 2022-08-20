import { Expose } from 'class-transformer';
import { UserRole } from '../../../infrastructure/entities/user.entity';

export class UserDto {
  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  role: UserRole;

  // TODO: add when relations have their own dto
  // recipes: Recipe[];

  // reviews: Review[];

  // replies: Review[];
}
