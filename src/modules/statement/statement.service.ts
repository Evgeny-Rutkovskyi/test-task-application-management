import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStatementDto } from './dto/create-statement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Statement } from './entity/statement.entity';
import { Repository } from 'typeorm';
import { StatementStatus } from 'src/common/lib/constants/statement-status.enum';
import { RabbitMqService } from '../rabbit-mq/rabbit-mq.service';
import { Statement_WORKFLOW } from 'src/common/lib/constants/statement-workflow';

@Injectable()
export class StatementService {
    constructor(
        @InjectRepository(Statement)
        private readonly statementRepository: Repository<Statement>,
        private readonly rabbitmqService: RabbitMqService
    ) { }
    
    async get(): Promise<Statement[]> {
        return await this.statementRepository.find();
    }

    async create(createStatementDto: CreateStatementDto): Promise<Statement> {
        const newStatement = this.statementRepository.create(createStatementDto);
        await this.statementRepository.save(newStatement);
        await this.rabbitmqService.sendRequest({
            id: newStatement.id,
            currentStatus: Statement_WORKFLOW[0]
        })
        return {...newStatement};
    }

    async updateStatus(id: number, nextStatus: StatementStatus): Promise<Statement> {
        const statement = await this.statementRepository.findOneBy({ id });
        if (!statement) throw new BadRequestException('Statement was not found');
        statement.status = nextStatus;
        await this.statementRepository.save(statement);
        return statement;
    }
}
