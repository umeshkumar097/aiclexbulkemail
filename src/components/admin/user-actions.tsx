"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Shield, Ban, CheckCircle, CreditCard, UserCog, LogIn } from "lucide-react";
import { suspendUser, activateUser, updateUserPlan, updateUserNotes, updateUserLimit } from "@/actions/admin-users";
import { toast } from "sonner";
import { useTransition, useState } from "react";

interface AdminUserActionsProps {
    user: any;
}

export function AdminUserActions({ user }: AdminUserActionsProps) {
    const [isPending, startTransition] = useTransition();
    const [notes, setNotes] = useState(user.notes || "");
    const [limit, setLimit] = useState(user.subscription?.customEmailLimit ?? "");
    const [isOpen, setIsOpen] = useState(false);

    const handleSuspend = () => {
        startTransition(() => {
            suspendUser(user.id).then((d) => toast.success(d.success));
        });
    };

    const handleActivate = () => {
        startTransition(() => {
            activateUser(user.id).then((d) => toast.success(d.success));
        });
    };

    const handlePlanChange = (plan: string) => {
        startTransition(() => {
            updateUserPlan(user.id, plan as any).then((d) => toast.success(d.success));
        });
    };

    const handleSaveNotes = () => {
        startTransition(() => {
            updateUserNotes(user.id, notes).then((d) => {
                toast.success(d.success);
            });
        });
    };

    const handleSaveLimit = () => {
        startTransition(() => {
            const val = limit === "" ? null : Number(limit);
            updateUserLimit(user.id, val).then((d) => {
                toast.success(d.success);
            });
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => {
                        navigator.clipboard.writeText(user.id);
                        toast.success("User ID copied");
                    }}>
                        Copy User ID
                    </DropdownMenuItem>
                    <SheetTrigger asChild>
                        <DropdownMenuItem>
                            <UserCog className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                    </SheetTrigger>
                    <DropdownMenuSeparator />

                    {user.subscription?.status === "suspended" ? (
                        <DropdownMenuItem onClick={handleActivate}>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Activate User
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem onClick={handleSuspend}>
                            <Ban className="mr-2 h-4 w-4 text-red-500" /> Suspend User
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <CreditCard className="mr-2 h-4 w-4" /> Change Plan
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuRadioGroup value={user.subscription?.plan || "FREE"} onValueChange={handlePlanChange}>
                                <DropdownMenuRadioItem value="FREE">Free</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="STARTER">Starter</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="GROWTH">Growth</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="AGENCY">Agency</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>User Details</SheetTitle>
                    <SheetDescription>
                        Manage settings for {user.email}
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>User ID</Label>
                        <div className="text-sm font-mono bg-muted p-2 rounded">{user.id}</div>
                    </div>
                    <div className="grid gap-2">
                        <Label>Role</Label>
                        <div className="text-sm font-medium">{user.role}</div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Admin Notes</Label>
                        <Textarea
                            placeholder="Add internal notes about this user..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        <Button onClick={handleSaveNotes} disabled={isPending} size="sm">Save Notes</Button>
                    </div>

                    <div className="grid gap-2">
                        <Label>Manual Email Limit Override</Label>
                        <div className="flex gap-2">
                            <Input
                                type="number"
                                placeholder="Default Plan Limit"
                                value={limit}
                                onChange={(e) => setLimit(e.target.value)}
                            />
                            <Button onClick={handleSaveLimit} disabled={isPending} size="sm">Set</Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Leave empty to use plan default.</p>
                    </div>

                    <div className="border-t pt-4 mt-4">
                        <Label>Role Management (Super Admin)</Label>
                        <div className="flex gap-2 mt-2">
                            {user.role === "ADMIN" ? (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full text-orange-600 border-orange-200 hover:bg-orange-50"
                                    onClick={() => {
                                        if (confirm("Demote to User?")) {
                                            // Client-side call can be added here or via server action import
                                            toast.info("Role demotion logic ready in backend");
                                        }
                                    }}
                                >
                                    Revoke Admin
                                </Button>
                            ) : (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
                                    onClick={() => {
                                        if (confirm("Promote to Admin?")) {
                                            toast.info("Role promotion logic ready in backend");
                                        }
                                    }}
                                >
                                    Make Admin
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                        <h4 className="mb-2 font-medium">Dangerous Zone</h4>
                        <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 mb-2">
                            <Ban className="mr-2 h-4 w-4" /> Force Delete User
                        </Button>
                        <Button variant="outline" className="w-full justify-start mb-2" disabled title="Coming soon">
                            <LogIn className="mr-2 h-4 w-4" /> Impersonate (Coming Soon)
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
