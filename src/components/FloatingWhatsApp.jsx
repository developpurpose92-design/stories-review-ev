import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const whatsappUrl = "https://wa.me/919789459354?text=Hi%20EV%20Cyber%20Academy%2C%20I%20saw%20the%20student%20reviews%20and%20want%20to%20know%20more%20about%20the%20courses";

  return (
    <aside aria-label="WhatsApp enquiry shortcut" className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip hint on hover */}
      <span className="hidden sm:inline-block mr-3 px-3.5 py-1.5 rounded-xl bg-slate-900/95 border border-slate-700 text-xs text-white font-medium shadow-2xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with Admissions 👋
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)] border-2 border-emerald-300 hover:scale-110 active:scale-95 transition-all"
      >
        {/* Pulse ring animation */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-30 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7" />
      </a>
    </aside>
  );
}
