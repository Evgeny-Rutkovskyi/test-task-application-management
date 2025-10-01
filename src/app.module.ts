import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './common/config/db.config';
import { StatementModule } from './modules/statement/statement.module';
import { ConfigModule } from '@nestjs/config';
import { RabbitMqModule } from './modules/rabbit-mq/rabbit-mq.module';
import { WorkerModule } from './modules/worker/worker.module';

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
    }), StatementModule, RabbitMqModule, WorkerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
