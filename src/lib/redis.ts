import { Redis, RedisOptions } from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const options: RedisOptions = {
    maxRetriesPerRequest: null,
};

// Create a connection for the queue (BullMQ reuses connections internally if passed, 
// but best practice is to let BullMQ handle its own connections or pass a factory)
// For simplicity in Next.js serverless environment, we'll export a simple connection function 
// or the configuration to be used by BullMQ

export const connection = new Redis(REDIS_URL, options);
