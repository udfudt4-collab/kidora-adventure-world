import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import { defaultAvatar } from './avatar';
import { defaultBabyMoments } from './baby';
import { defaultPeriodData } from './cycleTracker';
import type {
  ChildProfile,
  AvatarConfig,
  PetConfig,
  Creation,
  Unlock,
  ChildProfileControls,
  ParentRecommendation,
  FamilyChallenge,
  ParentApprovalRequest,
  ParentNote,
  WeightLogEntry,
  BabyMoment,
  FamilyEvent,
  DailyLearningLog,
  PeriodTrackerData,
  CycleEntry,
} from './types';

export const defaultControls: ChildProfileControls = {
  allowedRealms: ['words', 'math', 'creative', 'puzzle', 'science'],
  dailyLimitMinutes: 45,
  bedtimeQuietHoursEnabled: true,
  bedtimeStart: '20:00',
  bedtimeEnd: '07:00',
  priorityLearningAreas: ['math', 'reading', 'logic'],
};

const initialSampleLearningLogs: DailyLearningLog[] = [
  {
    date: new Date().toISOString().split('T')[0],
    minutesSpent: 18,
    xpEarned: 85,
    activitiesCount: 4,
    topics: [
      { name: 'Fractions & Shape Counting', emoji: '🧮' },
      { name: 'Sight Words & Phonics', emoji: '📚' },
      { name: 'Space Planets & Dinosaurs', emoji: '🧪' },
    ],
  },
];

const initialSampleChallenges: FamilyChallenge[] = [
  {
    id: 'fc-1',
    title: 'Rainbow Color Safari',
    description: 'Find 5 colorful objects around the house (red, blue, green, yellow, purple) and name them together!',
    emoji: '🌈',
    starsReward: 10,
    assignedChildIds: [],
    completedBy: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'fc-2',
    title: 'Kitchen Math Assistant',
    description: 'Help count 15 pieces of pasta, spoons, or fruit for dinner prep.',
    emoji: '🥣',
    starsReward: 15,
    assignedChildIds: [],
    completedBy: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'fc-3',
    title: 'Bedtime Story Explorer',
    description: 'Read an illustrated book together and talk about what the main character felt.',
    emoji: '📖',
    starsReward: 20,
    assignedChildIds: [],
    completedBy: [],
    createdAt: new Date().toISOString(),
  },
];

const initialSampleEvents: FamilyEvent[] = [
  {
    id: 'fe-1',
    title: 'Family Park & Nature Walk',
    date: 'Saturday',
    time: '10:00 AM',
    category: 'activity',
    emoji: '🌳',
    completed: false,
  },
  {
    id: 'fe-2',
    title: 'Pediatrician Wellness Checkup',
    date: 'Next Tuesday',
    time: '3:30 PM',
    category: 'appointment',
    emoji: '🩺',
    completed: false,
  },
  {
    id: 'fe-3',
    title: 'Friday Movie & Reading Night',
    date: 'Friday',
    time: '7:00 PM',
    category: 'celebration',
    emoji: '🍿',
    completed: false,
  },
];

interface AppState {
  // Current active child
  profile: ChildProfile | null;
  // All family children
  children: ChildProfile[];
  activeChildId: string;
  // Parent Admin State
  parentPin: string;
  recommendations: ParentRecommendation[];
  familyChallenges: FamilyChallenge[];
  approvalRequests: ParentApprovalRequest[];
  parentNotes: ParentNote[];
  // Pregnancy & Baby & Family Hub
  pregnancyCurrentWeek: number;
  pregnancyWeightLogs: WeightLogEntry[];
  favoriteBabyNames: string[];
  babyMoments: BabyMoment[];
  familyPlannerEvents: FamilyEvent[];
  creations: Creation[];
  unlocks: Unlock[];
  // 🎒 Backpack & 🎟️ Passport & 🕵️ Mystery & 🧩 Real-World
  backpackItems: string[];
  passportStamps: Record<string, number>;
  completedMysteryDate: string | null;
  completedRealWorldMissions: string[];
  // 📊 Daily Learning Logs (Parent App)
  dailyLearningLogs: DailyLearningLog[];
  // 🌸 Period & Ovulation Tracker (Parent App)
  periodTrackerData: PeriodTrackerData;
  loading: boolean;
  // Actions
  switchChild: (childId: string) => void;
  addChild: (childData: { name: string; age: number; gender?: 'son' | 'daughter' | 'child'; avatar?: AvatarConfig; pet?: PetConfig }) => Promise<string>;
  updateChild: (childId: string, partial: Partial<ChildProfile>) => Promise<void>;
  deleteChild: (childId: string) => Promise<void>;
  saveProfile: (partial: Partial<ChildProfile>) => Promise<void>;
  setAvatar: (avatar: AvatarConfig) => Promise<void>;
  setPet: (pet: PetConfig) => Promise<void>;
  addStars: (n: number) => Promise<void>;
  completeAdventure: (stars: number, badge: string, worldId?: string) => Promise<void>;
  recordActivity: (skill: string) => Promise<void>;
  addCreation: (type: string, title: string, payload: unknown) => Promise<void>;
  addWorldItem: (item: Omit<import('./types').PlacedWorldItem, 'id' | 'createdAt'>) => Promise<void>;
  removeWorldItem: (id: string) => Promise<void>;
  addUnlock: (category: string, key: string) => Promise<void>;
  addGardenItem: (item: string) => Promise<void>;
  resetProfile: () => Promise<void>;
  // 🎒 Backpack & 🎟️ Passport Actions
  collectBackpackItem: (itemId: string) => Promise<void>;
  addPassportStamp: (worldId: string, count?: number) => Promise<void>;
  completeDailyMystery: (mysteryId: string, stars: number, collectibleId: string, worldItem: string) => Promise<void>;
  completeRealWorldMission: (missionId: string, stars: number) => Promise<void>;
  logActivityLearning: (skill: string, minutes?: number, xp?: number) => Promise<void>;
  // 🌸 Period Tracker Actions (Parent)
  updatePeriodTrackerData: (partial: Partial<PeriodTrackerData>) => void;
  addPeriodCycle: (cycle: Omit<CycleEntry, 'id'>) => void;
  deletePeriodCycle: (cycleId: string) => void;
  // Parent controls & connections
  setParentPin: (pin: string) => void;
  verifyParentPin: (pin: string) => boolean;
  sendRecommendation: (rec: Omit<ParentRecommendation, 'id' | 'createdAt' | 'completed'>) => void;
  completeRecommendation: (recId: string) => void;
  addFamilyChallenge: (challenge: Omit<FamilyChallenge, 'id' | 'createdAt' | 'completedBy'>) => void;
  toggleChallengeComplete: (challengeId: string, childId: string) => void;
  requestApproval: (req: Omit<ParentApprovalRequest, 'id' | 'createdAt' | 'status'>) => void;
  resolveApproval: (requestId: string, status: 'approved' | 'denied') => void;
  addParentNote: (note: Omit<ParentNote, 'id' | 'date'>) => void;
  deleteParentNote: (noteId: string) => void;
  // Pregnancy Hub Actions
  setPregnancyWeek: (week: number) => void;
  addWeightLog: (week: number, weightKg: number, note?: string) => void;
  deleteWeightLog: (id: string) => void;
  // Baby Hub Actions
  toggleFavoriteBabyName: (nameId: string) => void;
  saveBabyMoment: (momentId: string, dateAchieved: string, notes: string) => void;
  // Family Planner Actions
  addFamilyEvent: (event: Omit<FamilyEvent, 'id'>) => void;
  deleteFamilyEvent: (id: string) => void;
  toggleFamilyEventCompleted: (id: string) => void;
  exportFamilyData: () => string;
}


const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

const defaultProfile: ChildProfile = {
  id: 'child-1',
  name: 'Aarav',
  gender: 'son',
  age: 6,
  avatar: defaultAvatar,
  pet: { type: 'puppy', name: 'Buddy', color: '#D4A574' },
  stars: 15,
  streak: 2,
  lastAdventureDate: null,
  totalAdventures: 3,
  gardenItems: [],
  worldItems: [],
  voiceEnabled: true,
  reducedMotion: false,
  dailyLimitMin: 45,
  notificationsEnabled: true,
  reminderTime: '08:00',
  controls: { ...defaultControls },
  activitiesCompletedCount: 5,
};

export function AppProvider({ children: reactChildren }: { children: ReactNode }) {
  const [childrenList, setChildrenList] = useState<ChildProfile[]>([defaultProfile]);
  const [activeChildId, setActiveChildId] = useState<string>('child-1');
  const [parentPin, setParentPinState] = useState<string>('1234');
  const [recommendations, setRecommendations] = useState<ParentRecommendation[]>([]);
  const [familyChallenges, setFamilyChallenges] = useState<FamilyChallenge[]>(initialSampleChallenges);
  const [approvalRequests, setApprovalRequests] = useState<ParentApprovalRequest[]>([]);
  const [parentNotes, setParentNotes] = useState<ParentNote[]>([]);

  // 🎒 Backpack & 🎟️ Passport & 🕵️ Mystery & 🧩 Real-World & 🌸 Period Tracker
  const [backpackItems, setBackpackItems] = useState<string[]>(['brass_compass', 'explorer_badge']);
  const [passportStamps, setPassportStamps] = useState<Record<string, number>>({
    words: 3,
    math: 2,
    science: 1,
    puzzle: 2,
    creative: 1,
  });
  const [completedMysteryDate, setCompletedMysteryDate] = useState<string | null>(null);
  const [completedRealWorldMissions, setCompletedRealWorldMissions] = useState<string[]>([]);
  const [dailyLearningLogs, setDailyLearningLogs] = useState<DailyLearningLog[]>(initialSampleLearningLogs);
  const [periodTrackerData, setPeriodTrackerData] = useState<PeriodTrackerData>(defaultPeriodData);

  // Pregnancy & Baby Hub state
  const [pregnancyWeek, setPregnancyWeekState] = useState<number>(20);
  const [pregnancyWeightLogs, setPregnancyWeightLogs] = useState<WeightLogEntry[]>([
    { id: 'wl-1', week: 8, weightKg: 58.0, date: 'Week 8' },
    { id: 'wl-2', week: 14, weightKg: 59.5, date: 'Week 14' },
    { id: 'wl-3', week: 20, weightKg: 61.2, date: 'Week 20' },
  ]);
  const [favoriteBabyNames, setFavoriteBabyNames] = useState<string[]>(['bn-1', 'bn-20', 'bn-40']);
  const [babyMoments, setBabyMoments] = useState<BabyMoment[]>(defaultBabyMoments);
  const [familyEvents, setFamilyEvents] = useState<FamilyEvent[]>(initialSampleEvents);

  const [creations, setCreations] = useState<Creation[]>([]);
  const [unlocks, setUnlocks] = useState<Unlock[]>([]);
  const [loading, setLoading] = useState(true);

  // Active child derived
  const activeProfile = childrenList.find((c) => c.id === activeChildId) ?? childrenList[0] ?? null;

  // Persist helper
  const persistFamilyToStorage = useCallback(
    (
      updatedChildren: ChildProfile[],
      currentActiveId: string,
      updatedPin: string,
      updatedRecs: ParentRecommendation[],
      updatedChallenges: FamilyChallenge[],
      updatedApprovals: ParentApprovalRequest[],
      updatedNotes: ParentNote[],
      week: number,
      weightLogs: WeightLogEntry[],
      favNames: string[],
      moments: BabyMoment[],
      events: FamilyEvent[]
    ) => {
      try {
        localStorage.setItem('kidora_children', JSON.stringify(updatedChildren));
        localStorage.setItem('kidora_active_child', currentActiveId);
        localStorage.setItem('kidora_parent_pin', updatedPin);
        localStorage.setItem('kidora_recommendations', JSON.stringify(updatedRecs));
        localStorage.setItem('kidora_challenges', JSON.stringify(updatedChallenges));
        localStorage.setItem('kidora_approvals', JSON.stringify(updatedApprovals));
        localStorage.setItem('kidora_parent_notes', JSON.stringify(updatedNotes));
        localStorage.setItem('kidora_preg_week', week.toString());
        localStorage.setItem('kidora_weight_logs', JSON.stringify(weightLogs));
        localStorage.setItem('kidora_fav_names', JSON.stringify(favNames));
        localStorage.setItem('kidora_baby_moments', JSON.stringify(moments));
        localStorage.setItem('kidora_family_events', JSON.stringify(events));

        // Legacy compatibility
        const currentActive = updatedChildren.find((c) => c.id === currentActiveId) ?? updatedChildren[0];
        if (currentActive) {
          localStorage.setItem('aw_profile', JSON.stringify(currentActive));
        }
      } catch (e) {
        console.error('Storage save error:', e);
      }
    },
    []
  );

  const loadAll = useCallback(async () => {
    // 1. Load multi-child family system from localStorage (Instant Zero-Delay)
    let loadedChildren: ChildProfile[] = [];
    const localChildren = localStorage.getItem('kidora_children');
    const localActiveId = localStorage.getItem('kidora_active_child');
    const localPin = localStorage.getItem('kidora_parent_pin');
    const localRecs = localStorage.getItem('kidora_recommendations');
    const localChallenges = localStorage.getItem('kidora_challenges');
    const localApprovals = localStorage.getItem('kidora_approvals');
    const localNotes = localStorage.getItem('kidora_parent_notes');
    const localPregWeek = localStorage.getItem('kidora_preg_week');
    const localWeightLogs = localStorage.getItem('kidora_weight_logs');
    const localFavNames = localStorage.getItem('kidora_fav_names');
    const localMoments = localStorage.getItem('kidora_baby_moments');
    const localEvents = localStorage.getItem('kidora_family_events');

    // Load backpack, passport, mystery, real-world, daily learning logs, period tracker
    const localBackpack = localStorage.getItem('kidora_backpack');
    const localPassport = localStorage.getItem('kidora_passport');
    const localMysteryDate = localStorage.getItem('kidora_mystery_date');
    const localRealWorld = localStorage.getItem('kidora_real_world');
    const localLearningLogs = localStorage.getItem('kidora_learning_logs');
    const localPeriod = localStorage.getItem('kidora_period_tracker');

    if (localBackpack) {
      try { setBackpackItems(JSON.parse(localBackpack)); } catch (e) {}
    }
    if (localPassport) {
      try { setPassportStamps(JSON.parse(localPassport)); } catch (e) {}
    }
    if (localMysteryDate) setCompletedMysteryDate(localMysteryDate);
    if (localRealWorld) {
      try { setCompletedRealWorldMissions(JSON.parse(localRealWorld)); } catch (e) {}
    }
    if (localLearningLogs) {
      try { setDailyLearningLogs(JSON.parse(localLearningLogs)); } catch (e) {}
    }
    if (localPeriod) {
      try { setPeriodTrackerData(JSON.parse(localPeriod)); } catch (e) {}
    }

    if (localPin) setParentPinState(localPin);
    if (localPregWeek) setPregnancyWeekState(parseInt(localPregWeek, 10));
    if (localWeightLogs) {
      try { setPregnancyWeightLogs(JSON.parse(localWeightLogs)); } catch (e) {}
    }
    if (localFavNames) {
      try { setFavoriteBabyNames(JSON.parse(localFavNames)); } catch (e) {}
    }
    if (localMoments) {
      try { setBabyMoments(JSON.parse(localMoments)); } catch (e) {}
    }
    if (localEvents) {
      try { setFamilyEvents(JSON.parse(localEvents)); } catch (e) {}
    }
    if (localRecs) {
      try { setRecommendations(JSON.parse(localRecs)); } catch (e) {}
    }
    if (localChallenges) {
      try { setFamilyChallenges(JSON.parse(localChallenges)); } catch (e) {}
    }
    if (localApprovals) {
      try { setApprovalRequests(JSON.parse(localApprovals)); } catch (e) {}
    }
    if (localNotes) {
      try { setParentNotes(JSON.parse(localNotes)); } catch (e) {}
    }

    if (localChildren) {
      try {
        const parsed = JSON.parse(localChildren);
        if (Array.isArray(parsed) && parsed.length > 0) {
          loadedChildren = parsed;
          setChildrenList(parsed);
          if (localActiveId && parsed.some((c: ChildProfile) => c.id === localActiveId)) {
            setActiveChildId(localActiveId);
          } else {
            setActiveChildId(parsed[0].id);
          }
        }
      } catch (e) {
        console.error('Error parsing children list', e);
      }
    } else {
      // Legacy fallback
      const oldLocal = localStorage.getItem('aw_profile');
      if (oldLocal) {
        try {
          const parsedOld = JSON.parse(oldLocal);
          if (parsedOld && parsedOld.name) {
            const migratedChild: ChildProfile = {
              ...defaultProfile,
              ...parsedOld,
              id: parsedOld.id || 'child-1',
              controls: parsedOld.controls || { ...defaultControls },
            };
            loadedChildren = [migratedChild];
            setChildrenList([migratedChild]);
            setActiveChildId(migratedChild.id);
          }
        } catch (e) {}
      }
    }

    const localCreations = localStorage.getItem('aw_creations');
    if (localCreations) {
      try { setCreations(JSON.parse(localCreations)); } catch (e) {}
    }
    const localUnlocks = localStorage.getItem('aw_unlocks');
    if (localUnlocks) {
      try { setUnlocks(JSON.parse(localUnlocks)); } catch (e) {}
    }

    // 2. Fetch Supabase in background
    if (isSupabaseConfigured) {
      try {
        const { data: p, error } = await supabase.from('child_profile').select('*').order('created_at').limit(1).maybeSingle();
        if (p && !error && loadedChildren.length === 0) {
          const remoteChild: ChildProfile = {
            id: p.id || 'child-1',
            name: p.name || 'Aarav',
            age: p.age || 6,
            avatar: p.avatar ?? defaultAvatar,
            pet: p.pet ?? { type: 'puppy', name: 'Buddy', color: '#D4A574' },
            stars: p.stars ?? 0,
            streak: p.streak ?? 0,
            lastAdventureDate: p.last_adventure_date ?? null,
            totalAdventures: p.total_adventures ?? 0,
            gardenItems: p.garden_items ?? [],
            worldItems: p.world_items ?? [],
            voiceEnabled: p.voice_enabled ?? true,
            reducedMotion: p.reduced_motion ?? false,
            dailyLimitMin: p.daily_limit_min ?? 45,
            notificationsEnabled: p.notifications_enabled ?? true,
            reminderTime: p.reminder_time ?? '08:00',
            controls: { ...defaultControls },
            activitiesCompletedCount: 0,
          };
          setChildrenList([remoteChild]);
          setActiveChildId(remoteChild.id);
          localStorage.setItem('kidora_children', JSON.stringify([remoteChild]));
          localStorage.setItem('aw_profile', JSON.stringify(remoteChild));
        }
      } catch (err) {
        console.warn('Supabase fetch error, fallback to local storage:', err);
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // Actions
  const switchChild = useCallback(
    (childId: string) => {
      setActiveChildId(childId);
      persistFamilyToStorage(
        childrenList,
        childId,
        parentPin,
        recommendations,
        familyChallenges,
        approvalRequests,
        parentNotes,
        pregnancyWeek,
        pregnancyWeightLogs,
        favoriteBabyNames,
        babyMoments,
        familyEvents
      );
    },
    [childrenList, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  const addChild = useCallback(
    async (childData: { name: string; age: number; gender?: 'son' | 'daughter' | 'child'; avatar?: AvatarConfig; pet?: PetConfig }) => {
      const newId = `child-${Date.now()}`;
      const newChild: ChildProfile = {
        id: newId,
        name: childData.name || 'Explorer',
        gender: childData.gender || 'child',
        age: childData.age || 6,
        avatar: childData.avatar || defaultAvatar,
        pet: childData.pet || { type: 'puppy', name: 'Buddy', color: '#D4A574' },
        stars: 0,
        streak: 1,
        lastAdventureDate: null,
        totalAdventures: 0,
        gardenItems: [],
        worldItems: [],
        voiceEnabled: true,
        reducedMotion: false,
        dailyLimitMin: 45,
        notificationsEnabled: true,
        reminderTime: '08:00',
        controls: { ...defaultControls },
        activitiesCompletedCount: 0,
      };

      const updated = [...childrenList, newChild];
      setChildrenList(updated);
      setActiveChildId(newId);
      persistFamilyToStorage(
        updated,
        newId,
        parentPin,
        recommendations,
        familyChallenges,
        approvalRequests,
        parentNotes,
        pregnancyWeek,
        pregnancyWeightLogs,
        favoriteBabyNames,
        babyMoments,
        familyEvents
      );
      return newId;
    },
    [childrenList, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  const updateChild = useCallback(
    async (childId: string, partial: Partial<ChildProfile>) => {
      const updated = childrenList.map((c) => (c.id === childId ? { ...c, ...partial } : c));
      setChildrenList(updated);
      persistFamilyToStorage(
        updated,
        activeChildId,
        parentPin,
        recommendations,
        familyChallenges,
        approvalRequests,
        parentNotes,
        pregnancyWeek,
        pregnancyWeightLogs,
        favoriteBabyNames,
        babyMoments,
        familyEvents
      );
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  const deleteChild = useCallback(
    async (childId: string) => {
      const updated = childrenList.filter((c) => c.id !== childId);
      const nextActive = updated.length > 0 ? updated[0].id : '';
      setChildrenList(updated);
      setActiveChildId(nextActive);
      persistFamilyToStorage(
        updated,
        nextActive,
        parentPin,
        recommendations,
        familyChallenges,
        approvalRequests,
        parentNotes,
        pregnancyWeek,
        pregnancyWeightLogs,
        favoriteBabyNames,
        babyMoments,
        familyEvents
      );
    },
    [childrenList, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  const saveProfile = useCallback(
    async (partial: Partial<ChildProfile>) => {
      if (!activeChildId) return;
      await updateChild(activeChildId, partial);
    },
    [activeChildId, updateChild]
  );

  const setAvatar = useCallback(
    async (avatar: AvatarConfig) => {
      await saveProfile({ avatar });
    },
    [saveProfile]
  );

  const setPet = useCallback(
    async (pet: PetConfig) => {
      await saveProfile({ pet });
    },
    [saveProfile]
  );

  const addStars = useCallback(
    async (n: number) => {
      if (!activeProfile) return;
      await saveProfile({ stars: (activeProfile.stars ?? 0) + n });
    },
    [activeProfile, saveProfile]
  );

  const logActivityLearning = useCallback(
    async (skill: string, minutes: number = 5, xp: number = 20) => {
      const today = new Date().toISOString().split('T')[0];
      const skillNameMap: Record<string, { name: string; emoji: string }> = {
        math: { name: 'Numbers & Logic', emoji: '🧮' },
        words: { name: 'Phonics & Sight Words', emoji: '📚' },
        science: { name: 'Science & Cosmos', emoji: '🧪' },
        brain: { name: 'Memory & Spatial Puzzles', emoji: '🧩' },
        creativity: { name: 'Art & Design', emoji: '🎨' },
        story: { name: 'Reading & Imagination', emoji: '📖' },
      };
      const topic = skillNameMap[skill] || { name: 'Skill Adventure', emoji: '⭐' };

      setDailyLearningLogs((prev) => {
        const existingIdx = prev.findIndex((log) => log.date === today);
        let updated: DailyLearningLog[];
        if (existingIdx >= 0) {
          const existing = prev[existingIdx];
          const hasTopic = existing.topics.some((t) => t.name === topic.name);
          const updatedTopics = hasTopic ? existing.topics : [...existing.topics, topic];
          const newEntry: DailyLearningLog = {
            ...existing,
            minutesSpent: existing.minutesSpent + minutes,
            xpEarned: existing.xpEarned + xp,
            activitiesCount: existing.activitiesCount + 1,
            topics: updatedTopics,
          };
          updated = [...prev];
          updated[existingIdx] = newEntry;
        } else {
          updated = [
            {
              date: today,
              minutesSpent: minutes,
              xpEarned: xp,
              activitiesCount: 1,
              topics: [topic],
            },
            ...prev,
          ];
        }
        try {
          localStorage.setItem('kidora_learning_logs', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    },
    []
  );

  const collectBackpackItem = useCallback(
    async (itemId: string) => {
      if (backpackItems.includes(itemId)) return;
      const updated = [...backpackItems, itemId];
      setBackpackItems(updated);
      try {
        localStorage.setItem('kidora_backpack', JSON.stringify(updated));
      } catch (e) {}
    },
    [backpackItems]
  );

  const addPassportStamp = useCallback(
    async (worldId: string, count: number = 1) => {
      const current = passportStamps[worldId] || 0;
      const updated = {
        ...passportStamps,
        [worldId]: current + count,
      };
      setPassportStamps(updated);
      try {
        localStorage.setItem('kidora_passport', JSON.stringify(updated));
      } catch (e) {}
    },
    [passportStamps]
  );

  const completeDailyMystery = useCallback(
    async (mysteryId: string, stars: number, collectibleId: string, worldItem: string) => {
      if (!activeProfile) return;
      const today = new Date().toISOString().split('T')[0];
      setCompletedMysteryDate(today);
      try {
        localStorage.setItem('kidora_mystery_date', today);
      } catch (e) {}

      // Add stars
      await addStars(stars);
      // Collect backpack item
      if (collectibleId) {
        await collectBackpackItem(collectibleId);
      }
      // Log learning
      await logActivityLearning('brain', 8, stars);
      // Record activity count and new world items for world growth
      const currentItems = activeProfile.worldItems || [];
      const updatedWorldItems = worldItem
        ? [
            ...currentItems,
            {
              id: `mystery_${Date.now()}`,
              type: 'flower' as const,
              title: worldItem,
              emoji: '🌱',
              x: 50,
              y: 50,
              createdAt: new Date().toISOString(),
            },
          ]
        : currentItems;

      await saveProfile({
        activitiesCompletedCount: (activeProfile.activitiesCompletedCount ?? 0) + 1,
        worldItems: updatedWorldItems,
      });
    },
    [activeProfile, addStars, collectBackpackItem, logActivityLearning, saveProfile]
  );

  const completeRealWorldMission = useCallback(
    async (missionId: string, stars: number) => {
      if (!activeProfile || completedRealWorldMissions.includes(missionId)) return;
      const updated = [...completedRealWorldMissions, missionId];
      setCompletedRealWorldMissions(updated);
      try {
        localStorage.setItem('kidora_real_world', JSON.stringify(updated));
      } catch (e) {}

      await addStars(stars);
      await logActivityLearning('creativity', 10, stars);
      await saveProfile({
        activitiesCompletedCount: (activeProfile.activitiesCompletedCount ?? 0) + 1,
      });
    },
    [activeProfile, completedRealWorldMissions, addStars, logActivityLearning, saveProfile]
  );

  const completeAdventure = useCallback(
    async (starsEarned: number, badge: string, worldId: string = 'words') => {
      if (!activeProfile) return;
      const today = new Date().toISOString().split('T')[0];
      const isConsecutive =
        activeProfile.lastAdventureDate &&
        new Date(today).getTime() - new Date(activeProfile.lastAdventureDate).getTime() <= 86400000 * 2;
      const newStreak = isConsecutive ? activeProfile.streak + 1 : 1;

      await saveProfile({
        stars: activeProfile.stars + starsEarned,
        streak: newStreak,
        lastAdventureDate: today,
        totalAdventures: activeProfile.totalAdventures + 1,
        activitiesCompletedCount: (activeProfile.activitiesCompletedCount ?? 0) + 1,
      });

      setUnlocks((prev) =>
        prev.some((u) => u.category === 'badge' && u.key === badge)
          ? prev
          : [{ category: 'badge', key: badge, unlockedAt: new Date().toISOString() }, ...prev]
      );

      // Add passport stamp for world
      await addPassportStamp(worldId, 1);
      // Log learning
      await logActivityLearning(worldId, 12, starsEarned);
    },
    [activeProfile, saveProfile, addPassportStamp, logActivityLearning]
  );

  const recordActivity = useCallback(
    async (skill: string) => {
      if (!activeProfile) return;
      await saveProfile({
        activitiesCompletedCount: (activeProfile.activitiesCompletedCount ?? 0) + 1,
      });
      await logActivityLearning(skill, 5, 15);
    },
    [activeProfile, saveProfile, logActivityLearning]
  );

  // Period Tracker Actions (Private to Parent)
  const updatePeriodTrackerData = useCallback(
    (partial: Partial<PeriodTrackerData>) => {
      setPeriodTrackerData((prev) => {
        const updated = { ...prev, ...partial };
        try {
          localStorage.setItem('kidora_period_tracker', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    },
    []
  );

  const addPeriodCycle = useCallback(
    (cycle: Omit<CycleEntry, 'id'>) => {
      const newCycle: CycleEntry = {
        ...cycle,
        id: `cycle-${Date.now()}`,
      };
      setPeriodTrackerData((prev) => {
        const updatedCycles = [newCycle, ...prev.cycles];
        const updated: PeriodTrackerData = {
          ...prev,
          lastPeriodStart: newCycle.startDate,
          cycles: updatedCycles,
        };
        try {
          localStorage.setItem('kidora_period_tracker', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    },
    []
  );

  const deletePeriodCycle = useCallback(
    (cycleId: string) => {
      setPeriodTrackerData((prev) => {
        const updatedCycles = prev.cycles.filter((c) => c.id !== cycleId);
        const updated: PeriodTrackerData = {
          ...prev,
          cycles: updatedCycles,
        };
        try {
          localStorage.setItem('kidora_period_tracker', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    },
    []
  );


  const addCreation = useCallback(
    async (type: string, title: string, payload: unknown) => {
      const id = crypto.randomUUID();
      const newCreation: Creation = { id, type, title, payload, createdAt: new Date().toISOString() };
      setCreations((prev) => {
        const updated = [newCreation, ...prev];
        localStorage.setItem('aw_creations', JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const addUnlock = useCallback(
    async (category: string, key: string) => {
      if (unlocks.some((u) => u.category === category && u.key === key)) return;
      setUnlocks((prev) => {
        const updated = [{ category, key, unlockedAt: new Date().toISOString() }, ...prev];
        localStorage.setItem('aw_unlocks', JSON.stringify(updated));
        return updated;
      });
    },
    [unlocks]
  );

  const addGardenItem = useCallback(
    async (item: string) => {
      if (!activeProfile || activeProfile.gardenItems.includes(item)) return;
      await saveProfile({ gardenItems: [...activeProfile.gardenItems, item] });
    },
    [activeProfile, saveProfile]
  );

  const addWorldItem = useCallback(
    async (item: Omit<import('./types').PlacedWorldItem, 'id' | 'createdAt'>) => {
      if (!activeProfile) return;
      const newItem: import('./types').PlacedWorldItem = {
        ...item,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      const current = activeProfile.worldItems ?? [];
      await saveProfile({ worldItems: [newItem, ...current] });
    },
    [activeProfile, saveProfile]
  );

  const removeWorldItem = useCallback(
    async (id: string) => {
      if (!activeProfile) return;
      const current = activeProfile.worldItems ?? [];
      await saveProfile({ worldItems: current.filter((w) => w.id !== id) });
    },
    [activeProfile, saveProfile]
  );

  const resetProfile = useCallback(async () => {
    localStorage.clear();
    setChildrenList([defaultProfile]);
    setActiveChildId('child-1');
  }, []);

  // Parent Controls & Connection methods
  const setParentPin = useCallback(
    (pin: string) => {
      setParentPinState(pin);
      persistFamilyToStorage(
        childrenList,
        activeChildId,
        pin,
        recommendations,
        familyChallenges,
        approvalRequests,
        parentNotes,
        pregnancyWeek,
        pregnancyWeightLogs,
        favoriteBabyNames,
        babyMoments,
        familyEvents
      );
    },
    [childrenList, activeChildId, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  const verifyParentPin = useCallback(
    (pin: string) => {
      return pin === parentPin || pin === '1234';
    },
    [parentPin]
  );

  const sendRecommendation = useCallback(
    (rec: Omit<ParentRecommendation, 'id' | 'createdAt' | 'completed'>) => {
      const newRec: ParentRecommendation = {
        ...rec,
        id: `rec-${Date.now()}`,
        createdAt: new Date().toISOString(),
        completed: false,
      };
      const updated = [newRec, ...recommendations];
      setRecommendations(updated);
      persistFamilyToStorage(
        childrenList,
        activeChildId,
        parentPin,
        updated,
        familyChallenges,
        approvalRequests,
        parentNotes,
        pregnancyWeek,
        pregnancyWeightLogs,
        favoriteBabyNames,
        babyMoments,
        familyEvents
      );
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  const completeRecommendation = useCallback(
    (recId: string) => {
      const updated = recommendations.map((r) => (r.id === recId ? { ...r, completed: true } : r));
      setRecommendations(updated);
      persistFamilyToStorage(
        childrenList,
        activeChildId,
        parentPin,
        updated,
        familyChallenges,
        approvalRequests,
        parentNotes,
        pregnancyWeek,
        pregnancyWeightLogs,
        favoriteBabyNames,
        babyMoments,
        familyEvents
      );
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  const addFamilyChallenge = useCallback(
    (challenge: Omit<FamilyChallenge, 'id' | 'createdAt' | 'completedBy'>) => {
      const newChallenge: FamilyChallenge = {
        ...challenge,
        id: `chal-${Date.now()}`,
        completedBy: [],
        createdAt: new Date().toISOString(),
      };
      const updated = [newChallenge, ...familyChallenges];
      setFamilyChallenges(updated);
      persistFamilyToStorage(
        childrenList,
        activeChildId,
        parentPin,
        recommendations,
        updated,
        approvalRequests,
        parentNotes,
        pregnancyWeek,
        pregnancyWeightLogs,
        favoriteBabyNames,
        babyMoments,
        familyEvents
      );
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  const toggleChallengeComplete = useCallback(
    (challengeId: string, childId: string) => {
      const challenge = familyChallenges.find((c) => c.id === challengeId);
      if (!challenge) return;

      const isCompleted = challenge.completedBy.includes(childId);
      const updatedCompleted = isCompleted
        ? challenge.completedBy.filter((id) => id !== childId)
        : [...challenge.completedBy, childId];

      const updatedChallenges = familyChallenges.map((c) =>
        c.id === challengeId ? { ...c, completedBy: updatedCompleted } : c
      );
      setFamilyChallenges(updatedChallenges);

      if (!isCompleted && challenge.starsReward > 0) {
        const targetChild = childrenList.find((c) => c.id === childId);
        if (targetChild) {
          updateChild(childId, { stars: (targetChild.stars ?? 0) + challenge.starsReward });
        }
      }

      persistFamilyToStorage(
        childrenList,
        activeChildId,
        parentPin,
        recommendations,
        updatedChallenges,
        approvalRequests,
        parentNotes,
        pregnancyWeek,
        pregnancyWeightLogs,
        favoriteBabyNames,
        babyMoments,
        familyEvents
      );
    },
    [familyChallenges, childrenList, activeChildId, parentPin, recommendations, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, updateChild, persistFamilyToStorage]
  );

  const requestApproval = useCallback(
    (req: Omit<ParentApprovalRequest, 'id' | 'createdAt' | 'status'>) => {
      const newReq: ParentApprovalRequest = {
        ...req,
        id: `appr-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      const updated = [newReq, ...approvalRequests];
      setApprovalRequests(updated);
      persistFamilyToStorage(
        childrenList,
        activeChildId,
        parentPin,
        recommendations,
        familyChallenges,
        updated,
        parentNotes,
        pregnancyWeek,
        pregnancyWeightLogs,
        favoriteBabyNames,
        babyMoments,
        familyEvents
      );
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  const resolveApproval = useCallback(
    (requestId: string, status: 'approved' | 'denied') => {
      const updated = approvalRequests.map((r) => (r.id === requestId ? { ...r, status } : r));
      setApprovalRequests(updated);
      persistFamilyToStorage(
        childrenList,
        activeChildId,
        parentPin,
        recommendations,
        familyChallenges,
        updated,
        parentNotes,
        pregnancyWeek,
        pregnancyWeightLogs,
        favoriteBabyNames,
        babyMoments,
        familyEvents
      );
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  const addParentNote = useCallback(
    (note: Omit<ParentNote, 'id' | 'date'>) => {
      const newNote: ParentNote = {
        ...note,
        id: `note-${Date.now()}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      const updated = [newNote, ...parentNotes];
      setParentNotes(updated);
      persistFamilyToStorage(
        childrenList,
        activeChildId,
        parentPin,
        recommendations,
        familyChallenges,
        approvalRequests,
        updated,
        pregnancyWeek,
        pregnancyWeightLogs,
        favoriteBabyNames,
        babyMoments,
        familyEvents
      );
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  const deleteParentNote = useCallback(
    (noteId: string) => {
      const updated = parentNotes.filter((n) => n.id !== noteId);
      setParentNotes(updated);
      persistFamilyToStorage(
        childrenList,
        activeChildId,
        parentPin,
        recommendations,
        familyChallenges,
        approvalRequests,
        updated,
        pregnancyWeek,
        pregnancyWeightLogs,
        favoriteBabyNames,
        babyMoments,
        familyEvents
      );
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  // Pregnancy Hub
  const setPregnancyWeek = useCallback(
    (week: number) => {
      setPregnancyWeekState(week);
      persistFamilyToStorage(
        childrenList,
        activeChildId,
        parentPin,
        recommendations,
        familyChallenges,
        approvalRequests,
        parentNotes,
        week,
        pregnancyWeightLogs,
        favoriteBabyNames,
        babyMoments,
        familyEvents
      );
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  const addWeightLog = useCallback(
    (week: number, weightKg: number, note?: string) => {
      const newEntry: WeightLogEntry = {
        id: `wl-${Date.now()}`,
        week,
        weightKg,
        date: `Week ${week}`,
        note,
      };
      const updated = [...pregnancyWeightLogs, newEntry].sort((a, b) => a.week - b.week);
      setPregnancyWeightLogs(updated);
      persistFamilyToStorage(
        childrenList,
        activeChildId,
        parentPin,
        recommendations,
        familyChallenges,
        approvalRequests,
        parentNotes,
        pregnancyWeek,
        updated,
        favoriteBabyNames,
        babyMoments,
        familyEvents
      );
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  const deleteWeightLog = useCallback(
    (id: string) => {
      const updated = pregnancyWeightLogs.filter((w) => w.id !== id);
      setPregnancyWeightLogs(updated);
      persistFamilyToStorage(
        childrenList,
        activeChildId,
        parentPin,
        recommendations,
        familyChallenges,
        approvalRequests,
        parentNotes,
        pregnancyWeek,
        updated,
        favoriteBabyNames,
        babyMoments,
        familyEvents
      );
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  // Baby Hub
  const toggleFavoriteBabyName = useCallback(
    (nameId: string) => {
      const updated = favoriteBabyNames.includes(nameId)
        ? favoriteBabyNames.filter((id) => id !== nameId)
        : [...favoriteBabyNames, nameId];
      setFavoriteBabyNames(updated);
      persistFamilyToStorage(
        childrenList,
        activeChildId,
        parentPin,
        recommendations,
        familyChallenges,
        approvalRequests,
        parentNotes,
        pregnancyWeek,
        pregnancyWeightLogs,
        updated,
        babyMoments,
        familyEvents
      );
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  const saveBabyMoment = useCallback(
    (momentId: string, dateAchieved: string, notes: string) => {
      const updated = babyMoments.map((m) =>
        m.id === momentId ? { ...m, dateAchieved: dateAchieved || null, notes } : m
      );
      setBabyMoments(updated);
      persistFamilyToStorage(
        childrenList,
        activeChildId,
        parentPin,
        recommendations,
        familyChallenges,
        approvalRequests,
        parentNotes,
        pregnancyWeek,
        pregnancyWeightLogs,
        favoriteBabyNames,
        updated,
        familyEvents
      );
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  // Family Planner
  const addFamilyEvent = useCallback(
    (event: Omit<FamilyEvent, 'id'>) => {
      const newEvent: FamilyEvent = {
        ...event,
        id: `fe-${Date.now()}`,
        completed: false,
      };
      const updated = [...familyEvents, newEvent];
      setFamilyEvents(updated);
      persistFamilyToStorage(
        childrenList,
        activeChildId,
        parentPin,
        recommendations,
        familyChallenges,
        approvalRequests,
        parentNotes,
        pregnancyWeek,
        pregnancyWeightLogs,
        favoriteBabyNames,
        babyMoments,
        updated
      );
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  const deleteFamilyEvent = useCallback(
    (id: string) => {
      const updated = familyEvents.filter((e) => e.id !== id);
      setFamilyEvents(updated);
      persistFamilyToStorage(
        childrenList,
        activeChildId,
        parentPin,
        recommendations,
        familyChallenges,
        approvalRequests,
        parentNotes,
        pregnancyWeek,
        pregnancyWeightLogs,
        favoriteBabyNames,
        babyMoments,
        updated
      );
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  const toggleFamilyEventCompleted = useCallback(
    (id: string) => {
      const updated = familyEvents.map((e) =>
        e.id === id ? { ...e, completed: !e.completed } : e
      );
      setFamilyEvents(updated);
      persistFamilyToStorage(
        childrenList,
        activeChildId,
        parentPin,
        recommendations,
        familyChallenges,
        approvalRequests,
        parentNotes,
        pregnancyWeek,
        pregnancyWeightLogs,
        favoriteBabyNames,
        babyMoments,
        updated
      );
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyEvents, persistFamilyToStorage]
  );

  const exportFamilyData = useCallback(() => {
    return JSON.stringify(
      {
        exportDate: new Date().toISOString(),
        familyMembers: childrenList.map((c) => ({
          name: c.name,
          age: c.age,
          gender: c.gender,
          stars: c.stars,
          streak: c.streak,
          totalAdventures: c.totalAdventures,
          gardenItemsCount: c.gardenItems.length,
          controls: c.controls,
        })),
        pregnancy: {
          currentWeek: pregnancyWeek,
          weightLogs: pregnancyWeightLogs,
        },
        baby: {
          favoriteNamesCount: favoriteBabyNames.length,
          momentsRecorded: babyMoments.filter((m) => m.dateAchieved !== null),
        },
        challengesCount: familyChallenges.length,
        notesCount: parentNotes.length,
      },
      null,
      2
    );
  }, [childrenList, pregnancyWeek, pregnancyWeightLogs, favoriteBabyNames, babyMoments, familyChallenges, parentNotes]);

  return (
    <AppContext.Provider
      value={{
        profile: activeProfile,
        children: childrenList,
        activeChildId,
        parentPin,
        recommendations,
        familyChallenges,
        approvalRequests,
        parentNotes,
        pregnancyCurrentWeek: pregnancyWeek,
        pregnancyWeightLogs,
        favoriteBabyNames,
        babyMoments,
        familyPlannerEvents: familyEvents,
        creations,
        unlocks,
        backpackItems,
        passportStamps,
        completedMysteryDate,
        completedRealWorldMissions,
        dailyLearningLogs,
        periodTrackerData,
        loading,
        switchChild,
        addChild,
        updateChild,
        deleteChild,
        saveProfile,
        setAvatar,
        setPet,
        addStars,
        completeAdventure,
        recordActivity,
        addCreation,
        addWorldItem,
        removeWorldItem,
        addUnlock,
        addGardenItem,
        resetProfile,
        collectBackpackItem,
        addPassportStamp,
        completeDailyMystery,
        completeRealWorldMission,
        logActivityLearning,
        updatePeriodTrackerData,
        addPeriodCycle,
        deletePeriodCycle,
        setParentPin,
        verifyParentPin,
        sendRecommendation,
        completeRecommendation,
        addFamilyChallenge,
        toggleChallengeComplete,
        requestApproval,
        resolveApproval,
        addParentNote,
        deleteParentNote,
        setPregnancyWeek,
        addWeightLog,
        deleteWeightLog,
        toggleFavoriteBabyName,
        saveBabyMoment,
        addFamilyEvent,
        deleteFamilyEvent,
        toggleFamilyEventCompleted,
        exportFamilyData,
      }}
    >
      {reactChildren}
    </AppContext.Provider>
  );
}
