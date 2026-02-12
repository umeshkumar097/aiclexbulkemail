"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export const getLeads = async (filter?: string) => {
    const session = await auth();
    if (!session?.user?.id) return [];

    let whereClause: any = {
        campaign: {
            userId: session.user.id
        }
    };

    if (filter) {
        switch (filter) {
            case "cold":
                whereClause.leadScore = { lt: 20 };
                break;
            case "warm":
                whereClause.leadScore = { gte: 20, lt: 50 };
                break;
            case "hot":
                whereClause.leadScore = { gte: 50, lt: 80 };
                break;
            case "sales-ready":
                whereClause.leadScore = { gte: 80 };
                break;
        }
    }

    const leads = await db.recipient.findMany({
        where: whereClause,
        orderBy: { leadScore: 'desc' },
        include: {
            campaign: {
                select: { name: true }
            },
            emailLogs: {
                where: { status: "CLICKED" },
                orderBy: { updatedAt: 'desc' },
                take: 1
            }
        }
    });

    return leads.map(lead => ({
        ...lead,
        lastClick: lead.emailLogs[0]?.updatedAt || null,
        campaignName: lead.campaign?.name
    }));
};
