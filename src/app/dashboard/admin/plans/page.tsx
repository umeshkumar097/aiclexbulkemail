import { auth } from "@/auth";
import { getAdminPlans } from "@/actions/admin-plans";
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
import { Plus } from "lucide-react";
import { PlanDialog } from "@/components/admin/plan-dialog"; // We will create this

const AdminPlansPage = async () => {
    const session = await auth();
    // Role check ideally done in layout or middleware too
    if (session?.user?.role !== "SUPER_ADMIN") return <div>Unauthorized</div>;

    const plans = await db.plan.findMany({
        orderBy: { price: 'asc' }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Subscription Plans</h1>
                    <p className="text-muted-foreground">Manage pricing tiers and feature limits.</p>
                </div>
                <PlanDialog />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan) => (
                    <Card key={plan.id} className={plan.isArchived ? "opacity-60" : ""}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>{plan.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                                </div>
                                <Badge variant={plan.isArchived ? "secondary" : "default"}>
                                    {plan.isArchived ? "Archived" : "Active"}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mb-4">
                                ${plan.price}<span className="text-sm font-normal text-muted-foreground">/{plan.interval}</span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Monthly Emails</span>
                                    <span className="font-medium">{plan.monthlyEmailLimit.toLocaleString()}</span>
                                </div>
                                {/* Feature list parsing if needed */}
                            </div>
                            <div className="mt-6">
                                <PlanDialog plan={plan} trigger={<Button variant="outline" className="w-full">Edit Plan</Button>} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

// Start of db import fix - I used db.plan directly in component which needs import
import { db } from "@/lib/db";

export default AdminPlansPage;
