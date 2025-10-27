export type Property = {
  id: string;
  title: string;
  priceUsd: number; // total price in USD
  city: string;
  state: string; // US state code for filtering
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number; // size in square meters (metric)
  imageUrl: string;
  description: string;
};

export type PropertyFilters = {
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  minSizeSqm?: number;
  maxSizeSqm?: number;
  state?: string; // exact match of 2-letter code
};

// In-memory dataset to imitate a backend
const PROPERTIES: Property[] = [
  {
    id: 'p-001',
    title: 'Modern Family Home',
    priceUsd: 1250000,
    city: 'Palo Alto',
    state: 'CA',
    bedrooms: 4,
    bathrooms: 3,
    sizeSqm: 2450 * 0.092903 | 0, // ~227 m²
    imageUrl:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop',
    description:
      'A light-filled family home near top schools with open-plan living and a private backyard.',
  },
  {
    id: 'p-002',
    title: 'Luxury City Apartment',
    priceUsd: 890000,
    city: 'Manhattan',
    state: 'NY',
    bedrooms: 2,
    bathrooms: 2,
    sizeSqm: 1200 * 0.092903 | 0, // ~111 m²
    imageUrl:
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop',
    description:
      'High-floor apartment with skyline views, concierge service, and gym access.',
  },
  {
    id: 'p-003',
    title: 'Coastal Retreat',
    priceUsd: 1750000,
    city: 'La Jolla',
    state: 'CA',
    bedrooms: 5,
    bathrooms: 4,
    sizeSqm: 3100 * 0.092903 | 0, // ~288 m²
    imageUrl:
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1200&auto=format&fit=crop',
    description:
      'Ocean-view home with spacious decks and indoor-outdoor living.',
  },
  {
    id: 'p-004',
    title: 'Suburban Comfort',
    priceUsd: 690000,
    city: 'Austin',
    state: 'TX',
    bedrooms: 3,
    bathrooms: 2,
    sizeSqm: 1800 * 0.092903 | 0, // ~167 m²
    imageUrl:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop',
    description:
      'Quiet neighborhood, updated kitchen, and a generous backyard for entertaining.',
  },
  {
    id: 'p-005',
    title: 'Mountain Escape',
    priceUsd: 1050000,
    city: 'Boulder',
    state: 'CO',
    bedrooms: 4,
    bathrooms: 3,
    sizeSqm: 2200 * 0.092903 | 0, // ~204 m²
    imageUrl:
      'https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=1200&auto=format&fit=crop',
    description:
      'Warm wood finishes, panoramic mountain views, and proximity to trails.',
  },
  {
    id: 'p-006',
    title: 'Lakeview Cottage',
    priceUsd: 820000,
    city: 'Madison',
    state: 'WI',
    bedrooms: 3,
    bathrooms: 2,
    sizeSqm: 1600 * 0.092903 | 0, // ~148 m²
    imageUrl:
      'https://images.unsplash.com/photo-1521783988130-435f3d026a26?q=80&w=1200&auto=format&fit=crop',
    description:
      'Cozy lakeside home with dock access and a renovated interior.',
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getAllProperties(): Promise<Property[]> {
  await delay(150);
  return PROPERTIES;
}

export async function getPropertyById(id: string): Promise<Property | null> {
  await delay(120);
  return PROPERTIES.find((p) => p.id === id) ?? null;
}

export async function getFilteredProperties(
  filters: PropertyFilters = {}
): Promise<Property[]> {
  await delay(180);
  const {
    minPrice,
    maxPrice,
    minBedrooms,
    minBathrooms,
    minSizeSqm,
    maxSizeSqm,
    state,
  } = filters;

  return PROPERTIES.filter((p) => {
    if (typeof minPrice === 'number' && p.priceUsd < minPrice) return false;
    if (typeof maxPrice === 'number' && p.priceUsd > maxPrice) return false;
    if (typeof minBedrooms === 'number' && p.bedrooms < minBedrooms) return false;
    if (typeof minBathrooms === 'number' && p.bathrooms < minBathrooms) return false;
    if (typeof minSizeSqm === 'number' && p.sizeSqm < minSizeSqm) return false;
    if (typeof maxSizeSqm === 'number' && p.sizeSqm > maxSizeSqm) return false;
    if (state && p.state.toLowerCase() !== state.toLowerCase()) return false;
    return true;
  });
}

export function formatUsd(amount: number): string {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}


