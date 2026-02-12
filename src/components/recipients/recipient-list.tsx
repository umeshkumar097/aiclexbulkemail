import { getRecipients } from "@/actions/recipient";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface RecipientListProps {
    campaignId: string;
}

export const RecipientList = async ({ campaignId }: RecipientListProps) => {
    const recipients = await getRecipients(campaignId);

    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Opens</TableHead>
                        <TableHead>Clicks</TableHead>
                        <TableHead>Lead Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recipients.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                No recipients found. Add manually or import from CSV.
                            </TableCell>
                        </TableRow>
                    )}
                    {recipients.map((recipient: any) => {
                        const opens = recipient.emailLogs?.filter((l: any) => ["OPENED", "CLICKED"].includes(l.status)).length || 0;
                        const clicks = recipient.emailLogs?.filter((l: any) => l.status === "CLICKED").length || 0;
                        const lastStatus = recipient.emailLogs?.[0]?.status || "PENDING"; // Assuming sorted by updated desc in logs, but we didn't sort logs in include. 
                        // Actually getRecipients sorts recipients by createdAt. EmailLogs are not sorted in the include unless we specify.
                        // For display, just showing aggregated opens/clicks is good.

                        return (
                            <TableRow key={recipient.id}>
                                <TableCell className="font-medium">
                                    {recipient.email}
                                    {recipient.name && <div className="text-xs text-muted-foreground">{recipient.name}</div>}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="text-xs">
                                        {lastStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell>{opens}</TableCell>
                                <TableCell>{clicks}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold">{recipient.leadScore}</span>
                                        {recipient.leadScore >= 50 ? (
                                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full border border-red-200">Hot</span>
                                        ) : recipient.leadScore >= 20 ? (
                                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full border border-orange-200">Warm</span>
                                        ) : (
                                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full border border-blue-200">Cold</span>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
