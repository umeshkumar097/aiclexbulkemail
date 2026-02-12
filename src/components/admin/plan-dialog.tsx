"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createPlan, updatePlan } from "@/actions/admin-plans";
import { Plus } from "lucide-react";

interface PlanDialogProps {
    plan?: any;
    trigger?: React.ReactNode;
}

export function PlanDialog({ plan, trigger }: PlanDialogProps) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const [formData, setFormData] = useState({
        name: plan?.name || "",
        description: plan?.description || "",
        price: plan?.price || 0,
        monthlyEmailLimit: plan?.monthlyEmailLimit || 1000,
        features: plan?.features || { leadScoring: false, apiAccess: false, support: 'community' },
        isArchived: plan?.isArchived || false,
    });

    const isEditing = !!plan;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(() => {
            if (isEditing) {
                updatePlan(plan.id, formData).then((data) => {
                    if (data.success) {
                        toast.success(data.success);
                        setOpen(false);
                    } else {
                        toast.error(data.error);
                    }
                });
            } else {
                createPlan(formData).then((data) => {
                    if (data.success) {
                        toast.success(data.success);
                        setOpen(false);
                        // Reset form
                        setFormData({
                            name: "",
                            description: "",
                            price: 0,
                            monthlyEmailLimit: 1000,
                            features: { leadScoring: false, apiAccess: false, support: 'community' },
                            isArchived: false,
                        });
                    } else {
                        toast.error(data.error);
                    }
                });
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create New Plan
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Plan" : "Create Plan"}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? "Update plan details." : "Add a new subscription tier."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Desc
                        </Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Price ($)
                        </Label>
                        <Input
                            id="price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="limit" className="text-right">
                            Limit
                        </Label>
                        <Input
                            id="limit"
                            type="number"
                            min="0"
                            value={formData.monthlyEmailLimit}
                            onChange={(e) => setFormData({ ...formData, monthlyEmailLimit: parseInt(e.target.value) })}
                            className="col-span-3"
                            required
                        />
                        <div className="col-span-1 text-right text-xs text-muted-foreground w-full">
                            Emails/mo
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">Features</Label>
                        <div className="col-span-3 space-y-3">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="leadScoring"
                                    checked={formData.features?.leadScoring || false}
                                    onCheckedChange={(checked) =>
                                        setFormData({
                                            ...formData,
                                            features: { ...formData.features, leadScoring: checked }
                                        })
                                    }
                                />
                                <Label htmlFor="leadScoring">Lead Scoring</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="apiAccess"
                                    checked={formData.features?.apiAccess || false}
                                    onCheckedChange={(checked) =>
                                        setFormData({
                                            ...formData,
                                            features: { ...formData.features, apiAccess: checked }
                                        })
                                    }
                                />
                                <Label htmlFor="apiAccess">API Access</Label>
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="support">Support Level</Label>
                                <Input
                                    id="support"
                                    placeholder="e.g. community, email, priority"
                                    value={formData.features?.support || ''}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            features: { ...formData.features, support: e.target.value }
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="archived" className="text-right">
                                Archived
                            </Label>
                            <div className="flex items-center space-x-2 col-span-3">
                                <Switch
                                    id="archived"
                                    checked={formData.isArchived}
                                    onCheckedChange={(checked) => setFormData({ ...formData, isArchived: checked })}
                                />
                                <span className="text-xs text-muted-foreground">
                                    Hidden from generic users
                                </span>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Saving..." : "Save Plan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
