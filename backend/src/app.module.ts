import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AuthGuard } from './infrastructure/guards/auth.guard';
import { AuthModule } from './components/auth/auth.module';
import { CaslModule } from './components/casl/casl.module';
import { ormconfig } from './config/typeorm/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), AuthModule, CaslModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
