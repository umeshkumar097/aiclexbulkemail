import React from "react";
import { Plus, Search, MoreHorizontal, Play, Pause, AlertCircle } from "lucide-react";

export function Campaigns() {
  const campaigns = [
    { id: 1, name: "Q1 Outreach - SaaS Founders", status: "Active", sent: 1240, open: "45%", reply: "12%", created: "Feb 10, 2026" },
    { id: 2, name: "Agency Partnership Promo", status: "Paused", sent: 500, open: "32%", reply: "5%", created: "Feb 08, 2026" },
    { id: 3, name: "Cold Leads Reactivation", status: "Draft", sent: 0, open: "-", reply: "-", created: "Feb 05, 2026" },
    { id: 4, name: "Webinar Invite", status: "Completed", sent: 5000, open: "52%", reply: "8%", created: "Jan 20, 2026" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Campaigns</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          New Campaign
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex gap-4">
           <div className="relative flex-1 max-w-sm">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
             <input type="text" placeholder="Search campaigns..." className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
           </div>
           <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-600">
             <option>All Status</option>
             <option>Active</option>
             <option>Paused</option>
             <option>Draft</option>
           </select>
        </div>

        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 font-medium text-slate-900">
            <tr>
              <th className="px-6 py-4">Campaign Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Sent</th>
              <th className="px-6 py-4">Open Rate</th>
              <th className="px-6 py-4">Reply Rate</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {campaigns.map((camp) => (
              <tr key={camp.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{camp.name}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    camp.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' :
                    camp.status === 'Paused' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                    camp.status === 'Draft' ? 'bg-slate-100 text-slate-800 border-slate-200' :
                    'bg-blue-100 text-blue-800 border-blue-200'
                  }`}>
                    {camp.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />}
                    {camp.status}
                  </span>
                </td>
                <td className="px-6 py-4">{camp.sent}</td>
                <td className="px-6 py-4">{camp.open}</td>
                <td className="px-6 py-4">{camp.reply}</td>
                <td className="px-6 py-4 text-slate-500">{camp.created}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
