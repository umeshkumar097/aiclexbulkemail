import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Activity, Settings, Shield } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-6">
            <div className="border-b pb-4">
                <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                    <h2 className="text-lg font-semibold tracking-tight">Admin Console</h2>
                </div>
                <nav className="flex items-center gap-4">
                    <Link href="/dashboard/admin">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <LayoutDashboard className="h-4 w-4" /> Overview
                        </Button>
                    </Link>
                    <Link href="/dashboard/admin/users">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <Users className="h-4 w-4" /> Users
                        </Button>
                    </Link>
                    <Link href="/dashboard/admin/monitor">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <Activity className="h-4 w-4" /> Monitor
                        </Button>
                    </Link>
                    <Link href="/dashboard/admin/settings">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <Settings className="h-4 w-4" /> Settings
                        </Button>
                    </Link>
                </nav>
            </div>
            <div className="min-h-[600px]">
                {children}
            </div>
        </div>
    );
}
