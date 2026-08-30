import type { Skill, Theme } from './types';

export interface MathProblem {
  scenario: string;
  emoji: string;
  answer: number;
  choices: number[];
}

export interface WordProblem {
  emoji: string;
  word: string;
  hint: string;
  missingLetter: string;
  options: string[];
}

export interface BrainPuzzle {
  question: string;
  emoji: string;
  answer: string;
  options: string[];
}

export interface ScienceFact {
  title: string;
  emoji: string;
  fact: string;
  question: string;
  answer: string;
  options: string[];
}

export interface StorySegment {
  text: string;
  emoji: string;
  choices?: { text: string; emoji: string; next: number }[];
}

export interface StoryData {
  title: string;
  emoji: string;
  segments: StorySegment[];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(answer: number): number[] {
  const set = new Set<number>([answer]);
  while (set.size < 4) {
    const delta = Math.floor(Math.random() * 6) - 3;
    if (delta !== 0) set.add(Math.max(0, answer + delta));
  }
  return shuffle([...set]);
}

// Adaptive difficulty: level 1-4 based on age + performance
export function getDifficultyLevel(age: number, correctRatio: number): number {
  if (age <= 5) return correctRatio > 0.7 ? 2 : 1;
  if (age <= 7) return correctRatio > 0.8 ? 3 : correctRatio > 0.5 ? 2 : 1;
  return correctRatio > 0.8 ? 4 : correctRatio > 0.5 ? 3 : 2;
}

export function generateMathProblems(age: number, level = 1): MathProblem[] {
  const maxNum = level <= 1 ? 5 : level <= 2 ? 10 : level <= 3 ? 15 : 25;
  const useSubtraction = level >= 2;
  const useWordProblems = level >= 3;
  const problems: MathProblem[] = [];
  for (let i = 0; i < 5; i++) {
    const a = Math.floor(Math.random() * maxNum) + 1;
    const b = Math.floor(Math.random() * maxNum) + 1;
    let answer: number;
    let scenario: string;
    let emoji: string;

    if (useSubtraction && i % 2 === 1 && a > b) {
      answer = a - b;
      if (useWordProblems) {
        scenario = `The explorer had ${a} golden coins. ${b} fell into the river. How many are left?`;
        emoji = '🪙';
      } else {
        scenario = `${a} - ${b} = ?`;
        emoji = '🪙';
      }
    } else {
      answer = a + b;
      if (useWordProblems) {
        const scenarios = [
          { s: `The explorer found ${a} golden coins, then discovered ${b} more. How many coins?`, e: '🪙' },
          { s: `${a} friendly monkeys were swinging. ${b} more joined them. How many monkeys?`, e: '🐵' },
          { s: `You collected ${a} starfish. Your pet found ${b} more. How many starfish total?`, e: '⭐' },
          { s: `${a} birds were flying. ${b} more birds flew in. How many birds?`, e: '🐦' },
          { s: `There were ${a} flowers. ${b} more bloomed. How many flowers?`, e: '🌸' },
        ];
        const pick = scenarios[i % scenarios.length];
        scenario = pick.s;
        emoji = pick.e;
      } else {
        scenario = `${a} + ${b} = ?`;
        emoji = '🪙';
      }
    }
    problems.push({ scenario, emoji, answer, choices: makeChoices(answer) });
  }
  return problems;
}

export function generateWordProblems(level = 1): WordProblem[] {
  const easyWords = [
    { emoji: '🐶', word: 'DOG', hint: 'A furry friend that says woof', missingLetter: 'O', options: ['O', 'A', 'U', 'E'] },
    { emoji: '🐱', word: 'CAT', hint: 'A pet that purrs and loves naps', missingLetter: 'A', options: ['A', 'O', 'E', 'I'] },
    { emoji: '🦊', word: 'FOX', hint: 'A clever orange animal', missingLetter: 'O', options: ['O', 'A', 'E', 'I'] },
    { emoji: '🐷', word: 'PIG', hint: 'A pink farm animal', missingLetter: 'I', options: ['I', 'A', 'E', 'O'] },
    { emoji: '🦇', word: 'BAT', hint: 'A flying animal that sleeps upside down', missingLetter: 'A', options: ['A', 'O', 'E', 'I'] },
  ];
  const hardWords = [
    { emoji: '🦁', word: 'LION', hint: 'The king of the jungle', missingLetter: 'I', options: ['I', 'E', 'O', 'A'] },
    { emoji: '🐸', word: 'FROG', hint: 'A green jumper who lives near ponds', missingLetter: 'R', options: ['R', 'L', 'N', 'M'] },
    { emoji: '🐘', word: 'ELEPHANT', hint: 'The biggest land animal with a trunk', missingLetter: 'P', options: ['P', 'B', 'T', 'K'] },
    { emoji: '🦒', word: 'GIRAFFE', hint: 'The tallest animal with a long neck', missingLetter: 'F', options: ['F', 'T', 'S', 'R'] },
    { emoji: '🐧', word: 'PENGUIN', hint: 'A bird that swims but cannot fly', missingLetter: 'N', options: ['N', 'M', 'R', 'L'] },
  ];
  const words = level <= 1 ? easyWords : level <= 2 ? [...easyWords, ...hardWords] : hardWords;
  return shuffle(words).slice(0, 3);
}

export function generateBrainPuzzles(level = 1): BrainPuzzle[] {
  const easyPuzzles = [
    { question: 'Which one comes next? 🔴🔵🔴🔵🔴?', emoji: '🔵', answer: '🔵', options: ['🔵', '🔴', '🟢', '🟡'] },
    { question: 'Which animal does NOT belong in the ocean?', emoji: '🐠', answer: '🐘', options: ['🐠', '🐙', '🐘', '🦀'] },
    { question: 'Which shape has 3 sides?', emoji: '🔺', answer: 'Triangle', options: ['Square', 'Triangle', 'Circle', 'Star'] },
    { question: 'What is the opposite of BIG?', emoji: '📏', answer: 'Small', options: ['Tall', 'Small', 'Wide', 'Long'] },
  ];
  const hardPuzzles = [
    { question: 'Which one is different? 🍎🍎🍎🍐🍎', emoji: '🍎', answer: '🍐', options: ['🍎', '🍐', '🍎', '🍎'] },
    { question: 'Find the pattern: 🌙⭐🌙⭐🌙?', emoji: '⭐', answer: '⭐', options: ['⭐', '🌙', '☀️', '☁️'] },
    { question: 'Which number comes next? 2, 4, 6, ?', emoji: '🔢', answer: '8', options: ['7', '8', '9', '10'] },
    { question: 'Which one does NOT belong? 🐛🦋🐝🐞🍓', emoji: '🐛', answer: '🍓', options: ['🐛', '🦋', '🐝', '🍓'] },
  ];
  const puzzles = level <= 1 ? easyPuzzles : level <= 2 ? [...easyPuzzles, ...hardPuzzles] : hardPuzzles;
  return [shuffle(puzzles)[0]];
}

export function generateScienceFacts(): ScienceFact[] {
  const facts = [
    {
      title: 'The Water Cycle',
      emoji: '💧',
      fact: 'Water goes up into the sky, forms clouds, and falls back down as rain!',
      question: 'What falls from clouds?',
      answer: 'Rain',
      options: ['Snow', 'Rain', 'Sand', 'Rocks'],
    },
    {
      title: 'Plants Grow',
      emoji: '🌱',
      fact: 'Plants need sunlight and water to grow big and strong!',
      question: 'What do plants need to grow?',
      answer: 'Sunlight & water',
      options: ['Candy', 'Sunlight & water', 'Toys', 'Music'],
    },
    {
      title: 'Day and Night',
      emoji: '☀️',
      fact: 'The sun gives us light during the day. The moon shines at night!',
      question: 'What gives us light during the day?',
      answer: 'The Sun',
      options: ['The Moon', 'The Sun', 'Stars', 'Lamps'],
    },
    {
      title: 'Magnets',
      emoji: '🧲',
      fact: 'Magnets pull some metal objects toward them!',
      question: 'What do magnets do?',
      answer: 'Pull metal',
      options: ['Push water', 'Pull metal', 'Make fire', 'Create wind'],
    },
    {
      title: 'How Rainbows Form',
      emoji: '🌈',
      fact: 'Rainbows appear when sunlight shines through raindrops!',
      question: 'What makes a rainbow?',
      answer: 'Sun + rain',
      options: ['Sun + rain', 'Snow + wind', 'Moon + stars', 'Clouds + lightning'],
    },
  ];
  return [shuffle(facts)[0]];
}

const storyByTheme: Record<Theme, StoryData[]> = {
  jungle: [
    {
      title: 'The Journey Home',
      emoji: '🌳',
      segments: [
        { text: 'Leo sees two paths in the jungle. One goes through the trees, one goes by the river.', emoji: '🌳', choices: [
          { text: 'Through the trees', emoji: '🌴', next: 1 },
          { text: 'By the river', emoji: '🌊', next: 2 },
        ]},
        { text: 'Through the trees, Leo meets a wise parrot who knows the way home!', emoji: '🦜', choices: [
          { text: 'Follow the parrot', emoji: '✅', next: 3 },
        ]},
        { text: 'By the river, Leo finds a friendly turtle who offers a ride across!', emoji: '🐢', choices: [
          { text: 'Ride the turtle', emoji: '✅', next: 3 },
        ]},
        { text: 'Leo is home! His family is so happy to see him. You did it!', emoji: '🎉' },
      ],
    },
  ],
  space: [
    {
      title: 'The Rescue Mission',
      emoji: '🚀',
      segments: [
        { text: 'You land on Mars and see Beep the robot! But there are two craters. Which way?', emoji: '🪐', choices: [
          { text: 'Over the big crater', emoji: '🌋', next: 1 },
          { text: 'Around the small crater', emoji: '🪨', next: 2 },
        ]},
        { text: 'Over the big crater, you find Beep stuck behind a rock!', emoji: '🤖', choices: [
          { text: 'Help Beep out', emoji: '✅', next: 3 },
        ]},
        { text: 'Around the small crater, you see Beep waving from a cave!', emoji: '🤖', choices: [
          { text: 'Go to Beep', emoji: '✅', next: 3 },
        ]},
        { text: 'You and Beep fly back to the space station together! Mission accomplished!', emoji: '🎉' },
      ],
    },
  ],
  dinosaurs: [
    {
      title: 'The Big Reveal',
      emoji: '🦖',
      segments: [
        { text: 'Rex follows the footprints to a cave. Do you go inside or look around outside?', emoji: '🦴', choices: [
          { text: 'Go inside the cave', emoji: '🕳️', next: 1 },
          { text: 'Look outside', emoji: '🌿', next: 2 },
        ]},
        { text: 'Inside the cave, you see a baby dinosaur sleeping! The footprints were hers!', emoji: '🥚', choices: [
          { text: 'Wake her gently', emoji: '✅', next: 3 },
        ]},
        { text: 'Outside, you find more footprints leading to a nest with eggs!', emoji: '🥚', choices: [
          { text: 'Check the nest', emoji: '✅', next: 3 },
        ]},
        { text: 'The mystery is solved! A baby dinosaur made the footprints. Rex has a new friend!', emoji: '🎉' },
      ],
    },
  ],
  ocean: [
    {
      title: 'The Festival Begins',
      emoji: '🌊',
      segments: [
        { text: 'Finn needs to find the biggest pearl. Do you search in the deep or near the reef?', emoji: '🐚', choices: [
          { text: 'Search the deep', emoji: '🌊', next: 1 },
          { text: 'Search the reef', emoji: '🪸', next: 2 },
        ]},
        { text: 'In the deep, a friendly whale helps you find the biggest pearl!', emoji: '🐋', choices: [
          { text: 'Thank the whale', emoji: '✅', next: 3 },
        ]},
        { text: 'At the reef, a clever octopus shows you where the pearl is hidden!', emoji: '🐙', choices: [
          { text: 'Thank the octopus', emoji: '✅', next: 3 },
        ]},
        { text: 'The Pearl Festival begins! All the sea creatures celebrate together!', emoji: '🎉' },
      ],
    },
  ],
  castle: [
    {
      title: 'The Dragon Friend',
      emoji: '🏰',
      segments: [
        { text: 'You find the dragon cave. Do you go in bravely or bring a gift first?', emoji: '🐉', choices: [
          { text: 'Go in bravely', emoji: '⚔️', next: 1 },
          { text: 'Bring a gift', emoji: '🎁', next: 2 },
        ]},
        { text: 'The dragon is impressed by your bravery and gives back the gems!', emoji: '💎', choices: [
          { text: 'Take the gems home', emoji: '✅', next: 3 },
        ]},
        { text: 'The dragon loves the gift and happily returns all the gems!', emoji: '💎', choices: [
          { text: 'Take the gems home', emoji: '✅', next: 3 },
        ]},
        { text: 'Princess Sparkle is so happy! The dragon became a friend of the castle!', emoji: '🎉' },
      ],
    },
  ],
  science: [
    {
      title: 'The Experiment Works',
      emoji: '🔬',
      segments: [
        { text: 'Professor Quark needs the right ingredient. Do you try the blue or the green one?', emoji: '🧪', choices: [
          { text: 'The blue one', emoji: '🔵', next: 1 },
          { text: 'The green one', emoji: '🟢', next: 2 },
        ]},
        { text: 'The blue ingredient makes the experiment bubble and glow!', emoji: '✨', choices: [
          { text: 'It worked!', emoji: '✅', next: 3 },
        ]},
        { text: 'The green ingredient makes a wonderful sparkly reaction!', emoji: '✨', choices: [
          { text: 'It worked!', emoji: '✅', next: 3 },
        ]},
        { text: 'The experiment is a success! Professor Quark says you are a true scientist!', emoji: '🎉' },
      ],
    },
  ],
  creativity: [
    {
      title: 'The Festival Show',
      emoji: '🎨',
      segments: [
        { text: 'Pip asks you to choose the theme. Nature or fantasy?', emoji: '🖌️', choices: [
          { text: 'Nature theme', emoji: '🌸', next: 1 },
          { text: 'Fantasy theme', emoji: '🦄', next: 2 },
        ]},
        { text: 'The nature theme creates a beautiful garden of colors!', emoji: '🌺', choices: [
          { text: 'Show the art', emoji: '✅', next: 3 },
        ]},
        { text: 'The fantasy theme creates a magical world of creatures!', emoji: '🌈', choices: [
          { text: 'Show the art', emoji: '✅', next: 3 },
        ]},
        { text: 'The Art Festival is a huge success! Everyone loves your creations!', emoji: '🎉' },
      ],
    },
  ],
};

export function generateStory(theme?: Theme): StoryData {
  const stories = theme ? (storyByTheme[theme] ?? storyByTheme.jungle) : [...storyByTheme.jungle, ...storyByTheme.space];
  return shuffle(stories)[0] ?? storyByTheme.jungle[0];
}

export const skillByActivity: Record<string, Skill> = {
  math: 'math',
  words: 'vocabulary',
  brain: 'logic',
  science: 'science',
  creativity: 'creativity',
  story: 'reading',
};

// Garden growth system: plant stages based on science activities completed
export type PlantStage = 'seed' | 'sprout' | 'sapling' | 'tree' | 'fruit';

export function getPlantStage(scienceCount: number): PlantStage {
  if (scienceCount >= 10) return 'fruit';
  if (scienceCount >= 6) return 'tree';
  if (scienceCount >= 3) return 'sapling';
  if (scienceCount >= 1) return 'sprout';
  return 'seed';
}

export const plantEmoji: Record<PlantStage, string> = {
  seed: '🌱',
  sprout: '🌿',
  sapling: '🌲',
  tree: '🌳',
  fruit: '🍎',
};

export const plantStageName: Record<PlantStage, string> = {
  seed: 'Tiny Seed',
  sprout: 'Little Sprout',
  sapling: 'Growing Tree',
  tree: 'Big Tree',
  fruit: 'Magical Fruit Tree',
};
