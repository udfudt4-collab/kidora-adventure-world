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
  missingIndex: number;
  options: string[];
  difficultyTier: 'beginner' | 'explorer' | 'master' | 'genius';
  category: string;
}

export interface BrainPuzzle {
  question: string;
  emoji: string;
  answer: string;
  options: string[];
  hint?: string;
  category: string;
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

export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
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
export function getDifficultyLevel(age: number, correctRatio: number = 0.5): number {
  if (age <= 5) return correctRatio > 0.7 ? 2 : 1;
  if (age <= 7) return correctRatio > 0.8 ? 3 : correctRatio > 0.4 ? 2 : 1;
  if (age <= 9) return correctRatio > 0.8 ? 4 : correctRatio > 0.4 ? 3 : 2;
  return correctRatio > 0.7 ? 4 : 3;
}

export function generateMathProblems(age: number, level = 1): MathProblem[] {
  const maxNum = level <= 1 ? 5 : level <= 2 ? 10 : level <= 3 ? 20 : 50;
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

// 🎯 AGE-ADAPTIVE WORD PROBLEMS DATABASE (Levels 1 to 4)
export function generateWordProblems(level = 1): WordProblem[] {
  // LEVEL 1: Age 4–5 (3-Letter CVC Phonics)
  const level1Words: WordProblem[] = [
    { emoji: '☀️', word: 'SUN', hint: 'Shines bright and warm in the sky', missingLetter: 'U', missingIndex: 1, options: ['U', 'A', 'O', 'E'], difficultyTier: 'beginner', category: 'Nature' },
    { emoji: '🐱', word: 'CAT', hint: 'A soft furry pet that says meow', missingLetter: 'A', missingIndex: 1, options: ['A', 'O', 'E', 'I'], difficultyTier: 'beginner', category: 'Animals' },
    { emoji: '🐶', word: 'DOG', hint: 'A loyal pet that wags its tail and barks', missingLetter: 'O', missingIndex: 1, options: ['O', 'A', 'U', 'E'], difficultyTier: 'beginner', category: 'Animals' },
    { emoji: '🦊', word: 'FOX', hint: 'A clever orange woodland animal with a bushy tail', missingLetter: 'O', missingIndex: 1, options: ['O', 'A', 'E', 'I'], difficultyTier: 'beginner', category: 'Animals' },
    { emoji: '🐝', word: 'BEE', hint: 'Makes sweet golden honey and buzzes on flowers', missingLetter: 'E', missingIndex: 1, options: ['E', 'A', 'O', 'I'], difficultyTier: 'beginner', category: 'Nature' },
    { emoji: '🎩', word: 'HAT', hint: 'You wear this on your head on sunny days', missingLetter: 'A', missingIndex: 1, options: ['A', 'O', 'U', 'I'], difficultyTier: 'beginner', category: 'Things' },
    { emoji: '🚌', word: 'BUS', hint: 'A big vehicle that carries children to school', missingLetter: 'U', missingIndex: 1, options: ['U', 'A', 'O', 'E'], difficultyTier: 'beginner', category: 'Vehicles' },
    { emoji: '🦉', word: 'OWL', hint: 'A wise night bird with large round eyes', missingLetter: 'W', missingIndex: 1, options: ['W', 'V', 'M', 'N'], difficultyTier: 'beginner', category: 'Animals' },
    { emoji: '🐷', word: 'PIG', hint: 'A pink farm animal that loves muddy puddles', missingLetter: 'I', missingIndex: 1, options: ['I', 'A', 'E', 'O'], difficultyTier: 'beginner', category: 'Animals' },
    { emoji: '☕', word: 'CUP', hint: 'A small container used to drink water or warm milk', missingLetter: 'U', missingIndex: 1, options: ['U', 'O', 'A', 'E'], difficultyTier: 'beginner', category: 'Things' },
  ];

  // LEVEL 2: Age 6–7 (4 to 5-Letter Phonics & Blends)
  const level2Words: WordProblem[] = [
    { emoji: '🐯', word: 'TIGER', hint: 'A majestic big cat with orange and black stripes', missingLetter: 'I', missingIndex: 1, options: ['I', 'E', 'A', 'Y'], difficultyTier: 'explorer', category: 'Animals' },
    { emoji: '🌱', word: 'PLANT', hint: 'Grows from a tiny seed in soil with water and sunlight', missingLetter: 'A', missingIndex: 2, options: ['A', 'E', 'O', 'U'], difficultyTier: 'explorer', category: 'Nature' },
    { emoji: '🌊', word: 'RIVER', hint: 'A continuous stream of fresh water flowing to the ocean', missingLetter: 'I', missingIndex: 1, options: ['I', 'E', 'Y', 'A'], difficultyTier: 'explorer', category: 'Nature' },
    { emoji: '💧', word: 'WATER', hint: 'The clear life-giving liquid we drink every day', missingLetter: 'T', missingIndex: 2, options: ['T', 'D', 'P', 'K'], difficultyTier: 'explorer', category: 'Health' },
    { emoji: '🦅', word: 'EAGLE', hint: 'A powerful bird of prey soaring high in the skies', missingLetter: 'G', missingIndex: 2, options: ['G', 'J', 'C', 'K'], difficultyTier: 'explorer', category: 'Animals' },
    { emoji: '✨', word: 'MAGIC', hint: 'Sparkling wonder, spells, and enchantments', missingLetter: 'A', missingIndex: 1, options: ['A', 'E', 'O', 'I'], difficultyTier: 'explorer', category: 'Fantasy' },
    { emoji: '⭐', word: 'STARS', hint: 'Shining celestial lights twinkling in the night sky', missingLetter: 'A', missingIndex: 2, options: ['A', 'O', 'E', 'U'], difficultyTier: 'explorer', category: 'Space' },
    { emoji: '🦓', word: 'ZEBRA', hint: 'An African safari animal with black and white stripes', missingLetter: 'B', missingIndex: 2, options: ['B', 'P', 'D', 'V'], difficultyTier: 'explorer', category: 'Animals' },
    { emoji: '☁️', word: 'CLOUD', hint: 'Fluffy white vapor floating across the blue sky', missingLetter: 'O', missingIndex: 2, options: ['O', 'U', 'A', 'E'], difficultyTier: 'explorer', category: 'Nature' },
    { emoji: '🦁', word: 'LION', hint: 'Known as the fearless king of the jungle', missingLetter: 'O', missingIndex: 2, options: ['O', 'A', 'E', 'I'], difficultyTier: 'explorer', category: 'Animals' },
  ];

  // LEVEL 3: Age 8–9 (6 to 7-Letter Rich Vocabulary)
  const level3Words: WordProblem[] = [
    { emoji: '🌋', word: 'VOLCANO', hint: 'A mountain with an opening that erupts with hot lava and ash', missingLetter: 'L', missingIndex: 2, options: ['L', 'R', 'K', 'T'], difficultyTier: 'master', category: 'Earth Science' },
    { emoji: '💎', word: 'CRYSTAL', hint: 'A sparkling, transparent, geometric mineral gemstone', missingLetter: 'S', missingIndex: 3, options: ['S', 'C', 'Z', 'T'], difficultyTier: 'master', category: 'Minerals' },
    { emoji: '🐬', word: 'DOLPHIN', hint: 'A friendly and highly intelligent sea mammal that loves jumping', missingLetter: 'P', missingIndex: 3, options: ['P', 'B', 'F', 'T'], difficultyTier: 'master', category: 'Ocean Life' },
    { emoji: '🌈', word: 'RAINBOW', hint: 'A colorful arc of 7 colors appearing after rain in sunlight', missingLetter: 'B', missingIndex: 4, options: ['B', 'P', 'D', 'V'], difficultyTier: 'master', category: 'Science' },
    { emoji: '🏛️', word: 'PYRAMID', hint: 'Ancient monumental triangular stone tombs built in Egypt', missingLetter: 'Y', missingIndex: 1, options: ['Y', 'I', 'E', 'A'], difficultyTier: 'master', category: 'History' },
    { emoji: '🌌', word: 'GALAXY', hint: 'A vast spiral system of billions of stars, gas, and planets', missingLetter: 'X', missingIndex: 4, options: ['X', 'Z', 'S', 'C'], difficultyTier: 'master', category: 'Astronomy' },
    { emoji: '🌴', word: 'JUNGLE', hint: 'A dense tropical forest teeming with wild animals and vines', missingLetter: 'N', missingIndex: 2, options: ['N', 'M', 'R', 'L'], difficultyTier: 'master', category: 'Geography' },
    { emoji: '🏰', word: 'CASTLE', hint: 'A fortified stone fortress where kings and queens lived', missingLetter: 'T', missingIndex: 3, options: ['T', 'S', 'L', 'D'], difficultyTier: 'master', category: 'History' },
    { emoji: '🐒', word: 'MONKEY', hint: 'An agile tree-climbing mammal with a long balancing tail', missingLetter: 'K', missingIndex: 3, options: ['K', 'C', 'Q', 'G'], difficultyTier: 'master', category: 'Animals' },
  ];

  // LEVEL 4: Age 10+ (7 to 10-Letter Science & Advanced Words)
  const level4Words: WordProblem[] = [
    { emoji: '🗺️', word: 'EXPEDITION', hint: 'An organized journey undertaken by explorers for a special purpose', missingLetter: 'E', missingIndex: 3, options: ['E', 'A', 'I', 'O'], difficultyTier: 'genius', category: 'Adventure' },
    { emoji: '🌿', word: 'SANCTUARY', hint: 'A protected place where animals, birds, and plants live safely', missingLetter: 'T', missingIndex: 4, options: ['T', 'C', 'S', 'D'], difficultyTier: 'genius', category: 'Ecology' },
    { emoji: '🦖', word: 'DINOSAUR', hint: 'Magnificent prehistoric reptile that roamed the Earth millions of years ago', missingLetter: 'S', missingIndex: 4, options: ['S', 'Z', 'C', 'T'], difficultyTier: 'genius', category: 'Paleontology' },
    { emoji: '🔭', word: 'TELESCOPE', hint: 'An optical device used by astronomers to view distant stars and planets', missingLetter: 'S', missingIndex: 4, options: ['S', 'C', 'Z', 'X'], difficultyTier: 'genius', category: 'Astronomy' },
    { emoji: '👨‍🚀', word: 'ASTRONAUT', hint: 'A trained spacefarer who travels beyond Earth atmosphere into orbit', missingLetter: 'N', missingIndex: 5, options: ['N', 'M', 'R', 'L'], difficultyTier: 'genius', category: 'Space' },
    { emoji: '⚡', word: 'LIGHTNING', hint: 'A powerful natural electrostatic discharge during a storm', missingLetter: 'T', missingIndex: 3, options: ['T', 'K', 'D', 'P'], difficultyTier: 'genius', category: 'Atmosphere' },
    { emoji: '🦋', word: 'BUTTERFLY', hint: 'An insect with colorful wings that emerges from a chrysalis', missingLetter: 'F', missingIndex: 6, options: ['F', 'P', 'V', 'T'], difficultyTier: 'genius', category: 'Biology' },
    { emoji: '🏆', word: 'CHAMPION', hint: 'A victor who has achieved excellence through hard work and dedication', missingLetter: 'M', missingIndex: 3, options: ['M', 'N', 'P', 'B'], difficultyTier: 'genius', category: 'Excellence' },
  ];

  let pool: WordProblem[];
  if (level <= 1) {
    pool = level1Words;
  } else if (level === 2) {
    pool = level2Words;
  } else if (level === 3) {
    pool = level3Words;
  } else {
    pool = level4Words;
  }

  return shuffle(pool)
    .slice(0, 3)
    .map((p) => ({
      ...p,
      options: shuffle(p.options),
    }));
}

// 🧠 AGE-ADAPTIVE BRAIN PUZZLES DATABASE (Levels 1 to 4)
export function generateBrainPuzzles(level = 1): BrainPuzzle[] {
  const level1Puzzles: BrainPuzzle[] = [
    { question: 'Which one comes next in the sequence? 🔴 🔵 🔴 🔵 🔴 ?', emoji: '🔵', answer: '🔵', options: ['🔵', '🔴', '🟢', '🟡'], hint: 'Notice how red and blue alternate!', category: 'Pattern' },
    { question: 'Which animal lives in the ocean?', emoji: '🌊', answer: '🐬 Dolphin', options: ['🐘 Elephant', '🐬 Dolphin', '🦁 Lion', '🐒 Monkey'], hint: 'Think of who breathes and swims underwater!', category: 'Nature' },
    { question: 'Which geometric shape has exactly 3 sides?', emoji: '📐', answer: 'Triangle 🔺', options: ['Square ⏹️', 'Triangle 🔺', 'Circle 🔴', 'Star ⭐'], hint: 'Count the straight sides: 1, 2, 3!', category: 'Geometry' },
    { question: 'What is the opposite of HOT?', emoji: '❄️', answer: 'Cold 🧊', options: ['Warm ☀️', 'Cold 🧊', 'Bright ✨', 'Fast ⚡'], hint: 'Think of delicious ice cream or snow!', category: 'Opposites' },
    { question: 'Find the odd one out in this garden group:', emoji: '🌸', answer: '🚗 Car', options: ['🌹 Rose', '🌻 Sunflower', '🚗 Car', '🌷 Tulip'], hint: 'Three are flowers, one is a machine!', category: 'Classification' },
  ];

  const level2Puzzles: BrainPuzzle[] = [
    { question: 'Find the missing number in the skip-counting pattern: 2, 4, 6, 8, ?', emoji: '🔢', answer: '10', options: ['9', '10', '11', '12'], hint: 'Count up by 2 each step!', category: 'Number Logic' },
    { question: 'What shines in the sky during the DAY and gives light to plants?', emoji: '☀️', answer: 'The Sun ☀️', options: ['The Moon 🌙', 'The Sun ☀️', 'Shooting Star 🌠', 'Flashlight 🔦'], hint: 'It warms our planet every morning!', category: 'Science' },
    { question: 'Which one does NOT belong with the others?', emoji: '🍎', answer: '🥕 Carrot', options: ['🍎 Apple', '🍌 Banana', '🥕 Carrot', '🍇 Grapes'], hint: 'Three grow on trees/vines as sweet fruits, one is a root vegetable!', category: 'Classification' },
    { question: 'If yesterday was Wednesday, what day is TOMORROW?', emoji: '📅', answer: 'Friday', options: ['Thursday', 'Friday', 'Saturday', 'Sunday'], hint: 'Yesterday: Wednesday -> Today: Thursday -> Tomorrow: ?', category: 'Time Reasoning' },
    { question: 'Complete the pattern: 🌙 ⭐ ⭐ 🌙 ⭐ ⭐ 🌙 ?', emoji: '⭐', answer: '⭐', options: ['⭐', '🌙', '☀️', '☁️'], hint: 'One moon is followed by two stars!', category: 'Pattern' },
  ];

  const level3Puzzles: BrainPuzzle[] = [
    { question: 'If NORTH is pointing UP, which direction is pointing to your RIGHT?', emoji: '🧭', answer: 'East ➡️', options: ['West ⬅️', 'East ➡️', 'South ⬇️', 'North-West ↖️'], hint: 'Remember: Never Eat Soggy Waffles (N, E, S, W)!', category: 'Navigation' },
    { question: 'I have hands but cannot clap. I have a face but cannot smile. What am I?', emoji: '⏰', answer: 'A Clock ⏰', options: ['A Mirror 🪞', 'A Clock ⏰', 'A Robot 🤖', 'A Painting 🖼️'], hint: 'It tells you when it is time for lunch and bedtime!', category: 'Riddle' },
    { question: 'Find the next number in this sequence: 3, 6, 12, 24, ?', emoji: '🧮', answer: '48', options: ['30', '36', '48', '50'], hint: 'Each number is doubled (multiplied by 2)!', category: 'Math Patterns' },
    { question: 'A mother has 4 daughters, and each daughter has 1 brother. How many children total?', emoji: '👨‍👩‍👧‍👦', answer: '5 Children', options: ['4 Children', '5 Children', '8 Children', '9 Children'], hint: 'All 4 sisters share the very same single brother!', category: 'Deductive Logic' },
    { question: 'Which animal is a warm-blooded mammal that lays eggs?', emoji: '🦫', answer: 'Platypus 🦆', options: ['Kangaroo 🦘', 'Platypus 🦆', 'Penguin 🐧', 'Crocodile 🐊'], hint: 'Famous Australian creature with a duck bill!', category: 'Biology' },
  ];

  const level4Puzzles: BrainPuzzle[] = [
    { question: 'Which planet is closest to the Sun in our Solar System?', emoji: '🪐', answer: 'Mercury ☿', options: ['Venus ♀', 'Mercury ☿', 'Mars ♂', 'Earth ♁'], hint: 'The smallest rocky planet orbiting closest to the solar core!', category: 'Astronomy' },
    { question: 'Rearrange the scrambled letters "P L A N E T" to name a celestial body:', emoji: '🌌', answer: 'PLANET', options: ['PLANET', 'PLANT', 'PLATE', 'PANEL'], hint: 'Earth, Mars, and Jupiter are all examples!', category: 'Anagrams' },
    { question: 'If 3 cats can catch 3 mice in 3 minutes, how many cats are needed to catch 100 mice in 100 minutes?', emoji: '🐱', answer: '3 Cats', options: ['1 Cat', '3 Cats', '33 Cats', '100 Cats'], hint: 'Each cat catches 1 mouse every 3 minutes continually!', category: 'Rate Logic' },
    { question: 'What gets wetter the more it dries?', emoji: '🧼', answer: 'A Towel 🛁', options: ['Water 💧', 'A Sponge 🧽', 'A Towel 🛁', 'The Sun ☀️'], hint: 'You use it when stepping out of the shower!', category: 'Lateral Thinking' },
    { question: 'Which state of matter takes both the shape and volume of its container?', emoji: '💨', answer: 'Gas 💨', options: ['Solid 🧊', 'Liquid 💧', 'Gas 💨', 'Crystal 💎'], hint: 'Molecules are spread far apart and move freely!', category: 'Physics' },
  ];

  let pool: BrainPuzzle[];
  if (level <= 1) pool = level1Puzzles;
  else if (level === 2) pool = level2Puzzles;
  else if (level === 3) pool = level3Puzzles;
  else pool = level4Puzzles;

  const picked = shuffle(pool)[0];
  return [
    {
      ...picked,
      options: shuffle(picked.options),
    },
  ];
}

export function generateScienceFacts(): ScienceFact[] {
  const facts = [
    {
      title: 'The Water Cycle',
      emoji: '💧',
      fact: 'Water evaporates from oceans into the sky, forms clouds, and returns as rain!',
      question: 'What happens when water vapor in clouds cools down?',
      answer: 'It falls as Rain 🌧️',
      options: ['It turns into Sand', 'It falls as Rain 🌧️', 'It turns into Gold', 'It disappears'],
    },
    {
      title: 'Photosynthesis & Plants',
      emoji: '🌱',
      fact: 'Plants absorb sunlight and carbon dioxide to produce oxygen for us to breathe!',
      question: 'What essential gas do healthy green plants produce for humans and animals?',
      answer: 'Oxygen 🌬️',
      options: ['Helium 🎈', 'Oxygen 🌬️', 'Carbon 🪨', 'Steam ♨️'],
    },
    {
      title: 'The Speed of Light',
      emoji: '⚡',
      fact: 'Sunlight travels 150 million kilometers to Earth in only 8 minutes and 20 seconds!',
      question: 'How long does light from the Sun take to reach our planet Earth?',
      answer: 'About 8 Minutes ⏱️',
      options: ['1 Second', 'About 8 Minutes ⏱️', '1 Full Day', '1 Year'],
    },
  ];
  return shuffle(facts).map((f) => ({
    ...f,
    options: shuffle(f.options),
  }));
}

export function generateStory(theme?: Theme): StoryData {
  const stories: Record<string, StoryData> = {
    jungle: {
      title: 'The Secret Waterfall of the Forest',
      emoji: '🌴',
      segments: [
        {
          text: 'You and Kido step deep into the emerald jungle. Ahead, a crystal river splits into two shimmering paths.',
          emoji: '🌊',
          choices: [
            { text: 'Follow the glowing flower path', emoji: '🌸', next: 1 },
            { text: 'Cross the bamboo rope bridge', emoji: '🌉', next: 2 },
          ],
        },
        {
          text: 'The glowing blossoms lead you directly to a hidden lagoon filled with singing golden frogs!',
          emoji: '🐸',
          choices: [
            { text: 'Listen to their harmonious melody', emoji: '🎵', next: 3 },
            { text: 'Follow the rainbow mist ahead', emoji: '🌈', next: 3 },
          ],
        },
        {
          text: 'Across the bamboo bridge, you discover an ancient tree trunk carved with wisdom symbols.',
          emoji: '🌳',
          choices: [
            { text: 'Place your hand on the carving', emoji: '✨', next: 3 },
            { text: 'Call out a cheerful explorer hello', emoji: '👋', next: 3 },
          ],
        },
        {
          text: 'The forest opens into the legendary Waterfall of Wonder! A golden badge sparkles in the spray!',
          emoji: '🏆',
        },
      ],
    },
  };

  const selectedTheme = theme && stories[theme] ? theme : 'jungle';
  return stories[selectedTheme] || stories.jungle;
}
