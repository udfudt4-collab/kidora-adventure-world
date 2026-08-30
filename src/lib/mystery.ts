import type { DailyMystery } from './types';
import { getBackpackItemById } from './backpack';

export const dailyMysteriesPool: DailyMystery[] = [
  {
    id: 'mystery-1',
    title: 'The Case of the Missing Star Gem',
    emoji: '💎',
    storyPrompt: 'Oh no! The great Starlight Beacon lost its glowing blue power gem. Kido found three mysterious clues around the valley. Can you crack the code?',
    clues: [
      {
        id: 'clue-1',
        type: 'observe',
        question: 'Which animal track was left near the sparkly footprints?',
        hint: 'It has soft paws and loves chasing moonbeams!',
        options: ['🐾 Little Fox Paw', '🦖 Giant Dino Foot', '🐟 Swimming Fin'],
        correctAnswer: '🐾 Little Fox Paw',
        emoji: '🔍',
      },
      {
        id: 'clue-2',
        type: 'code',
        question: 'Count the glowing fireflies around the hollow tree: 3 yellow + 2 blue = ?',
        hint: 'Add 3 and 2 together!',
        options: ['4', '5', '6'],
        correctAnswer: '5',
        emoji: '✨',
      },
      {
        id: 'clue-3',
        type: 'quiz',
        question: 'What magic word opens the hidden hollow tree vault?',
        hint: 'It starts with "STAR" and rhymes with "SPARK"!',
        options: ['STARLIGHT', 'SUNSHINE', 'RAINBOW'],
        correctAnswer: 'STARLIGHT',
        emoji: '🌟',
      },
    ],
    rewardStars: 20,
    rewardCollectible: getBackpackItemById('crystal_prism'),
    worldGrowItem: '🌸 Star Orchid Sprout',
  },
  {
    id: 'mystery-2',
    title: 'The Whispering Forest Riddle',
    emoji: '🌲',
    storyPrompt: 'A magical breeze swept through Whispering Woods and scattered three secret message scrolls among the trees. Can you assemble the secret?',
    clues: [
      {
        id: 'clue-1',
        type: 'observe',
        question: 'Which tree has glowing golden leaves that point the way?',
        hint: 'Look for the mighty tree holding golden acorns!',
        options: ['🌳 Wonder Oak', '🌵 Desert Cactus', '🌴 Palm Tree'],
        correctAnswer: '🌳 Wonder Oak',
        emoji: '🍂',
      },
      {
        id: 'clue-2',
        type: 'quiz',
        question: 'Which letter sound begins the word "B-R-A-V-E"?',
        hint: 'Listen to the sound: "Buh"',
        options: ['B', 'D', 'P'],
        correctAnswer: 'B',
        emoji: '🔤',
      },
      {
        id: 'clue-3',
        type: 'puzzle',
        question: 'Complete the pattern to unlock the ancient chest: 🔵 🟡 🔵 🟡 ?',
        hint: 'What comes after yellow in this repeating pattern?',
        options: ['🔵 Blue', '🔴 Red', '🟢 Green'],
        correctAnswer: '🔵 Blue',
        emoji: '🧩',
      },
    ],
    rewardStars: 25,
    rewardCollectible: getBackpackItemById('golden_acorn'),
    worldGrowItem: '🌰 Ancient Wonder Seedling',
  },
  {
    id: 'mystery-3',
    title: 'The Secret of the Cosmic Telescope',
    emoji: '🔭',
    storyPrompt: 'The observatory dome swiveled toward a mysterious new planet! Help Kido calibrate the brass telescope lenses to map the cosmic marvel.',
    clues: [
      {
        id: 'clue-1',
        type: 'observe',
        question: 'What shape is the biggest crater on the sparkling moon?',
        hint: 'It is round like a ball or a wheel!',
        options: ['⚪ Circle', '🔺 Triangle', '🟦 Square'],
        correctAnswer: '⚪ Circle',
        emoji: '🌕',
      },
      {
        id: 'clue-2',
        type: 'code',
        question: 'Solve the cosmic coordinates: 10 minus 3 = ?',
        hint: 'Count backward 3 steps from 10!',
        options: ['7', '6', '8'],
        correctAnswer: '7',
        emoji: '🚀',
      },
      {
        id: 'clue-3',
        type: 'quiz',
        question: 'What colors make up a cosmic rainbow nebula?',
        hint: 'All the vibrant colors together!',
        options: ['🌈 Rainbow Colors', '⚫ Only Black', '⚪ Only Gray'],
        correctAnswer: '🌈 Rainbow Colors',
        emoji: '🪐',
      },
    ],
    rewardStars: 25,
    rewardCollectible: getBackpackItemById('stargazer_telescope'),
    worldGrowItem: '🌌 Starlight Flora',
  },
];

export function getTodayMystery(): DailyMystery {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const index = Math.abs(dayOfYear) % dailyMysteriesPool.length;
  return dailyMysteriesPool[index] || dailyMysteriesPool[0];
}
