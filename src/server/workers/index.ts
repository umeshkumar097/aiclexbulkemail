import { Worker } from 'bullmq';
import { connection } from '@/lib/redis';
import emailProcessor from './email-processor';
import { EMAIL_QUEUE_NAME } from '@/server/queue/email-queue';

console.log('Starting Email Worker...');

const worker = new Worker(EMAIL_QUEUE_NAME, emailProcessor, {
    connection,
    concurrency: 5, // Process 5 emails concurrently
    limiter: {
        max: 1,      // 1 job
        duration: 3000, // per 3 seconds (as requested)
    },
});

worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed!`);
});

worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed with ${err.message}`);
});

console.log(`Worker listening on queue: ${EMAIL_QUEUE_NAME}`);
