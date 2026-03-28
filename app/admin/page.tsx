"use client";
import React, { useState, useEffect } from "react";
import { Settings, Save, CheckCircle, Smartphone, Monitor } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AdminPage() {
  const [content, setContent] = useState({
    heroTitle: "",
    heroSubtitle: "",
    reserveTitle: "",
    reserveSubtitle: "",
    footerText: ""
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent({ ...content, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
      });
      if (res.ok) setSaved(true);
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-32 pb-20 px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl shadow-lg flex items-center justify-center text-white">
            <Settings size={26} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Platform Content CMS</h1>
            <p className="text-slate-500 font-medium">Manage text and elements across the Treasure Fun frontend.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Main Hero Section Editor */}
          <div className="p-8 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
               <Monitor size={20} className="text-indigo-500"/> Header / Hero Section
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Main Headline (H1)</label>
                <input 
                  type="text" 
                  name="heroTitle" 
                  value={content.heroTitle} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Subtitle / Description</label>
                <textarea 
                  name="heroSubtitle" 
                  value={content.heroSubtitle} 
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Reserve Section Editor */}
          <div className="p-8 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
               <Smartphone size={20} className="text-indigo-500"/> Reserve Section
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Section Headline</label>
                <input 
                  type="text" 
                  name="reserveTitle" 
                  value={content.reserveTitle} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition outline-none font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Subtext</label>
                <textarea 
                  name="reserveSubtitle" 
                  value={content.reserveSubtitle} 
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition outline-none text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Footer Editor */}
          <div className="p-8 bg-slate-50/50">
            <h2 className="text-xl font-bold text-slate-800 mb-5">Footer Details</h2>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">About Description</label>
              <textarea 
                name="footerText" 
                value={content.footerText} 
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 transition outline-none text-slate-600"
              />
            </div>
          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="fixed bottom-8 p-4 bg-white/80 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl flex items-center gap-4 animate-in slide-in-from-bottom-5 left-1/2 transform -translate-x-1/2 w-[400px] justify-between z-50">
           <div className="text-sm font-bold text-slate-500 flex items-center gap-2">
             {saved ? <><CheckCircle size={18} className="text-green-500" /> Changes Published</> : "Unsaved Changes"}
           </div>
           <button 
             onClick={handleSave}
             disabled={saving}
             className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition flex items-center gap-2 shadow-sm disabled:opacity-50"
           >
             <Save size={18} />
             {saving ? "Saving..." : "Save Content"}
           </button>
        </div>

      </div>
    </div>
  );
}