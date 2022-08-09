import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { User } from '../../infrastructure/entities/user.entity';
import { CommandHandlers } from './commands/handlers';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_TOKEN_SECRET,
      signOptions: {
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER,
        expiresIn: process.env.JWT_EXPIRATION_TIME,
        algorithm: 'HS256',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [...CommandHandlers],
})
export class AuthModule {}
