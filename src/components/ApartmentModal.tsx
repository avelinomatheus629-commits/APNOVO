import React from 'react';
import { Apartment } from '../types';
import { INTEREST_FORM_URL } from '../data/apartments';
import { X, ArrowRight, Check, Maximize2, Bed, Bath, Car, Layers } from 'lucide-react';

interface ApartmentModalProps {
  apartment: Apartment | null;
  onClose: () => void;
}

export const ApartmentModal: React.FC<ApartmentModalProps> = ({ apartment, onClose }) => {
  if (!apartment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div>
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              Detalhamento de Planta
            </span>
            <h3 className="text-xl font-serif font-bold text-white mt-0.5">
              {apartment.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Main image / Floor plan banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Perspectiva da Unidade</span>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-800 border border-slate-700/60">
                <img
                  src={apartment.heroImage}
                  alt={apartment.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Planta Baixa Ilustrada</span>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-800 border border-slate-700/60">
                <img
                  src={apartment.floorPlanImage}
                  alt={`Planta baixa ${apartment.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
            <div>
              <div className="text-xs text-slate-400">Área Privativa</div>
              <div className="text-lg font-bold text-white mt-0.5">{apartment.area} m²</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Dormitórios</div>
              <div className="text-lg font-bold text-white mt-0.5">{apartment.bedrooms} ({apartment.suites} suíte{apartment.suites > 1 ? 's' : ''})</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Banheiros</div>
              <div className="text-lg font-bold text-white mt-0.5">{apartment.bathrooms}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Vagas de Garagem</div>
              <div className="text-lg font-bold text-white mt-0.5">{apartment.parkingSpots} {apartment.parkingSpots > 1 ? 'vagas' : 'vaga'}</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Sobre esta tipologia:</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {apartment.description}
            </p>
          </div>

          {/* Features list */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Diferenciais específicos inclusos nesta planta:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {apartment.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price alert banner */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-amber-300/80 font-medium">Condição exclusiva de lançamento</div>
              <div className="text-2xl font-serif font-bold text-amber-400">
                A partir de {apartment.priceFrom.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </div>
              <div className="text-xs text-slate-400">Com opção de entrada reduzida e parcelamento durante a obra.</div>
            </div>

            {/* TENHO INTERESSE BUTTON (Required) */}
            <a
              href={INTEREST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0"
            >
              <span>Tenho Interesse</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Unidades sujeitas à disponibilidade de estoque.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Fechar detalhes
          </button>
        </div>
      </div>
    </div>
  );
};
