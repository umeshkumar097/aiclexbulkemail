import React from "react";
import { Outlet } from "react-router-dom";
import { UserSidebar } from "./components/UserSidebar";
import { TopBar } from "./components/TopBar";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <UserSidebar />
      <div className="flex-1 w-full">
        <TopBar />
        <main className="ml-64 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
