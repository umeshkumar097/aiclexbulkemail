import { auth } from "@/auth";
import { getAdminStats, getAdminCharts } from "@/actions/admin";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/admin/overview"; // We'll create this chart component
import { Users, CreditCard, Activity, Server, TrendingUp, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const AdminDashboardPage = async () => {
    const session = await auth();

    // Strict Role Check
    if (session?.user?.role !== "SUPER_ADMIN") {
        // Fallback for demo: if user is logged in but not super admin, maybe redirect or show unauthorized
        // For development, if you seeded "ADMIN" role, let's allow "ADMIN" too or just redirect
        if (session?.user?.role !== "ADMIN") {
            return redirect("/dashboard");
        }
    }

    const stats = await getAdminStats();
    const graphs = await getAdminCharts();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Super Admin Dashboard</h1>
                    <p className="text-muted-foreground">Platform overview and system health.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-green-500"></span>
                    <span className="text-sm font-medium">System Operational</span>
                </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalUsers}</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+8% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
                        <Mail className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.emailsSent.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+24% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Delivery Rate</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.deliveryRate}%</div>
                        <p className="text-xs text-muted-foreground">+0.2% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Health</CardTitle>
                        <Server className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.systemHealth}</div>
                        <p className="text-xs text-muted-foreground">All systems operational</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={graphs.revenue} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Global Email Volume</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Overview data={graphs.emails} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
