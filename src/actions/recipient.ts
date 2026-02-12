"use server";

import * as z from "zod";
import { RecipientSchema } from "@/schemas";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const addRecipient = async (campaignId: string, values: z.infer<typeof RecipientSchema>) => {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const validatedFields = RecipientSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { email, name, metadata } = validatedFields.data;

    try {
        await db.recipient.create({
            data: {
                campaignId,
                email,
                name,
                metadata: metadata ? JSON.parse(metadata) : undefined,
            }
        });

        revalidatePath(`/dashboard/campaigns/${campaignId}`);
        return { success: "Recipient added!" };
    } catch (error) {
        console.error("Error adding recipient:", error);
        return { error: "Failed to add recipient (Check for duplicates)." };
    }
};

export const importRecipients = async (campaignId: string, recipients: { email: string; name?: string;[key: string]: any }[]) => {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    if (!recipients || recipients.length === 0) return { error: "No recipients to import." };

    try {
        // Prepare data for bulk insert
        // Prisma createMany is efficient but doesn't handle duplicates gracefully (it throws)
        // For robust import, we might need a loop or raw query if we want to skip duplicates
        // For now, let's use a transaction or createMany and let it fail on duplicates if any

        // Clean data
        const data = recipients.map(r => ({
            campaignId,
            email: r.email,
            name: r.name,
            metadata: r, // Store all fields as metadata for future use
        }));

        await db.recipient.createMany({
            data,
            skipDuplicates: true,
        });

        revalidatePath(`/dashboard/campaigns/${campaignId}`);
        return { success: `Imported ${recipients.length} recipients!` };
    } catch (error) {
        console.error("Error importing recipients:", error);
        return { error: "Failed to import recipients." };
    }
};

export const getRecipients = async (campaignId: string) => {
    const session = await auth();
    if (!session?.user?.id) return [];

    try {
        const recipients = await db.recipient.findMany({
            where: { campaignId },
            include: {
                emailLogs: {
                    select: { status: true, updatedAt: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return recipients;
    } catch {
        return [];
    }
};
