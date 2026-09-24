import React, { useState } from 'react';
import { GOOGLE_FORMS_URL, DEFAULT_WHATSAPP_NUMBER, generateWhatsappLink } from '../data/defaultProperties';
import { Send, CheckCircle2, FileText, ExternalLink, ShieldCheck, Clock } from 'lucide-react';

interface LeadFormSectionProps {
  onLeadCaptured?: (lead: any) => void;
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({ onLeadCaptured }) => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    neighborhood: 'Tatuapé',
    priceRange: 'R$ 500 mil a R$ 800 mil',
    bedrooms: '2 dormitórios',
    timeframe: 'Agora'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp) return;

    if (onLeadCaptured) {
      onLeadCaptured({
        ...formData,
        source: 'Formulário Principal de Lead',
        createdAt: new Date().toISOString()
      });
    }

    setSubmitted(true);

    const message = `Olá! Meu nome é ${formData.name}. Gostaria de receber opções de apartamentos em ${formData.neighborhood} (${formData.bedrooms}, ${formData.priceRange}). Pretendo comprar: ${formData.timeframe}. E-mail: ${formData.email || 'Não informado'}.`;
    const url = generateWhatsappLink(DEFAULT_WHATSAPP_NUMBER, message);

    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <section id="contato" className="py-16 sm:py-20 bg-slate-100/70 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Consultoria Personalizada
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
            Encontre um apartamento que combina com você.
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Preencha os campos abaixo e nosso time de corretores selecionará as opções mais assertivas na Mooca, Tatuapé e Vila Ema.
          </p>
        </div>

        {/* Form Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
          
          {submitted ? (
            <div className="py-12 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                Recebemos sua solicitação!
              </h3>
              <p className="text-sm text-slate-600">
                O corretor especialista no bairro selecionado já está separando as unidades ideais para seu perfil.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-slate-700 underline"
                >
                  Enviar outra consulta
                </button>
                <a
                  href={GOOGLE_FORMS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 underline flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Acessar formulário Google alternativo</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Nome, WhatsApp, Email */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/40 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    WhatsApp com DDD *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/40 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    E-mail (Opcional)
                  </label>
                  <input
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/40 text-slate-900"
                  />
                </div>
              </div>

              {/* Row 2: Bairro desejado, Faixa de preço, Dormitórios */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Bairro Desejado
                  </label>
                  <select
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/40 text-slate-900 font-medium"
                  >
                    <option value="Mooca">Mooca</option>
                    <option value="Tatuapé">Tatuapé</option>
                    <option value="Vila Ema">Vila Ema</option>
                    <option value="Aberto a Mooca, Tatuapé e Vila Ema">Aberto a qualquer um dos 3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Faixa de Preço
                  </label>
                  <select
                    value={formData.priceRange}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/40 text-slate-900 font-medium"
                  >
                    <option value="Até R$ 500 mil">Até R$ 500 mil</option>
                    <option value="R$ 500 mil a R$ 800 mil">R$ 500 mil a R$ 800 mil</option>
                    <option value="R$ 800 mil a R$ 1,2 milhão">R$ 800 mil a R$ 1,2 milhão</option>
                    <option value="Acima de R$ 1,2 milhão">Acima de R$ 1,2 milhão</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Dormitórios
                  </label>
                  <select
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/40 text-slate-900 font-medium"
                  >
                    <option value="1 dormitório">1 dormitório</option>
                    <option value="2 dormitórios">2 dormitórios</option>
                    <option value="3 dormitórios">3 dormitórios</option>
                    <option value="4 ou mais dormitórios">4 ou mais dormitórios</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Pretende comprar quando? */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Pretende comprar quando?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    'Agora',
                    'Nos próximos 3 meses',
                    'De 3 a 6 meses',
                    'Ainda estou pesquisando'
                  ].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center justify-center p-3 rounded-xl border text-xs font-semibold cursor-pointer text-center transition-all ${
                        formData.timeframe === option
                          ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-300'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="timeframe"
                        value={option}
                        checked={formData.timeframe === option}
                        onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                        className="sr-only"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>RECEBER OPÇÕES</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Google Form Link Separation */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Contato direto com corretores autorizados da Zona Leste.
                </span>

                <a
                  href={GOOGLE_FORMS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  <span>Formulário de Cadastro Google (Link Externo)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
