export type LocationId = 'kitchen' | 'outdoor' | 'commercial' | 'bathroom'
export type VibeId = 'bold' | 'minimal' | 'dark'
export type PriorityId = 'durability' | 'luxury' | 'budget'

export interface QuizOption<T extends string> {
  id: T
  label: string
  description: string
}

export const locationOptions: QuizOption<LocationId>[] = [
  { id: 'kitchen', label: 'Kitchen Countertop', description: 'Daily wear, heat, and food contact' },
  { id: 'outdoor', label: 'Outdoor Facade', description: 'UV exposure, weathering, temperature swings' },
  { id: 'commercial', label: 'High-Traffic Commercial Lobby', description: 'Heavy foot traffic, durability at scale' },
  { id: 'bathroom', label: 'Luxury Bathroom', description: 'Moisture, statement surfaces, vanity tops' },
]

export const vibeOptions: QuizOption<VibeId>[] = [
  { id: 'bold', label: 'Bold Veining', description: 'Dramatic movement and contrast' },
  { id: 'minimal', label: 'Minimalist & Clean', description: 'Calm, uniform, understated' },
  { id: 'dark', label: 'Dark & Dramatic', description: 'Deep tones, moody atmosphere' },
]

export const priorityOptions: QuizOption<PriorityId>[] = [
  { id: 'durability', label: 'Scratch & Stain Resistance', description: 'Built for everyday performance' },
  { id: 'luxury', label: 'Pure Luxury & Uniqueness', description: 'A one-of-a-kind centerpiece' },
  { id: 'budget', label: 'Budget-Friendly', description: 'Smart value across a large project' },
]

export interface Material {
  id: string
  name: string
  tagline: string
  swatch: string
  locations: LocationId[]
  vibes: VibeId[]
  priorities: PriorityId[]
  pros: string[]
  cons: string[]
}

export const materials: Material[] = [
  {
    id: 'quartzite',
    name: 'Quartzite',
    tagline: 'Natural beauty, near-granite hardness',
    swatch: 'linear-gradient(135deg, #e8e2d6 0%, #c9bba4 45%, #8a7250 100%)',
    locations: ['kitchen', 'outdoor', 'bathroom'],
    vibes: ['bold', 'dark'],
    priorities: ['durability', 'luxury'],
    pros: [
      'Exceptional hardness rivaling granite',
      'Stunning natural veining similar to marble',
      'Highly resistant to heat, scratches, and UV fading',
    ],
    cons: [
      'Premium price point',
      'Requires periodic resealing',
      'Slab selection can be limited',
    ],
  },
  {
    id: 'marble',
    name: 'Marble',
    tagline: 'Timeless veining, unmatched depth',
    swatch: 'linear-gradient(135deg, #f4f1ec 0%, #e3ded3 50%, #a9a39a 100%)',
    locations: ['bathroom', 'kitchen'],
    vibes: ['bold', 'minimal'],
    priorities: ['luxury'],
    pros: [
      'Timeless, unmatched veining and depth',
      'Naturally cool surface — ideal for baking',
      'Available in rare, one-of-a-kind slabs',
    ],
    cons: [
      'Porous — prone to etching from acids',
      'Softer stone, can scratch or chip',
      'Needs regular sealing and care',
    ],
  },
  {
    id: 'sintered',
    name: 'Sintered Stone',
    tagline: 'Engineered for total performance',
    swatch: 'linear-gradient(135deg, #d6d2cb 0%, #a39e95 50%, #4a443c 100%)',
    locations: ['kitchen', 'outdoor', 'commercial'],
    vibes: ['minimal', 'dark'],
    priorities: ['durability'],
    pros: [
      'Near-zero porosity — stain and chemical proof',
      'UV stable, ideal for facades and outdoor kitchens',
      'Extremely scratch and heat resistant',
    ],
    cons: [
      'Higher fabrication and installation cost',
      'Fewer organic veining patterns',
      'Requires specialist tooling to cut',
    ],
  },
  {
    id: 'granite',
    name: 'Granite',
    tagline: 'Proven durability, endless variety',
    swatch: 'linear-gradient(135deg, #cfc9c2 0%, #7c8a8a 45%, #2e2b28 100%)',
    locations: ['kitchen', 'outdoor', 'commercial'],
    vibes: ['bold', 'dark'],
    priorities: ['durability', 'budget'],
    pros: [
      'Extremely hard and heat resistant',
      'Wide range of natural patterns and colors',
      'Excellent value for high-traffic use',
    ],
    cons: [
      'Patterns less uniform than engineered stone',
      'Visible seams across large spans',
      'Periodic sealing recommended',
    ],
  },
  {
    id: 'porcelain',
    name: 'Porcelain',
    tagline: 'Large-format value and resilience',
    swatch: 'linear-gradient(135deg, #ece9e3 0%, #cfc7ba 50%, #756a5c 100%)',
    locations: ['kitchen', 'bathroom', 'commercial'],
    vibes: ['minimal', 'dark'],
    priorities: ['budget', 'durability'],
    pros: [
      'Highly budget-conscious for large-format coverage',
      'Stain, scratch, and UV resistant',
      'Consistent, repeatable patterns for large projects',
    ],
    cons: [
      'Edges can chip without proper fabrication',
      'Limited natural depth and translucency',
      'Requires experienced installers for large slabs',
    ],
  },
]

export function matchMaterials(location: LocationId, vibe: VibeId, priority: PriorityId): Material[] {
  const scored = materials.map((material) => {
    let score = 0
    if (material.locations.includes(location)) score += 1
    if (material.vibes.includes(vibe)) score += 1
    if (material.priorities.includes(priority)) score += 1
    return { material, score }
  })

  return scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((entry) => entry.material)
}
