import React from 'react';
import { Property } from '../types/property';
import { DEFAULT_WHATSAPP_NUMBER, generateWhatsappLink } from '../data/defaultProperties';
import { MapPin, Bed, Car, Maximize2, Sparkles, MessageCircle, Eye, Tag, Check, Info } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onViewDetails
}) => {
  const whatsappMessage = `Olá! Vi o apartamento ${property.name} (${property.neighborhood}) no site e gostaria de saber preço, disponibilidade e condições de pagamento.`;
  const whatsappUrl = generateWhatsappLink(
    property.whatsappNumber || DEFAULT_WHATSAPP_NUMBER,
    whatsappMessage
  );

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'DESTAQUE':
        return 'bg-amber-500 text-slate-950 font-bold';
      case 'LANÇAMENTO':
        return 'bg-blue-600 text-white font-bold';
      case 'OPORTUNIDADE':
        return 'bg-emerald-600 text-white font-bold';
      case 'PRONTO PARA MORAR':
        return 'bg-indigo-600 text-white font-bold';
      default:
        return 'bg-slate-800 text-white font-semibold';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Top Image Preview */}
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={property.coverImage}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

          {/* Badge */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {property.badge && (
              <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs ${getBadgeStyle(property.badge)}`}>
                {property.badge}
              </span>
            )}
            <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm text-slate-900 font-bold shadow-xs">
              {property.status}
            </span>
          </div>

          {/* Bairro & Cidade chip */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-950/70 backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{property.neighborhood}, {property.city}</span>
            </span>

            {property.isSampleData && (
              <span className="text-[10px] bg-slate-900/80 px-2 py-0.5 rounded text-slate-300">
                Editável no Painel
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-3">
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
              {property.name}
            </h3>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{property.address}</span>
            </p>
          </div>

          {/* Quick Specs Grid (Dormitórios, Área, Vagas, Suítes, Varanda) */}
          <div className="grid grid-cols-2 gap-2 py-3 border-y border-slate-100 text-xs text-slate-700 font-medium">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                {property.bedroomsMin}
                {property.bedroomsMax && property.bedroomsMax > property.bedroomsMin ? ` ou ${property.bedroomsMax}` : ''} dorms
                {property.suites > 0 ? ` (${property.suites} suíte)` : ''}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                {property.areaMin}
                {property.areaMax && property.areaMax > property.areaMin ? ` a ${property.areaMax}` : ''} m²
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{property.parkingSpots} {property.parkingSpots > 1 ? 'vagas' : 'vaga'}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{property.hasBalcony ? 'Com varanda gourmet' : 'Sem varanda'}</span>
            </div>
          </div>

          {/* Special Condition / Highlight */}
          {property.specialCondition && (
            <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-1.5">
              <Tag className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
              <span className="font-medium">{property.specialCondition}</span>
            </div>
          )}

          {/* Short Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {property.description}
          </p>
        </div>
      </div>

      {/* Bottom Pricing & Actions */}
      <div className="p-5 sm:p-6 pt-0 space-y-3">
        {/* Pricing */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              Preço Estimado
            </span>
            <span className="text-lg font-bold text-slate-900 font-mono">
              {property.priceDisplay || `A partir de R$ ${property.price.toLocaleString('pt-BR')}`}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {property.status}
          </span>
        </div>

        {/* Buttons: VER DETALHES + FALAR NO WHATSAPP + QUERO SABER MAIS */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewDetails(property)}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-slate-700" />
            <span>VER DETALHES</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>FALAR NO WHATSAPP</span>
          </a>
        </div>

        <button
          onClick={() => onViewDetails(property)}
          className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md transition-all"
        >
          <span>QUERO SABER MAIS</span>
        </button>
      </div>
    </div>
  );
};
