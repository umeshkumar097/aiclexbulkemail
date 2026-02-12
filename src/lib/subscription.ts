import { db } from "@/lib/db";
import { SubscriptionPlan } from "@prisma/client";

export const PLAN_LIMITS = {
    [SubscriptionPlan.FREE]: 500,
    [SubscriptionPlan.STARTER]: 5000,
    [SubscriptionPlan.GROWTH]: 50000,
    [SubscriptionPlan.AGENCY]: 100000,
};

export const getSubscriptionPlan = async (userId: string) => {
    const subscription = await db.subscription.findUnique({
        where: { userId },
        select: { plan: true }
    });

    return subscription?.plan || SubscriptionPlan.FREE;
};

export const checkSubscriptionLimit = async (userId: string, countToAdd: number = 0) => {
    const plan = await getSubscriptionPlan(userId);
    const limit = PLAN_LIMITS[plan];

    // Get total emails sent today across all accounts for this user
    // We can sum up 'dailySent' from EmailAccount, assuming it resets daily.
    // However, EmailAccount.dailySent is specific to the account provider limit, not necessarily the SaaS plan limit.
    // The SaaS plan limit is "Total emails sent by user across all accounts".

    // Let's count EmailLogs created "today" with status not FAILED? 
    // Or relying on EmailAccount.dailySent summation is easier if we trust it resets.
    // Let's rely on EmailAccount usage for now as a proxy, or do a count.

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const sentToday = await db.emailLog.count({
        where: {
            campaign: {
                userId: userId
            },
            createdAt: {
                gte: startOfDay
            }
        }
    });

    if ((sentToday + countToAdd) > limit) {
        return {
            allowed: false,
            limit,
            currentUsage: sentToday
        };
    }

    return {
        allowed: true,
        limit,
        currentUsage: sentToday
    };
};
