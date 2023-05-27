import { Module } from '@nestjs/common';
import { Registry } from 'prom-client';

@Module({
  providers: [
    {
      provide: 'PROMETHEUS_REGISTRY',
      useValue: new Registry(),
    },
  ],
  exports: ['PROMETHEUS_REGISTRY'],
})
export class PrometheusModule {}
