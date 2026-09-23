import React, { useState, useEffect } from 'react';
import { INTEREST_FORM_URL, PHONE_NUMBER } from '../data/apartments';
import { Building2, Menu, X, ArrowUpRight, Phone } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md shadow-lg shadow-black/20 py-3 border-b border-slate-800/80'
          : 'bg-gradient-to-b from-slate-950/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-widest text-lg font-bold text-white group-hover:text-amber-300 transition-colors uppercase">
                Lumina
              </span>
              <span className="text-[10px] tracking-[0.25em] text-amber-400 font-medium uppercase -mt-1">
                Residence
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#apartamentos"
              className="text-sm font-medium text-slate-300 hover:text-amber-300 transition-colors"
            >
              Apartamentos
            </a>
            <a
              href="#lazer"
              className="text-sm font-medium text-slate-300 hover:text-amber-300 transition-colors"
            >
              Lazer & Spa
            </a>
            <a
              href="#diferenciais"
              className="text-sm font-medium text-slate-300 hover:text-amber-300 transition-colors"
            >
              Diferenciais
            </a>
            <a
              href="#simulador"
              className="text-sm font-medium text-slate-300 hover:text-amber-300 transition-colors"
            >
              Simulador
            </a>
            <a
              href="#localizacao"
              className="text-sm font-medium text-slate-300 hover:text-amber-300 transition-colors"
            >
              Localização
            </a>
            <a
              href="#duvidas"
              className="text-sm font-medium text-slate-300 hover:text-amber-300 transition-colors"
            >
              Dúvidas
            </a>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{PHONE_NUMBER}</span>
            </a>

            {/* Tenho Interesse Button */}
            <a
              href={INTEREST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-md shadow-amber-600/30 hover:shadow-amber-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Tenho Interesse</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={INTEREST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md bg-amber-500 text-slate-950 font-bold text-xs shadow"
            >
              Tenho Interesse
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="Alternar menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 mt-3 shadow-2xl animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-3 pt-2">
            <a
              href="#apartamentos"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-amber-400 font-medium py-2 border-b border-slate-900"
            >
              Apartamentos & Plantas
            </a>
            <a
              href="#lazer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-amber-400 font-medium py-2 border-b border-slate-900"
            >
              Lazer & Áreas Comuns
            </a>
            <a
              href="#diferenciais"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-amber-400 font-medium py-2 border-b border-slate-900"
            >
              Diferenciais Construtivos
            </a>
            <a
              href="#simulador"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-amber-400 font-medium py-2 border-b border-slate-900"
            >
              Simulador Financeiro
            </a>
            <a
              href="#localizacao"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-amber-400 font-medium py-2 border-b border-slate-900"
            >
              Localização Privilegiada
            </a>
            <a
              href="#duvidas"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-amber-400 font-medium py-2 border-b border-slate-900"
            >
              Perguntas Frequentes
            </a>
          </div>

          <div className="pt-2">
            <a
              href={INTEREST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-center shadow-lg shadow-amber-500/20"
            >
              <span>Tenho Interesse</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
