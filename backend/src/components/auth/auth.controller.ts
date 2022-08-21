import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CurrentUser } from '../../infrastructure/decorators/current-user.decorator';
import { Serialize } from '../../infrastructure/decorators/serialize.decorator';
import { Public } from '../../infrastructure/decorators/public.decorator';
import { User } from '../../infrastructure/entities/user.entity';
import { UpdateUserByIdCommand } from './commands/update-user-by-id';
import { SignInCommand } from './commands/sign-in';
import { SignUpCommand } from './commands/sign-up';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserTokenDto } from './dtos/user-token.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { UserDto } from './dtos/user.dto';
import { UserToken } from './auth.types';

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

  @Put('me')
  @Serialize(UserDto)
  update(
    @CurrentUser() user: User,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.commandBus.execute(new UpdateUserByIdCommand(user.id, body));
  }
}
