import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams;
    const logId = searchParams.get("id");
    const url = searchParams.get("url");

    if (!url) {
        return new NextResponse("Missing URL", { status: 400 });
    }

    // Attempt deployment safe decoding
    let destinationUrl = url;
    try {
        // If it was base64 encoded or something, decode here. 
        // For now assuming plain text or standard URI encoded.
        // destinationUrl = decodeURIComponent(url); 
    } catch { }

    if (logId) {
        try {
            await db.$transaction(async (tx) => {
                await tx.trackingEvent.create({
                    data: {
                        type: "CLICK",
                        emailLogId: logId,
                        url: destinationUrl,
                        ip: req.headers.get("x-forwarded-for") || "unknown",
                        userAgent: req.headers.get("user-agent") || "unknown",
                    }
                });

                await tx.emailLog.update({
                    where: { id: logId },
                    data: { status: "CLICKED" }
                });

                // Update Recipient lead score (e.g. +20 for click)
                const emailLog = await tx.emailLog.findUnique({
                    where: { id: logId },
                    select: { recipientId: true }
                });

                if (emailLog && emailLog.recipientId) {
                    await tx.recipient.update({
                        where: { id: emailLog.recipientId },
                        data: {
                            leadScore: { increment: 20 },
                            isHotLead: true // Mark as hot lead on click?
                        }
                    });
                }
            });
        } catch (error) {
            console.error("Error tracking click:", error);
        }
    }

    return NextResponse.redirect(destinationUrl);
}
