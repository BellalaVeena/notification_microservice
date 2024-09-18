import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

  constructor(
    @InjectRedis()
    private readonly _redis: Redis
  ) {}

  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      const stringValue = JSON.stringify(value);

      if (ttl && ttl > 0) {
        await this._redis.set(key, stringValue, 'EX', ttl);
        this.logger.log(`Set key ${key} with TTL of ${ttl} seconds`);
      } else {
        await this._redis.set(key, stringValue);
        this.logger.log(`Set key ${key} without TTL`);
      }
    } catch (error) {
      this.logger.error(`Failed to set key ${key}: ${error.message}`);
      throw new Error('Redis SET operation failed');
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this._redis.get(key);
      if (value) {
        const parsedValue = JSON.parse(value) as T;
        this.logger.log(`Got key ${key}`);
        return parsedValue;
      }
      return null;
    } catch (error) {
      this.logger.error(`Failed to get key ${key}: ${error.message}`);
      throw new Error('Redis GET operation failed');
    }
  }
}
