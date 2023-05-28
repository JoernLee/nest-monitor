import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { collectDefaultMetrics } from 'prom-client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  collectDefaultMetrics();
  await app.listen(3000);
}
bootstrap();
