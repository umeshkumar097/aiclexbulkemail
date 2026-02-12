"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, CreditCard, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";



const SubscriptionPage = () => {
    const { data: session } = useSession();
    // In a real app, we would fetch subscription data via a useEffect or a server action called from here
    // For now, we'll use static/mock data for the UI
    const sub = {
        plan: "FREE",
        status: "active",
        usage: 150,
        limit: 1000,
        percentage: 15,
        periodEnd: new Date()
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold">Subscription & Billing</h1>
                <p className="text-muted-foreground">Manage your plan and billing details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            Current Plan
                            <Badge variant={sub.plan === "FREE" ? "secondary" : "default"}>{sub.plan}</Badge>
                        </CardTitle>
                        <CardDescription>
                            Your subscription refreshes on {format(sub.periodEnd, "MMM d, yyyy")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium">
                                <span>Monthly Info Usage</span>
                                <span>{sub.usage.toLocaleString()} / {sub.limit.toLocaleString()} Emails</span>
                            </div>
                            <Progress value={sub.percentage} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                                You have used {sub.percentage.toFixed(1)}% of your monthly email quota.
                            </p>
                        </div>

                        <div className="pt-4 border-t">
                            <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Zap className="h-4 w-4 text-yellow-500" /> Plan Features
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> {sub.limit.toLocaleString()} Emails / Month</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Email Support</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Basic Analytics</li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => alert("Stripe integration coming soon!")}>Manage Subscription</Button>
                    </CardFooter>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Billing Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 p-4 border rounded-lg">
                                <div className="p-2 bg-slate-100 rounded-full">
                                    <CreditCard className="h-6 w-6 text-slate-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Visa ending in 4242</p>
                                    <p className="text-sm text-muted-foreground">Expires 12/28</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">Update Payment Method</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Invoices</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b last:border-0 border-slate-100">
                                        <div>
                                            <p className="font-medium text-sm">Invoice #{1000 + i}</p>
                                            <p className="text-xs text-muted-foreground">Oct {i}, 2024</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-sm">$0.00</p>
                                            <Button variant="link" size="sm" className="h-auto p-0">Download</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPage;
