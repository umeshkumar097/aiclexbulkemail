import { auth } from "@/auth";
import { getCampaigns } from "@/actions/campaign";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const CampaignsPage = async () => {
    const campaigns = (await getCampaigns()) || [];

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Campaigns</h1>
                    <p className="text-muted-foreground">Manage your email outreach campaigns.</p>
                </div>
                <Link href="/dashboard/campaigns/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New Campaign
                    </Button>
                </Link>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nam</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Sent / Total</TableHead>
                            <TableHead>Open %</TableHead>
                            <TableHead>Click %</TableHead>
                            <TableHead>Lead Score</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {campaigns.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                                    No campaigns found. Create your first one!
                                </TableCell>
                            </TableRow>
                        )}
                        {campaigns.map((campaign: any) => (
                            <TableRow key={campaign.id}>
                                <TableCell className="font-medium">
                                    <Link href={`/dashboard/campaigns/${campaign.id}`} className="hover:underline">
                                        {campaign.name}
                                    </Link>
                                    <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                                        {campaign.subject}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={
                                        campaign.status === "COMPLETED" ? "default" :
                                            campaign.status === "SENDING" ? "secondary" : "outline"
                                    }>
                                        {campaign.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {campaign.stats?.sent || 0} / {campaign._count.recipients}
                                </TableCell>
                                <TableCell>
                                    {campaign.stats?.openRate}%
                                </TableCell>
                                <TableCell>
                                    {campaign.stats?.clickRate}%
                                </TableCell>
                                <TableCell>
                                    {campaign.stats?.avgLeadScore}
                                </TableCell>
                                <TableCell>
                                    {format(campaign.createdAt, "MMM d, yyyy")}
                                </TableCell>
                                <TableCell className="text-right">
                                    <CampaignActions id={campaign.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

import { CampaignActions } from "@/components/campaigns/campaign-actions";

export default CampaignsPage;
