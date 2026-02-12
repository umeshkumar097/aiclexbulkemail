"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// Helper for logging
const logAdminAction = async (adminId: string, action: string, targetId: string, details?: any) => {
    await db.adminLog.create({
        data: {
            adminId,
            action,
            targetId,
            targetType: "CAMPAIGN",
            details
        }
    });
};

export const getAdminCampaigns = async (query?: string, page: number = 1) => {
    const session = await auth();
    // Role check logic

    const pageSize = 20;
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (query) {
        where.name = { contains: query, mode: 'insensitive' };
    }

    const [campaigns, total] = await Promise.all([
        db.campaign.findMany({
            where,
            include: {
                user: { select: { email: true } },
                _count: { select: { recipients: true, emailLogs: true } }
            },
            take: pageSize,
            skip,
            orderBy: { createdAt: 'desc' }
        }),
        db.campaign.count({ where })
    ]);

    return { campaigns, total, totalPages: Math.ceil(total / pageSize) };
};

export const pauseCampaign = async (campaignId: string) => {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") return { error: "Unauthorized" };

    try {
        await db.campaign.update({
            where: { id: campaignId },
            data: { status: "DRAFT" } // Moving back to DRAFT effectively pauses it if it was SENDING/SCHEDULED
        });

        await logAdminAction(session.user.id!, "PAUSE_CAMPAIGN", campaignId);

        revalidatePath("/dashboard/admin/campaigns");
        return { success: "Campaign paused (reverted to Draft)" };
    } catch (error) {
        return { error: "Failed to pause campaign" };
    }
};

export const forceDeleteCampaign = async (campaignId: string) => {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") return { error: "Unauthorized" };

    try {
        await db.campaign.delete({
            where: { id: campaignId }
        });

        await logAdminAction(session.user.id!, "DELETE_CAMPAIGN", campaignId);

        revalidatePath("/dashboard/admin/campaigns");
        return { success: "Campaign deleted" };
    } catch (error) {
        return { error: "Failed to delete campaign" };
    }
};
