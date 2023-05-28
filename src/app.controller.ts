import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { register } from 'prom-client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/metrics')
  async getMetrics() {
    return await register.metrics();
  }
}
