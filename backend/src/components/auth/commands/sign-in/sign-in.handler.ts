import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../../../../infrastructure/entities/user.entity';
import { SignInCommand } from './sign-in.command';
import { dumpTokenPayload } from '../../auth.helpers';
import { UserToken } from '../../auth.types';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: SignInCommand): Promise<UserToken> {
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
    const tokenPayload = dumpTokenPayload(user);
    const token = await this.jwtService.signAsync(tokenPayload);

    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return { user, token };
  }
}
