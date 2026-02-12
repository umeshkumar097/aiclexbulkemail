import React from "react";
import { Flame, Mail, Phone, ExternalLink } from "lucide-react";

export function HotLeads() {
  const leads = [
    { id: 1, name: "Sarah Connor", title: "CEO", company: "Skynet Inc.", score: 95, status: "Hot", email: "sarah@skynet.com", activity: "Clicked pricing page 3x" },
    { id: 2, name: "John Wick", title: "Head of Security", company: "The Continental", score: 88, status: "Warm", email: "john@continental.com", activity: "Opened email 5x" },
    { id: 3, name: "Tony Stark", title: "CTO", company: "Stark Industries", score: 82, status: "Warm", email: "tony@stark.com", activity: "Replied to email" },
    { id: 4, name: "Bruce Wayne", title: "Director", company: "Wayne Ent.", score: 75, status: "Cold", email: "bruce@wayne.com", activity: "Clicked link" },
  ];

  return (
    <div>
       <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Flame className="text-orange-500 h-6 w-6" />
              Hot Leads
           </h1>
           <p className="text-slate-500">Prioritize these leads. They are showing high intent.</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800">
           Export CSV
        </button>
      </div>

      <div className="grid gap-4">
         {leads.map((lead) => (
            <div key={lead.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
               <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg ${
                     lead.score >= 90 ? 'bg-red-100 text-red-600 ring-2 ring-red-200' : 
                     lead.score >= 80 ? 'bg-orange-100 text-orange-600 ring-2 ring-orange-200' :
                     'bg-yellow-100 text-yellow-600'
                  }`}>
                     {lead.score}
                  </div>
                  <div>
                     <h3 className="text-lg font-bold text-slate-900">{lead.name}</h3>
                     <p className="text-sm text-slate-500">{lead.title} at <span className="font-medium text-slate-700">{lead.company}</span></p>
                  </div>
               </div>

               <div className="flex-1 md:px-8">
                  <div className="text-sm font-medium text-slate-900">Recent Activity</div>
                  <div className="text-sm text-slate-500">{lead.activity}</div>
               </div>

               <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Email">
                     <Mail className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Call">
                     <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" title="View CRM">
                     <ExternalLink className="h-5 w-5" />
                  </button>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}
