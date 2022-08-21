import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../infrastructure/entities/user.entity';
import { UpdateUserByIdCommand } from './update-user-by-id.command';

@CommandHandler(UpdateUserByIdCommand)
export class UpdateUserByIdHandler
  implements ICommandHandler<UpdateUserByIdCommand>
{
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async execute(command: UpdateUserByIdCommand): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: command.id });

    if (!user) {
      throw new NotFoundException(`User with id ${command.id} not found`);
    }

    Object.assign(user, command.data);

    return this.usersRepository.save(user);
  }
}
