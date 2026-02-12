import { auth } from "@/auth";
import { db } from "@/lib/db";
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

const AdminLogsPage = async () => {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") return <div>Unauthorized</div>;

    const logs = await db.adminLog.findMany({
        take: 50,
        orderBy: { createdAt: 'desc' },
        include: {
            admin: { select: { name: true, email: true } }
        }
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Audit Logs</h1>
                <p className="text-muted-foreground">Track administrative actions and system modifications.</p>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Admin</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Target</TableHead>
                            <TableHead>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logs.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                    No logs recorded yet.
                                </TableCell>
                            </TableRow>
                        )}
                        {logs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell className="font-mono text-xs whitespace-nowrap">
                                    {format(log.createdAt, "MMM d, HH:mm:ss")}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-sm">{log.admin.name}</span>
                                        <span className="text-xs text-muted-foreground">{log.admin.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{log.action}</Badge>
                                </TableCell>
                                <TableCell className="text-sm">
                                    {log.targetType}: {log.targetId}
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground max-w-[300px] truncate">
                                    {JSON.stringify(log.details)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminLogsPage;
