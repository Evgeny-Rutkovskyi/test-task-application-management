import { Test, TestingModule } from '@nestjs/testing';
import { StatementService } from '../statement.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Statement } from '../entity/statement.entity';
import { Repository } from 'typeorm';
import { RabbitMqService } from '../../rabbit-mq/rabbit-mq.service';
import { StatementStatus } from '../../../common/lib/constants/statement-status.enum'
import { Statement_WORKFLOW } from '../../../common/lib/constants/statement-workflow';
import { BadRequestException } from '@nestjs/common';
import { CreateStatementDto } from '../dto/create-statement.dto';

describe('StatementService', () => {
  let service: StatementService;
  let statementRepository: Repository<Statement>;
  let rabbitmqService: RabbitMqService;

  const mockRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
  };

  const mockRabbitMqService = {
    sendRequest: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatementService,
        { provide: getRepositoryToken(Statement), useValue: mockRepository },
        { provide: RabbitMqService, useValue: mockRabbitMqService },
      ],
    }).compile();

    service = module.get<StatementService>(StatementService);
    statementRepository = module.get<Repository<Statement>>(getRepositoryToken(Statement));
    rabbitmqService = module.get<RabbitMqService>(RabbitMqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should return an array of statements', async () => {
      const result = [
        { id: 1, status: StatementStatus.NEW},
        { id: 2, status: StatementStatus.IN_PROGRESS },
      ];
      mockRepository.find.mockResolvedValue(result);

      expect(await service.get()).toEqual(result);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new statement and send RabbitMQ request', async () => {
      const dto: CreateStatementDto = { text: 'New text' };
      const newStatement = { id: 1, ...dto, status: Statement_WORKFLOW[0] };

      mockRepository.create.mockReturnValue(newStatement);
      mockRepository.save.mockResolvedValue(newStatement);
      mockRabbitMqService.sendRequest.mockResolvedValue(undefined);

      const result = await service.create(dto);
      expect(result).toEqual(newStatement);
      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalledWith(newStatement);
      expect(mockRabbitMqService.sendRequest).toHaveBeenCalledWith({
        id: newStatement.id,
        currentStatus: Statement_WORKFLOW[0],
      });
    });
  });

  describe('updateStatus', () => {
    it('should update the status of a statement', async () => {
      const statement = { id: 1, status: StatementStatus.NEW };
      mockRepository.findOneBy.mockResolvedValue(statement);
      mockRepository.save.mockResolvedValue({ ...statement, status: StatementStatus.IN_PROGRESS });

      const result = await service.updateStatus(1, StatementStatus.IN_PROGRESS);
      expect(result.status).toEqual(StatementStatus.IN_PROGRESS);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockRepository.save).toHaveBeenCalledWith({ ...statement, status: StatementStatus.IN_PROGRESS });
    });

    it('should throw BadRequestException if statement not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.updateStatus(1, StatementStatus.IN_PROGRESS))
        .rejects
        .toThrow(BadRequestException);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
