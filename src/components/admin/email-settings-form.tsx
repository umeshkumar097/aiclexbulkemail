"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateEmailSettings } from "@/actions/admin-settings";

interface EmailSettingsFormProps {
    settings: any;
}

export function EmailSettingsForm({ settings }: EmailSettingsFormProps) {
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState({
        defaultSender: settings.defaultSender || "noreply@aiclex.com",
        maxDailyEmails: settings.maxDailyEmails || 1000,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(() => {
            updateEmailSettings(formData).then((data) => {
                if (data.success) {
                    toast.success(data.success);
                } else {
                    toast.error(data.error);
                }
            });
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
                <Label>Default Sender Email</Label>
                <Input
                    value={formData.defaultSender}
                    onChange={(e) => setFormData({ ...formData, defaultSender: e.target.value })}
                />
            </div>
            <div className="grid gap-2">
                <Label>Global Daily Send Limit (per user)</Label>
                <Input
                    type="number"
                    value={formData.maxDailyEmails}
                    onChange={(e) => setFormData({ ...formData, maxDailyEmails: parseInt(e.target.value) })}
                />
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    );
}
