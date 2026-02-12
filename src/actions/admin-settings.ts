"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// Helper for logging
const logAdminAction = async (adminId: string, action: string, details?: any) => {
    await db.adminLog.create({
        data: {
            adminId,
            action,
            targetId: "GLOBAL_SETTINGS",
            targetType: "SETTINGS",
            details
        }
    });
};

export const getGlobalSettings = async () => {
    // Return singleton or default
    let settings = await db.globalSettings.findFirst();
    if (!settings) {
        settings = await db.globalSettings.create({
            data: { id: "settings" }
        });
    }
    return settings;
};

export const updateGeneralSettings = async (data: any) => {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") return { error: "Unauthorized" };

    try {
        await db.globalSettings.update({
            where: { id: "settings" },
            data: {
                companyName: data.companyName,
                footerText: data.footerText,
                // supportEmail removed as it's not in schema
                maintenanceMode: data.maintenanceMode === "true" || data.maintenanceMode === true
            }
        });

        await logAdminAction(session.user.id!, "UPDATE_GENERAL_SETTINGS", data);

        revalidatePath("/dashboard/admin/settings");
        return { success: "General settings updated" };
    } catch (error) {
        return { error: "Failed to update settings" };
    }
};

export const updateEmailSettings = async (data: any) => {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") return { error: "Unauthorized" };

    try {
        await db.globalSettings.update({
            where: { id: "settings" },
            data: {
                defaultSender: data.defaultSender,
                maxDailyEmails: parseInt(data.maxDailyEmails),
                // Abuse detection toggle logic (maybe just a text field for now or part of features)
            }
        });

        await logAdminAction(session.user.id!, "UPDATE_EMAIL_SETTINGS", data);

        revalidatePath("/dashboard/admin/settings");
        return { success: "Email settings updated" };
    } catch (error) {
        return { error: "Failed to update email settings" };
    }
};
