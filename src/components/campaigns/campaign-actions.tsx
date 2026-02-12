"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Play, Pause, Copy, Trash, Eye } from "lucide-react";
import Link from "next/link";
import { deleteCampaign, pauseCampaign, duplicateCampaign } from "@/actions/campaign";
import { toast } from "sonner";
import { useTransition } from "react";

interface CampaignActionsProps {
    id: string;
}

export function CampaignActions({ id }: CampaignActionsProps) {
    const [isPending, startTransition] = useTransition();

    const handlePause = () => {
        startTransition(() => {
            pauseCampaign(id)
                .then((data) => {
                    if (data.error) toast.error(data.error);
                    if (data.success) toast.success(data.success);
                });
        });
    };

    const handleDuplicate = () => {
        startTransition(() => {
            duplicateCampaign(id)
                .then((data) => {
                    if (data.error) toast.error(data.error);
                    if (data.success) toast.success(data.success);
                });
        });
    };

    const handleDelete = () => {
        if (!confirm("Are you sure?")) return;
        startTransition(() => {
            deleteCampaign(id)
                .then((data) => {
                    if (data.error) toast.error(data.error);
                    if (data.success) toast.success(data.success);
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
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/campaigns/${id}`}>
                        <Eye className="mr-2 h-4 w-4" /> View Analytics
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDuplicate} disabled={isPending}>
                    <Copy className="mr-2 h-4 w-4" /> Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePause} disabled={isPending}>
                    <Pause className="mr-2 h-4 w-4" /> Pause
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} disabled={isPending} className="text-red-600 focus:text-red-600">
                    <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
