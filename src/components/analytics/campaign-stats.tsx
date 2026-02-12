"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mail, Eye, MousePointerClick } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface CampaignStatsProps {
    stats: {
        totalRecipients: number;
        totalSent: number;
        uniqueOpens: number;
        uniqueClicks: number;
        openRate: number;
        clickRate: number;
    }
}

export const CampaignStats = ({ stats }: CampaignStatsProps) => {
    const data = [
        {
            name: "Sent",
            total: stats.totalSent,
        },
        {
            name: "Opens",
            total: stats.uniqueOpens,
        },
        {
            name: "Clicks",
            total: stats.uniqueClicks,
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recipients</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalRecipients}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{Math.round(stats.openRate)}%</div>
                    <p className="text-xs text-muted-foreground">
                        {stats.uniqueOpens} unique opens
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
                    <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{Math.round(stats.clickRate)}%</div>
                    <p className="text-xs text-muted-foreground">
                        {stats.uniqueClicks} unique clicks
                    </p>
                </CardContent>
            </Card>
            <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Engagement Overview</CardTitle>
                </CardHeader>
                <CardContent className="h-[80px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
