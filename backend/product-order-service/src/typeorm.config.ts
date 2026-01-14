import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  throw new Error('Missing one or more required database environment variables.');
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10), // ✅ convert string to number
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Product, Order],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
