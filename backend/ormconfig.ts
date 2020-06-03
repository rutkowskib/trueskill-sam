import { ConnectionOptions } from 'typeorm';

const DB_DIRECTORY = 'src/libs/database';
const MIGRATIONS_DIR = `${DB_DIRECTORY}/migrations`;

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
     `${DB_DIRECTORY}/*.entity{.ts,.js}`,
  ],
  migrations: [
    `${MIGRATIONS_DIR}/*.ts`,
  ],
  cli: {
    migrationsDir: MIGRATIONS_DIR,
  }
};

// @ts-ignore
export = config;