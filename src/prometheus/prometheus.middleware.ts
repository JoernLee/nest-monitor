import { Registry, Counter, Histogram } from 'prom-client';
import { Response, Request } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class PrometheusMiddleware implements NestMiddleware {
  private requestsCounter: Counter;
  private responseTimeHistogram: Histogram;

  constructor(private readonly prometheusRegistry: Registry) {
    // 创建并注册计数器和直方图
    this.requestsCounter = new Counter<string>({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'path', 'status'],
      registers: [prometheusRegistry],
    });
    this.responseTimeHistogram = new Histogram({
      name: 'http_response_time_seconds',
      help: 'HTTP response time in seconds',
      labelNames: ['method', 'path', 'status'],
      buckets: [0.1, 0.5, 1, 5, 10],
      registers: [prometheusRegistry],
    });
  }

  use(req: Request, res: Response, next: () => void) {
    // 在请求开始时增加计数器值
    this.requestsCounter.labels(req.method, req.path, '').inc();
    // 记录请求开始时间
    const startTime = process.hrtime();
    // 在响应结束时记录响应时间直方图
    res.on('finish', () => {
      const duration = process.hrtime(startTime);
      const responseTimeInSeconds = duration[0] + duration[1] / 1e9;

      this.responseTimeHistogram
        .labels(req.method, req.path, res.statusCode.toString())
        .observe(responseTimeInSeconds);
    });
    next();
  }
}
