export type Screen =
  | 'onboarding'
  | 'home'
  | 'play'
  | 'learn'
  | 'adventure'
  | 'activity'
  | 'world'
  | 'collections'
  | 'my-kidora'
  | 'pets'
  | 'create'
  | 'parent'
  | 'parents'
  | 'about'
  | 'privacy'
  | 'safety'
  | 'terms'
  | 'contact'
  | 'parent-guide'
  | 'settings';

export type ActivityType =
  | 'math'
  | 'words'
  | 'brain'
  | 'science'
  | 'creativity'
  | 'story';

export type Skill = 'math' | 'reading' | 'logic' | 'science' | 'creativity' | 'vocabulary';

export type Theme =
  | 'jungle' | 'space' | 'dinosaurs' | 'ocean'
  | 'castle' | 'science' | 'creativity';

export interface AvatarConfig {
  skin: string;
  hair: string;
  hairColor: string;
  outfit: string;
  outfitColor?: string;
  hat: string;
  hatColor?: string;
  accessory: string;
  backpack?: string;
  shoes?: string;
}

export interface PlacedWorldItem {
  id: string;
  type: 'tree' | 'creature' | 'rocket' | 'flower' | 'castle' | 'custom';
  title: string;
  emoji: string;
  imageUrl?: string;
  x: number;
  y: number;
  scale?: number;
  createdAt: string;
}

export interface PetConfig {
  type: string;
  name: string;
  color: string;
  happiness?: number;
  accessory?: string;
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatar: AvatarConfig;
  pet: PetConfig;
  stars: number;
  streak: number;
  lastAdventureDate: string | null;
  totalAdventures: number;
  gardenItems: string[];
  worldItems?: PlacedWorldItem[];
  voiceEnabled: boolean;
  reducedMotion: boolean;
  dailyLimitMin: number;
  notificationsEnabled?: boolean;
  reminderTime?: string;
}

export interface Mission {
  id: string;
  type: ActivityType;
  title: string;
  emoji: string;
  description: string;
  completed: boolean;
}

export interface Adventure {
  theme: Theme;
  themeName: string;
  themeEmoji: string;
  storyIntro: string;
  missions: Mission[];
  rewardBadge: string;
  rewardEmoji: string;
}

export interface Creation {
  id: string;
  type: string;
  title: string;
  payload: unknown;
  createdAt: string;
}

export interface Unlock {
  category: string;
  key: string;
  unlockedAt: string;
}

export interface ActivityStat {
  skill: string;
  count: number;
}
