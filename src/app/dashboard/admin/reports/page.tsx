import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDown } from "lucide-react";

const AdminReportsPage = async () => {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") return <div>Unauthorized</div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Reports & Data Exports</h1>
                <p className="text-muted-foreground">Download system data in CSV format.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileDown className="h-5 w-5" />
                            User Export
                        </CardTitle>
                        <CardDescription>All registered users and their subscription status.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <a href="/api/admin/export?type=users" download>Download CSV</a>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileDown className="h-5 w-5" />
                            Campaign Export
                        </CardTitle>
                        <CardDescription>Global campaign performance summary.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant="outline" className="w-full">
                            <a href="/api/admin/export?type=campaigns" download>Download CSV</a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminReportsPage;
