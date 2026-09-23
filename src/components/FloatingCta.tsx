import React, { useState, useEffect } from 'react';
import { INTEREST_FORM_URL, WHATSAPP_URL } from '../data/apartments';
import { ArrowUpRight, MessageCircle, Building2 } from 'lucide-react';

export const FloatingCta: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 350px
      setVisible(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-40 max-w-lg animate-in slide-in-from-bottom-5 duration-300">
      <div className="p-3 sm:p-4 rounded-2xl bg-slate-950/95 border border-amber-500/40 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 text-white">
        <div className="hidden sm:flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white leading-tight">
              Lumina Residence
            </div>
            <div className="text-[11px] text-amber-400">
              Unidades a partir de R$ 395 mil
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Quick WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 transition-colors"
            title="Falar no WhatsApp"
            aria-label="Falar no WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* REQUIRED TENHO INTERESSE BUTTON */}
          <a
            href={INTEREST_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 whitespace-nowrap transition-transform hover:scale-105 active:scale-95"
          >
            <span>Tenho Interesse</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </div>
  );
};
