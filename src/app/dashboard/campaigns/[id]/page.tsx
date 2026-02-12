import { auth } from "@/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ArrowLeft, Play, Users, Mail, MousePointerClick, Eye } from "lucide-react";
import Link from "next/link";
import { DeleteCampaignButton } from "@/components/campaigns/delete-campaign-button";
import { RecipientForm } from "@/components/recipients/recipient-form";
import { CSVImport } from "@/components/recipients/csv-import";
import { RecipientList } from "@/components/recipients/recipient-list";
import { ScheduleDialog } from "@/components/campaigns/schedule-dialog";
import { LaunchCampaignButton } from "@/components/campaigns/launch-button";
import { getCampaignStats, getCampaignActivity, getCampaignCharts } from "@/actions/analytics";
import { CampaignStats } from "@/components/analytics/campaign-stats";
import { ActivityFeed } from "@/components/analytics/activity-feed";
import { CampaignCharts } from "@/components/analytics/campaign-charts";

interface CampaignIdPageProps {
    params: {
        id: string;
    }
}

const CampaignIdPage = async ({ params }: CampaignIdPageProps) => {
    const session = await auth();
    if (!session?.user?.id) return redirect("/login");

    const campaign = await db.campaign.findUnique({
        where: {
            id: params.id,
            userId: session.user.id
        },
        include: {
            emailAccount: true,
            _count: {
                select: {
                    recipients: true,
                    emailLogs: true
                }
            }
        }
    });

    if (!campaign) return notFound();

    const stats = await getCampaignStats(params.id);
    const activity = await getCampaignActivity(params.id);
    const chartsData = await getCampaignCharts(params.id);

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard/campaigns">
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold">{campaign.name}</h1>
                            <Badge variant={
                                campaign.status === "COMPLETED" ? "default" :
                                    campaign.status === "SENDING" ? "secondary" : "outline"
                            }>
                                {campaign.status}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Created on {format(campaign.createdAt, "MMM d, yyyy")} • via {campaign.emailAccount?.label}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {campaign.status === "DRAFT" && (
                        <>
                            <ScheduleDialog campaignId={campaign.id} />
                            <LaunchCampaignButton campaignId={campaign.id} />
                        </>
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            {stats && <CampaignStats stats={stats} />}

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">

                    {/* Main Content */}
                    <Tabs defaultValue="analytics" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="analytics">Analytics</TabsTrigger>
                            <TabsTrigger value="recipients">Recipients</TabsTrigger>
                            <TabsTrigger value="preview">Email Preview</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>

                        <TabsContent value="analytics" className="space-y-4">
                            <CampaignCharts data={chartsData} />
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {/* Future pie charts or breakdowns could go here */}
                            </div>
                        </TabsContent>

                        <TabsContent value="preview" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Email Preview</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-1">
                                        <span className="text-sm font-medium text-muted-foreground">Subject</span>
                                        <div className="p-2 border rounded-md bg-muted/20 text-sm">
                                            {campaign.subject}
                                        </div>
                                    </div>
                                    <div className="grid gap-1">
                                        <span className="text-sm font-medium text-muted-foreground">Body</span>
                                        <div
                                            className="p-4 border rounded-md min-h-[200px] prose prose-sm max-w-none dark:prose-invert"
                                            dangerouslySetInnerHTML={{ __html: campaign.body || "" }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="recipients">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Manage Recipients</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-sm font-medium mb-2">Manual Entry</h3>
                                            <div className="p-4 border rounded-md">
                                                <RecipientForm campaignId={campaign.id} />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium mb-2">Bulk Import</h3>
                                            <CSVImport campaignId={campaign.id} />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <h3 className="text-sm font-medium mb-4">Recipient List ({campaign._count.recipients})</h3>
                                        <RecipientList campaignId={campaign.id} />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="settings">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Campaign Settings</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Delete or edit campaign settings here.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ActivityFeed activity={activity} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default CampaignIdPage;
