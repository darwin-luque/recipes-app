import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './config/typeorm/ormconfig';
import { AuthModule } from './components/auth/auth.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), AuthModule, CaslModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
