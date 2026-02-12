import React from "react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect Email",
      description: "Link your Gmail, Outlook, SMTP, or Amazon SES account in seconds."
    },
    {
      number: "02",
      title: "Import Leads",
      description: "Upload your CSV list or connect your CRM to sync contacts automatically."
    },
    {
      number: "03",
      title: "Track & Convert",
      description: "Launch your campaign and watch hot leads surface in real-time."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
          <p className="mt-4 text-lg text-slate-600">Start your first intelligent campaign in minutes.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 -z-10" />

          {steps.map((step, idx) => (
            <div key={idx} className="relative bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-blue-900 text-white text-xl font-bold flex items-center justify-center mx-auto mb-6 ring-8 ring-white">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
