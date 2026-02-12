import { Job } from 'bullmq';
import nodemailer from 'nodemailer';
import * as cheerio from 'cheerio';
import { db } from '@/lib/db';
import { decrypt } from '@/lib/encryption';
import { EmailProvider } from '@prisma/client';

interface EmailJobData {
    emailLogId: string;
    recipientId: string;
    emailAccountId: string;
    subject: string;
    html: string;
}

export default async function emailProcessor(job: Job<EmailJobData>) {
    const { emailLogId, emailAccountId, subject, html, recipientId } = job.data;

    console.log(`Processing email job ${job.id} for recipient ${recipientId}`);

    // 1. Fetch Email Account Credentials
    const emailAccount = await db.emailAccount.findUnique({
        where: { id: emailAccountId },
    });

    if (!emailAccount) {
        throw new Error(`Email Account not found: ${emailAccountId}`);
    }

    // 2. Configure Transporter based on Provider
    let transporter;

    if (emailAccount.provider === EmailProvider.SMTP) {
        if (!emailAccount.smtpHost || !emailAccount.smtpUser || !emailAccount.smtpPassword) {
            throw new Error(`Missing SMTP credentials for account: ${emailAccount.label}`);
        }

        const decryptedPassword = decrypt(emailAccount.smtpPassword);

        transporter = nodemailer.createTransport({
            host: emailAccount.smtpHost,
            port: emailAccount.smtpPort || 587,
            secure: emailAccount.smtpPort === 465, // true for 465, false for other ports
            auth: {
                user: emailAccount.smtpUser,
                pass: decryptedPassword,
            },
        });
    } else if (emailAccount.provider === EmailProvider.SES) {
        // TODO: Implement AWS SES Transporter
        throw new Error("SES Provider not yet implemented in worker");
    } else {
        throw new Error(`Unsupported provider: ${emailAccount.provider}`);
    }

    // 3. Update Status to SENDING (Optional, helps with UI feedback)
    await db.emailLog.update({
        where: { id: emailLogId },
        data: { status: 'PENDING' } // Already pending, but good to ensure
    });

    try {
        // 4. Send Mail
        // TODO: Replace links for tracking here

        const recipient = await db.recipient.findUnique({ where: { id: recipientId } });
        if (!recipient) throw new Error("Recipient not found");

        const info = await transporter.sendMail({
            from: `"${emailAccount.label}" <${emailAccount.email}>`,
            to: recipient.email,
            subject: subject,
            html: html,
            // list-unsubscribe headers, etc.
        });

        console.log(`Email sent: ${info.messageId}`);

        // 5. Update Log to SENT
        await db.emailLog.update({
            where: { id: emailLogId },
            data: {
                status: 'SENT',
                sentAt: new Date(),
                messageId: info.messageId,
            }
        });

        // 6. Update Account Usage
        await db.emailAccount.update({
            where: { id: emailAccountId },
            data: {
                dailySent: { increment: 1 },
                lastSentAt: new Date(),
            }
        });

    } catch (error: any) {
        console.error("Failed to send email:", error);

        await db.emailLog.update({
            where: { id: emailLogId },
            data: {
                status: 'FAILED',
                failedAt: new Date(),
            }
        });

        throw error; // Let BullMQ handle retries
    }
}
