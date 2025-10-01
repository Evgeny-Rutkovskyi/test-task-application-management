import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './common/config/db.config';

@Module({
  imports: [TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dbConfig(),
        autoLoadEntities: true,
      }),
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
