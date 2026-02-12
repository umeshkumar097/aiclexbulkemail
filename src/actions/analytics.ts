"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export const getCampaignStats = async (campaignId: string) => {
    const session = await auth();
    if (!session?.user?.id) return null;

    // Verify ownership
    const campaign = await db.campaign.findUnique({
        where: { id: campaignId, userId: session.user.id }
    });
    if (!campaign) return null;

    const totalRecipients = await db.recipient.count({
        where: { campaignId }
    });

    const totalSent = await db.emailLog.count({
        where: { campaignId, status: { not: "PENDING" } } // Approximation
    });

    // Distinct opens (this is a simplified count, ideally we group by recipient)
    const uniqueOpens = await db.emailLog.count({
        where: {
            campaignId,
            status: { in: ["OPENED", "CLICKED"] }
        }
    });

    const uniqueClicks = await db.emailLog.count({
        where: {
            campaignId,
            status: "CLICKED"
        }
    });

    return {
        totalRecipients,
        totalSent,
        uniqueOpens,
        uniqueClicks,
        openRate: totalSent > 0 ? (uniqueOpens / totalSent) * 100 : 0,
        clickRate: uniqueOpens > 0 ? (uniqueClicks / uniqueOpens) * 100 : 0, // Click to Open Rate
    };
};

export const getCampaignActivity = async (campaignId: string) => {
    // Get activity over the last 7 days or since creation
    // For now, let's just get the last 50 tracking events
    const session = await auth();
    if (!session?.user?.id) return [];

    const events = await db.trackingEvent.findMany({
        where: {
            emailLog: {
                campaignId
            }
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
        include: {
            emailLog: {
                select: {
                    recipient: {
                        select: { email: true }
                    }
                }
            }
        }
    });

    return events.map(event => ({
        id: event.id,
        type: event.type,
        email: event.emailLog?.recipient?.email || "Deleted Recipient",
        url: event.url,
        createdAt: event.createdAt
    }));
};

export const getCampaignCharts = async (campaignId: string) => {
    const session = await auth();
    if (!session?.user?.id) return [];

    // Group logs by date
    const logs = await db.emailLog.findMany({
        where: { campaignId },
        select: { status: true, updatedAt: true }
    });

    const grouped = logs.reduce((acc, log) => {
        const date = log.updatedAt.toISOString().split('T')[0];
        if (!acc[date]) {
            acc[date] = { date, sent: 0, open: 0, click: 0 };
        }
        if (["SENT", "DELIVERED", "OPENED", "CLICKED"].includes(log.status)) acc[date].sent++;
        if (["OPENED", "CLICKED"].includes(log.status)) acc[date].open++;
        if (log.status === "CLICKED") acc[date].click++;
        return acc;
    }, {} as Record<string, any>);

    return Object.values(grouped).sort((a: any, b: any) => a.date.localeCompare(b.date));
};
