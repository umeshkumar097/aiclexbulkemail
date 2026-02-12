"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteCampaign } from "@/actions/campaign";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface DeleteCampaignButtonProps {
    campaignId: string;
}

export const DeleteCampaignButton = ({ campaignId }: DeleteCampaignButtonProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const onDelete = () => {
        startTransition(() => {
            deleteCampaign(campaignId)
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    } else {
                        toast.success("Campaign deleted");
                        router.push("/dashboard/campaigns");
                        router.refresh();
                    }
                })
                .catch(() => toast.error("Something went wrong"));
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isPending}>
                    <Trash className="w-4 h-4 mr-2" />
                    Delete Campaign
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your campaign and remove all associated data.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
