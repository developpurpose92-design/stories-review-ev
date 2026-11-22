import React from 'react';
import { Shield, MessageCircle, ArrowUp } from 'lucide-react';

export default function Footer({ onScrollTop }) {
  const whatsappUrl = "https://wa.me/919789459354?text=Hi%20EV%20Cyber%20Academy%2C%20I%20saw%20the%20student%20reviews%20and%20want%20to%20know%20more%20about%20the%20courses";

  return (
    <footer className="border-t border-slate-900 bg-[#060609] py-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-white font-mono tracking-tight text-base">
                EV <span className="text-blue-500">CYBER</span> ACADEMY
              </span>
              <p className="text-xs text-slate-500">
                Tamil Nadu's Hands-on Practical Cybersecurity Training
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm">
            <a
              href="#review-form-section"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              Post a Review
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Helpdesk
            </a>
            <button
              onClick={onScrollTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-1 text-xs cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} EV Cyber Academy. All rights reserved. LFHP, EHF, & Workshop Archives.
          </p>
          <p className="flex items-center gap-1 text-slate-400">
            Engineered with strict cybersecurity & SaaS aesthetic standards.
          </p>
        </div>
      </div>
    </footer>
  );
}
