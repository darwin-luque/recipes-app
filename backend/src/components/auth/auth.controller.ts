import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Public } from '../../infrastructure/decorators/public.decorator';
import { User } from '../../infrastructure/entities/user.entity';
import { SignInCommand } from './commands/sign-in';
import { SignUpCommand } from './commands/sign-up';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('sign-up')
  @Public()
  signup(@Body() body: SignUpDto): Promise<User> {
    return this.commandBus.execute(new SignUpCommand(body));
  }

  @Post('sign-in')
  @Public()
  signin(@Body() body: SignInDto): Promise<User> {
    return this.commandBus.execute(new SignInCommand(body));
  }
}
