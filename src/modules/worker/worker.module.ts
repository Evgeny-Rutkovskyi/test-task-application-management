import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { rabbitMqClients } from 'src/common/config/rabbitmq.client';
import { ClientsModule } from '@nestjs/microservices';
import { StatementModule } from '../statement/statement.module';
import { RabbitMqModule } from '../rabbit-mq/rabbit-mq.module';

@Module({
  imports: [ClientsModule.registerAsync([
    rabbitMqClients.find(client => client.name === 'REQUEST_UPDATE_SERVICE')
  ]), StatementModule, RabbitMqModule],
  providers: [WorkerService],
  controllers: [WorkerController]
})
export class WorkerModule {}
