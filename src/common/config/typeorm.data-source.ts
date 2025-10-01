import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as path from 'path';
import dbConfig from './db.config';

export const AppDataSource = new DataSource({
  ...dbConfig(),
  migrations: [path.resolve(__dirname, '../migrations/*.{ts,js}')],
});