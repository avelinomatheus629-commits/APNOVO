export interface Apartment {
  id: string;
  name: string;
  category: 'studio' | 'family' | 'luxury' | 'penthouse';
  area: number; // in m²
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpots: number;
  priceFrom: number;
  tagline: string;
  description: string;
  heroImage: string;
  floorPlanImage: string;
  gallery: string[];
  features: string[];
  popular?: boolean;
}

export interface Amenity {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'wellness' | 'lazer' | 'trabalho' | 'praticidade';
  icon: string;
  image: string;
}

export interface LocationItem {
  id: string;
  name: string;
  type: 'parque' | 'gastronomia' | 'educacao' | 'saude' | 'mobilidade';
  distance: string;
  time: string;
  by: 'a pé' | 'de carro' | 'de bike';
}

export interface FaqItem {
  question: string;
  answer: string;
}
