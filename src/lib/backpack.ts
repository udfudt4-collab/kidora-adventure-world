import type { BackpackItem } from './types';

export const initialBackpackCatalog: Record<string, Omit<BackpackItem, 'dateFound'>> = {
  'brass_compass': {
    id: 'brass_compass',
    title: 'Starseeker Brass Compass',
    emoji: '🧭',
    category: 'tool',
    description: 'A glowing brass compass that always points toward exciting adventures and hidden learning realms.',
    worldOrigin: 'Word Forest Grove',
  },
  'stargazer_telescope': {
    id: 'stargazer_telescope',
    title: 'Stargazer Brass Telescope',
    emoji: '🔭',
    category: 'tool',
    description: 'Enables you to zoom in on faraway constellations, cosmic dust, and dancing comets.',
    worldOrigin: 'Science Space Hub',
  },
  'dino_fossil': {
    id: 'dino_fossil',
    title: 'Golden T-Rex Tooth Fossil',
    emoji: '🦖',
    category: 'relic',
    description: 'A genuine fossil discovered under ancient jungle ferns. Shimmers in golden sunlight!',
    worldOrigin: 'Dinosaur Valley',
  },
  'magic_key': {
    id: 'magic_key',
    title: 'Enchanted Crystal Key',
    emoji: '🗝️',
    category: 'relic',
    description: 'Unlocks ancient treasure chests and mystery puzzle chambers throughout Kidora.',
    worldOrigin: 'Puzzle Castle',
  },
  'explorer_badge': {
    id: 'explorer_badge',
    title: 'Grand Master Explorer Badge',
    emoji: '🎖️',
    category: 'badge',
    description: 'Awarded to brave young minds who explore every corner of their growing world.',
    worldOrigin: 'Kidora Academy',
  },
  'crystal_prism': {
    id: 'crystal_prism',
    title: 'Rainbow Light Prism',
    emoji: '💎',
    category: 'nature',
    description: 'Refracts ordinary light into dazzling bursts of rainbow sparkles and happy smiles.',
    worldOrigin: 'Math Mountain Peaks',
  },
  'golden_acorn': {
    id: 'golden_acorn',
    title: 'Ancient Golden Acorn',
    emoji: '🌰',
    category: 'nature',
    description: 'A magical seed that when planted, causes a magnificent Wonder Oak to grow in seconds.',
    worldOrigin: 'Whispering Woods',
  },
  'cosmic_lantern': {
    id: 'cosmic_lantern',
    title: 'Moonlight Firefly Lantern',
    emoji: '🏮',
    category: 'cosmic',
    description: 'Glows with friendly fireflies to light the way during nocturnal learning expeditions.',
    worldOrigin: 'Starlight Coast',
  },
  'ocean_pearl': {
    id: 'ocean_pearl',
    title: 'Luminescent Mermaid Pearl',
    emoji: '🦪',
    category: 'nature',
    description: 'Resonates with the gentle song of ocean waves and playful dolphin clicks.',
    worldOrigin: 'Coral Kingdom',
  },
  'star_feather': {
    id: 'star_feather',
    title: 'Cosmic Phoenix Feather',
    emoji: '🪶',
    category: 'cosmic',
    description: 'A radiant feather left by the mythical phoenix as a token of endless curiosity.',
    worldOrigin: 'Cloud Citadel',
  },
};

export function getBackpackItemById(id: string, customDate?: string): BackpackItem {
  const item = initialBackpackCatalog[id] || {
    id,
    title: 'Mystery Artifact',
    emoji: '✨',
    category: 'relic',
    description: 'A special relic discovered on your Kidora adventures.',
    worldOrigin: 'Secret Realm',
  };
  return {
    ...item,
    dateFound: customDate || new Date().toISOString().split('T')[0],
  };
}
