import type { Theme, Mission, ActivityType } from './types';

export interface StoryAdventure {
  theme: Theme;
  themeName: string;
  themeEmoji: string;
  storyTitle: string;
  storyIntro: string;
  storyCharacter: string;
  storyCharacterEmoji: string;
  missions: StoryMission[];
  rewardBadge: string;
  rewardEmoji: string;
  outro: string;
}

export interface StoryMission {
  id: string;
  type: ActivityType;
  title: string;
  emoji: string;
  storyText: string;
  description: string;
  completed: boolean;
}

const adventures: Record<Theme, StoryAdventure> = {
  jungle: {
    theme: 'jungle',
    themeName: 'Magical Jungle',
    themeEmoji: '🌳',
    storyTitle: 'The Lost Baby Monkey',
    storyIntro: 'Leo the baby monkey is lost deep in the jungle! He needs a brave explorer to help him find his way home.',
    storyCharacter: 'Leo',
    storyCharacterEmoji: '🐵',
    rewardBadge: 'Jungle Explorer',
    rewardEmoji: '🦜',
    outro: 'You helped Leo find his way home! The whole jungle is celebrating! 🦜',
    missions: [
      { id: 'j1', type: 'math', title: 'Count the Bananas', emoji: '🧮', storyText: 'Leo is hungry! Help him count the bananas he found on the way.', description: 'Solve jungle math puzzles', completed: false },
      { id: 'j2', type: 'words', title: 'Decode the Trail', emoji: '🔤', storyText: 'Leo found mysterious letters on the trees! Can you read them?', description: 'Learn jungle words', completed: false },
      { id: 'j3', type: 'brain', title: 'Cross the River', emoji: '🧠', storyText: 'A river blocks the path! Solve the puzzle to build a bridge.', description: 'Solve a logic puzzle', completed: false },
      { id: 'j4', type: 'science', title: 'Jungle Discovery', emoji: '🔬', storyText: 'Discover how the jungle plants grow to find the path!', description: 'Explore a science concept', completed: false },
      { id: 'j5', type: 'creativity', title: 'Make a Gift', emoji: '🎨', storyText: 'Create a special drawing to cheer up Leo!', description: 'Make something creative', completed: false },
      { id: 'j6', type: 'story', title: 'The Journey Home', emoji: '📖', storyText: 'Help Leo finish his journey home with your choices!', description: 'Complete the story', completed: false },
    ],
  },
  space: {
    theme: 'space',
    themeName: 'Space Station',
    themeEmoji: '🚀',
    storyTitle: 'The Lost Space Robot',
    storyIntro: 'A friendly robot named Beep is lost on Mars! Captain Nova needs your help to rescue Beep and bring him home.',
    storyCharacter: 'Beep',
    storyCharacterEmoji: '🤖',
    rewardBadge: 'Space Cadet',
    rewardEmoji: '👨‍🚀',
    outro: 'You rescued Beep and brought him safely back to the space station! The stars are shining for you! 🚀',
    missions: [
      { id: 's1', type: 'math', title: 'Calculate Fuel', emoji: '🧮', storyText: 'The rocket needs fuel! Calculate how much we need for the rescue mission.', description: 'Solve space math puzzles', completed: false },
      { id: 's2', type: 'words', title: 'Decode the Message', emoji: '🔤', storyText: 'Beep sent a secret message from Mars! Can you decode it?', description: 'Learn space words', completed: false },
      { id: 's3', type: 'brain', title: 'Navigate the Asteroids', emoji: '🧠', storyText: 'Asteroids block the path! Solve the puzzle to find a safe route.', description: 'Solve a logic puzzle', completed: false },
      { id: 's4', type: 'science', title: 'Planet Discovery', emoji: '🔬', storyText: 'Discover which planet Beep is on by learning about space!', description: 'Explore a science concept', completed: false },
      { id: 's5', type: 'creativity', title: 'Design a New Robot', emoji: '🎨', storyText: 'Design a brand new robot friend for Beep!', description: 'Make something creative', completed: false },
      { id: 's6', type: 'story', title: 'The Rescue Mission', emoji: '📖', storyText: 'Make choices to complete the rescue mission!', description: 'Complete the story', completed: false },
    ],
  },
  dinosaurs: {
    theme: 'dinosaurs',
    themeName: 'Dinosaur Valley',
    themeEmoji: '🦖',
    storyTitle: 'The Mystery Footprints',
    storyIntro: 'Rex the dinosaur found mysterious footprints in the valley! Nobody knows who made them. Can you help solve the mystery?',
    storyCharacter: 'Rex',
    storyCharacterEmoji: '🦕',
    rewardBadge: 'Dino Discoverer',
    rewardEmoji: '🦴',
    outro: 'You solved the mystery of the footprints! Rex is so happy he did a happy dance! 🦴',
    missions: [
      { id: 'd1', type: 'math', title: 'Count the Footprints', emoji: '🧮', storyText: 'Help Rex count all the mysterious footprints!', description: 'Solve dino math puzzles', completed: false },
      { id: 'd2', type: 'words', title: 'Read the Clues', emoji: '🔤', storyText: 'Rex found clues carved in stone! Can you read them?', description: 'Learn dino words', completed: false },
      { id: 'd3', type: 'brain', title: 'Solve the Pattern', emoji: '🧠', storyText: 'The footprints follow a pattern! Figure out what comes next.', description: 'Solve a logic puzzle', completed: false },
      { id: 'd4', type: 'science', title: 'Fossil Discovery', emoji: '🔬', storyText: 'Discover how fossils are made to understand the clues!', description: 'Explore a science concept', completed: false },
      { id: 'd5', type: 'creativity', title: 'Draw the Mystery Dino', emoji: '🎨', storyText: 'Draw what you think the mystery dinosaur looked like!', description: 'Make something creative', completed: false },
      { id: 'd6', type: 'story', title: 'The Big Reveal', emoji: '📖', storyText: 'Make choices to discover who made the footprints!', description: 'Complete the story', completed: false },
    ],
  },
  ocean: {
    theme: 'ocean',
    themeName: 'Ocean World',
    themeEmoji: '🌊',
    storyTitle: 'The Pearl Festival',
    storyIntro: 'Finn the dolphin needs help preparing for the annual Pearl Festival! The pearls are scattered across the ocean.',
    storyCharacter: 'Finn',
    storyCharacterEmoji: '🐬',
    rewardBadge: 'Ocean Diver',
    rewardEmoji: '🐠',
    outro: 'You helped Finn collect all the pearls! The Pearl Festival was the best one ever! 🐠',
    missions: [
      { id: 'o1', type: 'math', title: 'Count the Pearls', emoji: '🧮', storyText: 'Help Finn count all the scattered pearls!', description: 'Solve ocean math puzzles', completed: false },
      { id: 'o2', type: 'words', title: 'Read the Sea Signs', emoji: '🔤', storyText: 'The sea creatures left signs! Can you read them?', description: 'Learn ocean words', completed: false },
      { id: 'o3', type: 'brain', title: 'Sort the Shells', emoji: '🧠', storyText: 'Help Finn sort the shells by solving a puzzle!', description: 'Solve a logic puzzle', completed: false },
      { id: 'o4', type: 'science', title: 'Ocean Discovery', emoji: '🔬', storyText: 'Discover how waves work to find the hidden pearls!', description: 'Explore a science concept', completed: false },
      { id: 'o5', type: 'creativity', title: 'Decorate the Festival', emoji: '🎨', storyText: 'Create a beautiful decoration for the Pearl Festival!', description: 'Make something creative', completed: false },
      { id: 'o6', type: 'story', title: 'The Festival Begins', emoji: '📖', storyText: 'Make choices to start the Pearl Festival!', description: 'Complete the story', completed: false },
    ],
  },
  castle: {
    theme: 'castle',
    themeName: 'Fantasy Castle',
    themeEmoji: '🏰',
    storyTitle: 'The Missing Gems',
    storyIntro: 'Princess Sparkle magical gems have been scattered by a mischievous dragon! She needs a hero to find them all.',
    storyCharacter: 'Sparkle',
    storyCharacterEmoji: '👸',
    rewardBadge: 'Castle Hero',
    rewardEmoji: '👑',
    outro: 'You found all the missing gems and returned them to Princess Sparkle! The castle is shining again! 👑',
    missions: [
      { id: 'c1', type: 'math', title: 'Count the Gems', emoji: '🧮', storyText: 'Help the Princess count her scattered gems!', description: 'Solve castle math puzzles', completed: false },
      { id: 'c2', type: 'words', title: 'Read the Spell Book', emoji: '🔤', storyText: 'The spell book has magical words! Can you read them?', description: 'Learn castle words', completed: false },
      { id: 'c3', type: 'brain', title: 'Open the Treasure Chest', emoji: '🧠', storyText: 'A treasure chest is locked! Solve the puzzle to open it.', description: 'Solve a logic puzzle', completed: false },
      { id: 'c4', type: 'science', title: 'Magic Potion Discovery', emoji: '🔬', storyText: 'Discover how magic potions work to find the gems!', description: 'Explore a science concept', completed: false },
      { id: 'c5', type: 'creativity', title: 'Design a Crown', emoji: '🎨', storyText: 'Design a beautiful new crown for the Princess!', description: 'Make something creative', completed: false },
      { id: 'c6', type: 'story', title: 'The Dragon Friend', emoji: '📖', storyText: 'Make choices to befriend the dragon and return the gems!', description: 'Complete the story', completed: false },
    ],
  },
  science: {
    theme: 'science',
    themeName: 'Science Lab',
    themeEmoji: '🔬',
    storyTitle: 'The Missing Experiment',
    storyIntro: 'Professor Quark most important experiment has gone wrong! The lab is full of surprises. Can you help fix it?',
    storyCharacter: 'Quark',
    storyCharacterEmoji: '🧪',
    rewardBadge: 'Little Scientist',
    rewardEmoji: '⚗️',
    outro: 'You helped Professor Quark fix the experiment! You are a true scientist! ⚗️',
    missions: [
      { id: 'sc1', type: 'math', title: 'Measure the Chemicals', emoji: '🧮', storyText: 'Help the Professor measure the right amounts!', description: 'Solve science math puzzles', completed: false },
      { id: 'sc2', type: 'words', title: 'Read the Formula', emoji: '🔤', storyText: 'The formula has missing letters! Can you figure them out?', description: 'Learn science words', completed: false },
      { id: 'sc3', type: 'brain', title: 'Fix the Circuit', emoji: '🧠', storyText: 'The circuit is broken! Solve the puzzle to fix it.', description: 'Solve a logic puzzle', completed: false },
      { id: 'sc4', type: 'science', title: 'The Big Discovery', emoji: '🔬', storyText: 'Discover what went wrong with the experiment!', description: 'Explore a science concept', completed: false },
      { id: 'sc5', type: 'creativity', title: 'Invent Something New', emoji: '🎨', storyText: 'Invent and draw a brand new gadget for the lab!', description: 'Make something creative', completed: false },
      { id: 'sc6', type: 'story', title: 'The Experiment Works', emoji: '📖', storyText: 'Make choices to complete the experiment!', description: 'Complete the story', completed: false },
    ],
  },
  creativity: {
    theme: 'creativity',
    themeName: 'Creative Studio',
    themeEmoji: '🎨',
    storyTitle: 'The Art Festival',
    storyIntro: 'Pip the artist is preparing for the big Art Festival but needs help creating all the pieces! Can you be Pip assistant?',
    storyCharacter: 'Pip',
    storyCharacterEmoji: '🎨',
    rewardBadge: 'Creative Star',
    rewardEmoji: '🎨',
    outro: 'You helped Pip create amazing art for the festival! Everyone loved your creations! 🎨',
    missions: [
      { id: 'cr1', type: 'math', title: 'Count the Colors', emoji: '🧮', storyText: 'Help Pip count all the paint colors!', description: 'Solve art math puzzles', completed: false },
      { id: 'cr2', type: 'words', title: 'Read the Art Notes', emoji: '🔤', storyText: 'Pip left notes about the art! Can you read them?', description: 'Learn art words', completed: false },
      { id: 'cr3', type: 'brain', title: 'Arrange the Gallery', emoji: '🧠', storyText: 'Help Pip arrange the art gallery with a puzzle!', description: 'Solve a logic puzzle', completed: false },
      { id: 'cr4', type: 'science', title: 'Color Discovery', emoji: '🔬', storyText: 'Discover how colors mix to create new ones!', description: 'Explore a science concept', completed: false },
      { id: 'cr5', type: 'creativity', title: 'Paint the Masterpiece', emoji: '🎨', storyText: 'Create a beautiful painting for the festival!', description: 'Make something creative', completed: false },
      { id: 'cr6', type: 'story', title: 'The Festival Show', emoji: '📖', storyText: 'Make choices to put on the best art show ever!', description: 'Complete the story', completed: false },
    ],
  },
};

const dayOfWeek = new Date().getDay();
const themeByDay: Theme[] = [
  'creativity', 'jungle', 'space', 'dinosaurs', 'ocean', 'castle', 'science',
];

export function getTodayTheme(): Theme {
  return themeByDay[dayOfWeek] ?? 'jungle';
}

export function getStoryAdventure(theme: Theme): StoryAdventure {
  return adventures[theme];
}

export function getTodayStoryAdventure(): StoryAdventure {
  return getStoryAdventure(getTodayTheme());
}

export function getAdventureForTheme(theme: Theme): StoryAdventure {
  return getStoryAdventure(theme);
}

export function getTodayAdventure(): StoryAdventure {
  return getTodayStoryAdventure();
}

export const skillLabels: Record<string, string> = {
  math: 'Math',
  reading: 'Reading',
  logic: 'Logic',
  science: 'Science',
  creativity: 'Creativity',
  vocabulary: 'Vocabulary',
};

export const skillEmojis: Record<string, string> = {
  math: '🧮',
  reading: '📚',
  logic: '🧠',
  science: '🔬',
  creativity: '🎨',
  vocabulary: '🔤',
};

// Keep old interface for backward compat
export type Adventure = StoryAdventure;
export type { Mission, ActivityType };
