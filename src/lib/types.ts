export type Screen =
  | 'onboarding'
  | 'home'
  | 'adventure'
  | 'activity'
  | 'world'
  | 'collections'
  | 'pets'
  | 'create'
  | 'parent'
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
  hat: string;
  accessory: string;
}

export interface PetConfig {
  type: string;
  name: string;
  color: string;
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
