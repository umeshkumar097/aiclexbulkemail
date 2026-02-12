"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const getSecurityStats = async () => {
    // 1. High Bounce Rate Users (> 5% bounce rate, min 10 emails)
    // Complex query, maybe needs raw SQL or aggregation
    // For now, let's just find users with ANY bounces in last 24h

    // Prisma doesn't do complex ratios easily in one query without raw.
    // Let's fetch users with high failure counts.
    const riskyUsers = await db.user.findMany({
        where: {
            emailAccounts: {
                some: {
                    campaigns: {
                        some: {
                            emailLogs: {
                                some: { status: "BOUNCED" }
                            }
                        }
                    }
                }
            }
        },
        take: 10,
        include: {
            _count: {
                select: { campaigns: true }
            }
        }
    });

    // 2. Global Rate Limit Settings
    // stored in GlobalSettings (singleton)
    const settings = await db.globalSettings.findFirst();

    return {
        riskyUsers,
        settings: {
            maxDailyEmails: settings?.maxDailyEmails || 1000, // default if not set
            enableCaptcha: settings?.enableCaptcha || false
        }
    };
};

export const updateSecuritySettings = async (data: any) => {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") return { error: "Unauthorized" };

    try {
        await db.globalSettings.upsert({
            where: { id: "settings" },
            update: {
                maxDailyEmails: parseInt(data.maxDailyEmails),
                enableCaptcha: data.enableCaptcha === "true" || data.enableCaptcha === true
            },
            create: {
                id: "settings",
                companyName: "Aiclex", // fallback
                maxDailyEmails: parseInt(data.maxDailyEmails),
                enableCaptcha: data.enableCaptcha === "true" || data.enableCaptcha === true
            }
        });

        revalidatePath("/dashboard/admin/security");
        return { success: "Security settings updated" };
    } catch (error) {
        return { error: "Failed to update settings" };
    }
};

export const banUser = async (userId: string) => {
    // Reuse suspend logic or specific ban
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") return { error: "Unauthorized" };

    await db.user.update({
        where: { id: userId },
        data: { role: "USER" } // Just ensuring, maybe add 'BANNED' role later
    });

    await db.subscription.update({
        where: { userId },
        data: { status: "banned" }
    });

    revalidatePath("/dashboard/admin/security");
    return { success: "User banned" };
};
