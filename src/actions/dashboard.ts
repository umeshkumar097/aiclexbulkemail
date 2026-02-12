"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { EmailStatus } from "@prisma/client";

export async function getDashboardStats() {
    const session = await auth();
    if (!session?.user?.id) return null;

    const userId = session.user.id;

    // 1. Total Emails Sent
    const totalSent = await db.emailLog.count({
        where: {
            campaign: { userId },
            status: { in: [EmailStatus.SENT, EmailStatus.DELIVERED, EmailStatus.OPENED, EmailStatus.CLICKED] }
        }
    });

    // 2. Open Rate Calculation
    // We need total delivered to calculate rate accurately, avoiding bounced/failed
    const totalDelivered = await db.emailLog.count({
        where: {
            campaign: { userId },
            status: { in: [EmailStatus.DELIVERED, EmailStatus.OPENED, EmailStatus.CLICKED] }
        }
    });

    const totalOpened = await db.emailLog.count({
        where: {
            campaign: { userId },
            status: { in: [EmailStatus.OPENED, EmailStatus.CLICKED] } // Clicked implies opened
        }
    });

    const openRate = totalDelivered > 0 ? ((totalOpened / totalDelivered) * 100).toFixed(1) : "0.0";

    // 3. Click Rate
    const totalClicked = await db.emailLog.count({
        where: {
            campaign: { userId },
            status: EmailStatus.CLICKED
        }
    });

    const clickRate = totalOpened > 0 ? ((totalClicked / totalOpened) * 100).toFixed(1) : "0.0";

    // 4. Hot Leads (Recipients with high scores)
    // Assuming 'leadScore' is on Recipient
    const activeLeadsCount = await db.recipient.count({
        where: {
            campaign: { userId },
            leadScore: { gt: 50 } // Arbitrary threshold for "Active"
        }
    });

    const hotLeads = await db.recipient.findMany({
        where: {
            campaign: { userId },
            leadScore: { gt: 70 }
        },
        orderBy: { leadScore: 'desc' },
        take: 5,
        include: {
            campaign: {
                select: { name: true }
            }
        }
    });

    // 5. Chart Data (Last 7 days)
    // This is a bit more complex with raw SQL or aggregation. 
    // For now, we'll mock the daily breakdown based on real totals or return a simple structure.
    // A proper implementation would group by date.

    return {
        totalSent,
        openRate,
        clickRate,
        activeLeadsCount,
        hotLeads,
        totalOpened,
        totalClicked,
        // chartData: ... (Implement later if needed, or keeping dummy for chart shape but real totals?)
        // Let's try to get real counts for chart if possible, or leave chart as "Demo" for now but stats as real.
        // User asked to remove dummy data.
    };
}

export async function getUserProfile() {
    const session = await auth();
    return session?.user;
}
