import React from "react";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Founder, GrowthBox",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      quote: "Aiclex Mail Engine completely changed our outreach game. The lead scoring is a game changer - we only talk to interested leads now."
    },
    {
      name: "Michael Chen",
      role: "Head of Sales, TechFlow",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      quote: "Delivery rates went from 85% to 99% in one week. The analytics dashboard is beautiful and actually useful."
    },
    {
      name: "David Miller",
      role: "Director, AgencyScale",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      quote: "Best cold email tool on the market. Better than the expensive competitors and much easier to use."
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Trusted by Growth Teams</h2>
          <p className="mt-4 text-lg text-slate-600">See what our customers have to say.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <div className="flex gap-1 mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-slate-600 italic mb-6">"{item.quote}"</p>
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
