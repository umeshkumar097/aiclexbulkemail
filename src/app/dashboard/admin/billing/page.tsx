import { auth } from "@/auth";
import { getRevenueStats } from "@/actions/admin-billing";
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
import { DollarSign, CreditCard, TrendingUp } from "lucide-react";

const AdminBillingPage = async () => {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") return <div>Unauthorized</div>;

    const { mrr, activeSubscribers, recentTransactions, revenueHistory } = await getRevenueStats();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Revenue & Billing</h1>
                <p className="text-muted-foreground">Financial overview and subscription metrics.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${mrr.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeSubscribers}</div>
                        <p className="text-xs text-muted-foreground">
                            Across all paid plans
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Latest successful payments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice ID</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentTransactions.map((tx) => (
                                <TableRow key={tx.id}>
                                    <TableCell className="font-mono">{tx.id}</TableCell>
                                    <TableCell>{tx.user}</TableCell>
                                    <TableCell>${tx.amount.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                            {tx.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {new Date(tx.date).toLocaleDateString()}
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

export default AdminBillingPage;
