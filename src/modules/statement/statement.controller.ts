import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { StatementService } from './statement.service';
import { CreateStatementDto, createStatementSchema } from './dto/create-statement.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('requests')
export class StatementController {
    constructor(private readonly statementService: StatementService) { }

    /*
    В подальшому можна зробити пагінацію на цей хендлер,
    так як заявок може бути велика кількість і витягувати кожного разу їх всіх буде
    доволі навантаженим на систему. Це можна реалізувати наступним чином - 
    з клієнта приходять два query параметра - offset і limit, 
    перший вказує скільки заявок вже отримав клієнт, а limit на поточну вибірку
    скільки повинно бути витягнутими записів з бази.
    Також можна накласти фільтри, щоб можна було по умовам діставати заявки з конкретними статусами
    */
    @Get()
    async get() {
        return await this.statementService.get();
    }

    @Post()
    @UsePipes(new ZodValidationPipe(createStatementSchema))
    async create(@Body() createStatementDto: CreateStatementDto) {
        return await this.statementService.create(createStatementDto);
    }
}
