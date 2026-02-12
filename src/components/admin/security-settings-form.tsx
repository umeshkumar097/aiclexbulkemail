"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateSecuritySettings } from "@/actions/admin-security";

interface SecuritySettingsFormProps {
    settings: {
        maxDailyEmails: number;
        enableCaptcha: boolean;
    };
}

export function SecuritySettingsForm({ settings }: SecuritySettingsFormProps) {
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState({
        maxDailyEmails: settings.maxDailyEmails,
        enableCaptcha: settings.enableCaptcha,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(() => {
            updateSecuritySettings(formData).then((data) => {
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
                <Label htmlFor="maxDailyEmails">Max Daily Emails (Global Limit)</Label>
                <div className="flex gap-2">
                    <Input
                        id="maxDailyEmails"
                        type="number"
                        value={formData.maxDailyEmails}
                        onChange={(e) => setFormData({ ...formData, maxDailyEmails: parseInt(e.target.value) })}
                    />
                </div>
                <p className="text-xs text-muted-foreground">
                    Applies to all users unless overridden by Plan or User settings.
                </p>
            </div>

            <div className="flex items-center space-x-2">
                <Switch
                    id="enableCaptcha"
                    checked={formData.enableCaptcha}
                    onCheckedChange={(checked) => setFormData({ ...formData, enableCaptcha: checked })}
                />
                <Label htmlFor="enableCaptcha">Enable CAPTCHA on Signup</Label>
            </div>

            <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Settings"}
            </Button>
        </form>
    );
}
