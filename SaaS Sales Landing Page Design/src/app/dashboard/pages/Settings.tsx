import React from "react";
import { Save, Server, Shield } from "lucide-react";
import { Button } from "../../components/ui/CustomButton";

export function Settings() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Settings</h1>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
         <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
               <Server className="h-5 w-5 text-slate-500" />
               Email Service Provider
            </h2>
            <p className="text-slate-500 text-sm mt-1">Configure how emails are sent.</p>
         </div>
         <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="border border-blue-500 bg-blue-50 p-4 rounded-lg cursor-pointer relative">
                  <div className="absolute top-2 right-2 h-2 w-2 bg-blue-500 rounded-full"></div>
                  <h3 className="font-bold text-slate-900">Gmail / G-Suite</h3>
                  <p className="text-sm text-slate-500">Connected as alex@aiclex.com</p>
               </div>
               <div className="border border-slate-200 hover:border-slate-300 p-4 rounded-lg cursor-pointer">
                  <h3 className="font-bold text-slate-900">SMTP / IMAP</h3>
                  <p className="text-sm text-slate-500">Connect any provider</p>
               </div>
               <div className="border border-slate-200 hover:border-slate-300 p-4 rounded-lg cursor-pointer">
                  <h3 className="font-bold text-slate-900">Amazon SES</h3>
                  <p className="text-sm text-slate-500">High volume sending</p>
               </div>
            </div>
         </div>
         <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
            <Button size="sm">Save Changes</Button>
         </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
               <Shield className="h-5 w-5 text-slate-500" />
               Sending Limits
            </h2>
         </div>
         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Daily Limit</label>
               <input type="number" defaultValue={500} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
               <p className="text-xs text-slate-500 mt-1">Emails per day per account</p>
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Delay (Seconds)</label>
               <input type="number" defaultValue={60} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
               <p className="text-xs text-slate-500 mt-1">Minimum delay between emails</p>
            </div>
         </div>
         <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
            <Button size="sm">Update Limits</Button>
         </div>
      </div>
    </div>
  );
}
