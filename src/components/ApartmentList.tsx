import React, { useState } from 'react';
import { APARTMENTS, INTEREST_FORM_URL } from '../data/apartments';
import { Apartment } from '../types';
import { ApartmentModal } from './ApartmentModal';
import { ArrowUpRight, Bed, Car, Maximize2, Sparkles, Eye, Check } from 'lucide-react';

export const ApartmentList: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);

  const filteredApartments = activeCategory === 'all'
    ? APARTMENTS
    : APARTMENTS.filter(item => item.category === activeCategory);

  return (
    <section id="apartamentos" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase font-semibold tracking-widest text-amber-400 mb-2">
              Tipologias & Plantas
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Escolha a planta ideal para o seu momento de vida.
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            Espaços inteligentes concebidos para maximizar a iluminação natural, ventilação cruzada e o convívio em família.
          </p>
        </div>

        {/* Filter Tabs (Interactive Segmented Control) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-xl mb-10 overflow-x-auto max-w-full w-fit">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Todas as Unidades ({APARTMENTS.length})
          </button>
          <button
            onClick={() => setActiveCategory('studio')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === 'studio'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Studios & 1 Suíte
          </button>
          <button
            onClick={() => setActiveCategory('family')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === 'family'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2 Suítes
          </button>
          <button
            onClick={() => setActiveCategory('luxury')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === 'luxury'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3 Suítes
          </button>
          <button
            onClick={() => setActiveCategory('penthouse')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === 'penthouse'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Coberturas Penthouse
          </button>
        </div>

        {/* Apartments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredApartments.map((apartment) => (
            <div
              key={apartment.id}
              className="group bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col shadow-xl"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                <img
                  src={apartment.heroImage}
                  alt={apartment.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {apartment.popular && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-bold text-[11px] uppercase tracking-wider px-3 py-1 rounded-md shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-slate-950" />
                    <span>Unidade Mais Desejada</span>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="text-xs font-medium text-slate-300 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
                    {apartment.area} m² de área privativa
                  </div>
                  <button
                    onClick={() => setSelectedApartment(apartment)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-amber-300 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 hover:border-amber-400/50 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>Ver Planta</span>
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {apartment.name}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-medium mt-1">
                    {apartment.tagline}
                  </p>
                  <p className="text-sm text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                    {apartment.description}
                  </p>

                  {/* Spec Row (Typographic separators) */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300 my-4 py-3 border-y border-slate-800/80">
                    <div className="flex items-center gap-1.5">
                      <Maximize2 className="w-4 h-4 text-amber-400" />
                      <span>{apartment.area} m²</span>
                    </div>
                    <span className="text-slate-600" aria-hidden="true">·</span>
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-amber-400" />
                      <span>{apartment.bedrooms} dorms ({apartment.suites} suíte{apartment.suites > 1 ? 's' : ''})</span>
                    </div>
                    <span className="text-slate-600" aria-hidden="true">·</span>
                    <div className="flex items-center gap-1.5">
                      <Car className="w-4 h-4 text-amber-400" />
                      <span>{apartment.parkingSpots} {apartment.parkingSpots > 1 ? 'vagas' : 'vaga'}</span>
                    </div>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-1.5 mb-6">
                    {apartment.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Call to Actions */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                      Valores de lançamento
                    </span>
                    <span className="text-2xl font-serif font-bold text-white">
                      A partir de {apartment.priceFrom.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedApartment(apartment)}
                      className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors text-center"
                    >
                      Planta
                    </button>

                    {/* TENHO INTERESSE BUTTON (Required) */}
                    <a
                      href={INTEREST_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <span>Tenho Interesse</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA Note */}
        <div className="mt-12 text-center bg-slate-900/60 border border-slate-800 rounded-xl p-6 max-w-2xl mx-auto">
          <p className="text-sm text-slate-300 mb-3">
            Precisa de uma planta personalizada ou quer simular um fluxo de pagamento sob medida?
          </p>
          <a
            href={INTEREST_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 underline underline-offset-4"
          >
            <span>Preencha o formulário e receba a tabela completa com todas as disponibilidades</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Modal floor plan preview */}
      <ApartmentModal
        apartment={selectedApartment}
        onClose={() => setSelectedApartment(null)}
      />
    </section>
  );
};
