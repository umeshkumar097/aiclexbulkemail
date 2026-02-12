"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { SubscriptionPlan } from "@prisma/client";

export const upgradePlan = async (plan: SubscriptionPlan) => {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    await db.subscription.upsert({
        where: { userId: session.user.id },
        update: {
            plan,
            status: "active",
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // +30 days
        },
        create: {
            userId: session.user.id,
            plan,
            status: "active",
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
    });

    revalidatePath("/dashboard/billing");
    return { success: true };
};
