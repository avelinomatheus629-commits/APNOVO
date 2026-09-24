import React, { useState, useMemo } from 'react';
import { DEFAULT_WHATSAPP_NUMBER, generateWhatsappLink, GOOGLE_FORMS_URL } from '../data/defaultProperties';
import { Calculator, AlertCircle, Send, CheckCircle2, DollarSign, Calendar, TrendingUp } from 'lucide-react';

interface FinancingSimulatorProps {
  initialPropertyValue?: number;
  onLeadCaptured?: (lead: any) => void;
}

export const FinancingSimulator: React.FC<FinancingSimulatorProps> = ({
  initialPropertyValue = 650000,
  onLeadCaptured
}) => {
  const [propertyValue, setPropertyValue] = useState<number>(initialPropertyValue);
  const [downPayment, setDownPayment] = useState<number>(Math.round(initialPropertyValue * 0.2));
  const [termYears, setTermYears] = useState<number>(30); // 360 months
  const [monthlyIncome, setMonthlyIncome] = useState<number>(14000);
  const [fgts, setFgts] = useState<number>(30000);

  // Modal capture state
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    whatsapp: '',
    email: ''
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Calculations (Price/SAC approximate estimate for Brazil SFH ~9.8% p.a. + TR)
  const calculation = useMemo(() => {
    const totalDown = Math.min(propertyValue, (downPayment || 0) + (fgts || 0));
    const financedAmount = Math.max(0, propertyValue - totalDown);
    const months = termYears * 12;

    // Approximate monthly interest ~ 0.8% a.m. (equivalent to approx 9.9% a.a.)
    const monthlyRate = 0.008;
    
    // Price annuity formula: P = A * [r(1+r)^n] / [(1+r)^n - 1]
    let estimatedInstallment = 0;
    if (financedAmount > 0 && months > 0) {
      const factor = Math.pow(1 + monthlyRate, months);
      estimatedInstallment = (financedAmount * (monthlyRate * factor)) / (factor - 1);
    }

    const minRecommendedIncome = estimatedInstallment > 0 ? estimatedInstallment / 0.30 : 0;

    return {
      financedAmount,
      months,
      estimatedInstallment,
      minRecommendedIncome,
      totalDown
    };
  }, [propertyValue, downPayment, termYears, fgts]);

  const handleOpenLeadModal = () => {
    setShowLeadModal(true);
    setLeadSubmitted(false);
  };

  const handleSendSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.whatsapp) return;

    if (onLeadCaptured) {
      onLeadCaptured({
        ...leadForm,
        propertyValue,
        downPayment,
        termYears,
        fgts,
        estimatedInstallment: Math.round(calculation.estimatedInstallment),
        source: 'Simulador de Financiamento',
        createdAt: new Date().toISOString()
      });
    }

    setLeadSubmitted(true);

    const message = `Olá! Meu nome é ${leadForm.name}. Fiz uma simulação de financiamento no site para um imóvel de R$ ${propertyValue.toLocaleString('pt-BR')} (Entrada: R$ ${downPayment.toLocaleString('pt-BR')} + FGTS R$ ${fgts.toLocaleString('pt-BR')}, prazo: ${termYears} anos, renda mensal: R$ ${monthlyIncome.toLocaleString('pt-BR')}). Gostaria de receber a análise de crédito oficial detalhada!`;
    const url = generateWhatsappLink(DEFAULT_WHATSAPP_NUMBER, message);

    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <section id="simulador" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5 text-amber-700" />
            <span>Planejamento Financeiro</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Simule seu apartamento
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Descubra estimativas de parcelas, entrada mínima recomendada e prazos para o imóvel dos seus sonhos na Zona Leste.
          </p>
        </div>

        {/* Simulator Container */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Input sliders and fields */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Valor do Imóvel */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Valor do Imóvel
                  </label>
                  <span className="text-base font-mono font-bold text-amber-700">
                    R$ {propertyValue.toLocaleString('pt-BR')}
                  </span>
                </div>
                <input
                  type="range"
                  min="300000"
                  max="2500000"
                  step="20000"
                  value={propertyValue}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setPropertyValue(val);
                    if (downPayment > val) setDownPayment(Math.round(val * 0.2));
                  }}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>R$ 300 mil</span>
                  <span>R$ 1.4 milhão</span>
                  <span>R$ 2.5 milhões</span>
                </div>
              </div>

              {/* Entrada & FGTS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Entrada em Dinheiro (R$)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="5000"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/40 font-mono font-bold text-slate-900"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Aprox. {propertyValue > 0 ? Math.round((downPayment / propertyValue) * 100) : 0}% do valor
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Saldo de FGTS (Opcional)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="5000"
                    value={fgts}
                    onChange={(e) => setFgts(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/40 font-mono font-bold text-slate-900"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Pode somar à entrada
                  </span>
                </div>
              </div>

              {/* Prazo e Renda Mensal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Prazo do Financiamento
                  </label>
                  <select
                    value={termYears}
                    onChange={(e) => setTermYears(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/40 font-medium text-slate-900"
                  >
                    <option value={15}>15 anos (180 parcelas)</option>
                    <option value={20}>20 anos (240 parcelas)</option>
                    <option value={25}>25 anos (300 parcelas)</option>
                    <option value={30}>30 anos (360 parcelas)</option>
                    <option value={35}>35 anos (420 parcelas)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Renda Familiar Mensal (R$)
                  </label>
                  <input
                    type="number"
                    min="3000"
                    step="1000"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/40 font-mono font-bold text-slate-900"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Pode somar cônjuge ou co-comprador
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Real-time calculation summary card */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-slate-800 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
                  Resultado Estimado
                </span>
                
                <div className="mt-4 pt-2">
                  <span className="text-xs text-slate-400 block">Primeira Parcela Estimada</span>
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 mt-1 font-mono">
                    R$ {Math.round(calculation.estimatedInstallment).toLocaleString('pt-BR')}
                    <span className="text-xs text-slate-300 font-normal"> / mês</span>
                  </div>
                </div>

                {/* Sub specs */}
                <div className="mt-6 space-y-3 text-xs border-t border-slate-800 pt-4">
                  <div className="flex justify-between text-slate-300">
                    <span>Valor Financiado:</span>
                    <strong className="font-mono text-white">
                      R$ {calculation.financedAmount.toLocaleString('pt-BR')}
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Total da Entrada (com FGTS):</span>
                    <strong className="font-mono text-white">
                      R$ {calculation.totalDown.toLocaleString('pt-BR')}
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Número de Parcelas:</span>
                    <strong className="text-white">{calculation.months} meses</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Renda Mínima Recomendada:</span>
                    <strong className="font-mono text-amber-300">
                      R$ {Math.round(calculation.minRecommendedIncome).toLocaleString('pt-BR')}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Explicit Disclaimer required by prompt */}
              <div className="bg-slate-800/80 rounded-xl p-3 text-[11px] text-slate-300 flex items-start gap-2 border border-slate-700/60">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-snug">
                  <strong>Aviso:</strong> Os valores apresentados são <strong>estimativas</strong> e não representam uma proposta oficial de financiamento. Sujeito à análise de crédito e tabela do agente bancário.
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={handleOpenLeadModal}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>QUERO RECEBER UMA SIMULAÇÃO</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lead capture modal after simulation */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200">
            {leadSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-slate-900">
                  Simulação Registrada!
                </h4>
                <p className="text-xs text-slate-600">
                  Abrindo WhatsApp para enviar os detalhes da sua simulação diretamente ao corretor.
                </p>
                <button
                  onClick={() => setShowLeadModal(false)}
                  className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Receba sua Simulação Completa
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-5">
                  Informe seus dados para receber o cálculo detalhado de bancos (Caixa, Itaú, Bradesco, etc.) no seu WhatsApp.
                </p>

                <form onSubmit={handleSendSimulation} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Seu Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Matheus Silva"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WhatsApp com DDD *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={leadForm.whatsapp}
                      onChange={(e) => setLeadForm({ ...leadForm, whatsapp: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      E-mail (Opcional)
                    </label>
                    <input
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowLeadModal(false)}
                      className="w-1/2 py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs"
                    >
                      Enviar Simulação
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
