import type {
  KidChallenge,
  KidChallengeCategory,
  KidChallengeOpponent,
  KidChallengeTask,
  CategoryPointsBreakdown,
  ThemedQuest,
  TeamChallenge,
  PersonalRecord,
  BadgeCollectible,
  MysteryChestReward,
  DailySurpriseChallenge,
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
    description: 'Epic multi-quests across puzzles, movement & discovery!',
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

// 🌋 1. THEMED MULTI-MISSION EPIC QUESTS
export const INITIAL_THEMED_QUESTS: ThemedQuest[] = [
  {
    id: 'tq-volcano',
    theme: 'volcano',
    title: 'VOLCANO QUEST 🌋',
    subtitle: 'You and Rahul have 24 hours to cool the Lava Core!',
    emoji: '🌋',
    bannerGradient: 'from-orange-600 via-red-600 to-amber-700',
    companionName: 'Rahul',
    companionEmoji: '👦',
    deadlineHours: 24,
    totalPoints: 100,
    badgeReward: '🌋 Volcano Conqueror',
    completed: false,
    unlockedChest: false,
    tasks: [
      { id: 'vq-1', categoryName: 'Brain Games', text: 'Solve 3 Lava Math Gates', emoji: '🧠', points: 30, done: false },
      { id: 'vq-2', categoryName: 'Active Game', text: 'Complete 20s Lava Jump Sprint', emoji: '🏃', points: 30, done: false },
      { id: 'vq-3', categoryName: 'Creative Mission', text: 'Design a Fire-Proof Shield drawing', emoji: '🎨', points: 20, done: false },
      { id: 'vq-4', categoryName: 'Kindness Mission', text: 'Help a family member tidy up dinner', emoji: '💚', points: 20, done: false },
    ],
  },
  {
    id: 'tq-cosmic',
    theme: 'space',
    title: 'COSMIC VOYAGE 🚀',
    subtitle: 'You and Maya have 24 hours to chart the Star Cluster!',
    emoji: '🚀',
    bannerGradient: 'from-indigo-700 via-purple-700 to-pink-600',
    companionName: 'Maya',
    companionEmoji: '🦊',
    deadlineHours: 24,
    totalPoints: 100,
    badgeReward: '🚀 Star Navigator',
    completed: false,
    unlockedChest: false,
    tasks: [
      { id: 'cq-1', categoryName: 'Brain Games', text: 'Crack 3 Constellation Riddles', emoji: '🧠', points: 30, done: false },
      { id: 'cq-2', categoryName: 'Active Game', text: 'Zero-Gravity 20s Flamingo Balance', emoji: '🏃', points: 30, done: false },
      { id: 'cq-3', categoryName: 'Creative Mission', text: 'Sketch an Alien Space Pet', emoji: '🎨', points: 20, done: false },
      { id: 'cq-4', categoryName: 'Healthy Habit', text: 'Drink 6 glasses of hydration fuel', emoji: '💧', points: 20, done: false },
    ],
  },
  {
    id: 'tq-jungle',
    theme: 'jungle',
    title: 'JUNGLE EXPEDITION 🌴',
    subtitle: 'You and Arun have 24 hours to find the Golden Idol!',
    emoji: '🌴',
    bannerGradient: 'from-emerald-700 via-teal-700 to-amber-600',
    companionName: 'Arun',
    companionEmoji: '🐒',
    deadlineHours: 24,
    totalPoints: 100,
    badgeReward: '🌴 Jungle Pathfinder',
    completed: true,
    unlockedChest: true,
    tasks: [
      { id: 'jq-1', categoryName: 'Puzzle Castle', text: 'Solve 1 Ancient Gate Puzzle', emoji: '🧩', points: 30, done: true },
      { id: 'jq-2', categoryName: 'Active Game', text: '10 Safari Jumping Jacks', emoji: '🏃', points: 30, done: true },
      { id: 'jq-3', categoryName: 'Kindness Mission', text: 'Give a friend a genuine compliment', emoji: '💚', points: 20, done: true },
      { id: 'jq-4', categoryName: 'Creative Mission', text: 'Build a block shelter for animals', emoji: '🎨', points: 20, done: true },
    ],
  },
  {
    id: 'tq-ocean',
    theme: 'ocean',
    title: 'ATLANTIS DISCOVERY 🌊',
    subtitle: 'You and Zara have 24 hours to uncover the Sunken Pearl!',
    emoji: '🌊',
    bannerGradient: 'from-sky-600 via-cyan-600 to-teal-700',
    companionName: 'Zara',
    companionEmoji: '🐼',
    deadlineHours: 24,
    totalPoints: 100,
    badgeReward: '🌊 Ocean Explorer',
    completed: false,
    unlockedChest: false,
    tasks: [
      { id: 'oq-1', categoryName: 'Memory Cards', text: 'Match 3 Sea Creature Pairs', emoji: '🃏', points: 30, done: false },
      { id: 'oq-2', categoryName: 'Healthy Habit', text: 'Bedtime peaceful rest routine', emoji: '🌙', points: 30, done: false },
      { id: 'oq-3', categoryName: 'Creative Mission', text: 'Draw a glowing Deep Sea Jellyfish', emoji: '🎨', points: 20, done: false },
      { id: 'oq-4', categoryName: 'Kindness Mission', text: 'Share a snack or book with someone', emoji: '💚', points: 20, done: false },
    ],
  },
];

// 🦁 2. TEAM CO-OP CHALLENGES (You + Friends vs Another Team)
export const INITIAL_TEAM_CHALLENGES: TeamChallenge[] = [
  {
    id: 'tc-jungle',
    title: '🦁 Jungle Team Co-op Quest',
    emoji: '🦁',
    teamName: 'Jungle Explorers',
    opponentTeamName: 'Tiger Team',
    members: [
      { id: 'm-you', name: 'You', avatarEmoji: '🧒', pointsContributed: 140 },
      { id: 'm-arun', name: 'Arun', avatarEmoji: '🐒', pointsContributed: 120 },
      { id: 'm-maya', name: 'Maya', avatarEmoji: '🦊', pointsContributed: 110 },
      { id: 'm-sam', name: 'Sammy', avatarEmoji: '👦', pointsContributed: 60 },
    ],
    targetPoints: 500,
    currentPoints: 430,
    daysRemaining: 2,
    completed: false,
    rewardBadge: '🦁 Jungle Team Champion',
  },
  {
    id: 'tc-galaxy',
    title: '🚀 Galaxy Fleet Co-op Challenge',
    emoji: '🚀',
    teamName: 'Starlight Rovers',
    opponentTeamName: 'Comet Crew',
    members: [
      { id: 'm-you', name: 'You', avatarEmoji: '🧒', pointsContributed: 200 },
      { id: 'm-leo', name: 'Leo', avatarEmoji: '🦁', pointsContributed: 180 },
      { id: 'm-zara', name: 'Zara', avatarEmoji: '🐼', pointsContributed: 120 },
    ],
    targetPoints: 500,
    currentPoints: 500,
    daysRemaining: 0,
    completed: true,
    rewardBadge: '🚀 Galaxy Fleet Master',
  },
];

// 🔥 3. BEAT YOUR OWN SCORE / PERSONAL BESTS
export const INITIAL_PERSONAL_RECORDS: Record<string, PersonalRecord> = {
  brain: {
    category: 'brain',
    categoryTitle: 'Brain Battle Sprint',
    emoji: '🧠',
    bestScore: 72,
    todayScore: 58,
    lastPlayed: 'Today',
  },
  sprint: {
    category: 'sprint',
    categoryTitle: 'Active Movement Agility',
    emoji: '🏃',
    bestScore: 85,
    todayScore: 85,
    lastPlayed: 'Today',
  },
  puzzle: {
    category: 'puzzle',
    categoryTitle: 'Puzzle Castle Logic',
    emoji: '🧩',
    bestScore: 90,
    todayScore: 65,
    lastPlayed: 'Yesterday',
  },
  creative: {
    category: 'creative',
    categoryTitle: 'Creative Craft Challenge',
    emoji: '🎨',
    bestScore: 60,
    todayScore: 50,
    lastPlayed: '3 days ago',
  },
  kindness: {
    category: 'kindness',
    categoryTitle: 'Kindness Ripples Count',
    emoji: '💚',
    bestScore: 80,
    todayScore: 70,
    lastPlayed: 'Today',
  },
};

// 🏅 4. COLLECTABLE BADGES SHOWCASE
export const INITIAL_BADGES_COLLECTION: BadgeCollectible[] = [
  {
    id: 'badge-brain',
    title: 'Brain Explorer',
    emoji: '🧠',
    category: 'Learning & Logic',
    description: 'Solve 10+ brain quizzes and memory matches.',
    unlocked: true,
    unlockedAt: '2 days ago',
    rarity: 'rare',
  },
  {
    id: 'badge-sprint',
    title: 'Super Active',
    emoji: '🏃',
    category: 'Movement & Agility',
    description: 'Complete 5 physical jumping jack and balance sprints.',
    unlocked: true,
    unlockedAt: 'Today',
    rarity: 'epic',
  },
  {
    id: 'badge-creative',
    title: 'Creative Wizard',
    emoji: '🎨',
    category: 'Creativity & Arts',
    description: 'Draw 3 magical characters and build block towers.',
    unlocked: true,
    unlockedAt: 'Yesterday',
    rarity: 'rare',
  },
  {
    id: 'badge-puzzle',
    title: 'Puzzle Master',
    emoji: '🧩',
    category: 'Logic & Spatial',
    description: 'Unlock 5 ancient gate puzzles in adventure quests.',
    unlocked: true,
    unlockedAt: '3 days ago',
    rarity: 'rare',
  },
  {
    id: 'badge-kindness',
    title: 'Kindness Hero',
    emoji: '💚',
    category: 'Positive Ripples',
    description: 'Help parents, share with friends, and give warm compliments.',
    unlocked: true,
    unlockedAt: 'Today',
    rarity: 'legendary',
  },
  {
    id: 'badge-hydration',
    title: 'Hydration Hero',
    emoji: '💧',
    category: 'Healthy Habits',
    description: 'Reach daily 6+ glasses water goal for 3 consecutive days.',
    unlocked: true,
    unlockedAt: 'Today',
    rarity: 'epic',
  },
  {
    id: 'badge-sleep',
    title: 'Sleep Champion',
    emoji: '🌙',
    category: 'Rest & Routine',
    description: 'Maintain healthy 9+ hours restful sleep routine.',
    unlocked: true,
    unlockedAt: 'Yesterday',
    rarity: 'epic',
  },
  {
    id: 'badge-adventure',
    title: 'Adventure Master',
    emoji: '🗺️',
    category: 'Overall World',
    description: 'Conquer multi-discipline Volcano & Cosmic quests!',
    unlocked: false,
    rarity: 'legendary',
  },
];

// 🎁 5. MYSTERY TREASURE CHEST REWARDS
export const MYSTERY_REWARDS_POOL: MysteryChestReward[] = [
  { type: 'accessory', value: 'hat-wizard', emoji: '🧙‍♂️', label: 'Magical Wizard Hat', description: 'Exclusive avatar accessory for brave quest conquerors!' },
  { type: 'points', value: 35, emoji: '⭐', label: '+35 Bonus Stars', description: 'Instant boost to your Adventure World XP!' },
  { type: 'accessory', value: 'glasses-shades', emoji: '🕶️', label: 'Cool Explorer Shades', description: 'Shiny sunglasses for your kid avatar!' },
  { type: 'points', value: 50, emoji: '🔥', label: '+50 Super XP Points', description: 'Massive bonus to speed up your Living World growth!' },
  { type: 'title', value: 'Lava Master', emoji: '🌋', label: 'Title: "Lava Master"', description: 'Legendary title displayed next to your profile name!' },
  { type: 'accessory', value: 'crown-gold', emoji: '👑', label: 'Royal Golden Crown', description: 'Gleaming golden crown worn by champions!' },
];

export function generateRandomMysteryChestReward(): MysteryChestReward {
  const idx = Math.floor(Math.random() * MYSTERY_REWARDS_POOL.length);
  return MYSTERY_REWARDS_POOL[idx];
}

// 🎲 6. DAILY SURPRISE CHALLENGE GENERATOR
export function generateTodaySurpriseChallenge(): DailySurpriseChallenge {
  const surprises = [
    {
      title: 'Secret Volcano Riddle',
      emoji: '🌋',
      description: 'Solve 2 fast fiery math questions and do 10 high-knees!',
      points: 45,
    },
    {
      title: 'Kindness Surprise Spark',
      emoji: '💚',
      description: 'Surprise a parent or sibling by making their bed or tidying a desk!',
      points: 50,
    },
    {
      title: 'Cosmic Memory Warp',
      emoji: '🚀',
      description: 'Match 4 starry cards in under 30 seconds!',
      points: 40,
    },
    {
      title: 'Hydration Power Sip',
      emoji: '💧',
      description: 'Drink 2 full glasses of cool water and stretch for 15 seconds!',
      points: 35,
    },
  ];

  const todayStr = new Date().toISOString().split('T')[0];
  const dayIdx = new Date().getDate() % surprises.length;
  const picked = surprises[dayIdx];

  return {
    id: `surprise-${todayStr}`,
    date: todayStr,
    title: picked.title,
    emoji: picked.emoji,
    description: picked.description,
    points: picked.points,
    revealed: false,
    completed: false,
  };
}
