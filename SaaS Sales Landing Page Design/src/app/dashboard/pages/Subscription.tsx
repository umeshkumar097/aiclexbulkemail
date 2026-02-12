import React from "react";
import { Check } from "lucide-react";
import { Button } from "../../components/ui/CustomButton";

export function Subscription() {
  return (
    <div className="max-w-4xl mx-auto text-center">
       <h1 className="text-3xl font-bold text-slate-900 mb-4">Upgrade your Plan</h1>
       <p className="text-slate-600 mb-12">Unlock more emails and advanced features.</p>
       
       <div className="grid md:grid-cols-3 gap-8 text-left">
          {/* Reuse Pricing Card Logic or Simplified */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="text-lg font-bold text-slate-900">Starter</h3>
             <p className="text-2xl font-bold mt-2">$29<span className="text-sm font-normal text-slate-500">/mo</span></p>
             <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-sm text-slate-600"><Check className="h-4 w-4 text-green-500"/> 1,000 Emails</li>
             </ul>
             <Button className="w-full mt-6" variant="outline">Current Plan</Button>
          </div>
          <div className="bg-slate-900 p-6 rounded-xl border border-blue-500 shadow-xl text-white relative">
             <div className="absolute top-0 right-0 bg-blue-500 text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
             <h3 className="text-lg font-bold">Growth</h3>
             <p className="text-2xl font-bold mt-2">$79<span className="text-sm font-normal text-slate-400">/mo</span></p>
             <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-sm text-slate-300"><Check className="h-4 w-4 text-blue-400"/> 10,000 Emails</li>
                <li className="flex items-center gap-2 text-sm text-slate-300"><Check className="h-4 w-4 text-blue-400"/> Advanced Analytics</li>
             </ul>
             <Button className="w-full mt-6" variant="primary">Upgrade</Button>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="text-lg font-bold text-slate-900">Agency</h3>
             <p className="text-2xl font-bold mt-2">$199<span className="text-sm font-normal text-slate-500">/mo</span></p>
             <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-sm text-slate-600"><Check className="h-4 w-4 text-green-500"/> 100,000 Emails</li>
             </ul>
             <Button className="w-full mt-6" variant="outline">Contact Sales</Button>
          </div>
       </div>
    </div>
  );
}
