import React, { useState } from 'react';
import { GOOGLE_FORMS_URL, DEFAULT_WHATSAPP_NUMBER, generateWhatsappLink } from '../data/defaultProperties';
import { ArrowDown, MessageCircle, Send, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

interface HeroProps {
  onScrollToCatalog: () => void;
  onFilterNeighborhood: (neighborhood: string) => void;
  onLeadCaptured?: (lead: any) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToCatalog,
  onFilterNeighborhood,
  onLeadCaptured
}) => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    neighborhood: 'Tatuapé',
    priceRange: 'R$ 500 mil a R$ 800 mil',
    bedrooms: '2 dormitórios'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp) return;

    if (onLeadCaptured) {
      onLeadCaptured({
        ...formData,
        source: 'Formulário Rápido - Hero',
        createdAt: new Date().toISOString()
      });
    }

    setSubmitted(true);

    const message = `Olá! Meu nome é ${formData.name}. Tenho interesse em apartamentos no bairro ${formData.neighborhood} (${formData.bedrooms}, faixa de ${formData.priceRange}). Gostaria de receber as melhores opções disponíveis!`;
    const url = generateWhatsappLink(DEFAULT_WHATSAPP_NUMBER, message);

    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  const defaultWhatsapp = generateWhatsappLink(
    DEFAULT_WHATSAPP_NUMBER,
    'Olá! Gostaria de falar com um corretor sobre apartamentos disponíveis na Mooca, Tatuapé e Vila Ema.'
  );

  return (
    <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center bg-slate-900 text-white overflow-hidden py-12 lg:py-20">
      {/* Background with dark gradient overlay for optimal readability */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85"
          alt="Apartamentos na Zona Leste de São Paulo"
          className="w-full h-full object-cover object-center brightness-[0.38] scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Main CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Zona Leste · Mooca · Tatuapé · Vila Ema</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Encontre seu novo apartamento na Zona Leste de São Paulo.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
              Apartamentos selecionados na Mooca, Tatuapé e Vila Ema para você encontrar o imóvel que combina com seu momento.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onScrollToCatalog}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all"
              >
                <span>VER APARTAMENTOS</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <a
                href={defaultWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>FALAR COM UM CORRETOR</span>
              </a>
            </div>

            {/* Trust points */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Atendimento Consultivo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Plantas Transparentes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Segurança Jurídica</span>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Lead Capture Form */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-100">
              <div className="border-b border-slate-100 pb-4 mb-4">
                <span className="text-[11px] font-bold tracking-wider text-amber-600 uppercase">
                  Receba opções no WhatsApp
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 mt-0.5">
                  Quais características você procura?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enviaremos em poucos minutos as opções compatíveis com seu perfil.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">
                    Solicitação enviada com sucesso!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Abrindo WhatsApp para conectar você a um corretor especialista da Zona Leste.
                  </p>
                  <a
                    href={GOOGLE_FORMS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs text-amber-700 font-semibold underline mt-2"
                  >
                    Ou acesse nosso formulário detalhado do Google
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Nome */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Seu Nome *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Matheus Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 text-slate-900"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WhatsApp com DDD *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 text-slate-900"
                    />
                  </div>

                  {/* Bairro de Interesse */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Bairro de Interesse
                      </label>
                      <select
                        value={formData.neighborhood}
                        onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 text-slate-900 font-medium"
                      >
                        <option value="Tatuapé">Tatuapé</option>
                        <option value="Mooca">Mooca</option>
                        <option value="Vila Ema">Vila Ema</option>
                        <option value="Qualquer um dos 3">Todos os 3 bairros</option>
                      </select>
                    </div>

                    {/* Dormitórios */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Dormitórios
                      </label>
                      <select
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 text-slate-900 font-medium"
                      >
                        <option value="1 dormitório">1 dormitório</option>
                        <option value="2 dormitórios">2 dormitórios</option>
                        <option value="3 dormitórios">3 dormitórios</option>
                        <option value="4 ou mais">4+ dormitórios</option>
                      </select>
                    </div>
                  </div>

                  {/* Faixa de Valor */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Faixa de Valor Pretendida
                    </label>
                    <select
                      value={formData.priceRange}
                      onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 text-slate-900 font-medium"
                    >
                      <option value="Até R$ 500 mil">Até R$ 500 mil</option>
                      <option value="R$ 500 mil a R$ 800 mil">R$ 500 mil a R$ 800 mil</option>
                      <option value="R$ 800 mil a R$ 1,2 milhão">R$ 800 mil a R$ 1,2 milhão</option>
                      <option value="Acima de R$ 1,2 milhão">Acima de R$ 1,2 milhão</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>QUERO RECEBER OPÇÕES</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-slate-500 text-center">
                    Seus dados estão protegidos. Atendimento rápido e sem compromisso.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
