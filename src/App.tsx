import React, { useState, useEffect, useMemo } from 'react';
import { Property, SearchFilterState } from './types/property';
import { DEFAULT_PROPERTIES } from './data/defaultProperties';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchFilters } from './components/SearchFilters';
import { NeighborhoodCards } from './components/NeighborhoodCards';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { FinancingSimulator } from './components/FinancingSimulator';
import { LeadFormSection } from './components/LeadFormSection';
import { RegionalLeadForms, RegionalLeadRecord } from './components/RegionalLeadForms';
import { GoogleDriveHub } from './components/GoogleDriveHub';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { FloatingWhatsapp } from './components/FloatingWhatsapp';
import { AdminPropertyManager } from './components/AdminPropertyManager';
import { Footer } from './components/Footer';
import { Building, MapPin } from 'lucide-react';
import { initAuth, RegionalDriveStructure } from './services/googleWorkspace';
import { User } from 'firebase/auth';

const STORAGE_KEY = 'zl_imoveis_properties_v1';
const LEADS_STORAGE_KEY = 'zl_imoveis_leads_v1';
const REGIONAL_LEADS_STORAGE_KEY = 'zl_regional_leads_v1';
const DRIVE_STRUCTURE_STORAGE_KEY = 'zl_drive_structure_v1';

export default function App() {
  // Load properties from localStorage or defaults
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading properties from storage', e);
    }
    return DEFAULT_PROPERTIES;
  });

  // Regional Leads storage
  const [regionalLeads, setRegionalLeads] = useState<RegionalLeadRecord[]>(() => {
    try {
      const saved = localStorage.getItem(REGIONAL_LEADS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading regional leads', e);
    }
    return [
      {
        id: 'seed-1',
        timestamp: '23/09/2026 15:30:10',
        region: 'TATUAPÉ',
        name: 'Carlos Mendes',
        email: 'carlos.mendes@exemplo.com',
        phone: '(11) 98765-4321',
        syncedToGoogleSheet: true
      },
      {
        id: 'seed-2',
        timestamp: '23/09/2026 16:15:44',
        region: 'MOOCA',
        name: 'Renata Silveira',
        email: 'renata.silveira@exemplo.com',
        phone: '(11) 97123-9876',
        syncedToGoogleSheet: true
      },
      {
        id: 'seed-3',
        timestamp: '23/09/2026 17:02:18',
        region: 'VILA EMA',
        name: 'Lucas Ferreira',
        email: 'lucas.ferreira@exemplo.com',
        phone: '(11) 99456-1122',
        syncedToGoogleSheet: true
      }
    ];
  });

  // Google User & Drive Structure
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [driveStructure, setDriveStructure] = useState<RegionalDriveStructure | null>(() => {
    try {
      const saved = localStorage.getItem(DRIVE_STRUCTURE_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading drive structure', e);
    }
    return null;
  });

  // Active form tab for 3 regional forms
  const [activeRegionFormTab, setActiveRegionFormTab] = useState<'TATUAPÉ' | 'MOOCA' | 'VILA EMA'>('TATUAPÉ');

  // Selected property for full modal view
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Admin modal state
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Simulator target property price
  const [simulationPrice, setSimulationPrice] = useState<number>(650000);

  // Search filter state
  const [filters, setFilters] = useState<SearchFilterState>({
    neighborhood: 'Todos',
    minPrice: 0,
    maxPrice: 0,
    bedrooms: 'Qualquer',
    parkingSpots: 'Qualquer',
    minArea: 0,
    maxArea: 0,
    hasSuite: false,
    hasBalcony: false,
    status: 'Todos'
  });

  // Check auth on mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => setCurrentUser(user),
      () => setCurrentUser(null)
    );
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Save properties to localStorage when updated
  const handleSaveProperties = (updated: Property[]) => {
    setProperties(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving to storage', e);
    }
  };

  const handleResetToDefaults = () => {
    setProperties(DEFAULT_PROPERTIES);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROPERTIES));
    } catch (e) {
      console.error('Error resetting storage', e);
    }
  };

  // Lead capture handler for general forms
  const handleLeadCaptured = (lead: any) => {
    try {
      const existingStr = localStorage.getItem(LEADS_STORAGE_KEY);
      const existing = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([lead, ...existing]));
    } catch (e) {
      console.error('Error saving lead', e);
    }
  };

  // Handler for the 3 separate regional lead forms
  const handleRegionalLeadSubmitted = (newLead: RegionalLeadRecord) => {
    const updated = [newLead, ...regionalLeads];
    setRegionalLeads(updated);
    try {
      localStorage.setItem(REGIONAL_LEADS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving regional lead', e);
    }
  };

  // Handler for Drive structure update
  const handleDriveStructureChange = (structure: RegionalDriveStructure | null) => {
    setDriveStructure(structure);
    try {
      if (structure) {
        localStorage.setItem(DRIVE_STRUCTURE_STORAGE_KEY, JSON.stringify(structure));
      } else {
        localStorage.removeItem(DRIVE_STRUCTURE_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error saving drive structure', e);
    }
  };

  // Scroll to catalog helper
  const scrollToCatalog = () => {
    const el = document.getElementById('apartamentos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Select neighborhood helper
  const handleSelectNeighborhood = (neighborhood: string) => {
    setFilters((prev) => ({
      ...prev,
      neighborhood: neighborhood === 'Todos' ? 'Todos' : neighborhood
    }));
    scrollToCatalog();
  };

  // Switch form to region and scroll
  const handleOpenFormForRegion = (region: 'TATUAPÉ' | 'MOOCA' | 'VILA EMA') => {
    setActiveRegionFormTab(region);
    const el = document.getElementById('captacao');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Neighborhood filter
      if (filters.neighborhood !== 'Todos' && p.neighborhood !== filters.neighborhood) {
        return false;
      }

      // Max price
      if (filters.maxPrice > 0 && p.price > filters.maxPrice) {
        return false;
      }

      // Min price
      if (filters.minPrice > 0 && p.price < filters.minPrice) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms !== 'Qualquer') {
        const requiredBeds = Number(filters.bedrooms);
        const maxBeds = p.bedroomsMax || p.bedroomsMin;
        if (maxBeds < requiredBeds) return false;
      }

      // Parking spots
      if (filters.parkingSpots !== 'Qualquer') {
        const reqSpots = Number(filters.parkingSpots);
        if (p.parkingSpots < reqSpots) return false;
      }

      // Min area
      if (filters.minArea > 0 && (p.areaMax || p.areaMin) < filters.minArea) {
        return false;
      }

      // Has suite
      if (filters.hasSuite && p.suites < 1) {
        return false;
      }

      // Has balcony
      if (filters.hasBalcony && !p.hasBalcony) {
        return false;
      }

      // Status
      if (filters.status !== 'Todos' && p.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [properties, filters]);

  const handleResetFilters = () => {
    setFilters({
      neighborhood: 'Todos',
      minPrice: 0,
      maxPrice: 0,
      bedrooms: 'Qualquer',
      parkingSpots: 'Qualquer',
      minArea: 0,
      maxArea: 0,
      hasSuite: false,
      hasBalcony: false,
      status: 'Todos'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-950">
      
      {/* 1. Header with direct access */}
      <Header
        onSelectNeighborhood={handleSelectNeighborhood}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section with Quick Lead Capture */}
        <Hero
          onScrollToCatalog={scrollToCatalog}
          onFilterNeighborhood={handleSelectNeighborhood}
          onLeadCaptured={handleLeadCaptured}
        />

        {/* 3. Blocos por Região (Mooca, Tatuapé, Vila Ema) */}
        <NeighborhoodCards
          onSelectNeighborhood={(n) => handleSelectNeighborhood(n)}
          selectedNeighborhood={filters.neighborhood}
        />

        {/* 4. OS 3 FORMULÁRIOS SEPARADOS DE CAPTAÇÃO POR REGIÃO (Tatuapé, Mooca, Vila Ema) */}
        <RegionalLeadForms
          onLeadSubmitted={handleRegionalLeadSubmitted}
          driveStructure={driveStructure}
          activeRegionTab={activeRegionFormTab}
        />

        {/* 5. GESTÃO GOOGLE DRIVE (LEADS — APARTAMENTOS, Pastas, Sheets & Apps Script) */}
        <GoogleDriveHub
          currentUser={currentUser}
          onUserChange={setCurrentUser}
          driveStructure={driveStructure}
          onStructureChange={handleDriveStructureChange}
          leads={regionalLeads}
          onOpenFormForRegion={handleOpenFormForRegion}
        />

        {/* 6. Lista de Apartamentos & Filtros */}
        <section id="apartamentos" className="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Building className="w-3.5 h-3.5 text-amber-700" />
              <span>Catálogo de Empreendimentos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Apartamentos Disponíveis na Zona Leste
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Explore opções na Mooca, Tatuapé e Vila Ema com especificações completas, fotos, plantas e valores estimados.
            </p>
          </div>

          {/* Search and Filters Bar */}
          <SearchFilters
            filters={filters}
            onChange={setFilters}
            onSearch={scrollToCatalog}
            onReset={handleResetFilters}
            totalResults={filteredProperties.length}
          />

          {/* Active Filter Chips */}
          {filters.neighborhood !== 'Todos' && (
            <div className="mb-6 flex items-center gap-2">
              <span className="text-xs text-slate-500">Filtrando por:</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-bold">
                <MapPin className="w-3 h-3 text-amber-700" />
                <span>Bairro: {filters.neighborhood}</span>
                <button
                  onClick={() => setFilters({ ...filters, neighborhood: 'Todos' })}
                  className="ml-1 hover:text-amber-950 font-bold"
                  title="Remover filtro de bairro"
                >
                  ×
                </button>
              </span>
            </div>
          )}

          {/* Property Cards Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={(p) => setSelectedProperty(p)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
              <Building className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-slate-800">
                Nenhum imóvel encontrado para os filtros selecionados
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Tente ajustar os critérios de busca ou redefinir os filtros para ver todos os apartamentos na Mooca, Tatuapé e Vila Ema.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-xs hover:bg-amber-400 transition-colors"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
        </section>

        {/* 7. Simulador de Financiamento */}
        <FinancingSimulator
          initialPropertyValue={simulationPrice}
          onLeadCaptured={handleLeadCaptured}
        />

        {/* 8. Formulário Geral de Consultoria */}
        <LeadFormSection onLeadCaptured={handleLeadCaptured} />

        {/* 9. Sobre a Empresa / Atendimento Especializado */}
        <AboutSection />

        {/* 10. FAQ */}
        <FaqSection />
      </main>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onSimulateProperty={(p) => {
          setSimulationPrice(p.price);
          const el = document.getElementById('simulador');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Admin Panel Modal */}
      <AdminPropertyManager
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        properties={properties}
        onSaveProperties={handleSaveProperties}
        onResetToDefaults={handleResetToDefaults}
      />

      {/* Floating WhatsApp in all pages */}
      <FloatingWhatsapp />

      {/* Footer */}
      <Footer
        onSelectNeighborhood={handleSelectNeighborhood}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />
    </div>
  );
}
