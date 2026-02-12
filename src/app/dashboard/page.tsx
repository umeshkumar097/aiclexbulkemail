import { getDashboardStats } from "@/actions/dashboard";
import { DashboardOverview } from "@/components/dashboard/overview";

export default async function DashboardPage() {
    const stats = await getDashboardStats();

    return <DashboardOverview stats={stats} />;
}
