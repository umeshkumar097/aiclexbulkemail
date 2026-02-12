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
            targetType: "PLAN",
            details
        }
    });
};

export const getAdminPlans = async () => {
    // const session = await auth();
    // Role check logic

    const plans = await db.plan.findMany({
        orderBy: { price: 'asc' }
    });
    return plans;
};

export const createPlan = async (data: any) => {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") return { error: "Unauthorized" };

    try {
        const plan = await db.plan.create({
            data: {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                monthlyEmailLimit: parseInt(data.monthlyEmailLimit),
                features: data.features, // JSON
                isArchived: false
            }
        });

        await logAdminAction(session.user.id!, "CREATE_PLAN", plan.id, { name: plan.name });

        revalidatePath("/dashboard/admin/plans");
        return { success: "Plan created" };
    } catch (error) {
        return { error: "Failed to create plan" };
    }
};

export const updatePlan = async (id: string, data: any) => {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") return { error: "Unauthorized" };

    try {
        await db.plan.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                monthlyEmailLimit: parseInt(data.monthlyEmailLimit),
                features: data.features,
                isArchived: data.isArchived
            }
        });

        await logAdminAction(session.user.id!, "UPDATE_PLAN", id, { changes: data });

        revalidatePath("/dashboard/admin/plans");
        return { success: "Plan updated" };
    } catch (error) {
        return { error: "Failed to update plan" };
    }
};

export const togglePlanArchive = async (id: string, isArchived: boolean) => {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") return { error: "Unauthorized" };

    await db.plan.update({
        where: { id },
        data: { isArchived }
    });

    await logAdminAction(session.user.id!, isArchived ? "ARCHIVE_PLAN" : "RESTORE_PLAN", id);

    revalidatePath("/dashboard/admin/plans");
    return { success: isArchived ? "Plan archived" : "Plan restored" };
};
