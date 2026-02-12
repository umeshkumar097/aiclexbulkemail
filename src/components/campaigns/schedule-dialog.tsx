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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { useState, useTransition } from "react";
import { scheduleCampaign } from "@/actions/campaign";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface ScheduleDialogProps {
    campaignId: string;
}

export function ScheduleDialog({ campaignId }: ScheduleDialogProps) {
    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState("09:00");
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleSchedule = () => {
        if (!date) return toast.error("Please select a date");

        // Combine date and time
        const [hours, minutes] = time.split(":").map(Number);
        const scheduledDate = new Date(date);
        scheduledDate.setHours(hours);
        scheduledDate.setMinutes(minutes);

        if (scheduledDate < new Date()) {
            return toast.error("Scheduled time must be in the future");
        }

        startTransition(() => {
            scheduleCampaign(campaignId, scheduledDate).then((d) => {
                if (d.success) {
                    toast.success(d.success);
                    setIsOpen(false);
                } else {
                    toast.error(d.error);
                }
            });
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Clock className="mr-2 h-4 w-4" />
                    Schedule
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Schedule Campaign</DialogTitle>
                    <DialogDescription>
                        Set a date and time to start sending emails.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Date</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    disabled={(date) => date < new Date() && date.getDate() !== new Date().getDate()}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Time</label>
                        <Input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSchedule} disabled={isPending}>
                        {isPending ? "Scheduling..." : "Confirm Schedule"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
