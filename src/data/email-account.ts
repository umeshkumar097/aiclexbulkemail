import { db } from "@/lib/db";

export const getEmailAccountsByUserId = async (userId: string) => {
    try {
        const emailAccounts = await db.emailAccount.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
        return emailAccounts;
    } catch {
        return [];
    }
};
