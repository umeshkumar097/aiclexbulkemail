import React from "react";
import { Link } from "react-router-dom";
import { Mail, Twitter, Linkedin, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Aiclex<span className="text-blue-500">Mail</span>
              </span>
            </Link>
            <p className="text-sm mb-6 max-w-xs">
              AI-Powered Bulk Email & Cold Outreach Software with Advanced Tracking.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
              <li><Link to="/changelog" className="hover:text-white transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/gdpr" className="hover:text-white transition-colors">GDPR</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-sm">
          &copy; {new Date().getFullYear()} Aiclex Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
