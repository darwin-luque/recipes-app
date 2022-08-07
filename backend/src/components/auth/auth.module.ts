import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { User } from '../../infrastructure/entities/user.entity';
import { CommandHandlers } from './commands/handlers';
import { AuthController } from './auth.controller';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [...CommandHandlers],
})
export class AuthModule {}
