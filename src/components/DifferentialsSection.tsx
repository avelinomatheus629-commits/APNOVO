import React from 'react';
import { INTEREST_FORM_URL } from '../data/apartments';
import { Zap, VolumeX, Shield, Sun, Wifi, Cpu, ArrowUpRight } from 'lucide-react';

export const DifferentialsSection: React.FC = () => {
  const differentials = [
    {
      icon: VolumeX,
      title: 'Isolamento Acústico Superior',
      desc: 'Manta de amortecimento acústico em todas as lajes residenciais e tubulações com envelopamento para silêncio pleno.'
    },
    {
      icon: Zap,
      title: 'Ponto para Carro Elétrico',
      desc: 'Infraestrutura individual de carregamento veicular com medição individualizada em cada vaga de garagem.'
    },
    {
      icon: Cpu,
      title: 'Automação & Smart Home',
      desc: 'Fechadura eletrônica digital, tomadas USB, infra para assistente virtual e comando de iluminação e persianas.'
    },
    {
      icon: Sun,
      title: 'Sustentabilidade & Energia Solar',
      desc: 'Painéis fotovoltaicos para suprir áreas comuns, reduzindo o custo da taxa de condomínio em até 30%.'
    },
    {
      icon: Shield,
      title: 'Segurança High-Tech 24h',
      desc: 'Controle de acesso por reconhecimento facial, clausura dupla para pedestres e veículos, e CFTV de alta resolução.'
    },
    {
      icon: Wifi,
      title: 'Gerador de Conforto Full',
      desc: 'Gerador que supre não apenas elevadores e áreas sociais, mas também pontos estratégicos dentro de cada apartamento.'
    }
  ];

  return (
    <section id="diferenciais" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase font-semibold tracking-widest text-amber-400 mb-2">
            Engenharia & Conforto
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Detalhes construtivos que transformam a experiência de morar.
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            O Lumina Residence foi concebido com os mais altos padrões da engenharia civil e certificação de desempenho térmico e acústico.
          </p>
        </div>

        {/* Differentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentials.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Direct CTA Bar */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Personalização de Acabamentos
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              Quer receber o memorial descritivo completo da obra?
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Consulte as especificações detalhadas de pisos, metais, louças e opções de personalização da sua unidade com a construtora.
            </p>
          </div>

          <a
            href={INTEREST_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 whitespace-nowrap transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Tenho Interesse</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </section>
  );
};
