"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export const getSystemHealth = async () => {
    const session = await auth();
    // Role check

    // Check DB Latency (simple ping)
    const start = Date.now();
    await db.$queryRaw`SELECT 1`;
    const dbLatency = Date.now() - start;

    // Check recent failures (last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentFailures = await db.emailLog.count({
        where: {
            status: { in: ["FAILED", "BOUNCED"] },
            updatedAt: { gte: oneHourAgo }
        }
    });

    // Check recent activity
    const recentSent = await db.emailLog.count({
        where: {
            status: "SENT",
            updatedAt: { gte: oneHourAgo }
        }
    });

    return {
        database: {
            status: dbLatency < 100 ? "Healthy" : "Degraded",
            latency: dbLatency
        },
        emailSystem: {
            status: recentFailures < (recentSent * 0.1) ? "Healthy" : "Attention Needed", // >10% failure rate
            recentFailures,
            recentSent
        },
        queues: {
            status: "Operational", // Mock string since we don't have queue visibility yet
            pendingJobs: 0
        }
    };
};

export const getErrorLogs = async () => {
    // Fetch last 50 failed logs
    const logs = await db.emailLog.findMany({
        where: { status: { in: ["FAILED", "BOUNCED"] } },
        take: 20,
        orderBy: { updatedAt: 'desc' },
        include: {
            campaign: { select: { name: true } },
            recipient: { select: { email: true } }
        }
    });

    return logs;
};
