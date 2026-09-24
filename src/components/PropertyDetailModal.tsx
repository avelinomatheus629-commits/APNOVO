import React, { useState } from 'react';
import { Property } from '../types/property';
import { GOOGLE_FORMS_URL, DEFAULT_WHATSAPP_NUMBER, generateWhatsappLink } from '../data/defaultProperties';
import { X, MapPin, Bed, Car, Maximize2, Sparkles, MessageCircle, FileText, CheckCircle2, ChevronRight, Share2 } from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onSimulateProperty?: (property: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onSimulateProperty
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'fotos' | 'plantas' | 'lazer'>('fotos');

  if (!property) return null;

  const imagesToShow = activeTab === 'plantas' && property.floorPlans.length > 0
    ? property.floorPlans
    : property.gallery;

  const mainImage = imagesToShow[activeImageIndex] || property.coverImage;

  const whatsappMessage = `Olá! Tenho interesse no apartamento ${property.name} (${property.neighborhood}) e gostaria de receber mais informações.`;
  const whatsappUrl = generateWhatsappLink(
    property.whatsappNumber || DEFAULT_WHATSAPP_NUMBER,
    whatsappMessage
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 my-8 overflow-hidden">
        
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-5 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                {property.neighborhood}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {property.status}
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              {property.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: property.name,
                    text: `Confira o empreendimento ${property.name} em ${property.neighborhood}`,
                    url: window.location.href
                  }).catch(() => {});
                }
              }}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
              title="Compartilhar"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Gallery Section */}
          <div className="space-y-3">
            {/* Gallery Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs font-bold text-slate-600">
              <button
                onClick={() => { setActiveTab('fotos'); setActiveImageIndex(0); }}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'fotos' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                Fotos & Áreas Comuns ({property.gallery.length})
              </button>
              {property.floorPlans && property.floorPlans.length > 0 && (
                <button
                  onClick={() => { setActiveTab('plantas'); setActiveImageIndex(0); }}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === 'plantas' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  Plantas Humanizadas ({property.floorPlans.length})
                </button>
              )}
            </div>

            {/* Main Stage Image */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={mainImage}
                alt={property.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-slate-950/75 text-white text-[11px] px-2.5 py-1 rounded-md">
                {activeImageIndex + 1} de {imagesToShow.length}
              </div>
            </div>

            {/* Thumbnails */}
            {imagesToShow.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {imagesToShow.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-amber-500 ring-2 ring-amber-300' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Specs & Address */}
          <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200/80">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium mb-4">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{property.address} — {property.neighborhood}, {property.city}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
              <div className="bg-white p-3 rounded-lg border border-slate-200/60">
                <span className="text-[11px] text-slate-500 block">Área Privativa</span>
                <span className="font-bold text-slate-900">
                  {property.areaMin}{property.areaMax ? ` a ${property.areaMax}` : ''} m²
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200/60">
                <span className="text-[11px] text-slate-500 block">Dormitórios</span>
                <span className="font-bold text-slate-900">
                  {property.bedroomsMin}{property.bedroomsMax ? ` a ${property.bedroomsMax}` : ''} dorms
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200/60">
                <span className="text-[11px] text-slate-500 block">Suítes</span>
                <span className="font-bold text-slate-900">{property.suites} suíte(s)</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200/60">
                <span className="text-[11px] text-slate-500 block">Vagas de Garagem</span>
                <span className="font-bold text-slate-900">{property.parkingSpots} vaga(s)</span>
              </div>
            </div>
          </div>

          {/* Pricing & Payment Conditions */}
          <div className="bg-amber-50/70 rounded-xl p-4 sm:p-5 border border-amber-200/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                  Preço e Condições
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 mt-0.5">
                  {property.priceDisplay || `A partir de R$ ${property.price.toLocaleString('pt-BR')}`}
                </div>
              </div>

              {onSimulateProperty && (
                <button
                  onClick={() => {
                    onClose();
                    onSimulateProperty(property);
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors self-start sm:self-auto"
                >
                  Simular Financiamento Deste Imóvel
                </button>
              )}
            </div>

            <p className="text-xs text-slate-700 mt-2.5 pt-2.5 border-t border-amber-200/60">
              <strong className="text-slate-900">Condições de Pagamento: </strong>
              {property.paymentConditions}
            </p>
          </div>

          {/* Professional Description */}
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
              Sobre o Empreendimento
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Lazer e Áreas Comuns Reais */}
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-3">
              Lazer e Áreas Comuns
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {property.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Big CTA */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>TENHO INTERESSE NESTE APARTAMENTO</span>
            </a>

            <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
              <span>Mensagem automática pronta com os dados da unidade</span>
              <span>•</span>
              <a
                href={GOOGLE_FORMS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 hover:text-amber-800 font-semibold underline flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Preencher formulário Google</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
