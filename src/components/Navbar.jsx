import React from 'react';
import { Shield, Sparkles, MessageCircle, PenLine } from 'lucide-react';

export default function Navbar({ totalStories, onShareClick }) {
  const whatsappUrl = "https://wa.me/919789459354?text=Hi%20EV%20Cyber%20Academy%2C%20I%20saw%20the%20student%20reviews%20and%20want%20to%20know%20more%20about%20the%20courses";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0A0A0F]/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 border border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.35)]">
            <Shield className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white font-mono">
                EV <span className="text-blue-500">CYBER</span> ACADEMY
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                Verified Portal
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Real Skills. Real Transformations.</p>
          </div>
        </div>

        {/* Live Stories Badge & Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span><strong className="text-emerald-400 font-mono">{totalStories}</strong> Verified Stories</span>
          </div>

          <button
            onClick={onShareClick}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-500/20 border border-blue-400/30 transition-all active:scale-95"
          >
            <PenLine className="w-4 h-4" />
            <span>Share Story</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
