import { auth } from "@/auth";
import { getSecurityStats } from "@/actions/admin-security";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ShieldAlert, Users, Lock, AlertTriangle } from "lucide-react";
import { SecuritySettingsForm } from "@/components/admin/security-settings-form"; // Client component
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const AdminSecurityPage = async () => {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") return <div>Unauthorized</div>;

    const { riskyUsers, settings } = await getSecurityStats();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Security & Anti-Abuse</h1>
                    <p className="text-muted-foreground">Monitor threats and configure protection layers.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lock className="h-5 w-5" />
                            Global Limits & Protection
                        </CardTitle>
                        <CardDescription>Configure system-wide safety thresholds.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SecuritySettingsForm settings={settings} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-yellow-600">
                            <AlertTriangle className="h-5 w-5" />
                            To-Do / Alerts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
                                <strong>System Alert:</strong> High bounce rate detected from ISP 'gmail.com' in last hour.
                            </div>
                            <div className="p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-800">
                                <strong>Status:</strong> All abuse detection systems operational.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Suspicious Accounts (High Bounces)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Campaigns</TableHead>
                                <TableHead>Risk Level</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {riskyUsers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                        No risky users detected.
                                    </TableCell>
                                </TableRow>
                            )}
                            {riskyUsers.map((user: any) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user._count.campaigns}</TableCell>
                                    <TableCell>
                                        <Badge variant="destructive">Medium Risk</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="text-red-600">Investigate</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminSecurityPage;
