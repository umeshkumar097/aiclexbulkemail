import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Send, 
  BarChart2, 
  Flame, 
  CreditCard, 
  Settings, 
  LogOut,
  Mail,
  Workflow
} from "lucide-react";
import { clsx } from "clsx";

export function UserSidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Campaigns", path: "/dashboard/campaigns", icon: Send },
    { name: "Analytics", path: "/dashboard/analytics", icon: BarChart2 },
    { name: "Hot Leads", path: "/dashboard/leads", icon: Flame, badge: "3" },
    { name: "Integrations", path: "/dashboard/integrations", icon: Workflow },
    { name: "Subscription", path: "/dashboard/subscription", icon: CreditCard },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="h-screen w-64 bg-slate-900 text-slate-300 flex flex-col fixed left-0 top-0 border-r border-slate-800">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-1 rounded-md">
            <Mail className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Aiclex<span className="text-blue-500">Mail</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Menu
        </div>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group",
              isActive(link.path)
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800 hover:text-white"
            )}
          >
            <link.icon className={clsx("h-5 w-5", isActive(link.path) ? "text-white" : "text-slate-500 group-hover:text-white")} />
            <span className="flex-1">{link.name}</span>
            {link.badge && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {link.badge}
              </span>
            )}
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
        
        <div className="mt-4 flex items-center gap-3 px-3">
           <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="h-8 w-8 rounded-full bg-slate-700" />
           <div className="overflow-hidden">
             <p className="text-sm font-medium text-white truncate">Alex Morgan</p>
             <p className="text-xs text-slate-500 truncate">alex@aiclex.com</p>
           </div>
        </div>
      </div>
    </div>
  );
}
