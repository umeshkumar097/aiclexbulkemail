import React from "react";
import { ArrowRight, Flame } from "lucide-react";

export function LeadScoring() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-sm font-medium mb-6">
              <Flame className="h-4 w-4" />
              Sales Intelligence
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Turn Email Engagement into Sales-Ready Leads</h2>
            <p className="text-lg text-slate-600 mb-8">
              Don't treat every lead the same. Our AI scoring engine identifies who is ready to buy based on their behavior.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">+10</div>
                <div>
                  <h4 className="font-bold text-slate-900">Email Opened</h4>
                  <p className="text-sm text-slate-500">Prospect shows initial interest</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold">+20</div>
                <div>
                  <h4 className="font-bold text-slate-900">Link Clicked</h4>
                  <p className="text-sm text-slate-500">Prospect engages with content</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl border border-blue-100 bg-blue-50 shadow-sm">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">+50</div>
                <div>
                  <h4 className="font-bold text-slate-900">Multiple Clicks / Reply</h4>
                  <p className="text-sm text-slate-500">High intent! Sales ready alert sent.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
             {/* Visual representation of lead progression */}
             <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0" />
                
                <div className="relative z-10 flex justify-between items-center text-center">
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center border-4 border-white shadow-lg">
                        <span className="text-2xl">❄️</span>
                      </div>
                      <div className="font-bold text-slate-500">Cold</div>
                   </div>

                   <ArrowRight className="text-slate-300 h-6 w-6" />

                   <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center border-4 border-white shadow-lg">
                        <span className="text-2xl">🌤️</span>
                      </div>
                      <div className="font-bold text-yellow-600">Warm</div>
                   </div>

                   <ArrowRight className="text-slate-300 h-6 w-6" />

                   <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center border-4 border-white shadow-lg">
                        <span className="text-2xl">🔥</span>
                      </div>
                      <div className="font-bold text-orange-600">Hot</div>
                   </div>

                   <ArrowRight className="text-slate-300 h-6 w-6" />

                   <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center border-4 border-white shadow-xl ring-4 ring-green-50">
                        <span className="text-3xl">💰</span>
                      </div>
                      <div className="font-bold text-green-700">Sales Ready</div>
                   </div>
                </div>
             </div>

             <div className="mt-12 bg-slate-900 text-white p-6 rounded-xl shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                   <span className="text-sm font-mono text-slate-400">ALERT: NEW HOT LEAD</span>
                   <span className="text-xs bg-red-500 px-2 py-0.5 rounded text-white animate-pulse">LIVE</span>
                </div>
                <div className="flex items-center gap-4">
                   <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center">JD</div>
                   <div>
                      <p className="font-bold">John Doe (CEO at TechCorp)</p>
                      <p className="text-sm text-slate-400">Score: <span className="text-green-400">85/100</span> • Just clicked pricing</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
