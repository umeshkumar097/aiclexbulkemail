"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export const getAllContacts = async (query?: string, page: number = 1) => {
    const session = await auth();
    if (!session?.user?.id) return { contacts: [], total: 0 };

    const pageSize = 50;
    const skip = (page - 1) * pageSize;

    const where: any = {
        campaign: {
            userId: session.user.id
        }
    };

    if (query) {
        where.OR = [
            { email: { contains: query, mode: 'insensitive' } },
            { name: { contains: query, mode: 'insensitive' } }
        ];
    }

    const [contacts, total] = await Promise.all([
        db.recipient.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: pageSize,
            skip,
            include: {
                campaign: {
                    select: { name: true }
                }
            }
        }),
        db.recipient.count({ where })
    ]);

    return { contacts, total, totalPages: Math.ceil(total / pageSize) };
};

export const deleteContact = async (id: string) => {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    // Verify ownership via campaign
    const contact = await db.recipient.findUnique({
        where: { id },
        include: { campaign: true }
    });

    if (!contact || contact.campaign.userId !== session.user.id) {
        return { error: "Contact not found or unauthorized" };
    }

    await db.recipient.delete({ where: { id } });
    return { success: "Contact deleted" };
};
