import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get("type"); // 'users' | 'campaigns'

    if (type === "users") {
        const users = await db.user.findMany({
            include: { subscription: true }
        });

        // CSV Header
        let csv = "ID,Name,Email,Role,Plan,Status,JoinedAt\n";

        // CSV Rows
        users.forEach(user => {
            const plan = user.subscription?.plan || "FREE";
            const status = user.subscription?.status || "inactive";
            // Escape commas in fields
            const name = user.name ? `"${user.name.replace(/"/g, '""')}"` : "";
            const row = `${user.id},${name},${user.email},${user.role},${plan},${status},${user.createdAt.toISOString()}`;
            csv += row + "\n";
        });

        return new NextResponse(csv, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="users-export-${Date.now()}.csv"`
            }
        });
    }

    if (type === "campaigns") {
        const campaigns = await db.campaign.findMany({
            include: {
                user: { select: { email: true } },
                _count: { select: { recipients: true, emailLogs: true } }
            }
        });

        let csv = "ID,Name,User,Status,Recipients,Sent,CreatedAt\n";

        campaigns.forEach(c => {
            const name = `"${c.name.replace(/"/g, '""')}"`;
            const row = `${c.id},${name},${c.user.email},${c.status},${c._count.recipients},${c._count.emailLogs},${c.createdAt.toISOString()}`;
            csv += row + "\n";
        });

        return new NextResponse(csv, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="campaigns-export-${Date.now()}.csv"`
            }
        });
    }

    return new NextResponse("Invalid export type", { status: 400 });
}
