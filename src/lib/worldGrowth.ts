import type { WorldGrowthStatus } from './types';

export interface WorldLand {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  requiredActivities: number;
}

export interface WorldAnimal {
  id: string;
  name: string;
  emoji: string;
  sound: string;
  habitat: string;
  requiredMissions: number;
}

export interface WorldPlant {
  id: string;
  name: string;
  emoji: string;
  growthStage: string;
  requiredActivities: number;
}

export interface WorldLandmark {
  id: string;
  name: string;
  emoji: string;
  lore: string;
  requiredAdventures: number;
}

export const ALL_LANDS: WorldLand[] = [
  { id: 'meadow', name: 'Sunny Meadow', emoji: '🌱', color: 'from-emerald-300 to-green-500', description: 'Fresh green rolling hills where your adventure begins.', requiredActivities: 0 },
  { id: 'forest', name: 'Whispering Woods', emoji: '🌲', color: 'from-green-500 to-teal-700', description: 'A lush ancient forest full of ancient tree lore and secret phonics scrolls.', requiredActivities: 3 },
  { id: 'mountain', name: 'Crystal Mountain', emoji: '🏔️', color: 'from-sky-400 to-indigo-600', description: 'Glistening peaks carved from shimmering number crystals.', requiredActivities: 7 },
  { id: 'lagoon', name: 'Starlight Coast', emoji: '🏝️', color: 'from-cyan-400 to-blue-600', description: 'A sparkling shoreline that glows with bioluminescent waves.', requiredActivities: 12 },
  { id: 'citadel', name: 'Cloud Citadel', emoji: '🏰', color: 'from-purple-400 to-pink-600', description: 'A majestic floating kingdom among the cosmic clouds.', requiredActivities: 18 },
  { id: 'observatory', name: 'Solar Observatory', emoji: '🌌', color: 'from-indigo-700 to-violet-950', description: 'An astronomical wonderland perched among shooting stars.', requiredActivities: 25 },
];

export const ALL_ANIMALS: WorldAnimal[] = [
  { id: 'fox', name: 'Kido the Cosmic Fox', emoji: '🦊', sound: 'Yip yip! Let’s explore!', habitat: 'Sunny Meadow', requiredMissions: 1 },
  { id: 'bunny', name: 'Fluffy Meadow Hare', emoji: '🐰', sound: 'Hop hop!', habitat: 'Sunny Meadow', requiredMissions: 2 },
  { id: 'deer', name: 'Golden Forest Fawn', emoji: '🦌', sound: 'Gentle bell chime', habitat: 'Whispering Woods', requiredMissions: 4 },
  { id: 'owl', name: 'Stargazer Wise Owl', emoji: '🦉', sound: 'Hoo-hoo! Did you learn something new?', habitat: 'Whispering Woods', requiredMissions: 7 },
  { id: 'dolphin', name: 'Rainbow Lagoon Dolphin', emoji: '🐬', sound: 'Splash & playful whistle!', habitat: 'Starlight Coast', requiredMissions: 11 },
  { id: 'dino', name: 'Baby Emerald Triceratops', emoji: '🦕', sound: 'Friendly stomping roar!', habitat: 'Crystal Mountain', requiredMissions: 16 },
  { id: 'dragon', name: 'Mini Starlight Dragon', emoji: '🐲', sound: 'Sparkly puff of happy glitter!', habitat: 'Cloud Citadel', requiredMissions: 22 },
];

export const ALL_PLANTS: WorldPlant[] = [
  { id: 'sprout', name: 'Curiosity Clover', emoji: '☘️', growthStage: 'Baby Sprout', requiredActivities: 1 },
  { id: 'flower', name: 'Sunflower Wonder', emoji: '🌻', growthStage: 'Blooming', requiredActivities: 2 },
  { id: 'tulip', name: 'Rainbow Tulip Grove', emoji: '🌷', growthStage: 'Vibrant Garden', requiredActivities: 4 },
  { id: 'tree_small', name: 'Sapling Oak', emoji: '🌳', growthStage: 'Young Tree', requiredActivities: 6 },
  { id: 'pine', name: 'Evergreen Pine', emoji: '🌲', growthStage: 'Sturdy Pine', requiredActivities: 9 },
  { id: 'blossom', name: 'Cherry Blossom Bower', emoji: '🌸', growthStage: 'Fairy Forest', requiredActivities: 13 },
  { id: 'crystal_tree', name: 'Luminescent Crystal Tree', emoji: '✨', growthStage: 'Cosmic Wonder', requiredActivities: 20 },
];

export const ALL_LANDMARKS: WorldLandmark[] = [
  { id: 'treehouse', name: 'Explorer Treehouse', emoji: '🏡', lore: 'Your cozy basecamp for planning every voyage.', requiredAdventures: 1 },
  { id: 'windmill', name: 'Breeze Windmill', emoji: '🎡', lore: 'Powers gentle breezes across the flower fields.', requiredAdventures: 2 },
  { id: 'lighthouse', name: 'Starlight Lighthouse', emoji: '🗼', lore: 'Guides brave ships carrying magical books.', requiredAdventures: 4 },
  { id: 'castle', name: 'Castle of Wisdom', emoji: '🏰', lore: 'Honors masters of memory, art, and words.', requiredAdventures: 6 },
  { id: 'observatory_dome', name: 'Great Galactic Observatory', emoji: '🔭', lore: 'Views distant galaxies mapped by young explorers.', requiredAdventures: 8 },
];

export function getStreakDecoration(streak: number): { id: string; name: string; emoji: string } | undefined {
  if (streak >= 7) {
    return { id: 'golden_fountain', name: 'Golden Phoenix Fountain', emoji: '⛲' };
  }
  if (streak >= 5) {
    return { id: 'crystal_monolith', name: 'Rainbow Crystal Arch', emoji: '🌈' };
  }
  if (streak >= 3) {
    return { id: 'star_lanterns', name: 'Luminous Star Lanterns', emoji: '🏮' };
  }
  if (streak >= 2) {
    return { id: 'flower_arch', name: 'Wildflower Archway', emoji: '💐' };
  }
  return undefined;
}

export function computeWorldGrowth(
  activitiesCount: number = 0,
  totalAdventures: number = 0,
  streak: number = 0
): WorldGrowthStatus {
  const totalPoints = activitiesCount + totalAdventures * 2;
  const growthLevel = Math.max(1, Math.min(10, Math.floor(totalPoints / 3) + 1));

  const titles = [
    'Tiny Explorer Seedling',
    'Green Sprout Haven',
    'Whispering Meadow',
    'Lively Wildwood',
    'Crystal Spring Valley',
    'Starlight Sanctuary',
    'Kingdom of Wonder',
    'Cosmic Flora Haven',
    'Grand Explorer Realm',
    'Mythic Paradise of Kidora',
  ];

  const title = titles[growthLevel - 1] || 'Mythic Paradise of Kidora';
  const description =
    growthLevel <= 2
      ? 'Your world is just taking root! Complete activities and missions to watch plants bloom and creatures arrive.'
      : growthLevel <= 5
      ? 'Your world is flourishing! New regions and wildlife roam peacefully across your green valleys.'
      : 'A legendary wonderland! Sparkling crystal trees and grand landmarks honor your brilliant curiosity.';

  const unlockedLands = ALL_LANDS.map((l) => ({
    ...l,
    unlocked: activitiesCount >= l.requiredActivities,
  }));

  const unlockedAnimals = ALL_ANIMALS.map((a) => ({
    ...a,
    unlocked: (activitiesCount + totalAdventures) >= a.requiredMissions,
  }));

  const unlockedPlants = ALL_PLANTS.map((p) => ({
    ...p,
    unlocked: activitiesCount >= p.requiredActivities,
  }));

  const unlockedLandmarks = ALL_LANDMARKS.map((lm) => ({
    ...lm,
    unlocked: totalAdventures >= lm.requiredAdventures,
  }));

  // Find next activity threshold
  const allThresholds = [
    ...ALL_LANDS.map((l) => l.requiredActivities),
    ...ALL_ANIMALS.map((a) => a.requiredMissions),
    ...ALL_PLANTS.map((p) => p.requiredActivities),
  ].filter((req) => req > activitiesCount);

  const nextGoalActivities = allThresholds.length > 0 ? Math.min(...allThresholds) - activitiesCount : 1;

  return {
    growthLevel,
    title,
    description,
    unlockedLands,
    unlockedAnimals,
    unlockedPlants,
    unlockedLandmarks,
    streakDecoration: getStreakDecoration(streak),
    nextGoalActivities,
  };
}
