import React, { useState, useEffect } from "react";
import { Users, CreditCard, Activity, Server, Search, MoreVertical, ShieldAlert } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
];

const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", plan: "Growth", status: "Active", joined: "2 days ago" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", plan: "Starter", status: "Active", joined: "5 days ago" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", plan: "Agency", status: "Pending", joined: "1 week ago" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", plan: "Growth", status: "Active", joined: "2 weeks ago" },
  { id: 5, name: "Evan Wright", email: "evan@example.com", plan: "Starter", status: "Cancelled", joined: "1 month ago" },
];

export function Admin() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Super Admin Dashboard</h1>
           <p className="text-slate-500">System overview and user management.</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" /> System Logs
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Users", value: "12,345", icon: Users, color: "blue" },
          { title: "MRR", value: "$45,200", icon: CreditCard, color: "green" },
          { title: "System Load", value: "24%", icon: Activity, color: "purple" },
          { title: "Server Uptime", value: "99.99%", icon: Server, color: "orange" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}>
                   <stat.icon className="h-5 w-5" />
                </div>
             </div>
             <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
             <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue Growth</h3>
        <div className="h-80 w-full min-w-0" style={{ minHeight: '320px' }}>
           {mounted ? (
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                   <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                         <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                   <Tooltip />
                   <Area type="monotone" dataKey="revenue" stroke="#10B981" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
             </ResponsiveContainer>
           ) : (
             <div className="w-full h-full bg-slate-50 animate-pulse rounded-lg" />
           )}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <h3 className="text-lg font-bold text-slate-900">Recent Users</h3>
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search users..." 
                className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              />
           </div>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                 <tr>
                    <th className="px-6 py-3">User</th>
                    <th className="px-6 py-3">Plan</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Joined</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                 {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                       <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">{user.name}</div>
                          <div className="text-slate-500">{user.email}</div>
                       </td>
                       <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                             ${user.plan === 'Agency' ? 'bg-purple-100 text-purple-800' : 
                               user.plan === 'Growth' ? 'bg-blue-100 text-blue-800' : 
                               'bg-slate-100 text-slate-800'}`}>
                             {user.plan}
                          </span>
                       </td>
                       <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                             ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                               user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                               'bg-red-100 text-red-800'}`}>
                             {user.status}
                          </span>
                       </td>
                       <td className="px-6 py-4 text-slate-500">{user.joined}</td>
                       <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-slate-600">
                             <MoreVertical className="h-4 w-4" />
                          </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center">
           <button className="text-sm font-medium text-blue-600 hover:text-blue-800">View All Users</button>
        </div>
      </div>
    </div>
  );
}
