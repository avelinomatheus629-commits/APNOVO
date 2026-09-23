import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Eduardo & Mariana Silveira',
      role: 'Compradores da unidade de 136m²',
      quote: 'Buscávamos um apartamento com suítes amplas e varanda gourmet de verdade para receber os amigos. O projeto do Lumina uniu acabamento impecável com a conveniência de estar a 4 minutos do parque.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Dr. Roberto Magalhães',
      role: 'Investidor imobiliário (2 Studios)',
      quote: 'A localização e o lazer no rooftop garantem uma taxa de ocupação altíssima para locação no modelo executivo. O suporte de atendimento na negociação e as condições de pagamento foram decisivos.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Camila Fontana',
      role: 'Proprietária da Penthouse',
      quote: 'A privacidade do hall exclusivo e a vista infinita da piscina privativa me conquistaram logo na primeira visita ao stand. Uma obra de arte arquitetônica sem comparações na região.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase font-semibold tracking-widest text-amber-400 mb-2">
            Confiança & Satisfação
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            A escolha de quem busca excelência e valorização patrimonial.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-amber-500/30 mb-2" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-800/80">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                />
                <div>
                  <div className="text-xs font-semibold text-white">{item.name}</div>
                  <div className="text-[11px] text-slate-400">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
