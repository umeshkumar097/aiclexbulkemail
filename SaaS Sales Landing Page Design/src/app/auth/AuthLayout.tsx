import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Mail } from "lucide-react";

export function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white w-full lg:w-1/2 max-w-[600px]">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-700">
                Aiclex
              </span>
            </Link>
          </div>
          
          <Outlet />
          
          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-xs text-slate-500 text-center">
              &copy; {new Date().getFullYear()} Aiclex Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1760224255354-77b8d96df876?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwYWJzdHJhY3QlMjBibHVlJTIwZ3JhZGllbnR8ZW58MXx8fHwxNzcwNzU1MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Background"
        />
        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <blockquote className="space-y-2">
            <p className="text-lg font-medium">
              "Aiclex has completely transformed how we handle our email marketing. The AI scoring is a game changer."
            </p>
            <footer className="text-sm font-semibold opacity-80">
              Sarah Jenkins, CMO at TechGrowth
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
