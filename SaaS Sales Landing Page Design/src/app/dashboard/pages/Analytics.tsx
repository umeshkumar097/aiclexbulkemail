import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function Analytics() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = [
    { name: 'Campaign A', open: 45, click: 20, reply: 10 },
    { name: 'Campaign B', open: 30, click: 10, reply: 5 },
    { name: 'Campaign C', open: 60, click: 35, reply: 15 },
    { name: 'Campaign D', open: 50, click: 25, reply: 12 },
    { name: 'Campaign E', open: 40, click: 15, reply: 8 },
  ];

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Campaign Performance Comparison</h1>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[500px] min-w-0" style={{ height: '500px' }}>
         {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
               <BarChart
                 data={data}
                 margin={{
                   top: 20,
                   right: 30,
                   left: 20,
                   bottom: 5,
                 }}
               >
                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
                 <XAxis dataKey="name" />
                 <YAxis />
                 <Tooltip />
                 <Legend />
                 <Bar dataKey="open" fill="#3B82F6" name="Open Rate %" radius={[4, 4, 0, 0]} />
                 <Bar dataKey="click" fill="#06B6D4" name="Click Rate %" radius={[4, 4, 0, 0]} />
                 <Bar dataKey="reply" fill="#10B981" name="Reply Rate %" radius={[4, 4, 0, 0]} />
               </BarChart>
            </ResponsiveContainer>
         ) : (
            <div className="w-full h-full bg-slate-50 animate-pulse rounded-lg" />
         )}
      </div>
    </div>
  );
}
