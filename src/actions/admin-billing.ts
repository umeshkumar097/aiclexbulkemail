"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export const getRevenueStats = async () => {
    // Calculate MRR
    // Fetch all active subscriptions with plan details
    const activeSubs = await db.subscription.findMany({
        where: { status: "active" },
        include: { planDetails: true }
    });

    let mrr = 0;
    activeSubs.forEach(sub => {
        if (sub.planDetails) {
            mrr += sub.planDetails.price;
        }
    });

    // Mock recent transactions since we don't store them in DB yet (Stripe handles it)
    // We can fetch from Stripe API if we had integration, but for now mock it.
    const recentTransactions = [
        { id: "inv_1", user: "john@example.com", amount: 29.00, status: "succeeded", date: new Date().toISOString() },
        { id: "inv_2", user: "jane@company.com", amount: 99.00, status: "succeeded", date: new Date(Date.now() - 86400000).toISOString() },
        { id: "inv_3", user: "mike@startup.io", amount: 299.00, status: "succeeded", date: new Date(Date.now() - 172800000).toISOString() },
    ];

    // Chart data (Mock)
    const revenueHistory = [
        { month: "Jan", revenue: 1200 },
        { month: "Feb", revenue: 1500 },
        { month: "Mar", revenue: 1800 },
        { month: "Apr", revenue: 2200 },
        { month: "May", revenue: mrr * 5 }, // Just a projection based on current MRR
    ];

    return {
        mrr,
        activeSubscribers: activeSubs.length,
        recentTransactions,
        revenueHistory
    };
};
