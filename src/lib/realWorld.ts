import type { RealWorldMission } from './types';

export const realWorldMissionsList: RealWorldMission[] = [
  {
    id: 'rw-1',
    title: 'Round Object Safari',
    prompt: 'Look around your home or room and find 3 objects shaped like a circle or sphere (like a clock, ball, or plate)!',
    emoji: '⚽',
    category: 'home',
    starsReward: 15,
    badgeName: 'Circle Sleuth',
  },
  {
    id: 'rw-2',
    title: 'The Red Treasure Hunt',
    prompt: 'Count 10 red objects anywhere in your house or garden. Can you spot them all?',
    emoji: '🔴',
    category: 'home',
    starsReward: 15,
    badgeName: 'Color Hunter',
  },
  {
    id: 'rw-3',
    title: 'Sink or Float Wonder',
    prompt: 'With a parent or helper, test a tiny leaf or cork and a small pebble in a cup of water. What floats?',
    emoji: '⛵',
    category: 'nature',
    starsReward: 20,
    badgeName: 'Junior Scientist',
  },
  {
    id: 'rw-4',
    title: 'Curious Question Time',
    prompt: 'Ask a parent or family member one interesting question (e.g. "What was your favorite toy when you were 6?").',
    emoji: '💬',
    category: 'family',
    starsReward: 15,
    badgeName: 'Story Listener',
  },
  {
    id: 'rw-5',
    title: 'Texture Touch Expedition',
    prompt: 'Find 3 things that feel completely different: one SOFT (like a blanket), one SMOOTH (like glass), and one ROUGH (like a sponge).',
    emoji: '🧸',
    category: 'nature',
    starsReward: 20,
    badgeName: 'Sensory Explorer',
  },
  {
    id: 'rw-6',
    title: 'Sky Watcher Moment',
    prompt: 'Look out a window or step outside for 2 minutes. Can you find a cloud shaped like an animal or spot a flying bird?',
    emoji: '☁️',
    category: 'nature',
    starsReward: 15,
    badgeName: 'Sky Spotter',
  },
];

export function getTodayRealWorldMission(): RealWorldMission {
  const day = new Date().getDay();
  return realWorldMissionsList[day % realWorldMissionsList.length] || realWorldMissionsList[0];
}
