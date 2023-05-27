import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrometheusModule } from './prometheus/prometheus.module';
import { PrometheusMiddleware } from './prometheus/prometheus.middleware';
import { Registry } from 'prom-client';

@Module({
  imports: [PrometheusModule],
  controllers: [AppController],
  providers: [AppService, Registry],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(PrometheusMiddleware).forRoutes('*');
  }
}
