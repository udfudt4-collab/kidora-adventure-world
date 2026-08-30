// Baby Hub Data: Names Directory, Developmental Milestones & Baby Moments

import type { BabyName } from './types';

export const babyNamesDatabase: BabyName[] = [
  // Boys
  { id: 'bn-1', name: 'Aarav', gender: 'boy', meaning: 'Peaceful, calm sound, wisdom', origin: 'Sanskrit', popular: true },
  { id: 'bn-2', name: 'Ethan', gender: 'boy', meaning: 'Strong, firm, enduring', origin: 'Hebrew', popular: true },
  { id: 'bn-3', name: 'Leo', gender: 'boy', meaning: 'Lion, brave and courageous', origin: 'Latin', popular: true },
  { id: 'bn-4', name: 'Kabir', gender: 'boy', meaning: 'Great, powerful, respected', origin: 'Arabic / Sanskrit', popular: true },
  { id: 'bn-5', name: 'Oliver', gender: 'boy', meaning: 'Olive tree, peace and harmony', origin: 'Latin', popular: true },
  { id: 'bn-6', name: 'Noah', gender: 'boy', meaning: 'Rest, peace, comfort', origin: 'Hebrew', popular: true },
  { id: 'bn-7', name: 'Reyansh', gender: 'boy', meaning: 'Ray of sunlight, part of Lord Vishnu', origin: 'Sanskrit', popular: true },
  { id: 'bn-8', name: 'Lucas', gender: 'boy', meaning: 'Bright, shining, light-bringer', origin: 'Greek', popular: true },
  { id: 'bn-9', name: 'Advait', gender: 'boy', meaning: 'Unique, non-dual, limitless', origin: 'Sanskrit', popular: true },
  { id: 'bn-10', name: 'Zayn', gender: 'boy', meaning: 'Beauty, grace, excellence', origin: 'Arabic', popular: true },
  { id: 'bn-11', name: 'Liam', gender: 'boy', meaning: 'Resolute protector, strong-willed', origin: 'Irish', popular: true },
  { id: 'bn-12', name: 'Vivaan', gender: 'boy', meaning: 'Full of life, dawn rays', origin: 'Sanskrit', popular: true },

  // Girls
  { id: 'bn-20', name: 'Ananya', gender: 'girl', meaning: 'Incomparable, unique, matchless', origin: 'Sanskrit', popular: true },
  { id: 'bn-21', name: 'Aria', gender: 'girl', meaning: 'Melody, song, gentle air', origin: 'Italian', popular: true },
  { id: 'bn-22', name: 'Maya', gender: 'girl', meaning: 'Illusion, magic, creative water', origin: 'Sanskrit / Greek', popular: true },
  { id: 'bn-23', name: 'Sophia', gender: 'girl', meaning: 'Wisdom, divine knowledge', origin: 'Greek', popular: true },
  { id: 'bn-24', name: 'Diya', gender: 'girl', meaning: 'Bright lamp, divine radiant light', origin: 'Sanskrit', popular: true },
  { id: 'bn-25', name: 'Isla', gender: 'girl', meaning: 'Island, peaceful retreat', origin: 'Scottish', popular: true },
  { id: 'bn-26', name: 'Tara', gender: 'girl', meaning: 'Star, shining guiding light', origin: 'Sanskrit / Celtic', popular: true },
  { id: 'bn-27', name: 'Mia', gender: 'girl', meaning: 'Beloved, ocean star, mine', origin: 'Italian / Scandinavian', popular: true },
  { id: 'bn-28', name: 'Isha', gender: 'girl', meaning: 'One who protects, ruler', origin: 'Sanskrit', popular: true },
  { id: 'bn-29', name: 'Chloe', gender: 'girl', meaning: 'Blooming, green shoot, springtime', origin: 'Greek', popular: true },
  { id: 'bn-30', name: 'Zara', gender: 'girl', meaning: 'Radiant flower, dawn princess', origin: 'Arabic / Hebrew', popular: true },
  { id: 'bn-31', name: 'Saanvi', gender: 'girl', meaning: 'Goddess Lakshmi, one who is followed', origin: 'Sanskrit', popular: true },

  // Unisex
  { id: 'bn-40', name: 'Kai', gender: 'unisex', meaning: 'Ocean, sea, forgiveness', origin: 'Hawaiian / Japanese', popular: true },
  { id: 'bn-41', name: 'Arya', gender: 'unisex', meaning: 'Noble, honorable, spiritual melody', origin: 'Sanskrit / Persian', popular: true },
  { id: 'bn-42', name: 'Rowan', gender: 'unisex', meaning: 'Little red one, rowan tree', origin: 'Gaelic', popular: true },
  { id: 'bn-43', name: 'Milan', gender: 'unisex', meaning: 'Gracious, union, coming together', origin: 'Slavic / Sanskrit', popular: true },
  { id: 'bn-44', name: 'Samar', gender: 'unisex', meaning: 'Evening conversation, fruitful reward', origin: 'Arabic / Sanskrit', popular: true },
  { id: 'bn-45', name: 'Sky', gender: 'unisex', meaning: 'Limitless atmosphere, open freedom', origin: 'Old Norse', popular: true },
];

export interface BabyMilestoneStage {
  ageRange: string;
  stageName: string;
  emoji: string;
  motorSkills: string[];
  cognitiveSocial: string[];
  parentTips: string;
}

export const babyMilestoneStages: BabyMilestoneStage[] = [
  {
    ageRange: '0–3 Months',
    stageName: 'Newborn Discovery',
    emoji: '🍼',
    motorSkills: ['Lifts head during tummy time', 'Opens and closes hands', 'Brings hands to mouth'],
    cognitiveSocial: ['First social smiles (6–8 weeks)', 'Focuses on faces 8–12 inches away', 'Turns head toward familiar voices'],
    parentTips: 'Practice 2–3 minutes of daily supervised tummy time and respond promptly to cries to build secure attachment.',
  },
  {
    ageRange: '3–6 Months',
    stageName: 'Giggles & Rolling',
    emoji: '🧸',
    motorSkills: ['Rolls from tummy to back', 'Reaches for and grabs colorful rattles', 'Supports weight on legs when held upright'],
    cognitiveSocial: ['Laughs and squeals with joy', 'Babbles consonant sounds (ba, ma, da)', 'Recognizes familiar family members'],
    parentTips: 'Engage in peek-a-boo and hold textured toys within reaching distance to build spatial hand-eye coordination.',
  },
  {
    ageRange: '6–9 Months',
    stageName: 'Sitting & Exploring',
    emoji: '🥣',
    motorSkills: ['Sits without support', 'Passes objects from one hand to another', 'Starts transitioning to solid purees & finger food'],
    cognitiveSocial: ['Understands object permanence (looks for hidden toys)', 'Responds to own name', 'Claps hands (pat-a-cake)'],
    parentTips: 'Introduce safe single-ingredient finger foods (steamed carrot sticks, banana) to encourage self-feeding.',
  },
  {
    ageRange: '9–12 Months',
    stageName: 'Crawling & First Words',
    emoji: '👣',
    motorSkills: ['Crawls on hands and knees', 'Pulls up to stand on furniture (cruising)', 'Pincer grasp (picks up small objects with thumb & index)'],
    cognitiveSocial: ['Says first recognizable word ("mama", "dada", "baba")', 'Waves goodbye and shakes head "no"', 'Points to desired objects'],
    parentTips: 'Baby-proof lower cabinets and stairs. Read board books daily pointing at pictures and naming everyday objects.',
  },
  {
    ageRange: '1–2 Years',
    stageName: 'Walking & Toddler World',
    emoji: '🏃',
    motorSkills: ['Walks independently and begins running', 'Stacks 3–4 blocks', 'Drinks from an open cup'],
    cognitiveSocial: ['Vocabulary expands to 20–50+ words', 'Imitates household chores (sweeping, wiping)', 'Shows simple empathy (hugs teddy bear)'],
    parentTips: 'Encourage independent play while offering clear, gentle boundaries. Limit background screens to encourage real language exchange.',
  },
];

export const defaultBabyMoments = [
  { id: 'bm-1', momentKey: 'first_smile', title: 'First Sweet Smile', emoji: '😊', dateAchieved: null, notes: '' },
  { id: 'bm-2', momentKey: 'first_giggle', title: 'First Belly Laugh', emoji: '😂', dateAchieved: null, notes: '' },
  { id: 'bm-3', momentKey: 'first_word', title: 'First Spoken Word', emoji: '💬', dateAchieved: null, notes: '' },
  { id: 'bm-4', momentKey: 'first_tooth', title: 'First Tiny Tooth', emoji: '🦷', dateAchieved: null, notes: '' },
  { id: 'bm-5', momentKey: 'first_step', title: 'First Independent Steps', emoji: '👣', dateAchieved: null, notes: '' },
  { id: 'bm-6', momentKey: 'first_food', title: 'First Taste of Solid Food', emoji: '🥑', dateAchieved: null, notes: '' },
  { id: 'bm-7', momentKey: 'birthday_1', title: '1st Birthday Celebration', emoji: '🎂', dateAchieved: null, notes: '' },
];
