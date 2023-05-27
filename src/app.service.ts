import { Injectable } from '@nestjs/common';
import { Counter } from 'prom-client';

const requestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'status'],
});

@Injectable()
export class AppService {
  getHello(): string {
    // 根据需要自定义指标的标签值
    const method = 'GET';
    const status = '200';

    // 增加请求计数
    requestCounter.labels(method, status).inc();

    return 'Hello World!';
  }
}
