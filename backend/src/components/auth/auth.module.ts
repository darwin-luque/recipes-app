import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { User } from '../../infrastructure/entities/user.entity';
import { CommandHandlers } from './commands/handlers';
import { AuthController } from './auth.controller';
import { jwtconfig } from '../../config/auth/jwt.config';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register(jwtconfig as JwtModuleOptions),
  ],
  controllers: [AuthController],
  providers: [...CommandHandlers],
})
export class AuthModule {}
