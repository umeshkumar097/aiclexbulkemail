"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateGeneralSettings } from "@/actions/admin-settings";

interface GeneralSettingsFormProps {
    settings: any;
}

export function GeneralSettingsForm({ settings }: GeneralSettingsFormProps) {
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState({
        companyName: settings.companyName || "",
        footerText: settings.footerText || "",
        maintenanceMode: settings.maintenanceMode || false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(() => {
            updateGeneralSettings(formData).then((data) => {
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
            <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="space-y-0.5">
                    <Label className="text-base">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                        Disable access for all non-admin users.
                    </p>
                </div>
                <Switch
                    checked={formData.maintenanceMode}
                    onCheckedChange={(checked) => setFormData({ ...formData, maintenanceMode: checked })}
                />
            </div>
            <div className="grid gap-2">
                <Label>Company Name</Label>
                <Input
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
            </div>
            <div className="grid gap-2">
                <Label>Footer Text</Label>
                <Input
                    value={formData.footerText}
                    onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
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
