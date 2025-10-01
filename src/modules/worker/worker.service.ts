import { Injectable } from '@nestjs/common';
import { StatementService } from '../statement/statement.service';
import { Payload } from 'src/common/lib/types/request-payload.type';
import { RabbitMqService } from '../rabbit-mq/rabbit-mq.service';
import { Statement_WORKFLOW } from 'src/common/lib/constants/statement-workflow';

@Injectable()
export class WorkerService {
    constructor(
        private readonly statementService: StatementService,
        private readonly rabbitmqService: RabbitMqService
    ) { }
    
    async handleUpdateStatus(data: Payload) {
        const currentIndex = Statement_WORKFLOW.indexOf(data.currentStatus);
        if (currentIndex === -1) return; 

        const nextStatus = Statement_WORKFLOW[currentIndex + 1];
        if (!nextStatus) return;

        await this.statementService.updateStatus(data.id, nextStatus);

        this.rabbitmqService.sendRequest({
            id: data.id,
            currentStatus: nextStatus,
        });
    }
}
