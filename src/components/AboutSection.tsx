import React from 'react';
import { UserCheck, Eye, Handshake, Headphones, ShieldCheck, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: UserCheck,
      title: 'Atendimento Consultivo',
      description: 'Entendemos seu momento de vida, preferências de planta, rotina familiar e capacidade financeira para filtrar as opções certas, sem perda de tempo.'
    },
    {
      icon: Eye,
      title: 'Apresentação Transparente',
      description: 'Apresentamos plantas reais, orientações de sol, padrão de acabamento, detalhes construtivos e visitas aos apartamentos decorados com total clareza.'
    },
    {
      icon: Handshake,
      title: 'Acompanhamento da Negociação',
      description: 'Auxiliamos na negociação de tabelas, fluxos de pagamento durante obras, análise de descontos e adequação das condições junto às incorporadoras.'
    },
    {
      icon: Headphones,
      title: 'Suporte no Processo de Compra',
      description: 'Orientação documental do início ao fim, suporte na aprovação do crédito imobiliário com agentes financeiros e acompanhamento até a assinatura do contrato.'
    }
  ];

  return (
    <section id="sobre" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
            <span>Nosso Compromisso</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Encontre seu próximo endereço com atendimento personalizado.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Comprar um imóvel na Zona Leste é uma decisão importante. Trabalhamos com foco na Mooca, Tatuapé e Vila Ema oferecendo acompanhamento próximo, ético e seguro em todas as etapas da jornada.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Confidence statement */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-serif text-base font-bold">
                Segurança em Primeiro Lugar
              </h4>
              <p className="text-xs text-slate-300">
                Informações sempre verificadas com as incorporadoras e atendimento realizado por profissionais credenciados.
              </p>
            </div>
          </div>
          <a
            href="#contato"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 transition-colors"
          >
            Falar com a Equipe
          </a>
        </div>
      </div>
    </section>
  );
};
