import { Controller, Get, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly _redisService: RedisService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Delete('flush-cache')
  async clearCache(): Promise<string> {
    await this._redisService.flushDb();
    return 'ok';
  }
}
