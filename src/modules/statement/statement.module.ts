import { Module } from '@nestjs/common';
import { StatementController } from './statement.controller';
import { StatementService } from './statement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statement } from './entity/statement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Statement])],
  controllers: [StatementController],
  providers: [StatementService]
})
export class StatementModule {}
