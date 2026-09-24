import React, { useState } from 'react';
import { GOOGLE_FORMS_URL, DEFAULT_WHATSAPP_NUMBER, generateWhatsappLink } from '../data/defaultProperties';
import { Building2, Menu, X, MessageCircle, FileText, Settings, Phone } from 'lucide-react';

interface HeaderProps {
  onSelectNeighborhood?: (neighborhood: string) => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectNeighborhood, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const defaultWhatsappUrl = generateWhatsappLink(
    DEFAULT_WHATSAPP_NUMBER,
    'Olá! Gostaria de falar com um corretor sobre os apartamentos na Zona Leste (Mooca, Tatuapé e Vila Ema).'
  );

  const handleNavClick = (neighborhood?: string) => {
    setMobileMenuOpen(false);
    if (neighborhood && onSelectNeighborhood) {
      onSelectNeighborhood(neighborhood);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro bar with contact and official form link */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Plantão de Atendimento Zona Leste (Mooca, Tatuapé, Vila Ema)
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Atendimento personalizado com corretores especialistas</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={GOOGLE_FORMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Formulário de Interesse</span>
            </a>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                title="Painel Administrativo para cadastrar/editar imóveis"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Painel / Cadastrar Imóvel</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <a
            href="#"
            onClick={() => handleNavClick()}
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-lg font-serif font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>Zona Leste</span>
                <span className="text-amber-600 font-sans text-xs uppercase px-1.5 py-0.5 bg-amber-50 rounded border border-amber-200">
                  Imóveis
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                Mooca · Tatuapé · Vila Ema
              </p>
            </div>
          </a>

          {/* Desktop Nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <a
              href="#"
              onClick={() => handleNavClick('Todos')}
              className="hover:text-amber-600 transition-colors"
            >
              INÍCIO
            </a>
            <a
              href="#apartamentos"
              onClick={() => handleNavClick('Todos')}
              className="hover:text-amber-600 transition-colors"
            >
              APARTAMENTOS
            </a>
            <a
              href="#apartamentos"
              onClick={() => handleNavClick('Mooca')}
              className="hover:text-amber-600 transition-colors"
            >
              MOOCA
            </a>
            <a
              href="#apartamentos"
              onClick={() => handleNavClick('Tatuapé')}
              className="hover:text-amber-600 transition-colors"
            >
              TATUAPÉ
            </a>
            <a
              href="#apartamentos"
              onClick={() => handleNavClick('Vila Ema')}
              className="hover:text-amber-600 transition-colors"
            >
              VILA EMA
            </a>
            <a
              href="#captacao"
              className="hover:text-amber-600 transition-colors text-amber-700 font-bold"
            >
              FORMULÁRIOS
            </a>
            <a
              href="#google-drive"
              className="hover:text-amber-600 transition-colors"
            >
              GOOGLE DRIVE
            </a>
            <a
              href="#simulador"
              className="hover:text-amber-600 transition-colors"
            >
              SIMULADOR
            </a>
            <a
              href="#contato"
              className="hover:text-amber-600 transition-colors"
            >
              CONTATO
            </a>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={defaultWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Falar com um Corretor</span>
            </a>
            <a
              href={GOOGLE_FORMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-300 transition-colors"
            >
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Formulário</span>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={defaultWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-emerald-600 text-white"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Menu de Navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-800">
            <a
              href="#"
              onClick={() => handleNavClick('Todos')}
              className="py-2 px-2 hover:bg-slate-50 rounded-lg border-b border-slate-100"
            >
              INÍCIO
            </a>
            <a
              href="#apartamentos"
              onClick={() => handleNavClick('Todos')}
              className="py-2 px-2 hover:bg-slate-50 rounded-lg border-b border-slate-100"
            >
              TODOS OS APARTAMENTOS
            </a>
            <a
              href="#apartamentos"
              onClick={() => handleNavClick('Mooca')}
              className="py-2 px-2 hover:bg-slate-50 rounded-lg text-amber-700 font-bold border-b border-slate-100 flex items-center justify-between"
            >
              <span>APARTAMENTOS NA MOOCA</span>
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Zona Leste</span>
            </a>
            <a
              href="#apartamentos"
              onClick={() => handleNavClick('Tatuapé')}
              className="py-2 px-2 hover:bg-slate-50 rounded-lg text-amber-700 font-bold border-b border-slate-100 flex items-center justify-between"
            >
              <span>APARTAMENTOS NO TATUAPÉ</span>
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Zona Leste</span>
            </a>
            <a
              href="#apartamentos"
              onClick={() => handleNavClick('Vila Ema')}
              className="py-2 px-2 hover:bg-slate-50 rounded-lg text-amber-700 font-bold border-b border-slate-100 flex items-center justify-between"
            >
              <span>APARTAMENTOS NA VILA EMA</span>
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Zona Leste</span>
            </a>
            <a
              href="#simulador"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-slate-50 rounded-lg border-b border-slate-100"
            >
              SIMULADOR DE FINANCIAMENTO
            </a>
            <a
              href="#sobre"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-slate-50 rounded-lg border-b border-slate-100"
            >
              SOBRE NOSSO ATENDIMENTO
            </a>
            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-slate-50 rounded-lg border-b border-slate-100"
            >
              CONTATO & FAQ
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={defaultWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Falar com um Corretor no WhatsApp</span>
            </a>
            <a
              href={GOOGLE_FORMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-300"
            >
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Abrir Formulário de Interesse</span>
            </a>
            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full text-center py-2 text-xs text-slate-600 font-semibold underline"
              >
                Painel Administrativo / Cadastrar Imóvel
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
