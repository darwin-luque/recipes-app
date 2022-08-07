import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { SignUpCommand } from './sign-up.command';
import {
  User,
  UserRole,
} from '../../../../infrastructure/entities/user.entity';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: SignUpCommand): Promise<{ user: User }> {
    const hashedPassword = await bcrypt.hash(command.data.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({
        ...command.data,
        password: hashedPassword,
        role: UserRole.Taster,
      }),
    );

    return { user };
  }
}
