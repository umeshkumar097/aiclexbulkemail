import { auth } from "@/auth";
import { getAdminCampaigns } from "@/actions/admin-campaigns";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminCampaignActions } from "@/components/admin/campaign-actions";
import { format } from "date-fns";

const AdminCampaignsPage = async ({ searchParams }: { searchParams: { page?: string, q?: string } }) => {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") return <div>Unauthorized</div>;

    const page = Number(searchParams.page) || 1;
    const query = searchParams.q || "";

    const { campaigns, totalPages } = await getAdminCampaigns(query, page);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Global Campaigns</h1>
                <p className="text-muted-foreground">Monitor and manage all user campaigns.</p>
            </div>

            {/* Helper for Search */}
            {/* <div className="flex justify-between">
                <Input placeholder="Search campaigns..." className="max-w-sm" />
            </div> */}

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Campaign</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Stats</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {campaigns.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                                    No campaigns found.
                                </TableCell>
                            </TableRow>
                        )}
                        {campaigns.map((c: any) => (
                            <TableRow key={c.id}>
                                <TableCell className="font-medium">{c.name}</TableCell>
                                <TableCell className="text-muted-foreground">{c.user.email}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{c.status}</Badge>
                                </TableCell>
                                <TableCell className="text-sm">
                                    {c._count.recipients} Recipients<br />
                                    {c._count.emailLogs} Sent
                                </TableCell>
                                <TableCell className="text-muted-foreground text-sm">
                                    {format(c.createdAt, "MMM d, yyyy")}
                                </TableCell>
                                <TableCell className="text-right">
                                    <AdminCampaignActions campaign={c} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-center gap-2">
                <Button variant="outline" disabled={page <= 1} asChild>
                    <a href={`?page=${page - 1}`}>Previous</a>
                </Button>
                <Button variant="outline" disabled={page >= totalPages} asChild>
                    <a href={`?page=${page + 1}`}>Next</a>
                </Button>
            </div>
        </div>
    );
};

export default AdminCampaignsPage;
