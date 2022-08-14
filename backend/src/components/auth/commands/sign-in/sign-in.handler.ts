import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../../../../infrastructure/entities/user.entity';
import { SignInCommand } from './sign-in.command';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: SignInCommand): Promise<User> {
    let where = {};

    if (command.data.username) {
      where = { username: command.data.username };
    }
    if (command.data.email) {
      where = { email: command.data.email };
    }

    const user = await this.userRepository.findOneBy(where);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValid = await bcrypt.compare(command.data.password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }
}
