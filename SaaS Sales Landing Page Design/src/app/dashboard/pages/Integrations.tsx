import React, { useState } from "react";
import { 
  Webhook, 
  Key, 
  Copy, 
  RefreshCw, 
  Plus, 
  CheckCircle2, 
  ExternalLink,
  Trash2,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

export function Integrations() {
  const [apiKey, setApiKey] = useState("sk_live_51M0...92xP");
  const [showKey, setShowKey] = useState(false);
  
  const [webhooks, setWebhooks] = useState([
    { id: 1, url: "https://hooks.zapier.com/hooks/catch/123456/abcde", events: ["lead.created"], status: "Active", created: "2023-10-15" },
    { id: 2, url: "https://connect.pabbly.com/workflow/sendwebhookdata/IjU36...", events: ["campaign.sent"], status: "Failed", created: "2023-11-02" },
  ]);

  const integrations = [
    { 
      name: "Zapier", 
      logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=128&h=128&fit=crop&q=80", // Placeholder for Zapier
      description: "Connect Aiclex with 5,000+ apps via Zapier.",
      connected: true 
    },
    { 
      name: "Pabbly Connect", 
      logo: "https://images.unsplash.com/photo-1662947036643-a7698547d6a6?w=128&h=128&fit=crop&q=80", // Placeholder
      description: "Automate workflows with Pabbly Connect.",
      connected: false 
    },
    { 
      name: "HubSpot", 
      logo: "https://images.unsplash.com/photo-1662947852159-2cb8201ae876?w=128&h=128&fit=crop&q=80", // Placeholder
      description: "Sync leads and contacts directly to HubSpot CRM.",
      connected: false 
    },
    { 
      name: "Slack", 
      logo: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=128&h=128&fit=crop&q=80", // Placeholder
      description: "Get notifications for new leads in Slack channels.",
      connected: true 
    }
  ];

  const handleCopyKey = () => {
    navigator.clipboard.writeText("sk_live_51M0x82...92xP");
    toast.success("API Key copied to clipboard");
  };

  const handleRegenerateKey = () => {
    toast.success("API Key regenerated successfully");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Integrations & API</h1>
           <p className="text-slate-500">Manage API keys, webhooks, and third-party connections.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
           <ExternalLink className="h-4 w-4" /> API Documentation
        </button>
      </div>

      {/* API Key Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">API Access</h3>
              <p className="text-sm text-slate-500">Use this key to authenticate requests to the Aiclex API.</p>
            </div>
          </div>
          <button 
            onClick={handleRegenerateKey}
            className="text-slate-500 hover:text-slate-700 flex items-center gap-2 text-sm font-medium"
          >
            <RefreshCw className="h-4 w-4" /> Regenerate Key
          </button>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 flex items-center justify-between font-mono text-sm text-slate-600">
            <span>{showKey ? "sk_live_51M0x82...92xP" : "sk_live_••••••••••••••••"}</span>
            <button 
              onClick={() => setShowKey(!showKey)}
              className="text-slate-400 hover:text-slate-600 text-xs uppercase font-bold tracking-wider"
            >
              {showKey ? "Hide" : "Show"}
            </button>
          </div>
          <button 
            onClick={handleCopyKey}
            className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <Copy className="h-4 w-4" /> Copy
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-100">
          <AlertCircle className="h-4 w-4" />
          <span>Keep this key secret. Do not share it in client-side code or public repositories.</span>
        </div>
      </div>

      {/* Webhooks Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <Webhook className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Webhooks</h3>
              <p className="text-sm text-slate-500">Receive real-time updates when events happen.</p>
            </div>
          </div>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2">
             <Plus className="h-4 w-4" /> Add Webhook
          </button>
        </div>
        
        <div className="overflow-x-auto">
           <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                 <tr>
                    <th className="px-6 py-3">Endpoint URL</th>
                    <th className="px-6 py-3">Events</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Created</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                 {webhooks.map((webhook) => (
                    <tr key={webhook.id} className="hover:bg-slate-50 transition-colors">
                       <td className="px-6 py-4 font-mono text-slate-600 max-w-xs truncate">
                          {webhook.url}
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex gap-1">
                             {webhook.events.map(event => (
                               <span key={event} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium border border-slate-200">
                                 {event}
                               </span>
                             ))}
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium
                             ${webhook.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                             {webhook.status === 'Active' && <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>}
                             {webhook.status}
                          </span>
                       </td>
                       <td className="px-6 py-4 text-slate-500">{webhook.created}</td>
                       <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-red-600 transition-colors">
                             <Trash2 className="h-4 w-4" />
                          </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

      {/* Connected Apps */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Connected Applications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((app) => (
            <div key={app.name} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="h-12 w-12 shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                 <img src={app.logo} alt={app.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                 <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-900">{app.name}</h4>
                    {app.connected ? (
                       <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                          <CheckCircle2 className="h-3 w-3" /> Connected
                       </span>
                    ) : (
                       <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors">
                          Connect
                       </button>
                    )}
                 </div>
                 <p className="text-sm text-slate-500 mt-1">{app.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
