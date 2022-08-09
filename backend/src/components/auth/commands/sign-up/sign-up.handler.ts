import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { SignUpCommand } from './sign-up.command';
import {
  User,
  UserRole,
} from '../../../../infrastructure/entities/user.entity';
import { dumpTokenPayload } from '../../auth.helpers';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    command: SignUpCommand,
  ): Promise<{ user: User; token: string }> {
    const hashedPassword = await bcrypt.hash(command.data.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({
        ...command.data,
        password: hashedPassword,
        role: UserRole.Taster,
      }),
    );

    const tokenPayload = dumpTokenPayload(user);
    const token = await this.jwtService.signAsync(tokenPayload, {
      audience: tokenPayload.aud,
      issuer: tokenPayload.iss,
      subject: tokenPayload.sub,
      expiresIn: tokenPayload.exp - tokenPayload.iat,
      algorithm: tokenPayload.alg,
      secret: process.env.JWT_TOKEN_SECRET,
    });

    return { user, token };
  }
}
