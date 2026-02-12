import { auth } from "@/auth";
import { getEmailAccountsByUserId } from "@/data/email-account";
import { AddEmailAccountDialog } from "@/components/settings/add-email-account-dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

const EmailAccountsPage = async () => {
    const session = await auth();
    const emailAccounts = await getEmailAccountsByUserId(session?.user?.id || "");

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Email Accounts</h1>
                <AddEmailAccountDialog />
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Label</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Provider</TableHead>
                            <TableHead>Daily Limit</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {emailAccounts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                    No email accounts found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        )}
                        {emailAccounts.map((account) => (
                            <TableRow key={account.id}>
                                <TableCell className="font-medium">{account.label}</TableCell>
                                <TableCell>{account.email}</TableCell>
                                <TableCell>{account.provider}</TableCell>
                                <TableCell>{account.dailyLimit}</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Active
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default EmailAccountsPage;
