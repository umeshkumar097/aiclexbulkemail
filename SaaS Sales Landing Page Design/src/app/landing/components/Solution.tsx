import React from "react";
import { Send, Eye, MousePointerClick, BarChart, Flame, ShieldCheck, Server } from "lucide-react";

export function Solution() {
  const features = [
    { 
      icon: Send, 
      title: "Bulk Email Campaign Management", 
      desc: "Manage massive campaigns with ease. Schedule, throttle, and automate follow-ups." 
    },
    { 
      icon: Eye, 
      title: "Advanced Open Tracking", 
      desc: "Bypass privacy pixels to get real open rates. Know exactly when your email is read." 
    },
    { 
      icon: MousePointerClick, 
      title: "Click Tracking & Analytics", 
      desc: "Track every link click. Analyze user behavior and redirect flows for deeper insights." 
    },
    { 
      icon: BarChart, 
      title: "Lead Scoring Engine", 
      desc: "Automatically assign points for opens, clicks, and replies. Prioritize your hottest leads." 
    },
    { 
      icon: Flame, 
      title: "Hot Lead Detection", 
      desc: "Get instant alerts when a prospect engages multiple times. Strike while the iron is hot." 
    },
    { 
      icon: ShieldCheck, 
      title: "Deliverability Tracking", 
      desc: "Monitor your domain health and spam score in real-time. Fix issues before they hurt sales." 
    },
    { 
      icon: Server, 
      title: "Multi-Provider Integration", 
      desc: "Connect Gmail, Outlook, SMTP, or Amazon SES seamlessly. Switch providers instantly." 
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Features</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">Send Smarter. Track Better. Close Faster.</h2>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">Everything you need to turn cold emails into booked meetings and revenue.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, idx) => (
            <div key={idx} className="flex gap-4 group">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                  <feature.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
