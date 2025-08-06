import { DataSource } from 'typeorm';
import { Item } from './entities/itemEntity';
import { Label } from './entities/labelEntity';
import { Category } from './entities/categoryEntity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Item, Label, Category],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  ssl: true,
});
