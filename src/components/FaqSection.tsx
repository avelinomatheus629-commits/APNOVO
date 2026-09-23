import React, { useState } from 'react';
import { FAQS, INTEREST_FORM_URL } from '../data/apartments';
import { ChevronDown, HelpCircle, ArrowUpRight } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="duvidas" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs uppercase font-semibold tracking-widest text-amber-400 mb-2 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Perguntas Frequentes sobre a Aquisição
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Transparência e segurança jurídica em cada etapa da sua jornada de compra.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-900 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-semibold text-white">
              Ainda tem alguma dúvida específica?
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Nossa equipe de consultores especializados está pronta para atendê-lo com discrição e agilidade.
            </p>
          </div>

          <a
            href={INTEREST_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shrink-0 transition-transform hover:scale-105"
          >
            <span>Tenho Interesse</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </section>
  );
};
