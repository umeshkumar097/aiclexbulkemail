import React from "react";
import { Pricing } from "../components/Pricing";
import { FAQ } from "../components/FAQ";

export function PricingPage() {
  return (
    <div className="bg-white">
      <div className="pt-24 pb-12 sm:pt-32 sm:pb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">Pricing that grows with you</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Transparent pricing with no hidden fees. Upgrade or downgrade at any time.
        </p>
      </div>
      <Pricing />
      <div className="py-24 sm:py-32">
        <FAQ />
      </div>
    </div>
  );
}
