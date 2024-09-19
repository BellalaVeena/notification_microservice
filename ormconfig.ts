import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as packageJson from 'package.json';

dotenv.config()
 
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts'],
    metadataTableName: 'typeorm_metadata',
    applicationName: packageJson.name,
    migrationsRun: false,
    maxQueryExecutionTime: 1000,
    logging: true,
};
export const dataSource = new DataSource(dataSourceOptions);

