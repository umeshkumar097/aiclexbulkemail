"use server";

import * as z from "zod";
import { CampaignSchema } from "@/schemas";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { checkSubscriptionLimit } from "@/lib/subscription";

export const createCampaign = async (values: z.infer<typeof CampaignSchema>) => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return { error: "Unauthorized" };
    }

    const validatedFields = CampaignSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { name, subject, body, emailAccountId } = validatedFields.data;

    await db.campaign.create({
        data: {
            userId,
            name,
            subject,
            body,
            emailAccountId,
            status: "DRAFT"
        }
    });

    revalidatePath("/dashboard/campaigns");
    return { success: "Campaign created!" };
};

export const getCampaigns = async () => {
    const session = await auth();

    if (!session?.user?.id) {
        return null;
    }

    const campaigns = await db.campaign.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        include: {
            emailAccount: true,
            _count: {
                select: { recipients: true }
            }
        }
    });

    const campaignIds = campaigns.map(c => c.id);

    // Aggregate Email Logs by Status
    const logStats = await db.emailLog.groupBy({
        by: ['campaignId', 'status'],
        where: { campaignId: { in: campaignIds } },
        _count: { status: true }
    });

    // Aggregate Lead Scores
    const leadStats = await db.recipient.groupBy({
        by: ['campaignId'],
        where: { campaignId: { in: campaignIds } },
        _avg: { leadScore: true }
    });

    // Map stats to campaigns
    return campaigns.map(c => {
        const cLogs = logStats.filter(l => l.campaignId === c.id);
        const sent = cLogs.filter(l => ['SENT', 'DELIVERED', 'OPENED', 'CLICKED'].includes(l.status)).reduce((a, b) => a + b._count.status, 0);
        const delivered = cLogs.filter(l => ['DELIVERED', 'OPENED', 'CLICKED'].includes(l.status)).reduce((a, b) => a + b._count.status, 0);
        const opened = cLogs.filter(l => ['OPENED', 'CLICKED'].includes(l.status)).reduce((a, b) => a + b._count.status, 0);
        const clicked = cLogs.filter(l => l.status === 'CLICKED').reduce((a, b) => a + b._count.status, 0);

        const openRate = delivered > 0 ? Math.round((opened / delivered) * 100) : 0;
        const clickRate = delivered > 0 ? Math.round((clicked / delivered) * 100) : 0;

        const cLeads = leadStats.find(l => l.campaignId === c.id);
        const avgLeadScore = Math.round(cLeads?._avg.leadScore || 0);

        return {
            ...c,
            stats: {
                sent,
                openRate,
                clickRate,
                avgLeadScore
            }
        };
    });
};

export const deleteCampaign = async (id: string) => {
    const session = await auth();

    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    await db.campaign.delete({
        where: {
            id,
            userId: session.user.id
        }
    });

    revalidatePath("/dashboard/campaigns");
    return { success: "Campaign deleted!" };
};

export const launchCampaign = async (campaignId: string) => {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const campaign = await db.campaign.findUnique({
        where: { id: campaignId, userId: session.user.id },
        include: {
            _count: { select: { recipients: true } }
        }
    });

    if (!campaign) return { error: "Campaign not found" };

    // Check Subscription Limit
    const limitCheck = await checkSubscriptionLimit(session.user.id, campaign._count.recipients);
    if (!limitCheck.allowed) {
        return {
            error: `Plan limit exceeded. You have sent/scheduled ${limitCheck.currentUsage} emails today. Your limit is ${limitCheck.limit}. Upgrade to send more.`
        };
    }

    await db.campaign.update({
        where: { id: campaignId },
        data: { status: "SENDING", scheduledAt: new Date() }
    });

    revalidatePath(`/dashboard/campaigns/${campaignId}`);
    return { success: "Campaign launched!" };
};

export const pauseCampaign = async (campaignId: string) => {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    await db.campaign.update({
        where: { id: campaignId, userId: session.user.id },
        data: { status: "DRAFT" } // Reverting to draft effectively pauses it for now
    });

    revalidatePath("/dashboard/campaigns");
    return { success: "Campaign paused!" };
};

export const duplicateCampaign = async (campaignId: string) => {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const existing = await db.campaign.findUnique({
        where: { id: campaignId, userId: session.user.id }
    });

    if (!existing) return { error: "Campaign not found" };

    await db.campaign.create({
        data: {
            userId: session.user.id,
            name: `${existing.name} (Copy)`,
            subject: existing.subject,
            body: existing.body,
            emailAccountId: existing.emailAccountId,
            status: "DRAFT"
        }
    });

    revalidatePath("/dashboard/campaigns");
    return { success: "Campaign duplicated!" };
};

export const scheduleCampaign = async (campaignId: string, date: Date) => {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const campaign = await db.campaign.findUnique({
        where: { id: campaignId, userId: session.user.id },
        include: { _count: { select: { recipients: true } } }
    });

    if (!campaign) return { error: "Campaign not found" };

    // Check Subscription Limit
    const limitCheck = await checkSubscriptionLimit(session.user.id, campaign._count.recipients);
    if (!limitCheck.allowed) {
        return {
            error: `Plan limit exceeded. You have sent/scheduled ${limitCheck.currentUsage} emails today. Your limit is ${limitCheck.limit}. Upgrade to send more.`
        };
    }

    await db.campaign.update({
        where: { id: campaignId },
        data: {
            status: "SCHEDULED",
            scheduledAt: date
        }
    });

    revalidatePath(`/dashboard/campaigns/${campaignId}`);
    return { success: `Campaign scheduled for ${date.toLocaleString()}` };
};
