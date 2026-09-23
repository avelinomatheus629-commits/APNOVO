import { Apartment, Amenity, LocationItem, FaqItem } from '../types';

export const INTEREST_FORM_URL = 'https://forms.gle/wPz2onqbqeUNzcLx6';
export const WHATSAPP_URL = 'https://wa.me/5511998765432?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20Lumina%20Residence.';
export const PHONE_NUMBER = '(11) 4002-8922';

export const APARTMENTS: Apartment[] = [
  {
    id: 'studio-modern',
    name: 'Studio Prime & 1 Suíte',
    category: 'studio',
    area: 44,
    bedrooms: 1,
    suites: 1,
    bathrooms: 1,
    parkingSpots: 1,
    priceFrom: 395000,
    tagline: 'Ideal para rentabilidade com locação ou moradia prática e sofisticada',
    description: 'Ambiente integrado de alto padrão com varanda ampla, infraestrutura para automação e fechadura eletrônica. Excelente liquidez para investidores de Short e Long Stay.',
    heroImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    floorPlanImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    features: [
      'Varanda integrada com ponto grill',
      'Infraestrutura completa para ar-condicionado',
      'Janela com persiana integrada e atenuação acústica',
      'Piso em porcelanato 90x90cm já entregue',
      '1 vaga de garagem coberta e demarcada'
    ]
  },
  {
    id: 'residence-2-suites',
    name: 'Residence 2 Suítes + Varanda Gourmet',
    category: 'family',
    area: 82,
    bedrooms: 2,
    suites: 2,
    bathrooms: 3,
    parkingSpots: 2,
    priceFrom: 785000,
    tagline: 'Conforto e espaço planejado com churrasqueira a carvão e vista livre',
    description: 'Planta inteligente com living integrado à varanda gourmet, lavabo social e suítes confortáveis com amplo espaço para closet. Perfeito para casais e famílias modernas.',
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    floorPlanImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80'
    ],
    popular: true,
    features: [
      'Churrasqueira a carvão com duto individual',
      'Cozinha com bancada em ilha de quartzo',
      '2 suítes plenas com banheiros ventilados naturalmente',
      'Fechamento de vidro na varanda incluso no padrão',
      '2 vagas soltas + ponto elétrico para recarga de carro'
    ]
  },
  {
    id: 'grand-horizon-3-suites',
    name: 'Grand Horizon 3 Suítes Exclusivas',
    category: 'luxury',
    area: 136,
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    parkingSpots: 3,
    priceFrom: 1390000,
    tagline: 'O ápice da elegância com hall privativo e living com pé-direito imponente',
    description: 'Unidade de prestígio projetada para quem valoriza privacidade, amplitude e acabamentos de primeiríssima linha. Vista panorâmica permanente e suíte master com banheira de imersão.',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    floorPlanImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1000&q=80'
    ],
    features: [
      'Elevador privativo com biometria ou código',
      'Suíte Master com closet duplo e cuba dupla',
      'Amplo living de 3 ambientes com integração total',
      'Manta acústica com atenuação de até 58dB',
      '3 vagas cobertas + depósito privativo no subsolo'
    ]
  },
  {
    id: 'sky-penthouse',
    name: 'Sky Penthouse Duplex com Spa',
    category: 'penthouse',
    area: 228,
    bedrooms: 4,
    suites: 4,
    bathrooms: 6,
    parkingSpots: 4,
    priceFrom: 2650000,
    tagline: 'A experiência de morar em uma mansão suspensa com piscina privativa',
    description: 'Cobertura duplex exclusiva no topo do edifício. Deck panorâmico com piscina privativa aquecida, espaço gourmet outdoor, 4 suítes e arquitetura contemporânea sem igual.',
    heroImage: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
    floorPlanImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?auto=format&fit=crop&w=1000&q=80'
    ],
    features: [
      'Piscina privativa aquecida com borda em vidro',
      'Solarium com vista 360° para o horizonte',
      'Pé-direito duplo no living social (5,60m)',
      'Adega climatizada para até 180 rótulos',
      '4 vagas demarcadas com 2 carregadores elétricos ultrarrápidos'
    ]
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'rooftop-pool',
    title: 'Rooftop Horizon & Piscina Infinita',
    subtitle: 'Lazer nas alturas',
    description: 'Piscina aquecida com borda infinita no 28º andar, com deck molhado e vista panorâmica para o pôr do sol.',
    category: 'lazer',
    icon: 'Waves',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fitness-center',
    title: 'Fitness Tech & Pilates Studio',
    subtitle: 'Saúde sem sair de casa',
    description: 'Academia completa equipada com a linha premium Life Fitness, área funcional ao ar livre e sala de yoga.',
    category: 'wellness',
    icon: 'Dumbbell',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gourmet-lounge',
    title: 'Lounge Gourmet & Adega Privativa',
    subtitle: 'Momentos inesquecíveis',
    description: 'Espaço assinado por renomado arquiteto gastronômico, com churrasqueira char-broil e adega climatizada.',
    category: 'lazer',
    icon: 'Wine',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'coworking-spaces',
    title: 'Coworking & Meeting Pods',
    subtitle: 'Produtividade com elegância',
    description: 'Ambientes acústicos reservados para videoconferências, internet corporativa de alta velocidade e cafeteria integrada.',
    category: 'trabalho',
    icon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'spa-wellness',
    title: 'Spa Terapêutico & Saunas',
    subtitle: 'Desconexão e relaxamento',
    description: 'Sauna seca e a vapor, sala de massagem privativa e hidroterapia com cromoterapia para recarregar as energias.',
    category: 'wellness',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pet-place',
    title: 'Pet Park & Care Station',
    subtitle: 'Cuidado para seu melhor amigo',
    description: 'Área gramada para recreação e banho & tosa exclusivo equipado para facilitar a rotina do seu animal de estimação.',
    category: 'praticidade',
    icon: 'Dog',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80'
  }
];

export const LOCATION_HIGHLIGHTS: LocationItem[] = [
  { id: '1', name: 'Parque Central & Lago das Palmeiras', type: 'parque', distance: '350m', time: '4 min', by: 'a pé' },
  { id: '2', name: 'Colégio Internacional & Bilíngue', type: 'educacao', distance: '800m', time: '3 min', by: 'de carro' },
  { id: '3', name: 'Polo Gastronômico & Cafés Especiais', type: 'gastronomia', distance: '200m', time: '2 min', by: 'a pé' },
  { id: '4', name: 'Shopping Premium & Cinema VIP', type: 'gastronomia', distance: '1.4km', time: '5 min', by: 'de carro' },
  { id: '5', name: 'Hospital de Referência & Centro Clínico', type: 'saude', distance: '1.2km', time: '4 min', by: 'de carro' },
  { id: '6', name: 'Estação de Metrô Linha Verde', type: 'mobilidade', distance: '600m', time: '7 min', by: 'a pé' }
];

export const FAQS: FaqItem[] = [
  {
    question: 'Qual é o prazo de entrega do empreendimento?',
    answer: 'As obras já estão em ritmo acelerado com cronograma rigoroso auditado. A entrega das chaves está prevista para o segundo semestre de 2027, com habite-se e toda a documentação 100% regularizada.'
  },
  {
    question: 'Como funciona o fluxo de pagamento durante o período de obras?',
    answer: 'Oferecemos condições especiais e flexíveis: sinal a partir de 10%, parcelas mensais facilitadas e balões intermediários durante a construção. O saldo devedor pode ser financiado com qualquer instituição financeira da sua preferência no momento da entrega das chaves.'
  },
  {
    question: 'Posso utilizar meu FGTS ou dar meu veículo/imóvel atual na negociação?',
    answer: 'Sim! Aceitamos a utilização de FGTS conforme regras da Caixa Econômica Federal e avaliamos veículos e imóveis quitados como parte da entrada em condições especiais de lançamento.'
  },
  {
    question: 'É possível personalizar a planta ou os acabamentos antes da entrega?',
    answer: 'Sim! Nosso programa "Custom Residence" permite alterações de layout (ex.: integração de dormitório para ampliar a sala ou fechamento de cozinha), além de opções exclusivas de kits de bancadas, metais e automação direto da construtora com garantia.'
  },
  {
    question: 'Como agendar uma visita ao apartamento decorado?',
    answer: 'Basta clicar no botão "Tenho Interesse" nesta página e preencher seus dados básicos. Nosso consultor exclusivo entrará em contato em minutos para agendar seu horário com atendimento VIP e estacionamento com manobrista gratuito.'
  }
];
