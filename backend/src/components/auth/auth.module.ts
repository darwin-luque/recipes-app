import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../infrastructure/entities/user.entity';
import { AuthController } from './auth.controller';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
