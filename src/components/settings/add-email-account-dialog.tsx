"use client";

import { useState } from "react";
import { EmailAccountForm } from "@/components/settings/email-account-form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export const AddEmailAccountDialog = () => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Account
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add Email Account</DialogTitle>
                    <DialogDescription>
                        Connect a new email account to send campaigns.
                    </DialogDescription>
                </DialogHeader>
                <EmailAccountForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
