import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function Tracking() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = [
    { name: 'Opened', value: 45 },
    { name: 'Clicked', value: 25 },
    { name: 'Replied', value: 10 },
    { name: 'Bounced', value: 5 },
    { name: 'Unopened', value: 15 },
  ];
  const COLORS = ['#3B82F6', '#06B6D4', '#10B981', '#EF4444', '#E2E8F0'];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-cyan-100 rounded-2xl transform rotate-3 scale-105 opacity-50" />
             <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
               <h4 className="text-lg font-bold text-slate-800 mb-6">Campaign Performance</h4>
               
               <div className="h-64 w-full min-w-0" style={{ height: '256px' }}>
                 {mounted ? (
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       <Pie
                         data={data}
                         cx="50%"
                         cy="50%"
                         innerRadius={60}
                         outerRadius={80}
                         paddingAngle={5}
                         dataKey="value"
                       >
                         {data.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                         ))}
                       </Pie>
                       <Tooltip />
                     </PieChart>
                   </ResponsiveContainer>
                 ) : (
                   <div className="w-full h-full bg-slate-50 animate-pulse rounded-full opacity-50" />
                 )}
               </div>

               <div className="grid grid-cols-2 gap-4 mt-6">
                 <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                   <p className="text-xs text-slate-500 uppercase font-semibold">Open Rate</p>
                   <p className="text-2xl font-bold text-blue-600">45%</p>
                 </div>
                 <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                   <p className="text-xs text-slate-500 uppercase font-semibold">Click Rate</p>
                   <p className="text-2xl font-bold text-cyan-500">25%</p>
                 </div>
               </div>
             </div>
          </div>

          <div className="order-1 lg:order-2 mb-12 lg:mb-0">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Real-Time Analytics & <br/>Precise Tracking</h2>
            <p className="text-lg text-slate-600 mb-8">
              Stop guessing. Aiclex Mail Engine gives you granular visibility into every email sent.
            </p>
            
            <ul className="space-y-4">
              {[
                "Live Open Rate Dashboard",
                "Click Heatmaps & Geolocation",
                "Advanced Delivery Tracking",
                "Bounce Detection & Auto-Cleaning",
                "Lead Temperature Tagging"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-cyan-500" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
