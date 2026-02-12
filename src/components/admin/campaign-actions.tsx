"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PauseCircle, Trash2 } from "lucide-react";
import { pauseCampaign, forceDeleteCampaign } from "@/actions/admin-campaigns";
import { toast } from "sonner";
import { useTransition } from "react";

interface AdminCampaignActionsProps {
    campaign: any;
}

export function AdminCampaignActions({ campaign }: AdminCampaignActionsProps) {
    const [isPending, startTransition] = useTransition();

    const handlePause = () => {
        if (!confirm("Are you sure you want to pause this campaign? It will be reverted to DRAFT.")) return;
        startTransition(() => {
            pauseCampaign(campaign.id).then((d) => {
                if (d.success) toast.success(d.success);
                else toast.error(d.error);
            });
        });
    };

    const handleDelete = () => {
        if (!confirm("Are you sure you want to PERMANENTLY delete this campaign?")) return;
        startTransition(() => {
            forceDeleteCampaign(campaign.id).then((d) => {
                if (d.success) toast.success(d.success);
                else toast.error(d.error);
            });
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(campaign.id)}>
                    Copy ID
                </DropdownMenuItem>

                {(campaign.status === "SENDING" || campaign.status === "SCHEDULED") && (
                    <DropdownMenuItem onClick={handlePause} className="text-orange-600">
                        <PauseCircle className="mr-2 h-4 w-4" /> Pause / Revert to Draft
                    </DropdownMenuItem>
                )}

                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" /> Force Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
