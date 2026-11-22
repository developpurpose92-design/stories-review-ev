import React from 'react';
import { MessageCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function SalesBanner() {
  const whatsappUrl = "https://wa.me/919789459354?text=Hi%20EV%20Cyber%20Academy%2C%20I%20saw%20the%20student%20reviews%20and%20want%20to%20know%20more%20about%20the%20courses";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#0D1527] to-slate-950 border border-blue-500/40 p-8 sm:p-12 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
        
        {/* Subtle Cyber Grid Accent */}
        <div className="absolute inset-0 cyber-grid-dense opacity-20 pointer-events-none" />
        
        {/* Ambient Glows */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          {/* Text Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-medium mb-4">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>DIRECT ADMISSION ENQUIRY</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Ready to start your cybersecurity journey with{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                EV Cyber Academy?
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Have doubts about LFHP, EHF, or upcoming live workshops? Chat directly with our team. We guide you on roadmap, hands-on lab setup, and batch schedules.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-blue-400" /> 1-on-1 Guidance
              </span>
              <span>•</span>
              <span className="text-slate-300">Live Hands-on Labs</span>
              <span>•</span>
              <span className="text-slate-300">Fast Response on WhatsApp</span>
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="shrink-0 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-[0_0_30px_rgba(16,185,129,0.35)] border border-emerald-400/50 transition-all hover:scale-105 active:scale-95"
            >
              <div className="p-1 rounded-lg bg-black/20">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span>Chat on WhatsApp to Enroll</span>
              <ArrowRight className="w-5 h-5 text-emerald-100 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-center text-[11px] text-slate-400 mt-2 font-mono">
              +91 97894 59354 (Official EV Cyber Line)
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
