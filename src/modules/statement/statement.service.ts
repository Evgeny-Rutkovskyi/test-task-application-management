import { Injectable } from '@nestjs/common';
import { CreateStatementDto } from './dto/create-statement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Statement } from './entity/statement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatementService {
    constructor(
        @InjectRepository(Statement)
        private readonly statementRepository: Repository<Statement>
    ) { }
    
    async get(): Promise<Statement[]> {
        return await this.statementRepository.find();
    }

    async create(createStatementDto: CreateStatementDto): Promise<Statement> {
        const newStatement = this.statementRepository.create(createStatementDto);
        await this.statementRepository.save(newStatement);
        return {...newStatement};
    }
}
