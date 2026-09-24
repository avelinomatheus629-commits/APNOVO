import React from 'react';
import { GOOGLE_FORMS_URL, DEFAULT_WHATSAPP_NUMBER, generateWhatsappLink } from '../data/defaultProperties';
import { Building2, MessageCircle, FileText, MapPin, ShieldCheck, Phone } from 'lucide-react';

interface FooterProps {
  onSelectNeighborhood: (neighborhood: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectNeighborhood, onOpenAdmin }) => {
  const whatsappUrl = generateWhatsappLink(
    DEFAULT_WHATSAPP_NUMBER,
    'Olá! Gostaria de falar com um corretor sobre os imóveis na Zona Leste.'
  );

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-serif font-bold text-white tracking-tight">
                  Zona Leste Imóveis
                </span>
                <p className="text-xs text-slate-400">Mooca · Tatuapé · Vila Ema</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Seleção exclusiva de apartamentos e lançamentos nas regiões mais desejadas da Zona Leste de São Paulo. Atendimento consultivo, ético e seguro.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Plantão</span>
              </a>

              <a
                href={GOOGLE_FORMS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs border border-slate-700 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Formulário Google</span>
              </a>
            </div>
          </div>

          {/* Col 3: Regiões */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Regiões Atendidas
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#apartamentos"
                  onClick={() => onSelectNeighborhood('Mooca')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Apartamentos na Mooca
                </a>
              </li>
              <li>
                <a
                  href="#apartamentos"
                  onClick={() => onSelectNeighborhood('Tatuapé')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Apartamentos no Tatuapé
                </a>
              </li>
              <li>
                <a
                  href="#apartamentos"
                  onClick={() => onSelectNeighborhood('Vila Ema')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Apartamentos na Vila Ema
                </a>
              </li>
              <li>
                <a
                  href="#apartamentos"
                  onClick={() => onSelectNeighborhood('Todos')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Ver Todos os Imóveis
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Links Rápidos */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#apartamentos" className="hover:text-amber-400 transition-colors">
                  Busca de Imóveis
                </a>
              </li>
              <li>
                <a href="#simulador" className="hover:text-amber-400 transition-colors">
                  Simulador de Financiamento
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-amber-400 transition-colors">
                  Sobre Nosso Atendimento
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-amber-400 transition-colors">
                  Cadastrar Interesse
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Atendimento & Painel */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Transparência
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Informações e disponibilidades sujeitas à verificação no momento da consulta.
            </p>
            <button
              onClick={onOpenAdmin}
              className="text-xs text-slate-400 hover:text-amber-400 underline font-medium block"
            >
              Acessar Painel de Imóveis
            </button>
          </div>
        </div>

        {/* Legal Disclaimers & Copyright */}
        <div className="pt-8 text-xs text-slate-400 space-y-3 leading-relaxed">
          <p>
            <strong>Aviso Legal:</strong> As imagens, plantas, acabamentos e perspectivas artísticas contidas neste site são ilustrativas. Os valores, unidades disponíveis e condições de pagamento estão sujeitos a alteração pelas construtoras e incorporadoras sem aviso prévio. As simulações de financiamento constituem estimativas de mercado e não representam compromisso ou aprovação de crédito bancário.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-900 text-slate-400 text-[11px]">
            <p>© {new Date().getFullYear()} Zona Leste Imóveis. Todos os direitos reservados. Mooca · Tatuapé · Vila Ema.</p>
            <p className="mt-2 sm:mt-0">Foco em atendimento ético e conversão qualificada.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
