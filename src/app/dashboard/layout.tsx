import { Sidebar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/top-bar";
import { getUserProfile } from "@/actions/dashboard";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getUserProfile();

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <Sidebar user={user} />
            <div className="flex-1 w-full">
                <TopBar />
                <main className="lg:ml-64 p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
