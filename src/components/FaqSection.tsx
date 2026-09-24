import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Quais bairros vocês atendem?',
      answer: 'Mooca, Tatuapé e Vila Ema, além de outras regiões que podem ser adicionadas posteriormente.'
    },
    {
      question: 'Posso agendar uma visita?',
      answer: 'Sim, mediante disponibilidade do empreendimento e do atendimento.'
    },
    {
      question: 'Posso financiar o apartamento?',
      answer: 'As condições dependem do imóvel, instituição financeira e análise de crédito.'
    },
    {
      question: 'Posso usar FGTS?',
      answer: 'A possibilidade depende das regras aplicáveis e da situação do comprador e do imóvel.'
    },
    {
      question: 'Os preços apresentados são definitivos?',
      answer: 'Não necessariamente. Preços e condições devem ser confirmados no momento do atendimento.'
    }
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Respostas claras e diretas sobre o processo de compra de apartamentos na Zona Leste.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-slate-900 hover:text-amber-700 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
