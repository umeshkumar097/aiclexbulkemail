import { auth } from "@/auth";
import { getDashboardStats } from "@/actions/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/admin/overview"; // We can reuse this or create a specific one
import { Separator } from "@/components/ui/separator";

const AnalyticsPage = async () => {
    const session = await auth();
    const stats = await getDashboardStats();

    // Mock data for now since we don't have a time-series aggregation action for global stats yet
    // In a real app, we'd fetch this from the DB grouped by date
    const chartData = [
        { name: "Mon", total: 0 },
        { name: "Tue", total: 0 },
        { name: "Wed", total: 0 },
        { name: "Thu", total: 0 },
        { name: "Fri", total: 0 },
        { name: "Sat", total: 0 },
        { name: "Sun", total: 0 },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Analytics</h1>
                <p className="text-muted-foreground">Deep dive into your email performance.</p>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.totalSent || 0}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.openRate}%</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.clickRate}%</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.totalClicked || 0}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Performance Over Time</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <Overview data={chartData} />
                </CardContent>
            </Card>
        </div>
    );
}

export default AnalyticsPage;
