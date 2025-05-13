import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validate } from 'class-validator';

async function bootstrap() {
  const env = validate({
    JWT_SECRET: { type: 'string', minLength: 32 },
    DB_HOST: { type: 'string' },
  });
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
