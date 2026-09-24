import React from 'react';
import { ArrowRight, MapPin, Building } from 'lucide-react';

interface NeighborhoodCardsProps {
  onSelectNeighborhood: (neighborhood: 'Mooca' | 'Tatuapé' | 'Vila Ema') => void;
  selectedNeighborhood?: string;
}

export const NeighborhoodCards: React.FC<NeighborhoodCardsProps> = ({
  onSelectNeighborhood,
  selectedNeighborhood
}) => {
  const regions = [
    {
      name: 'Mooca' as const,
      title: 'Apartamentos na Mooca',
      description: 'Encontre opções de apartamentos em uma das regiões mais tradicionais de São Paulo.',
      buttonText: 'VER IMÓVEIS DA MOOCA',
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
      badge: 'Tradição & Gastronomia',
      stats: 'Opções de 2 e 3 dorms'
    },
    {
      name: 'Tatuapé' as const,
      title: 'Apartamentos no Tatuapé',
      description: 'Conheça apartamentos com diferentes plantas, características e faixas de preço.',
      buttonText: 'VER IMÓVEIS DO TATUAPÉ',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      badge: 'Alta Infraestrutura & Parques',
      stats: 'Studios a 4 dormitórios'
    },
    {
      name: 'Vila Ema' as const,
      title: 'Apartamentos na Vila Ema',
      description: 'Descubra opções residenciais para diferentes perfis e necessidades.',
      buttonText: 'VER IMÓVEIS DA VILA EMA',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
      badge: 'Mobilidade & Crescimento',
      stats: 'Excelente custo-benefício'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            <span>Regiões em Destaque</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Escolha seu bairro de preferência na Zona Leste
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Navegue pelos empreendimentos disponíveis em cada uma das três principais regiões atendidas.
          </p>
        </div>

        {/* 3 Large Region Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {regions.map((region) => {
            const isSelected = selectedNeighborhood === region.name;
            return (
              <div
                key={region.name}
                className={`group relative rounded-2xl overflow-hidden bg-white border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl ${
                  isSelected
                    ? 'border-amber-500 ring-2 ring-amber-400/30'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Photo with subtle overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={region.image}
                    alt={region.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-slate-900 shadow-xs">
                      {region.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-xs text-amber-300 font-semibold block">
                      Zona Leste de São Paulo
                    </span>
                    <div className="text-lg font-serif font-bold leading-tight">
                      {region.name}
                    </div>
                  </div>
                </div>

                {/* Body description */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                      {region.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {region.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100">
                    <button
                      onClick={() => onSelectNeighborhood(region.name)}
                      className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-amber-500 group-hover:bg-amber-500 text-white group-hover:text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
                    >
                      <span>{region.buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
