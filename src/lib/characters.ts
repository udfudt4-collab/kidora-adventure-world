export interface KidoraCharacter {
  id: string;
  name: string;
  role: string;
  realm: string;
  emoji: string;
  color: string;
  description: string;
  specialSkill: string;
  quote: string;
  avatarBg: string;
}

export const kidoraCharacters: KidoraCharacter[] = [
  {
    id: 'kido',
    name: 'Kido',
    role: 'Adventure Explorer',
    realm: 'Kidora World',
    emoji: '🦊',
    color: '#f97316',
    avatarBg: 'from-amber-400 to-orange-500',
    description: 'A brave, friendly cosmic fox who loves exploring new worlds, finding clues, and guiding young adventurers.',
    specialSkill: 'Trail Discovery & Compass Navigation',
    quote: 'Every day is a brand new adventure! Let\'s go!',
  },
  {
    id: 'ria',
    name: 'Ria',
    role: 'Creative Artist',
    realm: 'Creative Island',
    emoji: '🎨',
    color: '#ec4899',
    avatarBg: 'from-pink-400 to-rose-500',
    description: 'An imaginative painter who believes every child\'s art can come alive and transform the world with colors.',
    specialSkill: 'Color Magic & Living Art',
    quote: 'There are no mistakes in art, only happy discoveries!',
  },
  {
    id: 'momo',
    name: 'Momo',
    role: 'Puzzle Master',
    realm: 'Puzzle Castle',
    emoji: '🧩',
    color: '#8b5cf6',
    avatarBg: 'from-purple-400 to-indigo-600',
    description: 'A wise and playful puzzle keeper who loves riddles, memory challenges, and secret maze paths.',
    specialSkill: 'Logic Puzzles & Memory Patterns',
    quote: 'Take your time and think—every puzzle has a secret key!',
  },
  {
    id: 'tiko',
    name: 'Tiko',
    role: 'Math Champion',
    realm: 'Math Mountain',
    emoji: '🧮',
    color: '#0ea5e9',
    avatarBg: 'from-sky-400 to-blue-600',
    description: 'An energetic mathematician who turns numbers, counting, and problem-solving into a thrilling mountain climb.',
    specialSkill: 'Fast Counting & Geometry Shapes',
    quote: 'Numbers are like secret codes waiting to be solved!',
  },
  {
    id: 'lumi',
    name: 'Lumi',
    role: 'Science Inquirer',
    realm: 'Science Space',
    emoji: '🔬',
    color: '#10b981',
    avatarBg: 'from-emerald-400 to-teal-600',
    description: 'A curious space scientist who observes stars, plant biology, dinosaur fossils, and natural wonders.',
    specialSkill: 'Scientific Observation & Planet Facts',
    quote: 'Always ask why! Curiosity makes our minds sparkle!',
  },
];
