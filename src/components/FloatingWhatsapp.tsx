import React, { useState } from 'react';
import { DEFAULT_WHATSAPP_NUMBER, generateWhatsappLink, GOOGLE_FORMS_URL } from '../data/defaultProperties';
import { MessageCircle, X, Send, FileText } from 'lucide-react';

export const FloatingWhatsapp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const defaultMsg = 'Olá! Vi os apartamentos no site e gostaria de falar com um corretor sobre Mooca, Tatuapé e Vila Ema.';
  
  const handleSend = (text: string) => {
    const url = generateWhatsappLink(DEFAULT_WHATSAPP_NUMBER, text || defaultMsg);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Quick Contact Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-3 duration-200">
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Atendimento Zona Leste</h4>
                <p className="text-[11px] text-emerald-100">Mooca · Tatuapé · Vila Ema</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-3 text-xs bg-slate-50">
            <div className="p-3 bg-white rounded-xl shadow-xs text-slate-700 leading-relaxed border border-slate-100">
              👋 Olá! Como podemos te ajudar hoje? Selecione uma opção rápida abaixo ou digite sua dúvida:
            </div>

            {/* Quick quick pills */}
            <div className="space-y-1.5">
              <button
                onClick={() => handleSend('Olá! Gostaria de ver opções de apartamentos na Mooca.')}
                className="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 font-medium border border-slate-200 transition-colors text-xs"
              >
                🏢 Quero opções na Mooca
              </button>
              <button
                onClick={() => handleSend('Olá! Gostaria de ver opções de apartamentos no Tatuapé.')}
                className="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 font-medium border border-slate-200 transition-colors text-xs"
              >
                🌳 Quero opções no Tatuapé
              </button>
              <button
                onClick={() => handleSend('Olá! Gostaria de ver opções de apartamentos na Vila Ema.')}
                className="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 font-medium border border-slate-200 transition-colors text-xs"
              >
                🚇 Quero opções na Vila Ema
              </button>
            </div>

            {/* Custom input */}
            <div className="pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Escreva sua mensagem..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(customMsg)}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
                <button
                  onClick={() => handleSend(customMsg)}
                  className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs"
                  title="Enviar mensagem"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 text-center">
              <a
                href={GOOGLE_FORMS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-slate-500 hover:text-slate-800 underline inline-flex items-center gap-1"
              >
                <FileText className="w-3 h-3" />
                <span>Prefere preencher o Formulário Google? Clique aqui</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Trigger floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
        aria-label="Fale com um corretor no WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="font-bold text-xs sm:text-sm tracking-wide">Fale com um corretor</span>
      </button>
    </div>
  );
};
