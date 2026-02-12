import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Mail } from "lucide-react";
import { CustomButton as Button } from "@/components/ui/custom-button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-900 p-1.5 rounded-lg">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Aiclex<span className="text-blue-900">Mail</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-sm font-medium text-slate-600 hover:text-blue-900">Features</Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-900">How it Works</Link>
            <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-blue-900">Pricing</Link>
            <Link href="/#faq" className="text-sm font-medium text-slate-600 hover:text-blue-900">FAQ</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" href="/login">Sign In</Button>
            <Button variant="primary" size="sm" href="/dashboard">Start Free Trial</Button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4">
          <Link href="/features" className="block text-sm font-medium text-slate-600">Features</Link>
          <Link href="/#how-it-works" className="block text-sm font-medium text-slate-600">How it Works</Link>
          <Link href="/pricing" className="block text-sm font-medium text-slate-600">Pricing</Link>
          <Link href="/#faq" className="block text-sm font-medium text-slate-600">FAQ</Link>
          <div className="pt-4 flex flex-col gap-2">
            <Button variant="ghost" className="w-full justify-start" href="/login">Sign In</Button>
            <Button variant="primary" className="w-full" href="/dashboard">Start Free Trial</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
