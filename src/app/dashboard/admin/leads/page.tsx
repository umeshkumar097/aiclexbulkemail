import { auth } from "@/auth";
import { getLeadIntelligence } from "@/actions/admin-leads";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, TrendingUp, Users } from "lucide-react";

const AdminLeadIntelligencePage = async () => {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") return <div>Unauthorized</div>;

    const { topCampaigns, engagingCampaigns, heatmap } = await getLeadIntelligence();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Lead Intelligence & Analytics</h1>
                <p className="text-muted-foreground">Global insights into campaign performance and engagement.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                            Top Campaigns (Open Rate)
                        </CardTitle>
                        <CardDescription>Campaigns with highest engagement.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Campaign</TableHead>
                                    <TableHead>Sent</TableHead>
                                    <TableHead className="text-right">Open Rate</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topCampaigns.length === 0 && <TableRow><TableCell colSpan={3}>No data</TableCell></TableRow>}
                                {topCampaigns.map((c: any) => (
                                    <TableRow key={c.id}>
                                        <TableCell className="font-medium">{c.name}</TableCell>
                                        <TableCell>{c.sent}</TableCell>
                                        <TableCell className="text-right text-green-600 font-bold">
                                            {c.openRate.toFixed(1)}%
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-500" />
                            Engagement Heatmap
                        </CardTitle>
                        <CardDescription>Best estimated times for engagement.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {heatmap.map((h) => (
                                <div key={h.hour} className="flex items-center gap-4">
                                    <div className="w-16 text-sm font-medium">{h.hour}</div>
                                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500"
                                            style={{ width: `${h.score}%` }}
                                        />
                                    </div>
                                    <div className="text-xs text-muted-foreground">{h.score}% Activity</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminLeadIntelligencePage;
