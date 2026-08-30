import type { PremiumState, PremiumRewardLog, SuccessfulReferral, PremiumSourceType } from './types';

/**
 * Generates a clean, readable referral code (e.g., KIDORA-7K9P)
 */
export function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `KIDORA-${code}`;
}

/**
 * Calculates remaining full days from an expiration ISO date string.
 */
export function calculateDaysRemaining(expiresAt: string): number {
  try {
    const diff = new Date(expiresAt).getTime() - Date.now();
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  } catch {
    return 0;
  }
}

/**
 * Initializes brand-new family Premium state.
 * - Standard signup: +7 Days Welcome Bonus FREE.
 * - Joined via referral link (?ref=...): +30 Days FREE.
 */
export function createDefaultPremiumState(referredByCode?: string): PremiumState {
  const today = new Date();
  const isReferred = Boolean(referredByCode && referredByCode.trim().length > 0);
  const initialDays = isReferred ? 30 : 7;

  const expiryDate = new Date(today.getTime() + initialDays * 24 * 60 * 60 * 1000);
  const dateStr = today.toISOString().split('T')[0];

  const initialLog: PremiumRewardLog = {
    id: `log-welcome-${Date.now()}`,
    source: isReferred ? 'referred_welcome' : 'welcome_bonus',
    title: isReferred ? 'Friend Referral Welcome Bonus (30 Days FREE)' : 'Welcome to Kidora (7 Days FREE)',
    daysAdded: initialDays,
    date: dateStr,
    emoji: isReferred ? '🎁' : '🎉',
  };

  return {
    tier: 'premium',
    daysRemaining: initialDays,
    expiresAt: expiryDate.toISOString(),
    totalDaysEarned: initialDays,
    referralCode: generateReferralCode(),
    referredBy: referredByCode || undefined,
    successfulReferrals: [],
    lastDailyLoginRewardDate: dateStr, // First day login is covered by welcome bonus
    lastDailyAdventureRewardDate: null,
    claimedStreakMilestones: [],
    history: [initialLog],
  };
}

/**
 * Extends the Premium state by adding N days.
 */
export function extendPremiumDays(
  state: PremiumState,
  days: number,
  source: PremiumSourceType,
  title: string,
  emoji: string = '✨'
): { updatedState: PremiumState; added: boolean } {
  if (days <= 0) return { updatedState: state, added: false };

  const currentExpiry = new Date(state.expiresAt).getTime();
  const baseTime = currentExpiry > Date.now() ? currentExpiry : Date.now();
  const newExpiryTime = baseTime + days * 24 * 60 * 60 * 1000;
  const newExpiresAt = new Date(newExpiryTime).toISOString();
  const newDaysRemaining = calculateDaysRemaining(newExpiresAt);

  const log: PremiumRewardLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    source,
    title,
    daysAdded: days,
    date: new Date().toISOString().split('T')[0],
    emoji,
  };

  return {
    updatedState: {
      ...state,
      tier: 'premium',
      expiresAt: newExpiresAt,
      daysRemaining: newDaysRemaining,
      totalDaysEarned: state.totalDaysEarned + days,
      history: [log, ...state.history],
    },
    added: true,
  };
}

/**
 * 🔐 Daily Login Reward: +1 Premium Day per calendar day.
 */
export function checkAndApplyDailyLoginReward(state: PremiumState): {
  updatedState: PremiumState;
  awarded: boolean;
} {
  const todayStr = new Date().toISOString().split('T')[0];

  // Already claimed today
  if (state.lastDailyLoginRewardDate === todayStr) {
    return { updatedState: state, awarded: false };
  }

  const { updatedState } = extendPremiumDays(
    state,
    1,
    'daily_login',
    'Daily Login Reward (+1 Day)',
    '🔐'
  );

  return {
    updatedState: {
      ...updatedState,
      lastDailyLoginRewardDate: todayStr,
    },
    awarded: true,
  };
}

/**
 * 🎮 Complete Daily Adventure Reward: +1 Premium Day per day upon story mission finish.
 */
export function checkAndApplyDailyAdventureReward(state: PremiumState): {
  updatedState: PremiumState;
  awarded: boolean;
} {
  const todayStr = new Date().toISOString().split('T')[0];

  if (state.lastDailyAdventureRewardDate === todayStr) {
    return { updatedState: state, awarded: false };
  }

  const { updatedState } = extendPremiumDays(
    state,
    1,
    'daily_adventure',
    'Daily Adventure Mission Completed (+1 Day)',
    '🎮'
  );

  return {
    updatedState: {
      ...updatedState,
      lastDailyAdventureRewardDate: todayStr,
    },
    awarded: true,
  };
}

/**
 * 🏆 Weekend / Family Challenge Reward: +7 Premium Days.
 */
export function applyChallengePremiumReward(
  state: PremiumState,
  challengeTitle: string
): { updatedState: PremiumState; awarded: boolean } {
  const { updatedState } = extendPremiumDays(
    state,
    7,
    'challenge',
    `Challenge Reward: ${challengeTitle} (+7 Days)`,
    '🏆'
  );

  return { updatedState, awarded: true };
}

/**
 * 🔥 Streak Milestone Rewards:
 * - 7-day streak: +3 Premium Days
 * - 14-day streak: +5 Premium Days
 * - 30-day streak: +10 Premium Days
 */
export function checkStreakMilestones(
  state: PremiumState,
  streakDays: number
): { updatedState: PremiumState; daysAwarded: number } {
  const milestones = [
    { days: 7, bonus: 3, label: '7-Day Learning Streak (+3 Days)' },
    { days: 14, bonus: 5, label: '14-Day Learning Streak (+5 Days)' },
    { days: 30, bonus: 10, label: '30-Day Learning Streak (+10 Days)' },
  ];

  let current = state;
  let totalBonus = 0;
  const newClaimed = [...(state.claimedStreakMilestones || [])];

  for (const m of milestones) {
    if (streakDays >= m.days && !newClaimed.includes(m.days)) {
      newClaimed.push(m.days);
      const res = extendPremiumDays(current, m.bonus, 'streak_milestone', m.label, '🔥');
      current = res.updatedState;
      totalBonus += m.bonus;
    }
  }

  if (totalBonus > 0) {
    return {
      updatedState: {
        ...current,
        claimedStreakMilestones: newClaimed,
      },
      daysAwarded: totalBonus,
    };
  }

  return { updatedState: state, daysAwarded: 0 };
}

/**
 * 👨‍👩‍👧 Referral Program Reward:
 * - 1 successful family -> +30 Premium Days
 * - 2 successful families -> +60 Premium Days
 * - 3 successful families -> +90 Premium Days
 */
export function applySuccessfulReferral(
  state: PremiumState,
  friendName: string = 'Friend Family'
): { updatedState: PremiumState; daysAwarded: number } {
  const nextCount = state.successfulReferrals.length + 1;
  const daysAwarded = 30; // +30 days per friend

  const newReferral: SuccessfulReferral = {
    id: `ref-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    friendName,
    dateJoined: new Date().toISOString().split('T')[0],
    daysAwarded,
  };

  const title = `Family Referral #${nextCount}: ${friendName} (+30 Days FREE)`;
  const { updatedState } = extendPremiumDays(state, daysAwarded, 'referral', title, '👨‍👩‍👧');

  return {
    updatedState: {
      ...updatedState,
      successfulReferrals: [newReferral, ...updatedState.successfulReferrals],
    },
    daysAwarded,
  };
}

/**
 * WhatsApp Referral Link & Message Formatter
 */
export function getReferralShareUrl(referralCode: string): string {
  if (typeof window !== 'undefined' && window.location) {
    const origin = window.location.origin;
    return `${origin}/?ref=${encodeURIComponent(referralCode)}`;
  }
  return `https://kidora.app/?ref=${encodeURIComponent(referralCode)}`;
}

export function getWhatsAppShareText(referralCode: string): string {
  const url = getReferralShareUrl(referralCode);
  return `🚀 My child is exploring Kidora — a fun learning adventure for kids.\nI'm sharing 30 Days Premium FREE with you.\nTry Kidora here 👇\n${url}`;
}

export function getWhatsAppShareLink(referralCode: string): string {
  const text = getWhatsAppShareText(referralCode);
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}
