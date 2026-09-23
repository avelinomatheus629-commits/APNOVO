import React from 'react';
import { INTEREST_FORM_URL, WHATSAPP_URL, PHONE_NUMBER } from '../data/apartments';
import { ArrowRight, MessageCircle, Phone, Sparkles, CheckCircle2 } from 'lucide-react';

export const CtaSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Graphic Accent */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtitle kicker */}
        <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-amber-400 mb-4 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Oportunidade de Lançamento · Tabela Zero</span>
        </div>

        {/* Title */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
          Dê o primeiro passo para viver no endereço mais extraordinário da cidade.
        </h2>

        {/* Subtitle */}
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Cadastre-se para receber a tabela de preços oficial de pré-lançamento, book digital de plantas em alta resolução e atendimento prioritário com nossos especialistas.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          {/* REQUIRED TENHO INTERESSE BUTTON */}
          <a
            href={INTEREST_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-base shadow-2xl shadow-amber-500/30 hover:shadow-amber-400/50 hover:scale-105 active:scale-95 transition-all group"
          >
            <span>Tenho Interesse</span>
            <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* WhatsApp Direct */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 border border-slate-800 font-semibold text-base transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

        {/* Reassurance points */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-4 border-t border-slate-800/80 max-w-xl mx-auto">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Atendimento sem compromisso</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Envio imediato do material digital</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Plantão de vendas com decorado</span>
          </div>
        </div>
      </div>
    </section>
  );
};
