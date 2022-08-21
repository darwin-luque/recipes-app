import { NotFoundException } from '@nestjs/common';
import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../infrastructure/entities/user.entity';
import { GetUserByIdQuery } from './get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements ICommandHandler<GetUserByIdQuery> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async execute(command: GetUserByIdQuery): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: command.id });

    if (!user) {
      throw new NotFoundException(`User with id ${command.id} not found`);
    }

    return user;
  }
}
