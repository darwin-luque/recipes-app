import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Public } from '../../infrastructure/decorators/public.decorator';
import { SignUpCommand } from './commands/sign-up';
import { SignUpDto } from './dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('sign-up')
  @Public()
  signup(@Body() body: SignUpDto) {
    return this.commandBus.execute(new SignUpCommand(body));
  }
}
