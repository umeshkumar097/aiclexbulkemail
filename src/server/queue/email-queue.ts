import { Queue } from 'bullmq';
import { connection } from '@/lib/redis';

export const EMAIL_QUEUE_NAME = 'email-queue';

export const emailQueue = new Queue(EMAIL_QUEUE_NAME, {
    connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000,
        },
    },
});
