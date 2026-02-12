"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export const getLeadIntelligence = async () => {
    // Top Campaigns by Open Rate (with at least 10 emails sent)
    // Prisma needs raw query for complex aggregation or we fetch and compute in code if dataset small.
    // For scalability, raw query is better, but let's stick to Prisma simple aggregation for now.

    // Fetch last 50 campaigns
    const campaigns = await db.campaign.findMany({
        take: 50,
        orderBy: { createdAt: 'desc' },
        include: {
            _count: {
                select: {
                    emailLogs: true,
                    // We can't filtering count easily in include without where
                }
            },
            emailLogs: {
                select: { status: true } // Fetches all logs status, might be heavy
            }
        }
    });

    // Compute metrics in memory (fine for < 1000 campaigns in admin view for MVP)
    const campaignMetrics = campaigns.map(c => {
        const total = c.emailLogs.length;
        if (total === 0) return null;

        const sent = c.emailLogs.filter(l => l.status === "SENT" || l.status === "DELIVERED" || l.status === "OPENED" || l.status === "CLICKED").length; // Approximation
        const opens = c.emailLogs.filter(l => l.status === "OPENED" || l.status === "CLICKED").length;
        const clicks = c.emailLogs.filter(l => l.status === "CLICKED").length;

        return {
            id: c.id,
            name: c.name,
            sent: total, // Using total logs as proxy for sent attempts
            openRate: sent > 0 ? (opens / sent) * 100 : 0,
            clickRate: sent > 0 ? (clicks / sent) * 100 : 0,
            date: c.createdAt
        };
    }).filter(c => c !== null);

    // Sort by Open Rate
    const topCampaigns = [...campaignMetrics].sort((a, b) => b!.openRate - a!.openRate).slice(0, 5);

    // Sort by Click Rate
    const engagingCampaigns = [...campaignMetrics].sort((a, b) => b!.clickRate - a!.clickRate).slice(0, 5);

    // Heatmap Data (Mock or aggregation)
    // "Best Time to Send": Aggregate opens by hour of day
    // Needs raw SQL to be efficient. 
    // Mock for now:
    const heatmap = [
        { hour: "9AM", score: 85 },
        { hour: "10AM", score: 92 },
        { hour: "2PM", score: 78 },
        { hour: "8PM", score: 60 },
    ];

    return {
        topCampaigns,
        engagingCampaigns,
        heatmap
    };
};
