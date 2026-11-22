import React from 'react';
import { Star, ShieldCheck, ArrowDown, Award, Users, Terminal } from 'lucide-react';

export default function HeroSection({ totalStories, averageRating, onShareClick }) {
  const whatsappUrl = "https://wa.me/919789459354?text=Hi%20EV%20Cyber%20Academy%2C%20I%20saw%20the%20student%20reviews%20and%20want%20to%20know%20more%20about%20the%20courses";

  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 overflow-hidden cyber-grid">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-emerald-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Verification Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-xs text-blue-400 font-mono tracking-wide mb-6 shadow-inner">
          <Terminal className="w-3.5 h-3.5 text-blue-400" />
          <span>AUTHENTIC CYBERSECURITY LEARNER ARCHIVES</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Main Title & Subtitle */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          EV Cyber Academy: <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            Student Real Stories
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Real Skills. Real Transformations. Read what our learners achieved in Linux, Forensics, and Ethical Hacking.
        </p>

        {/* Hero CTA Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onShareClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-[0_0_25px_rgba(59,130,246,0.35)] border border-blue-400/40 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Share Your Story</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-emerald-300 bg-slate-900/90 hover:bg-slate-800/90 border border-emerald-500/40 hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Talk to Admission Mentor</span>
            <span className="text-emerald-400">→</span>
          </a>
        </div>

        {/* Dynamic Stats Bar (Auto-Calculated from Genuine Reviews) */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl shadow-2xl">
          {/* Stat 1: Total Verified Stories */}
          <div className="flex flex-col items-center justify-center p-3 border-r border-slate-800/60 last:border-r-0">
            <div className="flex items-center gap-1.5 text-blue-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Total Stories</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {totalStories}
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">100% Genuine</span>
          </div>

          {/* Stat 2: Average Rating */}
          <div className="flex flex-col items-center justify-center p-3 border-r border-slate-800/60 last:border-r-0">
            <div className="flex items-center gap-1.5 text-amber-400 mb-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Avg Rating</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-center gap-1">
              {totalStories > 0 ? (
                <>
                  {averageRating} <span className="text-amber-400 text-lg">★</span>
                </>
              ) : (
                <span className="text-slate-400 text-xl font-normal">—</span>
              )}
            </div>
            <span className="text-[11px] text-slate-400">
              {totalStories > 0 ? 'Out of 5.0 Scale' : 'Awaiting 1st Review'}
            </span>
          </div>

          {/* Stat 3: Practical Lab Growth */}
          <div className="flex flex-col items-center justify-center p-3 border-r border-slate-800/60 last:border-r-0">
            <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Practical Labs</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              100%
            </div>
            <span className="text-[11px] text-slate-400">Hands-on Drills</span>
          </div>

          {/* Stat 4: Community Learners */}
          <div className="flex flex-col items-center justify-center p-3">
            <div className="flex items-center gap-1.5 text-purple-400 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Alumni Community</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              1,500+
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">Active Defenders</span>
          </div>
        </div>
      </div>
    </section>
  );
}
