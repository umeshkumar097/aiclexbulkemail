import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, Users, Mail, Eye, MousePointerClick } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";
import { LiveEmailSending } from "../components/LiveEmailSending";

export function Overview() {
  // Add mounted state to prevent Recharts from rendering before DOM is ready
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = [
    { name: 'Mon', sent: 4000, open: 2400 },
    { name: 'Tue', sent: 3000, open: 1398 },
    { name: 'Wed', sent: 2000, open: 9800 },
    { name: 'Thu', sent: 2780, open: 3908 },
    { name: 'Fri', sent: 1890, open: 4800 },
    { name: 'Sat', sent: 2390, open: 3800 },
    { name: 'Sun', sent: 3490, open: 4300 },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
           <p className="text-slate-500">Welcome back, here's what's happening with your campaigns.</p>
        </div>
        <div className="flex gap-2">
           <select className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
           </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Emails Sent", value: "24,500", icon: Mail, trend: "+12.5%", trendUp: true },
          { title: "Open Rate", value: "48.2%", icon: Eye, trend: "+4.2%", trendUp: true },
          { title: "Click Rate", value: "12.8%", icon: MousePointerClick, trend: "-1.1%", trendUp: false },
          { title: "Active Leads", value: "1,240", icon: Users, trend: "+8.4%", trendUp: true },
        ].map((stat, i) => (
          <motion.div variants={item} key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${i === 0 ? 'bg-blue-100 text-blue-600' : i === 1 ? 'bg-purple-100 text-purple-600' : i === 2 ? 'bg-cyan-100 text-cyan-600' : 'bg-orange-100 text-orange-600'}`}>
                   <stat.icon className="h-5 w-5" />
                </div>
                <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${stat.trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                   {stat.trendUp ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                   {stat.trend}
                </div>
             </div>
             <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
             <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <motion.div variants={item} className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-w-0">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Email Performance</h3>
            <div className="h-80 w-full min-w-0" style={{ minHeight: '320px' }}>
               {mounted ? (
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                       <defs>
                          <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                             <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorOpen" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                             <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                       <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                       <Tooltip />
                       <Area type="monotone" dataKey="sent" stroke="#3B82F6" fillOpacity={1} fill="url(#colorSent)" />
                       <Area type="monotone" dataKey="open" stroke="#06B6D4" fillOpacity={1} fill="url(#colorOpen)" />
                    </AreaChart>
                 </ResponsiveContainer>
               ) : (
                 <div className="w-full h-full bg-slate-50 animate-pulse rounded-lg" />
               )}
            </div>
         </motion.div>

         <motion.div variants={item} className="flex flex-col gap-6">
            <LiveEmailSending />
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1">
               <h3 className="text-lg font-bold text-slate-900 mb-4">Hot Leads</h3>
               <div className="space-y-4">
                  {[
                     { name: "Sarah Connor", score: 95, company: "Skynet Inc.", time: "2m ago" },
                     { name: "John Wick", score: 88, company: "Continental", time: "15m ago" },
                     { name: "Tony Stark", score: 82, company: "Stark Ind.", time: "1h ago" },
                  ].map((lead, i) => (
                     <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                              {lead.name.charAt(0)}
                           </div>
                           <div>
                              <p className="text-sm font-semibold text-slate-900">{lead.name}</p>
                              <p className="text-xs text-slate-500">{lead.company}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="inline-flex items-center text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                              {lead.score}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
               <button className="w-full mt-4 text-sm text-blue-600 font-medium hover:text-blue-800">View All</button>
            </div>
         </motion.div>
      </div>
    </motion.div>
  );
}
