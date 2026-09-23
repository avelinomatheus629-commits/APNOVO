import React from 'react';
import { LOCATION_HIGHLIGHTS, INTEREST_FORM_URL } from '../data/apartments';
import { MapPin, Navigation, Trees, Utensils, GraduationCap, HeartPulse, Train, ArrowRight } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'parque': return <Trees className="w-4 h-4 text-emerald-400" />;
      case 'gastronomia': return <Utensils className="w-4 h-4 text-amber-400" />;
      case 'educacao': return <GraduationCap className="w-4 h-4 text-blue-400" />;
      case 'saude': return <HeartPulse className="w-4 h-4 text-rose-400" />;
      case 'mobilidade': return <Train className="w-4 h-4 text-cyan-400" />;
      default: return <Navigation className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <section id="localizacao" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase font-semibold tracking-widest text-amber-400 mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Localização Privilegiada</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              A poucos passos do que realmente importa para sua rotina.
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            Situado na região mais valorizada e arborizada, cercado por alta gastronomia, parques e as principais vias de acesso.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Points of interest list */}
          <div className="lg:col-span-6 space-y-3">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 mb-4">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Endereço do Empreendimento
              </div>
              <div className="text-base font-semibold text-white mt-1">
                Av. das Acácias Nobres, 1250 - Bairro Jardim Europa
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Plantão de Vendas com Apartamento Decorado no local.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LOCATION_HIGHLIGHTS.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-start gap-3"
                >
                  <div className="p-2 rounded-lg bg-slate-800 shrink-0">
                    {getCategoryIcon(item.type)}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                      <span className="font-mono text-amber-400">{item.distance}</span>
                      <span className="text-slate-600">·</span>
                      <span>{item.time} ({item.by})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={INTEREST_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
              >
                <span>Tenho Interesse e Quero Visitar</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-xs text-slate-400 text-center sm:text-left">
                Estacionamento exclusivo com manobrista gratuito para visitantes.
              </span>
            </div>
          </div>

          {/* Interactive visual location map card */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
                alt="Localização Lumina Residence"
                className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Pin Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                <div className="bg-amber-500 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg shadow-xl shadow-amber-500/50 flex items-center gap-1.5 whitespace-nowrap">
                  <MapPin className="w-4 h-4 fill-slate-950" />
                  <span>Lumina Residence</span>
                </div>
                <div className="w-2 h-2 bg-amber-500 rotate-45 -mt-1 shadow-md" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">
                    Região com índice de valorização imobiliária superior a 14% ao ano.
                  </span>
                  <a
                    href={INTEREST_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-2 ml-2 whitespace-nowrap"
                  >
                    Ver no mapa
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
