import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import { defaultAvatar } from './avatar';
import type { ChildProfile, AvatarConfig, PetConfig, Creation, Unlock } from './types';

interface AppState {
  profile: ChildProfile | null;
  creations: Creation[];
  unlocks: Unlock[];
  loading: boolean;
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
}

const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

const defaultProfile: ChildProfile = {
  id: '',
  name: 'Explorer',
  age: 6,
  avatar: defaultAvatar,
  pet: { type: 'puppy', name: 'Buddy', color: '#D4A574' },
  stars: 0,
  streak: 0,
  lastAdventureDate: null,
  totalAdventures: 0,
  gardenItems: [],
  voiceEnabled: true,
  reducedMotion: false,
  dailyLimitMin: 30,
  notificationsEnabled: true,
  reminderTime: '08:00',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ChildProfile | null>(null);
  const [creations, setCreations] = useState<Creation[]>([]);
  const [unlocks, setUnlocks] = useState<Unlock[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAll = useCallback(async () => {
    if (!isSupabaseConfigured) {
      const local = localStorage.getItem('aw_profile');
      if (local) {
        setProfile(JSON.parse(local));
      }
      setLoading(false);
      return;
    }

    const { data: p } = await supabase.from('child_profile').select('*').order('created_at').limit(1).maybeSingle();
    if (p) {
      setProfile({
        id: p.id, name: p.name, age: p.age,
        avatar: p.avatar ?? defaultAvatar,
        pet: p.pet ?? { type: 'puppy', name: 'Buddy', color: '#D4A574' },
        stars: p.stars ?? 0, streak: p.streak ?? 0,
        lastAdventureDate: p.last_adventure_date ?? null,
        totalAdventures: p.total_adventures ?? 0,
        gardenItems: p.garden_items ?? [],
        voiceEnabled: p.voice_enabled ?? true,
        reducedMotion: p.reduced_motion ?? false,
        dailyLimitMin: p.daily_limit_min ?? 30,
        notificationsEnabled: p.notifications_enabled ?? true,
        reminderTime: p.reminder_time ?? '08:00',
      });
    }
    const { data: cr } = await supabase.from('creations').select('*').order('created_at', { ascending: false }).limit(50);
    if (cr) setCreations(cr.map((c: { id: string; type: string; title: string; payload: unknown; created_at: string }) => ({ id: c.id, type: c.type, title: c.title, payload: c.payload, createdAt: c.created_at })));

    const { data: u } = await supabase.from('unlocks').select('*').order('unlocked_at', { ascending: false });
    if (u) setUnlocks(u.map((x: { category: string; key: string; unlocked_at: string }) => ({ category: x.category, key: x.key, unlockedAt: x.unlocked_at })));

    setLoading(false);
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  const persistProfile = useCallback(async (p: ChildProfile) => {
    if (!isSupabaseConfigured) {
      localStorage.setItem('aw_profile', JSON.stringify(p));
      return;
    }
    if (p.id) {
      await supabase.from('child_profile').update({
        name: p.name, age: p.age, avatar: p.avatar, pet: p.pet,
        stars: p.stars, streak: p.streak,
        last_adventure_date: p.lastAdventureDate,
        total_adventures: p.totalAdventures,
        garden_items: p.gardenItems,
        voice_enabled: p.voiceEnabled,
        reduced_motion: p.reducedMotion,
        daily_limit_min: p.dailyLimitMin,
        notifications_enabled: p.notificationsEnabled ?? true,
        reminder_time: p.reminderTime ?? '08:00',
        updated_at: new Date().toISOString(),
      }).eq('id', p.id);
    } else {
      const { data } = await supabase.from('child_profile').insert({
        name: p.name, age: p.age, avatar: p.avatar, pet: p.pet,
        stars: p.stars, streak: p.streak,
        last_adventure_date: p.lastAdventureDate,
        total_adventures: p.totalAdventures,
        garden_items: p.gardenItems,
        voice_enabled: p.voiceEnabled,
        reduced_motion: p.reducedMotion,
        daily_limit_min: p.dailyLimitMin,
        notifications_enabled: p.notificationsEnabled ?? true,
        reminder_time: p.reminderTime ?? '08:00',
      }).select('id').single();
      if (data) p.id = data.id;
    }
  }, []);

  const saveProfile = useCallback(async (partial: Partial<ChildProfile>) => {
    setProfile(prev => {
      const base = prev ?? { ...defaultProfile };
      const updated = { ...base, ...partial };
      persistProfile(updated);
      return updated;
    });
  }, [persistProfile]);

  const setAvatar = useCallback(async (avatar: AvatarConfig) => {
    await saveProfile({ avatar });
  }, [saveProfile]);

  const setPet = useCallback(async (pet: PetConfig) => {
    await saveProfile({ pet });
  }, [saveProfile]);

  const addStars = useCallback(async (n: number) => {
    setProfile(prev => {
      if (!prev) return prev;
      const updated = { ...prev, stars: prev.stars + n };
      persistProfile(updated);
      return updated;
    });
  }, [persistProfile]);

  const completeAdventure = useCallback(async (stars: number, badge: string) => {
    const today = new Date().toISOString().slice(0, 10);
    setProfile(prev => {
      if (!prev) return prev;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const newStreak = prev.lastAdventureDate === yesterday ? prev.streak + 1 : 1;
      const updated = {
        ...prev,
        stars: prev.stars + stars,
        streak: newStreak,
        lastAdventureDate: today,
        totalAdventures: prev.totalAdventures + 1,
      };
      persistProfile(updated);
      return updated;
    });
    if (isSupabaseConfigured) {
      await supabase.from('adventure_log').insert({
        adventure_date: today,
        theme: badge,
        missions_completed: 6,
        stars_earned: stars,
        badge,
      });
      await supabase.from('unlocks').upsert({ category: 'badge', key: badge }, { onConflict: 'category,key' });
    }
    setUnlocks(prev => prev.some(u => u.category === 'badge' && u.key === badge) ? prev : [{ category: 'badge', key: badge, unlockedAt: new Date().toISOString() }, ...prev]);
  }, [persistProfile]);

  const recordActivity = useCallback(async (skill: string) => {
    if (!isSupabaseConfigured) return;
    // Upsert directly (no RPC function defined)
    const { data } = await supabase.from('activity_stats').select('count').eq('skill', skill).maybeSingle();
    if (data) {
      await supabase.from('activity_stats').update({ count: (data as { count: number }).count + 1, updated_at: new Date().toISOString() }).eq('skill', skill);
    } else {
      await supabase.from('activity_stats').insert({ skill, count: 1 });
    }
  }, []);

  const addCreation = useCallback(async (type: string, title: string, payload: unknown) => {
    if (isSupabaseConfigured) {
      const { data } = await supabase.from('creations').insert({ type, title, payload }).select('id, created_at').single();
      if (data) {
        setCreations(prev => [{ id: (data as { id: string }).id, type, title, payload, createdAt: (data as { created_at: string }).created_at }, ...prev]);
      }
    } else {
      const id = crypto.randomUUID();
      setCreations(prev => [{ id, type, title, payload, createdAt: new Date().toISOString() }, ...prev]);
    }
  }, []);

  const addUnlock = useCallback(async (category: string, key: string) => {
    if (unlocks.some(u => u.category === category && u.key === key)) return;
    if (isSupabaseConfigured) {
      await supabase.from('unlocks').upsert({ category, key }, { onConflict: 'category,key' });
    }
    setUnlocks(prev => [{ category, key, unlockedAt: new Date().toISOString() }, ...prev]);
  }, [unlocks, isSupabaseConfigured]);

  const addGardenItem = useCallback(async (item: string) => {
    setProfile(prev => {
      if (!prev || prev.gardenItems.includes(item)) return prev;
      const updated = { ...prev, gardenItems: [...prev.gardenItems, item] };
      persistProfile(updated);
      return updated;
    });
  }, [persistProfile]);

  const addWorldItem = useCallback(async (item: Omit<import('./types').PlacedWorldItem, 'id' | 'createdAt'>) => {
    const newItem: import('./types').PlacedWorldItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setProfile(prev => {
      if (!prev) return prev;
      const current = prev.worldItems ?? [];
      const updated = { ...prev, worldItems: [newItem, ...current] };
      persistProfile(updated);
      return updated;
    });
  }, [persistProfile]);

  const removeWorldItem = useCallback(async (id: string) => {
    setProfile(prev => {
      if (!prev) return prev;
      const current = prev.worldItems ?? [];
      const updated = { ...prev, worldItems: current.filter(w => w.id !== id) };
      persistProfile(updated);
      return updated;
    });
  }, [persistProfile]);

  const resetProfile = useCallback(async () => {
    if (isSupabaseConfigured && profile?.id) {
      await supabase.from('child_profile').delete().eq('id', profile.id);
    }
    localStorage.removeItem('aw_profile');
    setProfile(null);
    setCreations([]);
    setUnlocks([]);
  }, [profile, isSupabaseConfigured]);

  return (
    <AppContext.Provider value={{
      profile, creations, unlocks, loading,
      saveProfile, setAvatar, setPet, addStars, completeAdventure,
      recordActivity, addCreation, addWorldItem, removeWorldItem, addUnlock, addGardenItem, resetProfile,
    }}>
      {children}
    </AppContext.Provider>
  );
}
