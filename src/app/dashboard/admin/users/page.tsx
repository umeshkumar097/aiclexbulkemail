import { auth } from "@/auth";
import { getAdminUsers } from "@/actions/admin-users";
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
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal, Shield, Ban, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminUserActions } from "@/components/admin/user-actions";
import { UserSearch } from "@/components/admin/user-search";

interface AdminUsersPageProps {
    searchParams: {
        q?: string;
        page?: string;
    };
}

const AdminUsersPage = async ({ searchParams }: AdminUsersPageProps) => {
    const session = await auth();
    // Role check inherited from layout or simplified here
    if (session?.user?.role !== "SUPER_ADMIN" && session?.user?.role !== "ADMIN") {
        // Handle unauthorized
    }

    const query = searchParams.q || "";
    const page = Number(searchParams.page) || 1;
    const { users, total } = await getAdminUsers(query, page);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <p className="text-muted-foreground">Manage users, subscriptions and access.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>All Users ({total})</CardTitle>
                        <UserSearch />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Usage</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user: any) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{user.name || "Unknown"}</span>
                                            <span className="text-xs text-muted-foreground">{user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.subscription?.status === "suspended" ? "destructive" : "default"}>
                                            {user.subscription?.status || "active"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{user.subscription?.plan || "FREE"}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        {user.usage} Emails
                                    </TableCell>
                                    <TableCell>
                                        {format(user.createdAt, "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <AdminUserActions user={user} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export default AdminUsersPage;
