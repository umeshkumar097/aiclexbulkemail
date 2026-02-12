import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user || (session.user.role !== Role.ADMIN && session.user.role !== Role.SUPER_ADMIN)) {
        return redirect("/dashboard");
    }

    return (
        <div className="flex h-screen w-full flex-col">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
                <nav className="flex items-center gap-6 text-sm font-medium">
                    <Link href="/admin" className="font-bold text-lg">Admin Panel</Link>
                    <Link href="/admin/users" className="text-muted-foreground hover:text-foreground">Users</Link>
                    <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">Exit to App</Link>
                </nav>
                <div className="ml-auto">
                    <span className="text-xs text-muted-foreground mr-4">Logged in as {session.user.role}</span>
                </div>
            </header>
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}
