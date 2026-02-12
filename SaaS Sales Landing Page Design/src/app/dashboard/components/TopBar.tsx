import React from "react";
import { Search, Bell, HelpCircle } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 ml-64 sticky top-0 z-40">
      <div className="flex items-center flex-1 max-w-lg">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search campaigns, leads, or settings..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
