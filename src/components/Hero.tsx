import React from 'react';
import { INTEREST_FORM_URL } from '../data/apartments';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden pt-24 pb-16">
      {/* Background Image with Dark Vignette & Architectural Lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
          alt="Lumina Residence Fachada de Luxo"
          className="w-full h-full object-cover object-center brightness-[0.42] scale-105 transform animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-16">
        <div className="max-w-3xl">
          {/* Subtle text kicker / breadcrumb - no candy pills */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Lançamento Exclusivo</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span>Bairro Nobre</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span>Condições Especiais de Pré-Venda</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-6">
            Onde o design autoral encontra o seu novo padrão de vida.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
            Apartamentos de alto padrão de <strong className="text-white font-semibold">44m² a 228m²</strong> com suítes confortáveis, varanda gourmet integrada, lazer no rooftop e acabamentos nobres no melhor endereço da cidade.
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            {/* Primary Required CTA */}
            <a
              href={INTEREST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-400/40 hover:-translate-y-0.5 active:translate-y-0 transition-all group"
            >
              <span>Tenho Interesse</span>
              <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary Link to Explore Units */}
            <a
              href="#apartamentos"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-semibold text-base backdrop-blur-sm transition-all"
            >
              <span>Conhecer Plantas & Valores</span>
            </a>
          </div>

          {/* Clean metadata strip (unboxed, tasteful typography) */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white">44 a 228 <span className="text-amber-400 text-base font-sans">m²</span></div>
              <div className="text-xs text-slate-400 mt-0.5">Plantas inteligentes</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white">1 a 4</div>
              <div className="text-xs text-slate-400 mt-0.5">Suítes privativas</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white">1 a 4</div>
              <div className="text-xs text-slate-400 mt-0.5">Vagas demarcadas</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">2027</div>
              <div className="text-xs text-slate-400 mt-0.5">Entrega garantida</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Trust Badge */}
      <div className="hidden lg:flex absolute bottom-8 right-8 z-10 bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-xl p-4 items-center gap-4 shadow-2xl max-w-sm">
        <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Condições Especiais de Lançamento</div>
          <div className="text-xs text-slate-400 mt-0.5">Entrada parcelada e financiamento direto ou bancário com as menores taxas.</div>
        </div>
      </div>
    </section>
  );
};
