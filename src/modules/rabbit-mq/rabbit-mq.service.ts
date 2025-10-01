import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Payload } from 'src/common/lib/types/request-payload.type';

@Injectable()
export class RabbitMqService {
    constructor(
        @Inject('REQUEST_DELAYED_SERVICE') private readonly delayedClient: ClientProxy
    ) { }

    async sendRequest(request: Payload): Promise<void> {
        this.delayedClient.emit('requests.update', request);
    }

}
