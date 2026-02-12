import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Database, MessageSquare, Zap, Globe, Mail, BarChart, Calendar, Briefcase } from "lucide-react";

export function Integrations() {
  const categories = [
    { name: "CRM", integrations: ["Salesforce", "HubSpot", "Pipedrive", "Zoho"] },
    { name: "Communication", integrations: ["Slack", "Microsoft Teams", "Discord"] },
    { name: "Productivity", integrations: ["Notion", "Trello", "Asana", "Zapier"] },
    { name: "Email Providers", integrations: ["Gmail", "Outlook", "SendGrid", "Amazon SES"] },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Connect your favorite tools</h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Aiclex integrates seamlessly with the software you already use, making your workflow smoother and more efficient.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16">
            {categories.map((category) => (
              <div key={category.name}>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">{category.name}</h3>
                <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {category.integrations.map((integration) => (
                    <li key={integration} className="group flex items-center justify-between gap-x-6 rounded-xl border border-slate-200 p-4 hover:border-blue-500 hover:shadow-md transition-all">
                      <div className="flex items-center gap-x-4">
                        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-slate-50 group-hover:bg-white ring-1 ring-slate-900/10">
                          {/* Placeholder icon logic */}
                          {integration === "Salesforce" || integration === "HubSpot" ? <Database className="h-6 w-6 text-blue-600" /> :
                           integration === "Slack" || integration === "Discord" ? <MessageSquare className="h-6 w-6 text-purple-600" /> :
                           integration === "Zapier" ? <Zap className="h-6 w-6 text-orange-600" /> :
                           integration.includes("Email") || integration === "Gmail" ? <Mail className="h-6 w-6 text-red-600" /> :
                           <Globe className="h-6 w-6 text-slate-600" />}
                        </div>
                        <div className="text-sm font-semibold leading-6 text-slate-900">{integration}</div>
                      </div>
                      <div className="flex-none">
                         <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-500" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
             <p className="text-slate-600 mb-4">Don't see the integration you need?</p>
             <Link to="/contact" className="text-blue-600 font-semibold hover:underline">Request an integration &rarr;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
