import { db } from "@/lib/db";
import { enqueueEmail } from "@/server/queue";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // Basic security: Check for a secret key header (e.g., from Vercel Cron or GitHub Actions)
    const authHeader = req.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        // Allow running without auth in dev if needed, or enforce strict
        if (process.env.NODE_ENV !== "development") {
            return new NextResponse("Unauthorized", { status: 401 });
        }
    }

    // 1. Find campaigns to process
    // Status = SENDING OR (Status = SCHEDULED AND scheduledAt <= now)
    const campaigns = await db.campaign.findMany({
        where: {
            OR: [
                { status: "SENDING" },
                {
                    status: "SCHEDULED",
                    scheduledAt: { lte: new Date() }
                }
            ]
        },
        include: {
            recipients: {
                // Include logs to check if already sent to this recipient for this campaign
                // Optimization: In a real system, we'd query logs separately or use a "cursors" table
                include: {
                    emailLogs: {
                        select: { status: true, campaignId: true } // Filter in code or query
                    }
                }
            },
            user: { select: { id: true, email: true } } // Used for rate limit checks if needed
        }
    });

    if (campaigns.length === 0) {
        return NextResponse.json({ message: "No campaigns to process" });
    }

    let emailsQueued = 0;
    let campaignsCompleted = 0;

    for (const campaign of campaigns) {
        console.log(`Processing campaign ${campaign.id}: ${campaign.name}`);

        // Update status to SENDING if it was SCHEDULED
        if (campaign.status === "SCHEDULED") {
            await db.campaign.update({
                where: { id: campaign.id },
                data: { status: "SENDING" }
            });
        }

        // Get recipients who haven't received this email yet
        const pendingRecipients = campaign.recipients.filter(r => {
            const hasSentLog = r.emailLogs.some(l => l.campaignId === campaign.id && l.status !== "FAILED");
            return !hasSentLog;
        });

        if (pendingRecipients.length === 0) {
            // All done for this campaign
            await db.campaign.update({
                where: { id: campaign.id },
                data: { status: "COMPLETED" }
            });
            campaignsCompleted++;
            continue;
        }

        // Process batch (e.g., 50 at a time to avoid timeout, or just all if reasonable)
        // For Vercel Serverless, timeout is 10s-60s. We should limit.
        const BATCH_SIZE = 50;
        const batch = pendingRecipients.slice(0, BATCH_SIZE);

        for (const recipient of batch) {
            // Variable Substitution
            let subject = campaign.subject || "";
            let body = campaign.body || "";

            // Replace standard variables
            const variables: Record<string, string> = {
                "{{name}}": recipient.name || "",
                "{{email}}": recipient.email,
                // Add metadata support if needed
                ...Object.entries(recipient.metadata as Record<string, any> || {}).reduce((acc, [key, val]) => {
                    acc[`{{${key}}}`] = String(val);
                    return acc;
                }, {} as Record<string, string>)
            };

            for (const [key, val] of Object.entries(variables)) {
                subject = subject.replaceAll(key, val);
                body = body.replaceAll(key, val);
            }

            // Create Log Entry FIRST (Idempotency)
            const log = await db.emailLog.create({
                data: {
                    campaignId: campaign.id,
                    recipientId: recipient.id,
                    status: "PENDING"
                }
            });

            // Enqueue Job
            if (campaign.emailAccountId) {
                await enqueueEmail({
                    emailLogId: log.id,
                    recipientId: recipient.id,
                    emailAccountId: campaign.emailAccountId,
                    subject,
                    html: body
                });
                emailsQueued++;
            } else {
                console.error(`Campaign ${campaign.id} has no email account bound.`);
                await db.emailLog.update({ where: { id: log.id }, data: { status: "FAILED" } });
            }
        }

        // If we processed partially, we don't mark completed yet. Next cron run picks up the rest.
    }

    return NextResponse.json({
        processed: campaigns.length,
        emailsQueued,
        campaignsCompleted
    });
}
