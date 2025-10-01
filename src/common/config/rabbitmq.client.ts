import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';

export const rabbitMqClients: ClientsProviderAsyncOptions[] = [
  {
    name: 'REQUEST_UPDATE_SERVICE',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      transport: Transport.RMQ,
      options: {
        urls: [configService.get<string>('RABBITMQ_URL')],
        queue: 'requests.update',
        queueOptions: {
          durable: true,
        },
      },
    }),
  },
  {
    name: 'REQUEST_DELAYED_SERVICE',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
        urls: [configService.get<string>('RABBITMQ_URL')],
        queue: 'requests.delayed',
        queueOptions: {
            durable: true,
            arguments: {
            'x-dead-letter-exchange': '',
            'x-dead-letter-routing-key': 'requests.update',
            'x-message-ttl': 5000,
            },
        },
        },
    }),
    }
];
