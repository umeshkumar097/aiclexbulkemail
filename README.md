# Aiclex Mail Engine

A powerful, self-hosted email marketing and automation platform built with Next.js 14.

## Features

- **Campaign Management**: Create, edit, and schedule rich-text email campaigns.
- **Recipient Management**: Bulk CSV import, manual entry, and list management.
- **Analytics Dashboard**: Real-time tracking of Opens, Clicks, and Sending stats.
- **Lead Scoring**: Automatically score leads based on engagement (Hot/Warm/Cold).
- **Subscription System**: Built-in plan limits and billing management (Mocked).
- **Super Admin Panel**: System-wide oversight and user management.
- **High Performance**: Powered by BullMQ and Redis for scalable email sending.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL + Prisma ORM
- **Queue**: Redis + BullMQ
- **UI**: Tailwind CSS + ShadCN UI
- **Auth**: NextAuth.js v5

## Getting Started

1. **Clone the repo**
   ```bash
   git clone <repo-url>
   cd mailsysem
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment**
   Copy `.env.example` to `.env` and fill in your credentials.

4. **Initialize Database**
   ```bash
   npx prisma migrate dev
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Start Worker (in separate terminal)**
   ```bash
   npm run worker
   ```

## Documentation

- [Deployment Guide](./DEPLOY.md)
- [Implementation Plan](./implementation_plan.md)

## Deployment

### Option 1: Vercel (Recommended for Serverless)
See [DEPLOY.md](DEPLOY.md)

### Option 2: VPS with Docker (Recommended for Self-Hosting)
This project includes a fully automated deployment script for Docker.

1.  **Run the script**:
    ```bash
    ./deploy_docker.sh
    ```
2.  **Enter Server Password**: You will be prompted for your VPS password multiple times.
3.  **Result**: 
    - App runs in a Docker container on port `3005`.
    - Nginx is configured as a reverse proxy for `mail.ro9.in`.
    - SSL certificates are auto-generated via Certbot.
