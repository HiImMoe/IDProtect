import { Global, Module } from '@nestjs/common';
import { redisClientFactory } from './redis-client.factory';
import { RedisService } from './redis.service';

@Module({
  providers: [redisClientFactory, RedisService],
  exports: [RedisService],
})
@Global()
export class RedisModule {}
