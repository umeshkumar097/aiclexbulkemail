import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { upgradePlan } from "@/actions/billing";
import { SubscriptionPlan } from "@prisma/client";

const BillingPage = async () => {
    const session = await auth();

    // Fetch subscription (mocked for now as we don't have stripe setup)
    const subscription = await db.subscription.findUnique({
        where: { userId: session?.user?.id }
    });

    const currentPlan = subscription?.plan || "FREE";

    const plans = [
        {
            name: "FREE",
            price: "$0",
            description: "Perfect for testing and small sends.",
            features: ["500 emails / day", "Basic Analytics", "1 User"],
            limit: 500
        },
        {
            name: "STARTER",
            price: "$29",
            description: "For growing businesses.",
            features: ["5,000 emails / day", "Advanced Analytics", "Email Support", "3 Users"],
            limit: 5000
        },
        {
            name: "GROWTH",
            price: "$79",
            description: "Scale your outreach.",
            features: ["50,000 emails / day", "Priority Support", "Unlimited Users", "API Access"],
            limit: 50000
        }
    ];

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Billing & Subscription</h1>
                <p className="text-muted-foreground">Manage your plan and usage.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>You are currently on the <span className="font-bold text-primary">{currentPlan}</span> plan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="text-lg px-4 py-1">
                            {currentPlan}
                        </Badge>
                        {currentPlan === "FREE" && (
                            <p className="text-sm text-yellow-600 bg-yellow-50 px-3 py-1 rounded-md border border-yellow-200">
                                Upgrade to increase your daily sending limits.
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <Card key={plan.name} className={`flex flex-col ${currentPlan === plan.name ? 'border-primary ring-1 ring-primary' : ''}`}>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                {plan.name}
                                {currentPlan === plan.name && <Badge>Current</Badge>}
                            </CardTitle>
                            <div className="text-3xl font-bold mt-2">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                            <ul className="space-y-2 mb-6 flex-1">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 text-sm">
                                        <Check className="w-4 h-4 text-green-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Button
                                className="w-full"
                                variant={currentPlan === plan.name ? "outline" : "default"}
                                disabled={currentPlan === plan.name}
                            >
                                {currentPlan === plan.name ? "Active Plan" : "Upgrade"}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default BillingPage;
