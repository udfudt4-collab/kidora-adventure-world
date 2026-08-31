export type Screen =
  | 'onboarding'
  | 'home'
  | 'play'
  | 'learn'
  | 'adventure'
  | 'challenges'
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

export interface ChildProfileControls {
  allowedRealms: string[]; // ['words', 'math', 'creative', 'puzzle', 'science']
  dailyLimitMinutes: number; // e.g. 30, 45, 60, 0 (unlimited)
  bedtimeQuietHoursEnabled: boolean;
  bedtimeStart: string; // e.g. "20:00"
  bedtimeEnd: string; // e.g. "07:00"
  priorityLearningAreas: string[];
}

export interface ParentRecommendation {
  id: string;
  childId: string;
  activityType: ActivityType;
  title: string;
  emoji: string;
  message: string;
  createdAt: string;
  completed: boolean;
}

export interface FamilyChallenge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  starsReward: number;
  assignedChildIds: string[];
  completedBy: string[]; // childIds who completed
  createdAt: string;
}

export interface ParentApprovalRequest {
  id: string;
  childId: string;
  childName: string;
  actionType: 'unlock_realm' | 'change_avatar' | 'external_share' | 'custom';
  details: string;
  status: 'pending' | 'approved' | 'denied';
  createdAt: string;
}

export interface WeightLogEntry {
  id: string;
  week: number;
  weightKg: number;
  date: string;
  note?: string;
}

export interface BabyName {
  id: string;
  name: string;
  gender: 'boy' | 'girl' | 'unisex';
  meaning: string;
  origin: string;
  popular?: boolean;
}

export interface BabyMoment {
  id: string;
  momentKey: string; // 'first_smile' | 'first_word' | 'first_step' | 'first_tooth' | 'birthday' | 'custom'
  title: string;
  emoji: string;
  dateAchieved: string | null;
  notes: string;
}

export interface FamilyEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  category: 'activity' | 'appointment' | 'celebration' | 'reminder';
  emoji: string;
  completed?: boolean;
}

export interface ParentNote {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'milestone' | 'growth' | 'memory' | 'health';
}

export interface ChildProfile {
  id: string;
  name: string;
  gender?: 'son' | 'daughter' | 'child';
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
  controls?: ChildProfileControls;
  activitiesCompletedCount?: number;
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

// 🎒 Backpack Collectibles
export interface BackpackItem {
  id: string;
  title: string;
  emoji: string;
  category: 'tool' | 'relic' | 'badge' | 'nature' | 'cosmic';
  description: string;
  worldOrigin: string;
  dateFound: string;
}

// 🎟️ Adventure Passport
export interface PassportWorld {
  id: string;
  name: string;
  emoji: string;
  theme: string;
  stampsCount: number;
  totalStampsNeeded: number;
  certificateTitle: string;
  unlocked: boolean;
}

// 🕵️ Daily Mystery Mission
export interface MysteryClue {
  id: string;
  type: 'observe' | 'code' | 'quiz' | 'puzzle';
  question: string;
  hint: string;
  options?: string[];
  correctAnswer: string;
  emoji: string;
}

export interface DailyMystery {
  id: string;
  title: string;
  emoji: string;
  storyPrompt: string;
  clues: MysteryClue[];
  rewardCollectible: BackpackItem;
  rewardStars: number;
  worldGrowItem: string;
}

// 🧩 Real-World Missions (Screen-Free)
export interface RealWorldMission {
  id: string;
  title: string;
  prompt: string;
  emoji: string;
  category: 'home' | 'nature' | 'family' | 'creativity';
  starsReward: number;
  badgeName: string;
}

// 🌱 World Growth Definition
export interface WorldGrowthStatus {
  growthLevel: number;
  title: string;
  description: string;
  unlockedLands: { id: string; name: string; emoji: string; color: string; description: string; requiredActivities: number; unlocked: boolean }[];
  unlockedAnimals: { id: string; name: string; emoji: string; sound: string; habitat: string; requiredMissions: number; unlocked: boolean }[];
  unlockedPlants: { id: string; name: string; emoji: string; growthStage: string; requiredActivities: number; unlocked: boolean }[];
  unlockedLandmarks: { id: string; name: string; emoji: string; lore: string; requiredAdventures: number; unlocked: boolean }[];
  streakDecoration?: { id: string; name: string; emoji: string };
  nextGoalActivities: number;
}

// 📊 Daily Learning Summary (Parent App)
export interface DailyLearningLog {
  date: string;
  minutesSpent: number;
  xpEarned: number;
  activitiesCount: number;
  topics: { name: string; emoji: string }[];
}

// 🌸 Private Period & Ovulation Tracker
export interface CycleEntry {
  id: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  flow?: 'light' | 'medium' | 'heavy';
  symptoms?: string[];
  notes?: string;
}

export interface PeriodTrackerData {
  lastPeriodStart: string; // YYYY-MM-DD
  periodDurationDays: number; // default e.g. 5
  cycleLengthDays: number; // default e.g. 28
  reminderEnabled: boolean;
  cycles: CycleEntry[];
}

// 🎁 Earn Premium & Referral System
export type PremiumSourceType =
  | 'welcome_bonus'
  | 'referred_welcome'
  | 'daily_login'
  | 'daily_adventure'
  | 'challenge'
  | 'streak_milestone'
  | 'referral';

export interface PremiumRewardLog {
  id: string;
  source: PremiumSourceType;
  title: string;
  daysAdded: number;
  date: string; // ISO date YYYY-MM-DD
  emoji: string;
}

export interface SuccessfulReferral {
  id: string;
  friendName?: string;
  dateJoined: string;
  daysAwarded: number;
}

export interface PremiumState {
  tier: 'free' | 'premium';
  daysRemaining: number;
  expiresAt: string; // ISO timestamp
  totalDaysEarned: number;
  referralCode: string;
  referredBy?: string;
  successfulReferrals: SuccessfulReferral[];
  lastDailyLoginRewardDate: string | null;
  lastDailyAdventureRewardDate: string | null;
  claimedStreakMilestones: number[]; // e.g. [7, 14, 30]
  history: PremiumRewardLog[];
}

// ⭐ Parent Feedback & Reviews
export type ParentReviewCategory = 'activities' | 'safety' | 'staff' | 'facilities' | 'learning';

export interface ParentReview {
  id: string;
  rating: number; // 1 to 5
  category: ParentReviewCategory;
  comment: string;
  authorName: string;
  childAge?: number;
  createdAt: string; // ISO string
  helpfulCount: number;
}

// 😴 Child Sleep Tracking
export type SleepQuality = 'peaceful' | 'deep' | 'restless' | 'fair';

export interface SleepLogEntry {
  id: string;
  childId: string;
  date: string; // YYYY-MM-DD
  bedtime: string; // HH:mm
  wakeTime: string; // HH:mm
  durationHours: number; // e.g. 9.5
  quality: SleepQuality;
  notes?: string;
}

// 💧 Child Daily Hydration Tracking
export interface HydrationLogEntry {
  id: string;
  childId: string;
  date: string; // YYYY-MM-DD
  glassesDrank: number;
  targetGlasses: number;
  mlPerGlass: number; // default 250ml
  notes?: string;
}

export interface HydrationData {
  targetGlasses: number;
  mlPerGlass: number;
  dailyIntakeByChild: Record<string, number>; // childId -> today's glasses count
  historyLogs: HydrationLogEntry[];
}

// 🎮 Kid Challenges & Friend Quests System
export type KidChallengeCategory =
  | 'sprint'     // 🏃 Adventure Sprint (movement, active)
  | 'brain'      // 🧠 Brain Battle (learning, memory, math)
  | 'creative'   // 🎨 Creative Challenge (drawing, blocks, story)
  | 'kindness'   // 💚 Kindness Challenge (positive acts, helping)
  | 'habit'      // 💧 Healthy Hero (hydration, sleep, nutrition)
  | 'quest';     // 🗺️ Adventure Quest (multi-step virtual quest)

export interface KidChallengeOpponent {
  id: string;
  name: string;
  avatarEmoji: string;
  type: 'friend' | 'group' | 'buddy';
}

export interface KidChallengeTask {
  id: string;
  text: string;
  emoji?: string;
  done: boolean;
  type?: string;
}

export interface KidChallenge {
  id: string;
  category: KidChallengeCategory;
  title: string;
  description: string;
  emoji: string;
  opponent: KidChallengeOpponent;
  status: 'active' | 'invitation' | 'completed';
  pointsReward: number;
  badgeReward: string;
  streakDays: number; // e.g. 1, 3, 7
  currentDay: number;
  dayCompleted: boolean[]; // e.g. [true, false, false]
  tasks: KidChallengeTask[];
  createdAt: string;
  completedAt?: string;
  reactionEmoji?: string; // e.g. 👏, 💖, ⭐, 🔥
}

export interface CategoryPointsBreakdown {
  activeHero: number;        // 🏃 movement points
  brainMaster: number;       // 🧠 learning points
  creativeStar: number;      // 🎨 creativity points
  kindnessChampion: number;  // 💚 kindness points
  healthyHero: number;       // 💧 healthy habit points
  adventureMaster: number;   // 🌟 overall points
}




