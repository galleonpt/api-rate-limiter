import Redis from 'ioredis';

const redis: Redis = new Redis({ port: 6379, host: 'redis' });

export { redis };
