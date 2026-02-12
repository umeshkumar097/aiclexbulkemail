import { auth } from "@/auth";
import { getSystemHealth, getErrorLogs } from "@/actions/admin-monitor";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Database, Server, Activity, XCircle } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

const AdminMonitorPage = async () => {
    const health = await getSystemHealth();
    const logs = await getErrorLogs();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">System Health & Monitoring</h1>
                <p className="text-muted-foreground">Real-time infrastructure status and error logs.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Database</CardTitle>
                        <Database className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 mt-2">
                            {health.database.status === "Healthy" ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                                <AlertCircle className="h-5 w-5 text-yellow-500" />
                            )}
                            <div className="text-2xl font-bold">{health.database.status}</div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Latency: {health.database.latency}ms</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Email System</CardTitle>
                        <Server className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 mt-2">
                            {health.emailSystem.status === "Healthy" ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                                <XCircle className="h-5 w-5 text-red-500" />
                            )}
                            <div className="text-2xl font-bold">{health.emailSystem.status}</div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {health.emailSystem.recentSent} Sent / {health.emailSystem.recentFailures} Failed (1h)
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Job Queues</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 mt-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <div className="text-2xl font-bold">{health.queues.status}</div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {health.queues.pendingJobs} jobs pending
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Error Logs</CardTitle>
                    <CardDescription>Latest failed or bounced emails.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Campaign</TableHead>
                                <TableHead>Recipient</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Reason</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                        No recent errors found.
                                    </TableCell>
                                </TableRow>
                            )}
                            {logs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-mono text-xs">
                                        {format(log.updatedAt, "MMM d, HH:mm:ss")}
                                    </TableCell>
                                    <TableCell>{log.campaign.name}</TableCell>
                                    <TableCell>{log.recipient.email}</TableCell>
                                    <TableCell>
                                        <Badge variant="destructive">{log.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
                                        {/* Ideally we store error message in DB, for now showing generic */}
                                        SMTP connection timeout or invalid recipient.
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

export default AdminMonitorPage;
