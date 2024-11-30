import { DataSource } from 'typeorm';
import { entities } from './entities';
import * as dotenv from 'dotenv';


dotenv.config()
export const AppDataSource = new DataSource({
  migrations: ['src/database/migrations/*.ts'],
  type: process.env.DB_TYPE as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mongodb', 
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: true,
  entities: entities,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
