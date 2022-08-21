import { UpdateUserDto } from '../../dtos/update-user.dto';

export class UpdateUserByIdCommand {
  constructor(
    public readonly id: string,
    public readonly data: UpdateUserDto,
  ) {}
}
