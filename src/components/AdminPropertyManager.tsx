import React, { useState } from 'react';
import { Property, PropertyBadge, PropertyStatus, Neighborhood } from '../types/property';
import { X, Plus, Edit2, Trash2, Save, RotateCcw, Download, Upload, Check, Building2, Tag } from 'lucide-react';

interface AdminPropertyManagerProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onSaveProperties: (updated: Property[]) => void;
  onResetToDefaults: () => void;
}

export const AdminPropertyManager: React.FC<AdminPropertyManagerProps> = ({
  isOpen,
  onClose,
  properties,
  onSaveProperties,
  onResetToDefaults
}) => {
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStartNew = () => {
    setIsNew(true);
    setEditingProperty({
      id: `prop-${Date.now()}`,
      name: '',
      neighborhood: 'Tatuapé',
      city: 'São Paulo - SP',
      address: '',
      price: 650000,
      priceDisplay: 'A partir de R$ 650.000',
      paymentConditions: 'Entrada facilitada e financiamento bancário.',
      areaMin: 65,
      areaMax: 85,
      bedroomsMin: 2,
      bedroomsMax: 3,
      suites: 1,
      parkingSpots: 1,
      hasBalcony: true,
      hasSuite: true,
      status: 'Lançamento',
      badge: 'LANÇAMENTO',
      specialCondition: '',
      coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
      ],
      floorPlans: [
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80'
      ],
      description: 'Empreendimento moderno na Zona Leste com acabamentos de alta qualidade e lazer completo.',
      amenities: ['Piscina', 'Academia', 'Salão de Festas', 'Churrasqueira', 'Espaço Pet'],
      whatsappNumber: '5511999999999',
      videoUrl: '',
      isSampleData: false
    });
  };

  const handleSaveCurrent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;

    let updatedList: Property[];
    if (isNew) {
      updatedList = [editingProperty, ...properties];
    } else {
      updatedList = properties.map((p) => (p.id === editingProperty.id ? editingProperty : p));
    }

    onSaveProperties(updatedList);
    setEditingProperty(null);
    setIsNew(false);
    setSuccessMessage('Imóvel salvo com sucesso!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza de que deseja remover este imóvel?')) {
      const updatedList = properties.filter((p) => p.id !== id);
      onSaveProperties(updatedList);
      setSuccessMessage('Imóvel removido!');
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(properties, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `imoveis-zona-leste-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 my-6 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">Painel Administrativo de Imóveis</h3>
              <p className="text-xs text-slate-400">Cadastre e edite empreendimentos na Mooca, Tatuapé e Vila Ema</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Action bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleStartNew}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar Novo Imóvel</span>
            </button>

            <button
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold"
              title="Exportar dados como JSON para backup ou integração futura"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar JSON</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Deseja restaurar a lista padrão de demonstração?')) {
                  onResetToDefaults();
                  setSuccessMessage('Restaurado para os imóveis de exemplo!');
                  setTimeout(() => setSuccessMessage(null), 3000);
                }
              }}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-slate-500 hover:text-red-600 text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Padrão</span>
            </button>
          </div>

          {successMessage && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <Check className="w-4 h-4" />
              <span>{successMessage}</span>
            </div>
          )}
        </div>

        {/* Content area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {editingProperty ? (
            /* Editing form */
            <form onSubmit={handleSaveCurrent} className="space-y-5 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h4 className="font-serif text-lg font-bold text-slate-900">
                  {isNew ? 'Cadastrar Novo Apartamento' : `Editar: ${editingProperty.name}`}
                </h4>
                <button
                  type="button"
                  onClick={() => setEditingProperty(null)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancelar
                </button>
              </div>

              {/* Grid 1: Nome, Bairro, Endereço */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nome do Empreendimento *</label>
                  <input
                    type="text"
                    required
                    value={editingProperty.name}
                    onChange={(e) => setEditingProperty({ ...editingProperty, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bairro *</label>
                  <select
                    value={editingProperty.neighborhood}
                    onChange={(e) => setEditingProperty({ ...editingProperty, neighborhood: e.target.value as Neighborhood })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                  >
                    <option value="Mooca">Mooca</option>
                    <option value="Tatuapé">Tatuapé</option>
                    <option value="Vila Ema">Vila Ema</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Endereço / Referência</label>
                  <input
                    type="text"
                    value={editingProperty.address}
                    onChange={(e) => setEditingProperty({ ...editingProperty, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              {/* Grid 2: Preço numérico, Preço texto, Condições */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preço Numérico (R$)</label>
                  <input
                    type="number"
                    value={editingProperty.price}
                    onChange={(e) => setEditingProperty({ ...editingProperty, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Texto de Preço Exibido</label>
                  <input
                    type="text"
                    placeholder="Ex: A partir de R$ 650.000"
                    value={editingProperty.priceDisplay}
                    onChange={(e) => setEditingProperty({ ...editingProperty, priceDisplay: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Condições de Pagamento</label>
                  <input
                    type="text"
                    value={editingProperty.paymentConditions}
                    onChange={(e) => setEditingProperty({ ...editingProperty, paymentConditions: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              {/* Grid 3: Área, Dormitórios, Vagas, Suítes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Área Mínima (m²)</label>
                  <input
                    type="number"
                    value={editingProperty.areaMin}
                    onChange={(e) => setEditingProperty({ ...editingProperty, areaMin: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Área Máxima (m²)</label>
                  <input
                    type="number"
                    value={editingProperty.areaMax || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, areaMax: Number(e.target.value) || undefined })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dormitórios</label>
                  <input
                    type="number"
                    value={editingProperty.bedroomsMin}
                    onChange={(e) => setEditingProperty({ ...editingProperty, bedroomsMin: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Vagas de Garagem</label>
                  <input
                    type="number"
                    value={editingProperty.parkingSpots}
                    onChange={(e) => setEditingProperty({ ...editingProperty, parkingSpots: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              {/* Grid 4: Status & Badge (DESTAQUE, LANÇAMENTO, OPORTUNIDADE, PRONTO PARA MORAR) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status da Obra</label>
                  <select
                    value={editingProperty.status}
                    onChange={(e) => setEditingProperty({ ...editingProperty, status: e.target.value as PropertyStatus })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                  >
                    <option value="Lançamento">Lançamento</option>
                    <option value="Em Construção">Em Construção</option>
                    <option value="Pronto para Morar">Pronto para Morar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Selo / Tag em Destaque</label>
                  <select
                    value={editingProperty.badge || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, badge: (e.target.value || undefined) as PropertyBadge })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl font-bold"
                  >
                    <option value="">Nenhum selo</option>
                    <option value="DESTAQUE">DESTAQUE</option>
                    <option value="LANÇAMENTO">LANÇAMENTO</option>
                    <option value="OPORTUNIDADE">OPORTUNIDADE</option>
                    <option value="PRONTO PARA MORAR">PRONTO PARA MORAR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Condição Especial (Texto)</label>
                  <input
                    type="text"
                    placeholder="Ex: ITBI Grátis neste mês"
                    value={editingProperty.specialCondition || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, specialCondition: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              {/* Foto Principal & WhatsApp específico */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">URL da Foto Principal *</label>
                  <input
                    type="url"
                    required
                    value={editingProperty.coverImage}
                    onChange={(e) => setEditingProperty({ ...editingProperty, coverImage: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Específico do Imóvel (com DDI)</label>
                  <input
                    type="text"
                    placeholder="5511999999999"
                    value={editingProperty.whatsappNumber || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl font-mono"
                  />
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Descrição Comercial</label>
                <textarea
                  rows={3}
                  value={editingProperty.description}
                  onChange={(e) => setEditingProperty({ ...editingProperty, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                />
              </div>

              {/* Lazer (separado por vírgula) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Itens de Lazer (separados por vírgula)
                </label>
                <input
                  type="text"
                  value={editingProperty.amenities.join(', ')}
                  onChange={(e) => setEditingProperty({
                    ...editingProperty,
                    amenities: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  })}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                />
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingProperty(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Imóvel</span>
                </button>
              </div>
            </form>
          ) : (
            /* Properties list table / cards */
            <div className="space-y-3">
              <div className="text-xs text-slate-500 font-medium">
                Total de {properties.length} imóveis cadastrados no sistema.
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                {properties.map((property) => (
                  <div key={property.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <img
                        src={property.coverImage}
                        alt={property.name}
                        className="w-16 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-sm text-slate-900">{property.name}</h5>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {property.neighborhood}
                          </span>
                          {property.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                              {property.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {property.priceDisplay} • {property.bedroomsMin} dorms • {property.areaMin}m² • {property.status}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => {
                          setIsNew(false);
                          setEditingProperty(property);
                        }}
                        className="p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center gap-1"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Editar</span>
                      </button>

                      <button
                        onClick={() => handleDelete(property.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg text-xs font-semibold flex items-center gap-1"
                        title="Remover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Integration readiness note */}
          <div className="bg-slate-100/70 p-4 rounded-xl border border-slate-200 text-xs text-slate-600">
            <strong className="text-slate-800">Pronto para Integrações: </strong>
            Esta estrutura armazena dados no navegador (LocalStorage) e já conta com interfaces tipadas em TypeScript, preparada para plugar qualquer banco de dados (PostgreSQL / Supabase / Cloud SQL / Firebase) e CRM imobiliário.
          </div>
        </div>
      </div>
    </div>
  );
};
