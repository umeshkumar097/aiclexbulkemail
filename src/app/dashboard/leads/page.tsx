import { auth } from "@/auth";
import { getLeads } from "@/actions/leads";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { format } from "date-fns";
import { Flame, Download } from "lucide-react";

interface LeadsPageProps {
    searchParams: {
        filter?: string;
    };
}

const LeadsPage = async ({ searchParams }: LeadsPageProps) => {
    const session = await auth();
    const leads = await getLeads(searchParams.filter);

    const filter = searchParams.filter || "all";

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Lead Intelligence</h1>
                    <p className="text-muted-foreground">Identify and track your most engaged prospects.</p>
                </div>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Export Leads
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <Link href="/dashboard/leads">
                    <Badge variant={filter === "all" ? "default" : "outline"} className="cursor-pointer">All</Badge>
                </Link>
                <Link href="/dashboard/leads?filter=sales-ready">
                    <Badge variant={filter === "sales-ready" ? "default" : "outline"} className="cursor-pointer bg-red-600 hover:bg-red-700">Sales Ready (80+)</Badge>
                </Link>
                <Link href="/dashboard/leads?filter=hot">
                    <Badge variant={filter === "hot" ? "default" : "outline"} className="cursor-pointer bg-orange-500 hover:bg-orange-600">Hot (50-79)</Badge>
                </Link>
                <Link href="/dashboard/leads?filter=warm">
                    <Badge variant={filter === "warm" ? "default" : "outline"} className="cursor-pointer bg-yellow-500 hover:bg-yellow-600">Warm (20-49)</Badge>
                </Link>
                <Link href="/dashboard/leads?filter=cold">
                    <Badge variant={filter === "cold" ? "default" : "outline"} className="cursor-pointer bg-blue-500 hover:bg-blue-600">Cold (&lt;20)</Badge>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Leads</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Lead Score</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Campaign</TableHead>
                                <TableHead>Last Click</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leads.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                        No leads found matching this filter.
                                    </TableCell>
                                </TableRow>
                            )}
                            {leads.map((lead: any) => (
                                <TableRow key={lead.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Flame className={`h-4 w-4 ${lead.leadScore >= 80 ? 'text-red-600' : lead.leadScore >= 50 ? 'text-orange-500' : 'text-slate-400'}`} />
                                            <span className="font-bold text-lg">{lead.leadScore}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{lead.email}</div>
                                        <div className="text-xs text-muted-foreground">{lead.name || "Unknown Name"}</div>
                                    </TableCell>
                                    <TableCell>
                                        {lead.campaignName}
                                    </TableCell>
                                    <TableCell>
                                        {lead.lastClick ? format(lead.lastClick, "MMM d, h:mm a") : "-"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm" variant="ghost">Details</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export default LeadsPage;
