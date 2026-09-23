import React, { useState } from 'react';
import { APARTMENTS, INTEREST_FORM_URL } from '../data/apartments';
import { Calculator, ArrowRight, CheckCircle2, Info, Sparkles } from 'lucide-react';

export const SimulatorSection: React.FC = () => {
  const [selectedApartmentId, setSelectedApartmentId] = useState(APARTMENTS[1].id);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [termMonths, setTermMonths] = useState(360);
  const [customValue, setCustomValue] = useState<number | null>(null);

  const selectedApartment = APARTMENTS.find(a => a.id === selectedApartmentId) || APARTMENTS[0];
  const propertyValue = customValue !== null ? customValue : selectedApartment.priceFrom;

  const downPaymentValue = (propertyValue * downPaymentPercent) / 100;
  const financedAmount = propertyValue - downPaymentValue;

  // Approximate mortgage monthly installment with 9.8% annual interest
  const annualInterestRate = 0.098;
  const monthlyInterestRate = annualInterestRate / 12;
  
  // Price formula: P = financedAmount * (i * (1+i)^n) / ((1+i)^n - 1)
  const monthlyInstallment =
    financedAmount > 0
      ? (financedAmount *
          (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, termMonths))) /
        (Math.pow(1 + monthlyInterestRate, termMonths) - 1)
      : 0;

  // Obra period estimation (e.g. 36 months construction)
  const duringConstructionTotal = propertyValue * 0.30;
  const signalEntry = propertyValue * 0.10;
  const monthlyConstructionInstallment = (duringConstructionTotal - signalEntry) / 36;

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  };

  return (
    <section id="simulador" className="py-20 bg-slate-900 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase font-semibold tracking-widest text-amber-400 mb-2 flex items-center justify-center gap-1.5">
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Simulador de Financiamento</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Planeje a conquista do seu novo apartamento.
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Calcule uma estimativa de entrada e parcelas de acordo com a planta de sua preferência ou valor pretendido.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Controls Box */}
          <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Choose Unit */}
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                1. Escolha a Tipologia
              </label>
              <div className="grid grid-cols-2 gap-2">
                {APARTMENTS.map((apt) => (
                  <button
                    key={apt.id}
                    onClick={() => {
                      setSelectedApartmentId(apt.id);
                      setCustomValue(null);
                    }}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedApartmentId === apt.id && customValue === null
                        ? 'border-amber-500 bg-amber-500/10 text-white shadow-sm'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-white truncate">{apt.name}</div>
                    <div className="text-[11px] text-amber-400 font-mono mt-0.5">
                      {formatCurrency(apt.priceFrom)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Down Payment % Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  2. Entrada Sugerida
                </label>
                <span className="text-sm font-bold text-amber-400 font-mono">
                  {downPaymentPercent}% ({formatCurrency(downPaymentValue)})
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>10% (Mínimo)</span>
                <span>30%</span>
                <span>60%</span>
              </div>
            </div>

            {/* Term selector */}
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                3. Prazo de Financiamento
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[120, 240, 360, 420].map((months) => (
                  <button
                    key={months}
                    onClick={() => setTermMonths(months)}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                      termMonths === months
                        ? 'border-amber-500 bg-amber-500 text-slate-950'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {months / 12} anos
                    <span className="block text-[10px] opacity-80">({months}m)</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Possibilidade de utilizar saldo do <strong>FGTS</strong> para amortização ou quitação da entrada.
              </span>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <div className="absolute top-4 right-4">
              <span className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Resultado Preliminar
              </span>
            </div>

            <div className="text-xs uppercase font-semibold text-slate-400">
              Resumo da Simulação
            </div>
            <div className="text-xl font-serif font-bold text-white mt-1">
              {selectedApartment.name}
            </div>
            <div className="text-xs text-slate-400">
              Valor estimado: <strong className="text-white font-mono">{formatCurrency(propertyValue)}</strong>
            </div>

            <div className="space-y-4 my-6 pt-4 border-t border-slate-800">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Entrada total ({downPaymentPercent}%):</span>
                <span className="font-bold text-white font-mono">{formatCurrency(downPaymentValue)}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Saldo financiado:</span>
                <span className="font-bold text-white font-mono">{formatCurrency(financedAmount)}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 mt-2">
                <span className="text-xs text-slate-400 block">Parcela bancária estimada ({termMonths / 12} anos):</span>
                <div className="text-3xl font-serif font-bold text-amber-400 mt-1 font-mono">
                  {formatCurrency(monthlyInstallment)}
                  <span className="text-xs text-slate-400 font-sans font-normal ml-1">/mês</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Estimativa considerando tabela Price (taxa ref. 9,8% a.a. + TR).
                </span>
              </div>

              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                <strong>Fluxo na Obra:</strong> Parcelamento suave do sinal e intermediárias direto com a construtora sem juros bancários.
              </div>
            </div>

            {/* TENHO INTERESSE BUTTON (Required) */}
            <a
              href={INTEREST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Tenho Interesse nesta Condição</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>

            <p className="text-[11px] text-slate-500 text-center mt-3">
              Sujeito à aprovação de crédito pelas instituições financeiras parceiras.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
