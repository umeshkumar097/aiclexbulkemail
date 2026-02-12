import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams;
    const logId = searchParams.get("id");

    if (logId) {
        try {
            // Log the OPEN event
            // Check if already opened to avoid duplicate counting (optional logic, but basic logging here)
            // Ideally we track every open or unique opens. Let's track every event but maybe flag unique later.

            await db.$transaction(async (tx) => {
                await tx.trackingEvent.create({
                    data: {
                        type: "OPEN",
                        emailLogId: logId,
                        ip: req.headers.get("x-forwarded-for") || "unknown",
                        userAgent: req.headers.get("user-agent") || "unknown",
                    }
                });

                // Update EmailLog status to OPENED if it wasn't already (or just keep it as is)
                await tx.emailLog.update({
                    where: { id: logId },
                    data: { status: "OPENED" }
                });

                // Update Recipient lead score (e.g. +10 for open)
                const emailLog = await tx.emailLog.findUnique({
                    where: { id: logId },
                    select: { recipientId: true }
                });

                if (emailLog && emailLog.recipientId) {
                    await tx.recipient.update({
                        where: { id: emailLog.recipientId },
                        data: {
                            leadScore: { increment: 10 },
                            // isHotLead logic could go here
                        }
                    });
                }
            });

        } catch (error) {
            console.error("Error tracking open:", error);
        }
    }

    // Return 1x1 transparent GIF
    const pixel = Buffer.from(
        "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        "base64"
    );

    return new NextResponse(pixel, {
        headers: {
            "Content-Type": "image/gif",
            "Content-Length": pixel.length.toString(),
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
        },
    });
}
