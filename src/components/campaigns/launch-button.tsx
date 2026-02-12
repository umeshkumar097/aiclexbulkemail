"use client";

import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { launchCampaign } from "@/actions/campaign";
import { toast } from "sonner";
import { useTransition } from "react";

interface LaunchCampaignButtonProps {
    campaignId: string;
}

export function LaunchCampaignButton({ campaignId }: LaunchCampaignButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleLaunch = () => {
        if (!confirm("Are you sure you want to launch this campaign immediately?")) return;
        startTransition(() => {
            launchCampaign(campaignId).then((d) => {
                if (d.success) toast.success(d.success);
                else toast.error(d.error);
            });
        });
    };

    return (
        <Button onClick={handleLaunch} disabled={isPending} className="bg-green-600 hover:bg-green-700">
            <Play className="w-4 h-4 mr-2" />
            Launch Now
        </Button>
    );
}
