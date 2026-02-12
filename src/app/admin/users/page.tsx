import { db } from "@/lib/db";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default async function UsersPage() {
    const users = await db.user.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            subscription: true,
            _count: {
                select: { campaigns: true }
            }
        }
    });

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Campaigns</TableHead>
                            <TableHead>Joined</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{user.name || "No Name"}</span>
                                        <span className="text-xs text-muted-foreground">{user.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={user.role === "ADMIN" || user.role === "SUPER_ADMIN" ? "default" : "secondary"}>
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {user.subscription?.plan || "FREE"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {user._count.campaigns}
                                </TableCell>
                                <TableCell>
                                    {format(user.createdAt, "MMM d, yyyy")}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
