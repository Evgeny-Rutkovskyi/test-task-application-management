import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './common/config/db.config';
import { StatementModule } from './modules/statement/statement.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
      load: [dbConfig],
    }),TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dbConfig(),
        autoLoadEntities: true,
      }),
    }), StatementModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
