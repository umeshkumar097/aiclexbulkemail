# Deployment Guide for Aiclex Mail Engine

This guide covers how to deploy the Aiclex Mail Engine to a production environment (specifically Vercel, but applicable elsewhere).

## Prerequisites

1.  **Vercel Account**: For hosting the Next.js app.
2.  **Upstash/Redis**: For the job queue (BullMQ).
3.  **Neon/Postgres**: For the database.
4.  **AWS SES or SMTP**: For sending emails.
5.  **GitHub Repository**: Connected to your project.

## 1. Environment Variables

Set the following environment variables in your Vercel project settings:

```env
# Database (Neon/Postgres)
DATABASE_URL="postgresql://User:Password@Host:Port/Database?sslmode=require"

# Auth (NextAuth.js)
AUTH_SECRET="your-generated-secret-openssl-rand-base64-32"
AUTH_URL="https://your-domain.com" # Or http://localhost:3000 for dev

# Redis (Upstash)
REDIS_URL="redis://default:password@host:port"

# Email Service (SMTP)
# If using AWS SES via SMTP interface
SMTP_HOST="email-smtp.us-east-1.amazonaws.com"
SMTP_PORT="587"
SMTP_USER="your-smtp-user"
SMTP_PASSWORD="your-smtp-password"
EMAIL_FROM="noreply@your-domain.com"

# Cron (Vercel Cron)
CRON_SECRET="your-random-secure-string" # Must match header sent by Vercel
```

## 2. Queue Worker (Important!)

This project uses BullMQ for email processing. Next.js on Vercel is serverless, meaning long-running workers (like a `while(true)` loop) **will not work** reliably in the main app deployment.

**Options for Production Workers:**

1.  **Separate Worker Service (Recommended)**: Deploy the worker separately on a platform that supports long-running processes (e.g., Railway, Heroku, or a VPS).
    - Entry point: `src/server/workers/index.ts`
    - Command: `ts-node src/server/workers/index.ts`
2.  **Vercel Cron (Implemented)**: We have added a `/api/cron/process-campaigns` endpoint.
    - This handles the *scheduling* and *queueing* of emails.
    - However, the *processing* of the queue (sending the actual email via SMTP) still needs a consumer.
    - **Quick Fix for Serverless**: You can force the API to process a small batch of the queue immediately after enqueueing, but this is prone to timeouts.
    - **Better Fix**: Use a service like **Zeplo** or **QStash** to trigger an API endpoint for *each* job, effectively turning the queue consumer into a webhook receiver.

## 3. Database Migration

Run migrations before deploying:

```bash
npx prisma migrate deploy
```

## 4. Vercel Configuration

The `vercel.json` file is already configured to trigger the campaign processor every minute:

```json
{
  "crons": [
    {
      "path": "/api/cron/process-campaigns",
      "schedule": "* * * * *"
    }
  ]
}
```

## 5. Build & Deploy

Push your code to the `main` branch. Vercel will automatically detect the Next.js app and build it.

```bash
git push origin main
```

## 6. Verification

1.  Visit your production URL.
2.  Log in as the Super Admin (seeded user).
3.  Go to **Dashboard > Settings > System Monitor**.
4.  Verify that Database and Redis connections are green.
