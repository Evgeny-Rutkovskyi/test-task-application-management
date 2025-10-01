import { Module } from '@nestjs/common';
import { RabbitMqService } from './rabbit-mq.service';
import { ClientsModule } from '@nestjs/microservices';
import { rabbitMqClients } from 'src/common/config/rabbitmq.client';

@Module({
  imports: [ClientsModule.registerAsync(rabbitMqClients)],
  providers: [RabbitMqService],
  exports: [RabbitMqService]
})
export class RabbitMqModule {}
