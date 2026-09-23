import React from 'react';
import { INTEREST_FORM_URL, PHONE_NUMBER } from '../data/apartments';
import { Building2, ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
                <Building2 className="w-5 h-5 text-slate-950" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-widest text-lg font-bold text-white uppercase">
                  Lumina
                </span>
                <span className="text-[10px] tracking-[0.25em] text-amber-400 font-medium uppercase -mt-1">
                  Residence
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Um novo conceito em moradia contemporânea e investimento imobiliário inteligente. Arquitetura autoral, lazer premium e valorização garantida.
            </p>

            <div className="pt-2">
              <a
                href={INTEREST_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300"
              >
                <span>Acessar formulário de interesse</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#apartamentos" className="hover:text-amber-300 transition-colors">
                  Plantas & Tipologias
                </a>
              </li>
              <li>
                <a href="#lazer" className="hover:text-amber-300 transition-colors">
                  Rooftop & Lazer
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-amber-300 transition-colors">
                  Diferenciais Técnicos
                </a>
              </li>
              <li>
                <a href="#simulador" className="hover:text-amber-300 transition-colors">
                  Simulador Financeiro
                </a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-amber-300 transition-colors">
                  Localização Privilegiada
                </a>
              </li>
              <li>
                <a href="#duvidas" className="hover:text-amber-300 transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Tipologias */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Unidades
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#apartamentos" className="hover:text-amber-300 transition-colors">
                  Studios (44 m²)
                </a>
              </li>
              <li>
                <a href="#apartamentos" className="hover:text-amber-300 transition-colors">
                  2 Suítes (82 m²)
                </a>
              </li>
              <li>
                <a href="#apartamentos" className="hover:text-amber-300 transition-colors">
                  3 Suítes (136 m²)
                </a>
              </li>
              <li>
                <a href="#apartamentos" className="hover:text-amber-300 transition-colors">
                  Penthouse Duplex (228 m²)
                </a>
              </li>
              <li>
                <a
                  href={INTEREST_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 font-semibold hover:underline"
                >
                  Solicitar Tabela Completa
                </a>
              </li>
            </ul>
          </div>

          {/* Contact and address */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Stand & Contato
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Av. das Acácias Nobres, 1250 - Bairro Jardim Europa</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{PHONE_NUMBER}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>contato@luminaresidence.com.br</span>
              </div>
              <div className="pt-2">
                <span className="text-[11px] text-slate-500 block">
                  Atendimento de Segunda a Domingo das 9h às 19h.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-8 border-t border-slate-900 text-[11px] text-slate-500 space-y-3 leading-relaxed">
          <p>
            *Todas as perspectivas artísticas e fotos são meramente ilustrativas e possuem caráter de sugestão de decoração. Os móveis, equipamentos e objetos de decoração não fazem parte do contrato de compra e venda da unidade autônoma. O empreendimento será entregue em conformidade com o Memorial Descritivo de Acabamentos anexo ao contrato.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2">
            <div>
              Incorporação registrada sob o R.3 na Matrícula nº 184.290 do 4º Cartório de Registro de Imóveis. CRECI Jurídico: 034892-J.
            </div>
            <div>
              &copy; {new Date().getFullYear()} Lumina Residence. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
