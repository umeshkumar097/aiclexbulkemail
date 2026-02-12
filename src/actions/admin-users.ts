"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { Role } from "@prisma/client";

export const getAdminUsers = async (query?: string, page: number = 1) => {
    const session = await auth();
    // if (session?.user?.role !== "SUPER_ADMIN" && session?.user?.role !== "ADMIN") return { users: [], total: 0 };

    const pageSize = 20;
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (query) {
        where.OR = [
            { email: { contains: query, mode: 'insensitive' } },
            { name: { contains: query, mode: 'insensitive' } }
        ];
    }

    const [users, total] = await Promise.all([
        db.user.findMany({
            where,
            include: {
                subscription: true,
                _count: {
                    select: { campaigns: true }
                }
            },
            take: pageSize,
            skip,
            orderBy: { createdAt: 'desc' }
        }),
        db.user.count({ where })
    ]);

    // Calculate usage manually for now or use aggregation
    // This is expensive for N users, ideally we store usage in Subscription model
    const usersWithUsage = await Promise.all(users.map(async (user) => {
        const sentCount = await db.emailLog.count({
            where: { campaign: { userId: user.id }, status: { in: ["SENT", "DELIVERED", "OPENED", "CLICKED"] } }
        });

        return {
            ...user,
            usage: sentCount
        };
    }));

    return { users: usersWithUsage, total, totalPages: Math.ceil(total / pageSize) };
};

// Helper for logging
const logAdminAction = async (adminId: string, action: string, targetId: string, details?: any) => {
    await db.adminLog.create({
        data: {
            adminId,
            action,
            targetId,
            targetType: "USER",
            details,
            // ipAddress: headers().get("x-forwarded-for") 
        }
    });
};

export const suspendUser = async (userId: string) => {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    await db.subscription.upsert({
        where: { userId },
        create: { userId, status: "suspended" },
        update: { status: "suspended" }
    });

    await logAdminAction(session.user.id, "SUSPEND_USER", userId);

    revalidatePath("/dashboard/admin/users");
    return { success: "User suspended" };
};

export const activateUser = async (userId: string) => {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    await db.subscription.upsert({
        where: { userId },
        create: { userId, status: "active" },
        update: { status: "active" }
    });

    await logAdminAction(session.user.id, "ACTIVATE_USER", userId);

    revalidatePath("/dashboard/admin/users");
    return { success: "User activated" };
};

export const updateUserPlan = async (userId: string, plan: "FREE" | "STARTER" | "GROWTH" | "AGENCY") => {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    await db.subscription.upsert({
        where: { userId },
        create: { userId, plan, status: "active" },
        update: { plan, status: "active" }
    });

    await logAdminAction(session.user.id, "UPDATE_PLAN", userId, { newPlan: plan });

    revalidatePath("/dashboard/admin/users");
    return { success: "Plan updated" };
};

export const updateUserNotes = async (userId: string, notes: string) => {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    await db.user.update({
        where: { id: userId },
        data: { notes }
    });
    // Maybe don't log notes update to avoid spam, or do it
    await logAdminAction(session.user.id, "UPDATE_NOTES", userId);

    revalidatePath("/dashboard/admin/users");
    return { success: "Notes updated" };
};

export const updateUserLimit = async (userId: string, limit: number | null) => {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    await db.subscription.upsert({
        where: { userId },
        create: { userId, customEmailLimit: limit, status: "active" },
        update: { customEmailLimit: limit }
    });

    await logAdminAction(session.user.id, "UPDATE_LIMIT", userId, { limit });

    revalidatePath("/dashboard/admin/users");
    return { success: "Limit updated" };
};

export const updateUserRole = async (userId: string, role: Role) => {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") return { error: "Only Super Admin can change roles" };

    await db.user.update({
        where: { id: userId },
        data: { role }
    });

    await logAdminAction(session.user.id!, "UPDATE_ROLE", userId, { role });

    revalidatePath("/dashboard/admin/users");
    return { success: `User role updated to ${role}` };
};
