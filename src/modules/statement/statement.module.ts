import { Module } from '@nestjs/common';
import { StatementController } from './statement.controller';
import { StatementService } from './statement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statement } from './entity/statement.entity';
import { RabbitMqModule } from '../rabbit-mq/rabbit-mq.module';

@Module({
  imports: [TypeOrmModule.forFeature([Statement]), RabbitMqModule],
  controllers: [StatementController],
  providers: [StatementService],
  exports: [StatementService]
})
export class StatementModule {}
