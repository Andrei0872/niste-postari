import { Logger } from '@nestjs/common';
import * as redis from 'redis'
import { config } from 'src/config';

const LOGGER_CONTEXT = 'REDIS';

const logger = new Logger(LOGGER_CONTEXT);

export const redisClient = redis.createClient({
  port: 6379,
  host: config.REDIS_HOST,
});

redisClient.on('connect', () => {
  logger.log('Redis connected!');
});

redisClient.on('error', err => {
  logger.error('Redis error: ', err.message);
});
