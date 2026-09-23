import React from 'react';
import { ShieldCheck, Banknote, Clock, Award } from 'lucide-react';

export const KeyMetricsBar: React.FC = () => {
  const items = [
    {
      icon: Banknote,
      title: 'Financiamento Facilitado',
      desc: 'Parceria com Caixa, Itaú, Bradesco e Santander com taxas reduzidas.'
    },
    {
      icon: ShieldCheck,
      title: 'Patrimônio de Afetação',
      desc: 'Segurança jurídica absoluta com auditoria independente permanente.'
    },
    {
      icon: Clock,
      title: 'Fluxo Direto na Obra',
      desc: 'Sinal flexível e parcelamento suave durante todo o período construtivo.'
    },
    {
      icon: Award,
      title: 'Garantia Construtiva',
      desc: 'Padrão construtivo premium com materiais de alta durabilidade e garantia de 5 anos.'
    }
  ];

  return (
    <section className="bg-slate-900 border-y border-slate-800 py-8 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
