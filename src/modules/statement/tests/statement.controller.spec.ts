import { Test, TestingModule } from '@nestjs/testing';
import { StatementController } from '../statement.controller';
import { StatementService } from '../statement.service';
import { CreateStatementDto } from '../dto/create-statement.dto';
import { StatementStatus } from '../../../common/lib/constants/statement-status.enum';

describe('StatementController', () => {
  let controller: StatementController;
  let statementService: StatementService;

  const mockStatementService = {
    get: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatementController],
      providers: [
        {
          provide: StatementService,
          useValue: mockStatementService,
        },
      ],
    }).compile();

    controller = module.get<StatementController>(StatementController);
    statementService = module.get<StatementService>(StatementService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return an array of statements', async () => {
      const result = [
        { id: 1, status: StatementStatus.NEW },
        { id: 2, status: StatementStatus.IN_PROGRESS },
      ];
      mockStatementService.get.mockResolvedValue(result);

      expect(await controller.get()).toEqual(result);
      expect(mockStatementService.get).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create and return a new statement', async () => {
      const dto: CreateStatementDto = {
        text: 'New text'
      };
      const createdStatement = {
        id: 1,
        ...dto,
        status: StatementStatus.NEW,
      };
      mockStatementService.create.mockResolvedValue(createdStatement);

      expect(await controller.create(dto)).toEqual(createdStatement);
      expect(mockStatementService.create).toHaveBeenCalledWith(dto);
    });
  });
});
