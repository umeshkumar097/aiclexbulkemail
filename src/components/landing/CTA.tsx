import React from "react";
import { CustomButton as Button } from "@/components/ui/custom-button";

export function CTA() {
  return (
    <section className="py-24 bg-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
         {/* Background pattern */}
         <div className="absolute top-0 left-0 w-full h-full" 
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
         />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-6">Start Sending Intelligent Email Campaigns Today</h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Join 2,000+ companies using Aiclex to scale their outreach and close more deals.
        </p>
        <Button variant="secondary" size="lg" className="px-10 text-lg font-semibold shadow-xl shadow-blue-900/50" href="/dashboard">
          Start Free Trial
        </Button>
        <p className="mt-6 text-sm text-blue-300">No credit card required • Cancel anytime</p>
      </div>
    </section>
  );
}
