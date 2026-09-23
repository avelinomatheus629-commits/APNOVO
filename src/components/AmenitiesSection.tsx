import React, { useState } from 'react';
import { AMENITIES, INTEREST_FORM_URL } from '../data/apartments';
import { Waves, Dumbbell, Wine, Briefcase, Sparkles, Dog, ArrowRight } from 'lucide-react';

export const AmenitiesSection: React.FC = () => {
  const [activeAmenityId, setActiveAmenityId] = useState(AMENITIES[0].id);
  const activeAmenity = AMENITIES.find(a => a.id === activeAmenityId) || AMENITIES[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves': return <Waves className="w-5 h-5" />;
      case 'Dumbbell': return <Dumbbell className="w-5 h-5" />;
      case 'Wine': return <Wine className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Dog': return <Dog className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="lazer" className="py-20 bg-slate-900 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase font-semibold tracking-widest text-amber-400 mb-2">
            Lazer & Wellness Nas Alturas
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Mais de 1.800m² de áreas de lazer entregues totalmente equipadas e decoradas.
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Ambientes com assinatura de grandes nomes do design e arquitetura nacional, projetados para estender o seu lar para além das quatro paredes.
          </p>
        </div>

        {/* Interactive Feature Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left selector list */}
          <div className="lg:col-span-5 space-y-2.5">
            {AMENITIES.map((item) => {
              const isSelected = item.id === activeAmenityId;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveAmenityId(item.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 border flex items-start gap-4 ${
                    isSelected
                      ? 'bg-slate-950 border-amber-500/50 shadow-lg shadow-black/30'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {getIcon(item.icon)}
                  </div>
                  <div>
                    <h3 className={`text-base font-semibold transition-colors ${
                      isSelected ? 'text-amber-300' : 'text-white'
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Active Spotlight */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
              <img
                src={activeAmenity.image}
                alt={activeAmenity.title}
                key={activeAmenity.image}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  {activeAmenity.subtitle}
                </span>
                <h4 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                  {activeAmenity.title}
                </h4>
                <p className="text-sm text-slate-200 mt-2 max-w-xl leading-relaxed">
                  {activeAmenity.description}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Áreas comuns entregues climatizadas e com Wi-Fi dedicado.
                  </span>

                  {/* TENHO INTERESSE BUTTON */}
                  <a
                    href={INTEREST_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md"
                  >
                    <span>Tenho Interesse</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
