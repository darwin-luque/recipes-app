import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { User } from '../../infrastructure/entities/user.entity';
import { CommandHandlers } from './commands/handlers';
import { AuthController } from './auth.controller';
import { jwtconfig } from '../../config/auth/jwt.config';
import { SetUserMiddleware } from '../../infrastructure/middlewares/set-user.middleware';

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
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SetUserMiddleware).forRoutes('*');
  }
}
