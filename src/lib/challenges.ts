import type {
  KidChallenge,
  KidChallengeCategory,
  KidChallengeOpponent,
  KidChallengeTask,
  CategoryPointsBreakdown,
} from './types';

export interface CategoryInfo {
  id: KidChallengeCategory;
  title: string;
  badgeTitle: string;
  emoji: string;
  color: string;
  description: string;
  pointsKey: keyof CategoryPointsBreakdown;
}

export const CHALLENGE_CATEGORIES: CategoryInfo[] = [
  {
    id: 'sprint',
    title: 'Adventure Sprint',
    badgeTitle: 'Active Hero',
    emoji: '🏃',
    color: 'from-amber-500 to-orange-500',
    description: 'Fun movement challenges, jumping jacks, balance & stretches!',
    pointsKey: 'activeHero',
  },
  {
    id: 'brain',
    title: 'Brain Battle',
    badgeTitle: 'Brain Master',
    emoji: '🧠',
    color: 'from-sky-500 to-indigo-600',
    description: 'Memory match, math sprint, word puzzles & logic quizzes!',
    pointsKey: 'brainMaster',
  },
  {
    id: 'creative',
    title: 'Creative Challenge',
    badgeTitle: 'Creative Star',
    emoji: '🎨',
    color: 'from-pink-500 to-rose-600',
    description: 'Drawings, building crafts & imaginative storytelling!',
    pointsKey: 'creativeStar',
  },
  {
    id: 'kindness',
    title: 'Kindness Challenge',
    badgeTitle: 'Kindness Champion',
    emoji: '💚',
    color: 'from-emerald-500 to-teal-600',
    description: 'Spread joy, help parents, share toys & compliment friends!',
    pointsKey: 'kindnessChampion',
  },
  {
    id: 'habit',
    title: 'Healthy Hero',
    badgeTitle: 'Healthy Hero',
    emoji: '💧',
    color: 'from-cyan-500 to-blue-600',
    description: 'Hydration goals, restful sleep routine & healthy food choices!',
    pointsKey: 'healthyHero',
  },
  {
    id: 'quest',
    title: 'Adventure Quest',
    badgeTitle: 'Adventure Master',
    emoji: '🗺️',
    color: 'from-purple-600 to-indigo-700',
    description: 'Epic 4-step multi-quests across puzzles, movement & discovery!',
    pointsKey: 'adventureMaster',
  },
];

export const KIDORA_BUDDIES: KidChallengeOpponent[] = [
  { id: 'buddy-maya', name: 'Maya', avatarEmoji: '🦊', type: 'buddy' },
  { id: 'buddy-arun', name: 'Arun', avatarEmoji: '🐒', type: 'buddy' },
  { id: 'buddy-leo', name: 'Leo', avatarEmoji: '🦁', type: 'buddy' },
  { id: 'buddy-zara', name: 'Zara', avatarEmoji: '🐼', type: 'buddy' },
  { id: 'group-class', name: 'Class 1B Explorers', avatarEmoji: '🎒', type: 'group' },
  { id: 'friend-sam', name: 'Sammy & Family', avatarEmoji: '👦', type: 'friend' },
];

export function getDefaultTasksForCategory(category: KidChallengeCategory): KidChallengeTask[] {
  switch (category) {
    case 'sprint':
      return [
        { id: 'task-1', text: '10 Energy Jumping Jacks', emoji: '⭐', done: false, type: 'movement' },
        { id: 'task-2', text: '20-Second Flamingo Balance Challenge', emoji: '🦩', done: false, type: 'balance' },
        { id: 'task-3', text: '5-Minute Explorer Room Walk', emoji: '🚶', done: false, type: 'walk' },
        { id: 'task-4', text: 'Dino Stretch & Reach to the Sky', emoji: '🦕', done: false, type: 'stretch' },
      ];
    case 'brain':
      return [
        { id: 'task-1', text: 'Match 3 Pairs of Memory Cards', emoji: '🃏', done: false, type: 'memory' },
        { id: 'task-2', text: 'Solve 3 Quick Math Mountain Questions', emoji: '🧮', done: false, type: 'math' },
        { id: 'task-3', text: 'Crack the Secret Word Scramble', emoji: '🔤', done: false, type: 'word' },
      ];
    case 'creative':
      return [
        { id: 'task-1', text: 'Draw a colorful imaginary magical animal', emoji: '🦄', done: false, type: 'draw' },
        { id: 'task-2', text: 'Build a tower or bridge using blocks/paper', emoji: '🧱', done: false, type: 'build' },
        { id: 'task-3', text: 'Tell a funny 2-sentence adventure story', emoji: '📖', done: false, type: 'story' },
      ];
    case 'kindness':
      return [
        { id: 'task-1', text: 'Help a parent with dinner prep or cleaning table', emoji: '🥣', done: false, type: 'help' },
        { id: 'task-2', text: 'Give a friend or family member a warm compliment', emoji: '💬', done: false, type: 'compliment' },
        { id: 'task-3', text: 'Tidy up your study desk or toy corner', emoji: '🧸', done: false, type: 'tidy' },
        { id: 'task-4', text: 'Share a drawing or snack with someone', emoji: '🎁', done: false, type: 'share' },
      ];
    case 'habit':
      return [
        { id: 'task-1', text: 'Drink 6 glasses of fresh water today', emoji: '💧', done: false, type: 'hydration' },
        { id: 'task-2', text: 'Follow peaceful bedtime routine before 8:30 PM', emoji: '😴', done: false, type: 'sleep' },
        { id: 'task-3', text: 'Eat a fresh fruit or veggie snack', emoji: '🍎', done: false, type: 'nutrition' },
        { id: 'task-4', text: '10 minutes of screen-free outdoor play', emoji: '🌳', done: false, type: 'outdoor' },
      ];
    case 'quest':
      return [
        { id: 'task-1', text: 'Solve 1 Jungle Puzzle Gate', emoji: '🧩', done: false, type: 'puzzle' },
        { id: 'task-2', text: 'Complete 1 Safari Movement Sprint', emoji: '🏃', done: false, type: 'movement' },
        { id: 'task-3', text: 'Answer 3 Wildlife Discovery Questions', emoji: '🧠', done: false, type: 'quiz' },
        { id: 'task-4', text: 'Sketch your new Jungle Discovery Badge', emoji: '🎨', done: false, type: 'creative' },
      ];
  }
}

export const INITIAL_KID_CHALLENGES: KidChallenge[] = [
  // 1. ACTIVE 3-DAY CHALLENGE STREAK (Maya 🦊)
  {
    id: 'kc-1',
    category: 'sprint',
    title: '3-Day Adventure Sprint Streak',
    description: 'Complete movement activities each day to build your active streak!',
    emoji: '🏃',
    opponent: { id: 'buddy-maya', name: 'Maya', avatarEmoji: '🦊', type: 'buddy' },
    status: 'active',
    pointsReward: 75,
    badgeReward: '🏃 Active Hero',
    streakDays: 3,
    currentDay: 2,
    dayCompleted: [true, false, false],
    tasks: getDefaultTasksForCategory('sprint'),
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },

  // 2. INCOMING INVITATION FROM ARUN (Brain Battle)
  {
    id: 'kc-2',
    category: 'brain',
    title: "Arun's 2-Minute Brain Battle",
    description: 'Arun challenged you to a quick math & memory showdown!',
    emoji: '🧠',
    opponent: { id: 'buddy-arun', name: 'Arun', avatarEmoji: '🐒', type: 'buddy' },
    status: 'invitation',
    pointsReward: 50,
    badgeReward: '🧠 Brain Master',
    streakDays: 1,
    currentDay: 1,
    dayCompleted: [false],
    tasks: getDefaultTasksForCategory('brain'),
    createdAt: new Date().toISOString(),
  },

  // 3. ACTIVE KINDNESS CHALLENGE (Class 1B)
  {
    id: 'kc-3',
    category: 'kindness',
    title: 'Class Kindness Champions',
    description: 'Create 4 positive ripples: help at home, share, and compliment!',
    emoji: '💚',
    opponent: { id: 'group-class', name: 'Class 1B Explorers', avatarEmoji: '🎒', type: 'group' },
    status: 'active',
    pointsReward: 60,
    badgeReward: '💚 Kindness Champion',
    streakDays: 1,
    currentDay: 1,
    dayCompleted: [false],
    tasks: [
      { id: 'task-1', text: 'Help a parent with dinner prep or cleaning table', emoji: '🥣', done: true, type: 'help' },
      { id: 'task-2', text: 'Give a friend or family member a warm compliment', emoji: '💬', done: true, type: 'compliment' },
      { id: 'task-3', text: 'Tidy up your study desk or toy corner', emoji: '🧸', done: false, type: 'tidy' },
      { id: 'task-4', text: 'Share a drawing or snack with someone', emoji: '🎁', done: false, type: 'share' },
    ],
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },

  // 4. COMPLETED 7-DAY JUNGLE QUEST (Leo 🦁)
  {
    id: 'kc-4',
    category: 'quest',
    title: 'Jungle Explorer Multi-Quest',
    description: 'Solve puzzles, move, quiz, and draw to earn the Jungle Master title!',
    emoji: '🗺️',
    opponent: { id: 'buddy-leo', name: 'Leo', avatarEmoji: '🦁', type: 'buddy' },
    status: 'completed',
    pointsReward: 100,
    badgeReward: '🌟 Jungle Master',
    streakDays: 1,
    currentDay: 1,
    dayCompleted: [true],
    tasks: getDefaultTasksForCategory('quest').map((t) => ({ ...t, done: true })),
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    reactionEmoji: '🔥',
  },
];

export const INITIAL_CATEGORY_POINTS: CategoryPointsBreakdown = {
  activeHero: 120,
  brainMaster: 180,
  creativeStar: 95,
  kindnessChampion: 140,
  healthyHero: 110,
  adventureMaster: 250,
};
