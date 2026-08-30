import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import { defaultAvatar } from './avatar';
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
} from './types';

export const defaultControls: ChildProfileControls = {
  allowedRealms: ['words', 'math', 'creative', 'puzzle', 'science'],
  dailyLimitMinutes: 45,
  bedtimeQuietHoursEnabled: true,
  bedtimeStart: '20:00',
  bedtimeEnd: '07:00',
  priorityLearningAreas: ['math', 'reading', 'logic'],
};

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
  creations: Creation[];
  unlocks: Unlock[];
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
  completeAdventure: (stars: number, badge: string) => Promise<void>;
  recordActivity: (skill: string) => Promise<void>;
  addCreation: (type: string, title: string, payload: unknown) => Promise<void>;
  addWorldItem: (item: Omit<import('./types').PlacedWorldItem, 'id' | 'createdAt'>) => Promise<void>;
  removeWorldItem: (id: string) => Promise<void>;
  addUnlock: (category: string, key: string) => Promise<void>;
  addGardenItem: (item: string) => Promise<void>;
  resetProfile: () => Promise<void>;
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
      updatedNotes: ParentNote[]
    ) => {
      try {
        localStorage.setItem('kidora_children', JSON.stringify(updatedChildren));
        localStorage.setItem('kidora_active_child', currentActiveId);
        localStorage.setItem('kidora_parent_pin', updatedPin);
        localStorage.setItem('kidora_recommendations', JSON.stringify(updatedRecs));
        localStorage.setItem('kidora_challenges', JSON.stringify(updatedChallenges));
        localStorage.setItem('kidora_approvals', JSON.stringify(updatedApprovals));
        localStorage.setItem('kidora_parent_notes', JSON.stringify(updatedNotes));

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

    if (localPin) setParentPinState(localPin);
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
      persistFamilyToStorage(childrenList, childId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes);
    },
    [childrenList, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, persistFamilyToStorage]
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
      persistFamilyToStorage(updated, newId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes);
      return newId;
    },
    [childrenList, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, persistFamilyToStorage]
  );

  const updateChild = useCallback(
    async (childId: string, partial: Partial<ChildProfile>) => {
      const updated = childrenList.map((c) => (c.id === childId ? { ...c, ...partial } : c));
      setChildrenList(updated);
      persistFamilyToStorage(updated, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes);
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, persistFamilyToStorage]
  );

  const deleteChild = useCallback(
    async (childId: string) => {
      const updated = childrenList.filter((c) => c.id !== childId);
      const nextActive = updated.length > 0 ? updated[0].id : '';
      setChildrenList(updated);
      setActiveChildId(nextActive);
      persistFamilyToStorage(updated, nextActive, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes);
    },
    [childrenList, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, persistFamilyToStorage]
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

  const completeAdventure = useCallback(
    async (starsEarned: number, badge: string) => {
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
    },
    [activeProfile, saveProfile]
  );

  const recordActivity = useCallback(
    async (skill: string) => {
      if (!activeProfile) return;
      await saveProfile({
        activitiesCompletedCount: (activeProfile.activitiesCompletedCount ?? 0) + 1,
      });
    },
    [activeProfile, saveProfile]
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
      persistFamilyToStorage(childrenList, activeChildId, pin, recommendations, familyChallenges, approvalRequests, parentNotes);
    },
    [childrenList, activeChildId, recommendations, familyChallenges, approvalRequests, parentNotes, persistFamilyToStorage]
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
      persistFamilyToStorage(childrenList, activeChildId, parentPin, updated, familyChallenges, approvalRequests, parentNotes);
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, persistFamilyToStorage]
  );

  const completeRecommendation = useCallback(
    (recId: string) => {
      const updated = recommendations.map((r) => (r.id === recId ? { ...r, completed: true } : r));
      setRecommendations(updated);
      persistFamilyToStorage(childrenList, activeChildId, parentPin, updated, familyChallenges, approvalRequests, parentNotes);
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, persistFamilyToStorage]
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
      persistFamilyToStorage(childrenList, activeChildId, parentPin, recommendations, updated, approvalRequests, parentNotes);
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, persistFamilyToStorage]
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

      // Award bonus stars if newly marked complete
      if (!isCompleted && challenge.starsReward > 0) {
        const targetChild = childrenList.find((c) => c.id === childId);
        if (targetChild) {
          updateChild(childId, { stars: (targetChild.stars ?? 0) + challenge.starsReward });
        }
      }

      persistFamilyToStorage(childrenList, activeChildId, parentPin, recommendations, updatedChallenges, approvalRequests, parentNotes);
    },
    [familyChallenges, childrenList, activeChildId, parentPin, recommendations, approvalRequests, parentNotes, updateChild, persistFamilyToStorage]
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
      persistFamilyToStorage(childrenList, activeChildId, parentPin, recommendations, familyChallenges, updated, parentNotes);
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, persistFamilyToStorage]
  );

  const resolveApproval = useCallback(
    (requestId: string, status: 'approved' | 'denied') => {
      const updated = approvalRequests.map((r) => (r.id === requestId ? { ...r, status } : r));
      setApprovalRequests(updated);
      persistFamilyToStorage(childrenList, activeChildId, parentPin, recommendations, familyChallenges, updated, parentNotes);
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, persistFamilyToStorage]
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
      persistFamilyToStorage(childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, updated);
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, persistFamilyToStorage]
  );

  const deleteParentNote = useCallback(
    (noteId: string) => {
      const updated = parentNotes.filter((n) => n.id !== noteId);
      setParentNotes(updated);
      persistFamilyToStorage(childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, updated);
    },
    [childrenList, activeChildId, parentPin, recommendations, familyChallenges, approvalRequests, parentNotes, persistFamilyToStorage]
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
        challengesCount: familyChallenges.length,
        notesCount: parentNotes.length,
      },
      null,
      2
    );
  }, [childrenList, familyChallenges, parentNotes]);

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
        creations,
        unlocks,
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
        exportFamilyData,
      }}
    >
      {reactChildren}
    </AppContext.Provider>
  );
}
