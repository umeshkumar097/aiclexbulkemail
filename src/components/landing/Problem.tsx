import React from "react";
import { XCircle } from "lucide-react";

export function Problem() {
  const problems = [
    { title: "No Open Tracking Accuracy", description: "Standard pixels are blocked by privacy filters, giving you false data." },
    { title: "No Lead Scoring", description: "You don't know who is interested until they reply, missing silent intent." },
    { title: "No Sales-Ready Filtering", description: "Wasting time on cold leads instead of focusing on those engaging." },
    { title: "No Delivery Transparency", description: "Emails land in spam and you never know why or how to fix it." },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Most Bulk Email Tools Only Send Emails. <br/>We Build Sales Intelligence.</h2>
          <p className="text-lg text-slate-600">Stop shooting in the dark. Traditional email marketing tools lack the intelligence needed for modern B2B sales.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-red-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <XCircle className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
