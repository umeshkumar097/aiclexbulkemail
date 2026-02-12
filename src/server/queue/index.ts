import { emailQueue } from './email-queue';

interface EnqueueEmailProps {
    emailLogId: string;
    recipientId: string;
    emailAccountId: string;
    subject: string;
    html: string;
}

export const enqueueEmail = async (data: EnqueueEmailProps) => {
    try {
        const job = await emailQueue.add('send-email', data, {
            removeOnComplete: true, // Keep Redis clean
            removeOnFail: false,   // Keep failed jobs for inspection
        });

        console.log(`Job enqueued: ${job.id} for recipient ${data.recipientId}`);
        return job;
    } catch (error) {
        console.error("Failed to enqueue email job", error);
        throw error;
    }
};
