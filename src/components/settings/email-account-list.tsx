"use client";

import { deleteEmailAccount } from "@/actions/email-account";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, Mail, Server, Cloud } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";
import { Badge } from "@/components/ui/badge";

interface EmailAccountListProps {
    accounts: any[];
}

export function EmailAccountList({ accounts }: EmailAccountListProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = (id: string) => {
        if (!confirm("Are you sure? This will affect running campaigns using this account.")) return;
        startTransition(() => {
            deleteEmailAccount(id)
                .then((data) => {
                    if (data.error) toast.error(data.error);
                    if (data.success) toast.success(data.success);
                });
        });
    };

    const getIcon = (provider: string) => {
        switch (provider) {
            case "GMAIL": return <Mail className="h-5 w-5 text-red-500" />;
            case "SES": return <Cloud className="h-5 w-5 text-orange-500" />;
            default: return <Server className="h-5 w-5 text-slate-500" />;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
            </CardHeader>
            <CardContent>
                {accounts.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground text-sm">
                        No email accounts connected yet.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {accounts.map((account) => (
                            <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-slate-100 rounded-full">
                                        {getIcon(account.provider)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-medium text-slate-900">{account.label}</h4>
                                            <Badge variant="outline" className="text-[10px] h-5">{account.provider}</Badge>
                                        </div>
                                        <p className="text-sm text-slate-500">{account.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-xs text-slate-400 uppercase font-semibold">Daily Limit</p>
                                        <p className="text-sm font-medium">{account.dailySent} / {account.dailyLimit}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(account.id)}
                                        disabled={isPending}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
