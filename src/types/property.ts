export type Neighborhood = 'Mooca' | 'Tatuapé' | 'Vila Ema';

export type PropertyStatus = 'Lançamento' | 'Em Construção' | 'Pronto para Morar';

export type PropertyBadge = 'DESTAQUE' | 'LANÇAMENTO' | 'OPORTUNIDADE' | 'PRONTO PARA MORAR';

export interface Property {
  id: string;
  name: string;
  neighborhood: Neighborhood;
  city: string;
  address: string;
  price: number;
  priceDisplay: string;
  paymentConditions: string;
  areaMin: number;
  areaMax?: number;
  bedroomsMin: number;
  bedroomsMax?: number;
  suites: number;
  parkingSpots: number;
  hasBalcony: boolean;
  hasSuite: boolean;
  status: PropertyStatus;
  badge?: PropertyBadge;
  specialCondition?: string;
  coverImage: string;
  gallery: string[];
  floorPlans: string[];
  description: string;
  amenities: string[];
  whatsappNumber?: string;
  videoUrl?: string;
  isSampleData?: boolean;
}

export interface SearchFilterState {
  neighborhood: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  parkingSpots: string;
  minArea: number;
  maxArea: number;
  hasSuite: boolean;
  hasBalcony: boolean;
  status: string;
}

export interface LeadSubmission {
  id?: string;
  name: string;
  whatsapp: string;
  email?: string;
  neighborhood: string;
  priceRange: string;
  bedrooms: string;
  timeframe?: string;
  createdAt: string;
  propertyName?: string;
  source: string;
}

export interface SimulationData {
  propertyValue: number;
  downPayment: number;
  downPaymentPercent: number;
  termMonths: number;
  monthlyIncome: number;
  fgts: number;
  estimatedInstallment: number;
}
