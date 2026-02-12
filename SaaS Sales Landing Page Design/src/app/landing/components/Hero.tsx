import React from "react";
import { Button } from "../../components/ui/CustomButton";
import { CheckCircle, BarChart3, Users, Zap } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-cyan-100/50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left mb-12 lg:mb-0"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              New: AI-Powered Lead Scoring Engine
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
              AI-Powered Bulk Email & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">Cold Outreach Software</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Send, Track, Score & Convert Leads with Aiclex Mail Engine. The only platform that combines bulk sending with sales intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Button size="lg" href="/dashboard" className="w-full sm:w-auto shadow-lg shadow-blue-900/20">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" href="#" className="w-full sm:w-auto">
                Book Demo
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-cyan-500" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-cyan-500" />
                <span>14-Day Free Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-cyan-500" />
                <span>GDPR Compliant</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Abstract Dashboard Representation */}
            <div className="relative rounded-xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden aspect-[4/3] group">
              <div className="absolute inset-0 bg-slate-900/50 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
              
              {/* Top Bar */}
              <div className="h-12 border-b border-slate-800 bg-slate-900 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="ml-4 h-6 w-64 bg-slate-800 rounded-md" />
              </div>

              {/* Content */}
              <div className="p-6 grid grid-cols-12 gap-6">
                {/* Sidebar */}
                <div className="col-span-3 space-y-3">
                  <div className="h-8 w-full bg-blue-900/30 rounded-md border border-blue-800/50" />
                  <div className="h-8 w-full bg-slate-800 rounded-md" />
                  <div className="h-8 w-full bg-slate-800 rounded-md" />
                  <div className="h-8 w-full bg-slate-800 rounded-md" />
                </div>

                {/* Main Area */}
                <div className="col-span-9 space-y-6">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 bg-slate-800 rounded-lg p-3 border border-slate-700">
                      <div className="h-4 w-12 bg-slate-700 rounded mb-2" />
                      <div className="h-8 w-20 bg-slate-600 rounded" />
                    </div>
                    <div className="h-24 bg-slate-800 rounded-lg p-3 border border-slate-700">
                      <div className="h-4 w-12 bg-slate-700 rounded mb-2" />
                      <div className="h-8 w-20 bg-slate-600 rounded" />
                    </div>
                    <div className="h-24 bg-slate-800 rounded-lg p-3 border border-slate-700">
                       <div className="h-4 w-12 bg-slate-700 rounded mb-2" />
                       <div className="h-8 w-20 bg-slate-600 rounded" />
                    </div>
                  </div>

                  {/* Chart Area */}
                  <div className="h-40 bg-slate-800 rounded-lg border border-slate-700 flex items-end justify-between p-4 gap-2">
                    {[40, 60, 45, 70, 50, 80, 65, 90, 75, 55].map((h, i) => (
                      <div key={i} className="w-full bg-blue-500/20 rounded-t-sm" style={{ height: `${h}%` }}>
                        <div className="h-full w-full bg-blue-500/50 rounded-t-sm animate-pulse" style={{ height: `${h}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4 z-20">
                 <div className="bg-green-100 p-2 rounded-full">
                    <Zap className="h-6 w-6 text-green-600" />
                 </div>
                 <div>
                    <p className="text-xs text-slate-500 font-medium">Lead Score</p>
                    <p className="text-lg font-bold text-slate-900">+85 Hot Lead</p>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-slate-200">
          <p className="text-center text-sm font-semibold text-slate-400 mb-6 uppercase tracking-wider">Trusted by 2,000+ Modern Companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Simple Text Placeholders for Logos to avoid external dependencies issues or hallucinating URLs */}
             <span className="text-xl font-bold text-slate-700">Acme Corp</span>
             <span className="text-xl font-bold text-slate-700">GlobalScale</span>
             <span className="text-xl font-bold text-slate-700">Nebula</span>
             <span className="text-xl font-bold text-slate-700">SaaS Flow</span>
             <span className="text-xl font-bold text-slate-700">Kyber Systems</span>
          </div>
        </div>
      </div>
    </section>
  );
}
