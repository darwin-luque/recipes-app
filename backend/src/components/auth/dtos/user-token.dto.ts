import { Expose, Type } from 'class-transformer';
import { UserDto } from './user.dto';

export class UserTokenDto {
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  token: string;
}
