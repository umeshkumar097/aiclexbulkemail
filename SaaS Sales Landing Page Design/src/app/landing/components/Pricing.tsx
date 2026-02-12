import React from "react";
import { Check } from "lucide-react";
import { Button } from "../../components/ui/CustomButton";

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      emails: "1,000",
      price: "29",
      features: ["Basic Open Tracking", "Lead Scoring", "Email Support", "1 User"],
      highlight: false
    },
    {
      name: "Growth",
      emails: "10,000",
      price: "79",
      features: ["Advanced Tracking", "Click Heatmaps", "Priority Support", "5 Users", "A/B Testing"],
      highlight: true
    },
    {
      name: "Agency",
      emails: "100,000",
      price: "199",
      features: ["White Label Reports", "Dedicated IP", "24/7 Phone Support", "Unlimited Users", "API Access"],
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-lg text-slate-600">Choose the plan that fits your outreach scale.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative rounded-2xl p-8 border ${
                plan.highlight 
                  ? "border-blue-500 bg-slate-900 text-white shadow-2xl scale-105 z-10" 
                  : "border-slate-200 bg-white text-slate-900 shadow-lg hover:shadow-xl transition-shadow"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                  ${plan.price}
                </span>
                <span className={`text-sm ${plan.highlight ? "text-slate-400" : "text-slate-500"}`}>/month</span>
              </div>
              
              <div className={`text-sm font-medium mb-8 ${plan.highlight ? "text-blue-200" : "text-blue-900"}`}>
                Up to {plan.emails} emails/mo
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className={`h-5 w-5 ${plan.highlight ? "text-blue-400" : "text-blue-600"}`} />
                    <span className={`text-sm ${plan.highlight ? "text-slate-300" : "text-slate-600"}`}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.highlight ? "primary" : "outline"} 
                className={`w-full ${plan.highlight ? "bg-blue-600 hover:bg-blue-500 border-none" : ""}`}
                href="/dashboard/subscription"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
