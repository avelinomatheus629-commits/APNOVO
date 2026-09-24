import React, { useState } from 'react';
import { SearchFilterState } from '../types/property';
import { Search, SlidersHorizontal, RotateCcw, Building, ChevronDown, ChevronUp } from 'lucide-react';

interface SearchFiltersProps {
  filters: SearchFilterState;
  onChange: (newFilters: SearchFilterState) => void;
  onSearch: () => void;
  onReset: () => void;
  totalResults: number;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onChange,
  onSearch,
  onReset,
  totalResults
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFieldChange = (field: keyof SearchFilterState, value: any) => {
    onChange({
      ...filters,
      [field]: value
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-7 mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900">
              Busca & Filtros de Apartamentos
            </h2>
            <p className="text-xs text-slate-500">
              Refine por bairro, valores, dormitórios e características desejadas.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {totalResults} {totalResults === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
          </span>
          <button
            onClick={onReset}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2.5 py-1 rounded hover:bg-slate-100 transition-colors"
            title="Limpar filtros"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpar</span>
          </button>
        </div>
      </div>

      {/* Main filter fields row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
        {/* Bairro */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Bairro na Zona Leste
          </label>
          <select
            value={filters.neighborhood}
            onChange={(e) => handleFieldChange('neighborhood', e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-slate-900 font-medium"
          >
            <option value="Todos">Todos os Bairros (Mooca, Tatuapé, Vila Ema)</option>
            <option value="Mooca">Mooca</option>
            <option value="Tatuapé">Tatuapé</option>
            <option value="Vila Ema">Vila Ema</option>
          </select>
        </div>

        {/* Dormitórios */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Número de Dormitórios
          </label>
          <select
            value={filters.bedrooms}
            onChange={(e) => handleFieldChange('bedrooms', e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-slate-900 font-medium"
          >
            <option value="Qualquer">Qualquer quantidade</option>
            <option value="2">2 dormitórios ou mais</option>
            <option value="3">3 dormitórios ou mais</option>
            <option value="4">4 ou mais dormitórios</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Fase do Empreendimento
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFieldChange('status', e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-slate-900 font-medium"
          >
            <option value="Todos">Todas as Fases</option>
            <option value="Lançamento">Lançamento</option>
            <option value="Em Construção">Em Construção</option>
            <option value="Pronto para Morar">Pronto para Morar</option>
          </select>
        </div>

        {/* Preço Máximo */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Preço Máximo Estimado
          </label>
          <select
            value={filters.maxPrice === 0 ? '' : filters.maxPrice.toString()}
            onChange={(e) => handleFieldChange('maxPrice', e.target.value ? Number(e.target.value) : 0)}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-slate-900 font-medium"
          >
            <option value="">Sem limite de preço</option>
            <option value="500000">Até R$ 500.000</option>
            <option value="800000">Até R$ 800.000</option>
            <option value="1200000">Até R$ 1.200.000</option>
            <option value="2000000">Até R$ 2.000.000</option>
          </select>
        </div>
      </div>

      {/* Advanced Toggle */}
      <div className="pt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1.5"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{showAdvanced ? 'Menos filtros' : 'Filtros avançados (vagas, área, suíte, varanda)'}</span>
          {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={onSearch}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-sm transition-all"
        >
          <Search className="w-4 h-4" />
          <span>ENCONTRAR MEU APARTAMENTO</span>
        </button>
      </div>

      {/* Advanced filters collapsible */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
          {/* Vagas */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Número de Vagas
            </label>
            <select
              value={filters.parkingSpots}
              onChange={(e) => handleFieldChange('parkingSpots', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
            >
              <option value="Qualquer">Qualquer</option>
              <option value="1">1 vaga ou mais</option>
              <option value="2">2 vagas ou mais</option>
              <option value="3">3 vagas ou mais</option>
            </select>
          </div>

          {/* Área Mínima */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Área Mínima (m²)
            </label>
            <input
              type="number"
              placeholder="Ex: 50"
              value={filters.minArea || ''}
              onChange={(e) => handleFieldChange('minArea', Number(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          {/* Checkbox Suíte */}
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="hasSuite"
              checked={filters.hasSuite}
              onChange={(e) => handleFieldChange('hasSuite', e.target.checked)}
              className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-400"
            />
            <label htmlFor="hasSuite" className="text-xs font-medium text-slate-700 cursor-pointer">
              Exigir suíte
            </label>
          </div>

          {/* Checkbox Varanda */}
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="hasBalcony"
              checked={filters.hasBalcony}
              onChange={(e) => handleFieldChange('hasBalcony', e.target.checked)}
              className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-400"
            />
            <label htmlFor="hasBalcony" className="text-xs font-medium text-slate-700 cursor-pointer">
              Exigir varanda / terraço grill
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
