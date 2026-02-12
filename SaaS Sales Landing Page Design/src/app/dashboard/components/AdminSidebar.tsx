import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Settings, 
  LogOut,
  Mail,
  Users,
  ShieldAlert,
  Database,
  Activity,
  Type
} from "lucide-react";
import { clsx } from "clsx";

export function AdminSidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const links = [
    { name: "Overview", path: "/admin", icon: LayoutDashboard },
    { name: "User Management", path: "/admin/users", icon: Users },
    { name: "System Logs", path: "/admin/logs", icon: Activity },
    { name: "Blog Manager", path: "/admin/blogs", icon: Type },
    { name: "Database", path: "/admin/database", icon: Database },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="h-screen w-64 bg-slate-900 text-slate-300 flex flex-col fixed left-0 top-0 border-r border-slate-800">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-red-600 p-1 rounded-md">
            <ShieldAlert className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Admin<span className="text-red-500">Panel</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Super Admin
        </div>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group",
              isActive(link.path)
                ? "bg-red-600 text-white"
                : "hover:bg-slate-800 hover:text-white"
            )}
          >
            <link.icon className={clsx("h-5 w-5", isActive(link.path) ? "text-white" : "text-slate-500 group-hover:text-white")} />
            <span className="flex-1">{link.name}</span>
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
        
        <div className="mt-4 flex items-center gap-3 px-3">
           <div className="h-8 w-8 rounded-full bg-red-900 flex items-center justify-center text-red-200 font-bold border border-red-700">
             SA
           </div>
           <div className="overflow-hidden">
             <p className="text-sm font-medium text-white truncate">Super Admin</p>
             <p className="text-xs text-slate-500 truncate">admin@aiclex.com</p>
           </div>
        </div>
      </div>
    </div>
  );
}
