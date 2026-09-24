import { Property } from '../types/property';

export const GOOGLE_FORMS_URL = 'https://forms.gle/wPz2onqbqeUNzcLx6';
export const DEFAULT_WHATSAPP_NUMBER = '5511999999999'; // Número padrão configurável no painel

export const DEFAULT_PROPERTIES: Property[] = [
  // TATUAPÉ
  {
    id: 'tatuape-reserva-altos',
    name: 'Reserva Altos do Tatuapé',
    neighborhood: 'Tatuapé',
    city: 'São Paulo - SP',
    address: 'Rua Emília Marengo, Tatuapé - SP',
    price: 890000,
    priceDisplay: 'A partir de R$ 890.000',
    paymentConditions: 'Entrada facilitada em até 36x direto com a construtora, aceita FGTS e financiamento bancário.',
    areaMin: 84,
    areaMax: 118,
    bedroomsMin: 2,
    bedroomsMax: 3,
    suites: 2,
    parkingSpots: 2,
    hasBalcony: true,
    hasSuite: true,
    status: 'Em Construção',
    badge: 'DESTAQUE',
    specialCondition: 'Condição de lançamento: ITBI e Escritura grátis nesta semana',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80'
    ],
    floorPlans: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Empreendimento contemporâneo situado em um dos pontos mais desejados do Tatuapé. Plantas de 2 e 3 dormitórios com amplo living integrado à varanda gourmet com churrasqueira a carvão. Lazer de resort completo entregue equipado e decorado.',
    amenities: [
      'Piscina com deck molhado',
      'Academia com equipamentos de alta tecnologia',
      'Salão de festas gourmet',
      'Playground infantil',
      'Área gourmet externa',
      'Espaço pet com agility',
      'Coworking integrado',
      'Brinquedoteca'
    ],
    isSampleData: true
  },
  {
    id: 'tatuape-park-view',
    name: 'Horizonte Tatuapé Parque',
    neighborhood: 'Tatuapé',
    city: 'São Paulo - SP',
    address: 'Próximo ao Parque Ceret e Shopping Anália Franco',
    price: 1350000,
    priceDisplay: 'A partir de R$ 1.350.000',
    paymentConditions: 'Fluxo flexível durante obras com balões semestrais e financiamento na entrega.',
    areaMin: 125,
    areaMax: 165,
    bedroomsMin: 3,
    bedroomsMax: 4,
    suites: 3,
    parkingSpots: 3,
    hasBalcony: true,
    hasSuite: true,
    status: 'Lançamento',
    badge: 'LANÇAMENTO',
    specialCondition: 'Tabela Zero para primeiras 10 unidades reservadas',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    floorPlans: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Projeto imponente com vista aberta permanente. Varanda com vista panorâmica, hall social privativo para cada unidade e infraestrutura pronta para ar-condicionado em todos os dormitórios.',
    amenities: [
      'Piscina aquecida semiolímpica',
      'Academia com personal studio',
      'Salão de festas panorâmico',
      'Playground com piso emborrachado',
      'Espaço gourmet com churrasqueira char-broil',
      'Espaço pet care',
      'Quadra de beach tennis',
      'Sauna e spa'
    ],
    isSampleData: true
  },

  // MOOCA
  {
    id: 'mooca-heritage-prime',
    name: 'Il Trono Mooca Tradizione',
    neighborhood: 'Mooca',
    city: 'São Paulo - SP',
    address: 'Rua Juventus, Mooca - SP',
    price: 760000,
    priceDisplay: 'A partir de R$ 760.000',
    paymentConditions: 'Entrada a partir de 10% e parcelamento da entrada até a entrega das chaves.',
    areaMin: 72,
    areaMax: 96,
    bedroomsMin: 2,
    bedroomsMax: 3,
    suites: 1,
    parkingSpots: 2,
    hasBalcony: true,
    hasSuite: true,
    status: 'Em Construção',
    badge: 'OPORTUNIDADE',
    specialCondition: 'Bônus especial de marcenaria planejada nas primeiras unidades',
    coverImage: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    floorPlans: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A essência acolhedora e charmosa da Mooca combinada à modernidade que sua família merece. Plantas funcionais, terraço gastronômico integrado com churrasqueira e vaga de garagem demarcada.',
    amenities: [
      'Piscina adulto e infantil',
      'Academia com vista para o jardim',
      'Salão de festas com lounge',
      'Playground com brinquedos ecológicos',
      'Área gourmet com forno de pizza',
      'Espaço pet',
      'Bicicletário com oficina',
      'Coworking com cabines acústicas'
    ],
    isSampleData: true
  },
  {
    id: 'mooca-bella-vita',
    name: 'Bella Vita Mooca Residence',
    neighborhood: 'Mooca',
    city: 'São Paulo - SP',
    address: 'Rua Visconde de Inhomerim, Mooca - SP',
    price: 540000,
    priceDisplay: 'A partir de R$ 540.000',
    paymentConditions: 'Utilização de FGTS na entrada e financiamento Caixa com taxas especiais.',
    areaMin: 56,
    areaMax: 68,
    bedroomsMin: 2,
    bedroomsMax: 2,
    suites: 1,
    parkingSpots: 1,
    hasBalcony: true,
    hasSuite: true,
    status: 'Pronto para Morar',
    badge: 'PRONTO PARA MORAR',
    specialCondition: 'Pronto para morar: mude já com documentação aprovada',
    coverImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    floorPlans: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Conforto imediato em localização privilegiada na Mooca tradicional. Próximo a padarias históricas, restaurantes conceituados e vias rápidas de acesso ao centro e à Radial Leste.',
    amenities: [
      'Piscina climatizada',
      'Academia funcional',
      'Salão de festas',
      'Playground',
      'Área gourmet externa com churrasqueira',
      'Espaço pet',
      'Salão de jogos'
    ],
    isSampleData: true
  },

  // VILA EMA
  {
    id: 'vila-ema-green-park',
    name: 'Parque Vila Ema Residencial',
    neighborhood: 'Vila Ema',
    city: 'São Paulo - SP',
    address: 'Av. Vila Ema, altura 2000 - Próximo à estação de Metrô Oratório',
    price: 435000,
    priceDisplay: 'A partir de R$ 435.000',
    paymentConditions: 'Sinal a partir de R$ 9.000, mensais facilitadas e aceita programa habitacional / FGTS.',
    areaMin: 48,
    areaMax: 65,
    bedroomsMin: 2,
    bedroomsMax: 3,
    suites: 1,
    parkingSpots: 1,
    hasBalcony: true,
    hasSuite: true,
    status: 'Em Construção',
    badge: 'OPORTUNIDADE',
    specialCondition: 'Entrada parcelada em até 48 vezes',
    coverImage: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    floorPlans: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Excelente custo-benefício na Vila Ema em constante valorização. A apenas minutos do monotrilho/metrô, com varanda integrada, ventilação natural e condomínio com lazer completo para toda a família.',
    amenities: [
      'Piscina com solarium',
      'Academia equipada',
      'Salão de festas',
      'Playground',
      'Área gourmet com churrasqueira',
      'Espaço pet',
      'Quadra recreativa',
      'Minimercado autônomo (Grab & Go)'
    ],
    isSampleData: true
  },
  {
    id: 'vila-ema-splendor',
    name: 'Splendor Vila Ema Club',
    neighborhood: 'Vila Ema',
    city: 'São Paulo - SP',
    address: 'Rua solidária à Av. Vila Ema e Av. Sapopemba',
    price: 580000,
    priceDisplay: 'A partir de R$ 580.000',
    paymentConditions: 'Condições com financiamento garantido Caixa ou banco privado à sua escolha.',
    areaMin: 62,
    areaMax: 76,
    bedroomsMin: 2,
    bedroomsMax: 3,
    suites: 1,
    parkingSpots: 1,
    hasBalcony: true,
    hasSuite: true,
    status: 'Lançamento',
    badge: 'LANÇAMENTO',
    specialCondition: 'Desconto especial de pré-lançamento para clientes cadastrados',
    coverImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    floorPlans: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Club condomínio com conceito de bem-estar integral. Apartamentos aconchegantes com varanda grill, acabamentos modernos e infraestrutura de segurança 24h.',
    amenities: [
      'Piscina adulto com raia',
      'Academia moderna',
      'Salão de festas integrado',
      'Playground seguro',
      'Área gourmet',
      'Espaço pet',
      'Coworking privativo'
    ],
    isSampleData: true
  }
];

export function generateWhatsappLink(phone: string = DEFAULT_WHATSAPP_NUMBER, message: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
}
