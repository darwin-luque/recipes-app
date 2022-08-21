import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CurrentUser } from '../../infrastructure/decorators/current-user.decorator';
import { Public } from '../../infrastructure/decorators/public.decorator';
import { Serialize } from '../../infrastructure/decorators/serialize.decorator';
import { User } from '../../infrastructure/entities/user.entity';
import { UserToken } from './auth.types';
import { SignInCommand } from './commands/sign-in';
import { SignUpCommand } from './commands/sign-up';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { UserTokenDto } from './dtos/user-token.dto';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('sign-up')
  @Public()
  @Serialize(UserTokenDto)
  signup(@Body() body: SignUpDto): Promise<UserToken> {
    return this.commandBus.execute(new SignUpCommand(body));
  }

  @Post('sign-in')
  @Public()
  @Serialize(UserTokenDto)
  signin(@Body() body: SignInDto): Promise<UserToken> {
    return this.commandBus.execute(new SignInCommand(body));
  }

  @Get('me')
  @Serialize(UserDto)
  me(@CurrentUser() user: User): User {
    return user;
  }
}
