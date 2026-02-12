import { formatDistanceToNow } from "date-fns";
import { Mail, MousePointerClick, Eye } from "lucide-react";

interface ActivityFeedProps {
    activity: {
        id: string;
        type: string;
        email: string;
        url: string | null;
        createdAt: Date;
    }[];
}

export const ActivityFeed = ({ activity }: ActivityFeedProps) => {
    if (activity.length === 0) {
        return <div className="text-center text-muted-foreground py-10">No recent activity</div>;
    }

    return (
        <div className="space-y-4">
            {activity.map((event) => (
                <div key={event.id} className="flex items-center gap-4 text-sm border-b pb-4 last:border-0">
                    <div className="bg-muted p-2 rounded-full">
                        {event.type === "OPEN" ? (
                            <Eye className="w-4 h-4 text-blue-500" />
                        ) : event.type === "CLICK" ? (
                            <MousePointerClick className="w-4 h-4 text-green-500" />
                        ) : (
                            <Mail className="w-4 h-4" />
                        )}
                    </div>
                    <div className="flex-1 space-y-1">
                        <p className="font-medium">
                            {event.email}
                            <span className="font-normal text-muted-foreground ml-1">
                                {event.type === "OPEN" ? "opened email" : "clicked link"}
                            </span>
                        </p>
                        {event.url && (
                            <p className="text-xs text-muted-foreground truncate max-w-[300px]">
                                {event.url}
                            </p>
                        )}
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(event.createdAt, { addSuffix: true })}
                    </div>
                </div>
            ))}
        </div>
    );
}
