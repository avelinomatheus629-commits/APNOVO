import React, { useState } from 'react';
import { Send, CheckCircle2, MapPin, Building, Sparkles, Phone, Mail, User } from 'lucide-react';
import { appendLeadToSheet, RegionalDriveStructure } from '../services/googleWorkspace';

export interface RegionalLeadRecord {
  id: string;
  timestamp: string;
  region: 'TATUAPÉ' | 'MOOCA' | 'VILA EMA';
  name: string;
  email: string;
  phone: string;
  syncedToGoogleSheet?: boolean;
}

interface RegionalLeadFormsProps {
  onLeadSubmitted: (lead: RegionalLeadRecord) => void;
  driveStructure: RegionalDriveStructure | null;
  activeRegionTab?: 'TATUAPÉ' | 'MOOCA' | 'VILA EMA';
}

export const RegionalLeadForms: React.FC<RegionalLeadFormsProps> = ({
  onLeadSubmitted,
  driveStructure,
  activeRegionTab = 'TATUAPÉ'
}) => {
  const [selectedRegion, setSelectedRegion] = useState<'TATUAPÉ' | 'MOOCA' | 'VILA EMA'>(activeRegionTab);

  // Form states
  const [tatuapeForm, setTatuapeForm] = useState({ name: '', email: '', phone: '' });
  const [moocaForm, setMoocaForm] = useState({ name: '', email: '', phone: '' });
  const [vilaEmaForm, setVilaEmaForm] = useState({ name: '', email: '', phone: '' });

  // Submission statuses
  const [submittedRegion, setSubmittedRegion] = useState<'TATUAPÉ' | 'MOOCA' | 'VILA EMA' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getFormState = (region: 'TATUAPÉ' | 'MOOCA' | 'VILA EMA') => {
    switch (region) {
      case 'TATUAPÉ':
        return { data: tatuapeForm, setter: setTatuapeForm };
      case 'MOOCA':
        return { data: moocaForm, setter: setMoocaForm };
      case 'VILA EMA':
        return { data: vilaEmaForm, setter: setVilaEmaForm };
    }
  };

  const handleSubmit = async (region: 'TATUAPÉ' | 'MOOCA' | 'VILA EMA', e: React.FormEvent) => {
    e.preventDefault();
    const { data, setter } = getFormState(region);

    if (!data.name.trim() || !data.email.trim() || !data.phone.trim()) {
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const formattedTimestamp = now.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    let synced = false;

    // Send to Google Sheets if driveStructure is ready
    if (driveStructure) {
      try {
        let targetSpreadsheetId = '';
        if (region === 'TATUAPÉ' && driveStructure.tatuape.sheet) {
          targetSpreadsheetId = driveStructure.tatuape.sheet.id;
        } else if (region === 'MOOCA' && driveStructure.mooca.sheet) {
          targetSpreadsheetId = driveStructure.mooca.sheet.id;
        } else if (region === 'VILA EMA' && driveStructure.vilaEma.sheet) {
          targetSpreadsheetId = driveStructure.vilaEma.sheet.id;
        }

        if (targetSpreadsheetId) {
          synced = await appendLeadToSheet(targetSpreadsheetId, {
            name: data.name,
            email: data.email,
            phone: data.phone
          });
        }
      } catch (err) {
        console.warn('Erro ao sincronizar com Google Sheets:', err);
      }
    }

    const newLead: RegionalLeadRecord = {
      id: `lead-${Date.now()}`,
      timestamp: formattedTimestamp,
      region,
      name: data.name,
      email: data.email,
      phone: data.phone,
      syncedToGoogleSheet: synced
    };

    onLeadSubmitted(newLead);
    setIsSubmitting(false);
    setSubmittedRegion(region);
    setter({ name: '', email: '', phone: '' });
  };

  const handleResetForm = (region: 'TATUAPÉ' | 'MOOCA' | 'VILA EMA') => {
    setSubmittedRegion(null);
    setSelectedRegion(region);
  };

  return (
    <section id="captacao" className="py-12 sm:py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Building className="w-3.5 h-3.5 text-amber-700" />
            <span>Captação Direta por Bairro</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Formulários de Interesse por Região
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Escolha o bairro desejado abaixo. Cada formulário alimenta automaticamente a planilha correspondente.
          </p>
        </div>

        {/* Region Selector Tabs for Mobile and Desktop */}
        <div className="flex rounded-2xl bg-slate-100 p-1.5 max-w-md mx-auto mb-8 border border-slate-200">
          {(['TATUAPÉ', 'MOOCA', 'VILA EMA'] as const).map((reg) => (
            <button
              key={reg}
              type="button"
              onClick={() => {
                setSelectedRegion(reg);
                setSubmittedRegion(null);
              }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedRegion === reg
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {reg === 'TATUAPÉ' && 'Tatuapé'}
              {reg === 'MOOCA' && 'Mooca'}
              {reg === 'VILA EMA' && 'Vila Ema'}
            </button>
          ))}
        </div>

        {/* 1. FORMULÁRIO TATUAPÉ */}
        {selectedRegion === 'TATUAPÉ' && (
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs">
            {submittedRegion === 'TATUAPÉ' ? (
              <div className="py-10 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Obrigado! Recebemos seus dados. Em breve entraremos em contato.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Seu interesse no <strong>Tatuapé</strong> foi registrado com sucesso.
                </p>
                <button
                  onClick={() => handleResetForm('TATUAPÉ')}
                  className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Enviar novo interesse
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-amber-700 mb-1">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>Região Tatuapé</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900">
                    Interesse em Apartamentos no Tatuapé
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Preencha os campos obrigatórios para receber opções selecionadas no Tatuapé.
                  </p>
                </div>

                <form onSubmit={(e) => handleSubmit('TATUAPÉ', e)} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Nome <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Seu nome completo"
                        value={tatuapeForm.name}
                        onChange={(e) => setTatuapeForm({ ...tatuapeForm, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      E-mail <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="seuemail@exemplo.com"
                        value={tatuapeForm.email}
                        onChange={(e) => setTatuapeForm({ ...tatuapeForm, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Telefone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="(11) 99999-9999"
                        value={tatuapeForm.phone}
                        onChange={(e) => setTatuapeForm({ ...tatuapeForm, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-slate-900"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* 2. FORMULÁRIO MOOCA */}
        {selectedRegion === 'MOOCA' && (
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs">
            {submittedRegion === 'MOOCA' ? (
              <div className="py-10 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Obrigado! Recebemos seus dados. Em breve entraremos em contato.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Seu interesse na <strong>Mooca</strong> foi registrado com sucesso.
                </p>
                <button
                  onClick={() => handleResetForm('MOOCA')}
                  className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Enviar novo interesse
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-amber-700 mb-1">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>Região Mooca</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900">
                    Interesse em Apartamentos na Mooca
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Preencha os campos obrigatórios para receber opções selecionadas na Mooca.
                  </p>
                </div>

                <form onSubmit={(e) => handleSubmit('MOOCA', e)} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Nome <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Seu nome completo"
                        value={moocaForm.name}
                        onChange={(e) => setMoocaForm({ ...moocaForm, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      E-mail <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="seuemail@exemplo.com"
                        value={moocaForm.email}
                        onChange={(e) => setMoocaForm({ ...moocaForm, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Telefone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="(11) 99999-9999"
                        value={moocaForm.phone}
                        onChange={(e) => setMoocaForm({ ...moocaForm, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-slate-900"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* 3. FORMULÁRIO VILA EMA */}
        {selectedRegion === 'VILA EMA' && (
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs">
            {submittedRegion === 'VILA EMA' ? (
              <div className="py-10 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Obrigado! Recebemos seus dados. Em breve entraremos em contato.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Seu interesse na <strong>Vila Ema</strong> foi registrado com sucesso.
                </p>
                <button
                  onClick={() => handleResetForm('VILA EMA')}
                  className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Enviar novo interesse
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-amber-700 mb-1">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>Região Vila Ema</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900">
                    Interesse em Apartamentos na Vila Ema
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Preencha os campos obrigatórios para receber opções selecionadas na Vila Ema.
                  </p>
                </div>

                <form onSubmit={(e) => handleSubmit('VILA EMA', e)} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Nome <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Seu nome completo"
                        value={vilaEmaForm.name}
                        onChange={(e) => setVilaEmaForm({ ...vilaEmaForm, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      E-mail <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="seuemail@exemplo.com"
                        value={vilaEmaForm.email}
                        onChange={(e) => setVilaEmaForm({ ...vilaEmaForm, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Telefone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="(11) 99999-9999"
                        value={vilaEmaForm.phone}
                        onChange={(e) => setVilaEmaForm({ ...vilaEmaForm, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-slate-900"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
