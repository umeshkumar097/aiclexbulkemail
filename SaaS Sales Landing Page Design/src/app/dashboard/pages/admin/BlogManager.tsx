import React, { useState, useEffect } from "react";
import { 
  Save, 
  Image as ImageIcon, 
  Type, 
  AlignLeft, 
  List, 
  Link as LinkIcon, 
  Search,
  BarChart,
  CheckCircle2,
  AlertCircle,
  Eye,
  Calendar,
  Settings
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function BlogManager() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [seoScore, setSeoScore] = useState(0);

  // Simple SEO Score Calculation Simulation
  useEffect(() => {
    let score = 0;
    if (title.length > 10 && title.length < 60) score += 20;
    if (content.length > 300) score += 20;
    if (content.length > 1000) score += 10;
    if (title.toLowerCase().includes("email") || title.toLowerCase().includes("marketing")) score += 15;
    if (content.split(" ").length > 5) score += 10; // Placeholder for keyphrase density check
    
    // Random fluctuation to simulate "real-time analysis"
    setSeoScore(Math.min(100, Math.max(0, score)));
  }, [title, content]);

  const handleSave = () => {
    toast.success("Blog post saved successfully!");
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex gap-6 overflow-hidden">
      {/* Editor Section */}
      <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="border-b border-slate-200 p-4 flex items-center justify-between bg-slate-50">
           <div className="flex items-center gap-2">
             <button className="p-2 hover:bg-slate-200 rounded text-slate-600 transition-colors" title="Bold">
               <Type className="h-4 w-4" />
             </button>
             <button className="p-2 hover:bg-slate-200 rounded text-slate-600 transition-colors" title="Image">
               <ImageIcon className="h-4 w-4" />
             </button>
             <button className="p-2 hover:bg-slate-200 rounded text-slate-600 transition-colors" title="Link">
               <LinkIcon className="h-4 w-4" />
             </button>
             <div className="h-4 w-px bg-slate-300 mx-1" />
             <button className="p-2 hover:bg-slate-200 rounded text-slate-600 transition-colors" title="List">
               <List className="h-4 w-4" />
             </button>
             <button className="p-2 hover:bg-slate-200 rounded text-slate-600 transition-colors" title="Align Left">
               <AlignLeft className="h-4 w-4" />
             </button>
           </div>
           <div className="flex items-center gap-3">
             <span className="text-xs text-slate-500">Last saved: Just now</span>
             <button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
               <Save className="h-4 w-4" /> Save
             </button>
           </div>
        </div>

        {/* Edit Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
           <input 
             type="text" 
             placeholder="Enter post title..." 
             className="w-full text-4xl font-bold text-slate-900 placeholder:text-slate-300 border-none focus:ring-0 px-0 bg-transparent"
             value={title}
             onChange={(e) => setTitle(e.target.value)}
           />
           <textarea 
             placeholder="Start writing your amazing story..." 
             className="w-full h-full resize-none text-lg text-slate-600 placeholder:text-slate-300 border-none focus:ring-0 px-0 leading-relaxed bg-transparent"
             value={content}
             onChange={(e) => setContent(e.target.value)}
           />
        </div>
      </div>

      {/* Sidebar: SEO & Settings */}
      <div className="w-80 flex flex-col gap-6 overflow-y-auto">
        {/* SEO Score Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-slate-900 flex items-center gap-2">
               <Search className="h-4 w-4 text-blue-600" /> SEO Score
             </h3>
             <span className={`text-xl font-bold ${seoScore > 80 ? 'text-green-600' : seoScore > 50 ? 'text-orange-500' : 'text-red-500'}`}>
               {seoScore}/100
             </span>
           </div>
           
           <div className="w-full bg-slate-100 rounded-full h-2 mb-6">
             <motion.div 
               className={`h-2 rounded-full ${seoScore > 80 ? 'bg-green-500' : seoScore > 50 ? 'bg-orange-500' : 'bg-red-500'}`}
               initial={{ width: 0 }}
               animate={{ width: `${seoScore}%` }}
               transition={{ duration: 0.5 }}
             />
           </div>

           <div className="space-y-3">
             <div className="flex items-start gap-3 text-sm">
               {title.length >= 10 && title.length <= 60 ? (
                 <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
               ) : (
                 <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
               )}
               <span className="text-slate-600">Title length (10-60 chars)</span>
             </div>
             <div className="flex items-start gap-3 text-sm">
               {content.length > 300 ? (
                 <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
               ) : (
                 <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
               )}
               <span className="text-slate-600">Content length (&gt;300 words)</span>
             </div>
             <div className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                <span className="text-slate-600">Mobile friendly</span>
             </div>
           </div>
        </div>

        {/* Publishing Settings */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1">
           <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
             <Settings className="h-4 w-4 text-slate-500" /> Publish Settings
           </h3>
           
           <div className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Featured Image</label>
               <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 cursor-pointer transition-colors bg-slate-50">
                 <ImageIcon className="h-8 w-8 mb-2" />
                 <span className="text-xs font-medium">Click to upload</span>
               </div>
             </div>
             
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
               <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none">
                 <option>Email Marketing</option>
                 <option>Automation</option>
                 <option>Sales</option>
                 <option>Product Updates</option>
               </select>
             </div>

             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Author</label>
               <div className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg bg-slate-50">
                 <div className="h-6 w-6 rounded-full bg-slate-300 overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=Admin+User" alt="Admin" />
                 </div>
                 <span className="text-sm text-slate-700">Admin User</span>
               </div>
             </div>

             <div className="pt-4 border-t border-slate-100">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-sm font-medium text-slate-700">Visibility</span>
                 <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Public</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-sm font-medium text-slate-700">Schedule</span>
                 <span className="text-xs text-slate-500 flex items-center gap-1">
                   <Calendar className="h-3 w-3" /> Immediately
                 </span>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
