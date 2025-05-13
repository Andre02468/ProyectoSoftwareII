import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost', // Usamos el operador nullish coalescing
  port: parseInt(process.env.DB_PORT ?? '3306', 10), // Valor por defecto como string
  username: process.env.DB_USERNAME ?? 'root',
  password: process.env.DB_PASSWORD ?? 'password',
  database: process.env.DB_DATABASE ?? 'hotel_reservation_system',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.DB_SYNCHRONIZE === 'true', // Convertir a boolean
  logging: process.env.DB_LOGGING === 'true',
  migrations: process.env.DB_MIGRATIONS ? [process.env.DB_MIGRATIONS] : [],
  migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
};