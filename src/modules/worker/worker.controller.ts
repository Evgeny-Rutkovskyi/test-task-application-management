import { Controller } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('worker')
export class WorkerController {
    constructor(private readonly workerService: WorkerService) { }
    
    @EventPattern('requests.update')
    async handleUpdateStatus(@Payload() data: any) {
        await this.workerService.handleUpdateStatus(data);
    }
}
