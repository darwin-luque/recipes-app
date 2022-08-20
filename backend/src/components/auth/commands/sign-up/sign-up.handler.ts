import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { SignUpCommand } from './sign-up.command';
import {
  User,
  UserRole,
} from '../../../../infrastructure/entities/user.entity';
import { dumpTokenPayload } from '../../auth.helpers';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from '../../auth.types';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: SignUpCommand): Promise<UserToken> {
    const hashedPassword = await bcrypt.hash(command.data.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({
        ...command.data,
        password: hashedPassword,
        role: UserRole.Taster,
      }),
    );

    const tokenPayload = dumpTokenPayload(user);
    const token = await this.jwtService.signAsync(tokenPayload);

    return { user, token };
  }
}
