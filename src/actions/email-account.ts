"use server";

import * as z from "zod";
import { EmailAccountSchema } from "@/schemas";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const getEmailAccounts = async () => {
    const session = await auth();
    if (!session?.user?.id) return [];

    try {
        const accounts = await db.emailAccount.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' }
        });
        return accounts;
    } catch {
        return [];
    }
};

export const createEmailAccount = async (values: z.infer<typeof EmailAccountSchema>) => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return { error: "Unauthorized" };
    }

    const validatedFields = EmailAccountSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const {
        label,
        email,
        provider,
        dailyLimit,
        smtpHost,
        smtpPort,
        smtpUser,
        smtpPassword,
        awsAccessKey,
        awsSecretKey,
        awsRegion
    } = validatedFields.data;

    // Check plan limits here if needed (e.g. Free plan only 1 account)

    await db.emailAccount.create({
        data: {
            userId,
            label,
            email,
            provider,
            dailyLimit: dailyLimit || 500,
            // SMTP
            smtpHost,
            smtpPort,
            smtpUser,
            smtpPassword, // Should be encrypted in real app
            // AWS
            awsAccessKey,
            awsSecretKey, // Should be encrypted in real app
            awsRegion
        }
    });

    revalidatePath("/dashboard/settings");
    return { success: "Email Account added!" };
};

export const deleteEmailAccount = async (id: string) => {
    const session = await auth();

    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    await db.emailAccount.delete({
        where: {
            id,
            userId: session.user.id
        }
    });

    revalidatePath("/dashboard/settings");
    return { success: "Email Account deleted!" };
};
