// Baby Hub Data: Names Directory, Developmental Milestones & Baby Moments

import type { BabyName } from './types';

export const babyNamesDatabase: BabyName[] = [
  // A
  { id: 'bn-1', name: 'Aarav', gender: 'boy', meaning: 'Peaceful, calm sound, wisdom', origin: 'Sanskrit', popular: true },
  { id: 'bn-20', name: 'Ananya', gender: 'girl', meaning: 'Incomparable, unique, matchless', origin: 'Sanskrit', popular: true },
  { id: 'bn-21', name: 'Aria', gender: 'girl', meaning: 'Melody, song, gentle air', origin: 'Italian', popular: true },
  { id: 'bn-9', name: 'Advait', gender: 'boy', meaning: 'Unique, non-dual, limitless', origin: 'Sanskrit', popular: true },
  { id: 'bn-41', name: 'Arya', gender: 'unisex', meaning: 'Noble, honorable, spiritual melody', origin: 'Sanskrit / Persian', popular: true },

  // C & D
  { id: 'bn-29', name: 'Chloe', gender: 'girl', meaning: 'Blooming, green shoot, springtime', origin: 'Greek', popular: true },
  { id: 'bn-24', name: 'Diya', gender: 'girl', meaning: 'Bright lamp, divine radiant light', origin: 'Sanskrit', popular: true },

  // E & I
  { id: 'bn-2', name: 'Ethan', gender: 'boy', meaning: 'Strong, firm, enduring', origin: 'Hebrew', popular: true },
  { id: 'bn-25', name: 'Isla', gender: 'girl', meaning: 'Island, peaceful retreat', origin: 'Scottish', popular: true },
  { id: 'bn-28', name: 'Isha', gender: 'girl', meaning: 'One who protects, ruler', origin: 'Sanskrit', popular: true },

  // K & L
  { id: 'bn-4', name: 'Kabir', gender: 'boy', meaning: 'Great, powerful, respected', origin: 'Arabic / Sanskrit', popular: true },
  { id: 'bn-40', name: 'Kai', gender: 'unisex', meaning: 'Ocean, sea, forgiveness', origin: 'Hawaiian / Japanese', popular: true },
  { id: 'bn-3', name: 'Leo', gender: 'boy', meaning: 'Lion, brave and courageous', origin: 'Latin', popular: true },
  { id: 'bn-8', name: 'Lucas', gender: 'boy', meaning: 'Bright, shining, light-bringer', origin: 'Greek', popular: true },
  { id: 'bn-11', name: 'Liam', gender: 'boy', meaning: 'Resolute protector, strong-willed', origin: 'Irish', popular: true },

  // M & N
  { id: 'bn-22', name: 'Maya', gender: 'girl', meaning: 'Illusion, magic, creative water', origin: 'Sanskrit / Greek', popular: true },
  { id: 'bn-27', name: 'Mia', gender: 'girl', meaning: 'Beloved, ocean star, mine', origin: 'Italian / Scandinavian', popular: true },
  { id: 'bn-43', name: 'Milan', gender: 'unisex', meaning: 'Gracious, union, coming together', origin: 'Slavic / Sanskrit', popular: true },
  { id: 'bn-6', name: 'Noah', gender: 'boy', meaning: 'Rest, peace, comfort', origin: 'Hebrew', popular: true },

  // O & R
  { id: 'bn-5', name: 'Oliver', gender: 'boy', meaning: 'Olive tree, peace and harmony', origin: 'Latin', popular: true },
  { id: 'bn-7', name: 'Reyansh', gender: 'boy', meaning: 'Ray of sunlight, part of Lord Vishnu', origin: 'Sanskrit', popular: true },
  { id: 'bn-42', name: 'Rowan', gender: 'unisex', meaning: 'Little red one, rowan tree', origin: 'Gaelic', popular: true },

  // S, T & Z
  { id: 'bn-23', name: 'Sophia', gender: 'girl', meaning: 'Wisdom, divine knowledge', origin: 'Greek', popular: true },
  { id: 'bn-31', name: 'Saanvi', gender: 'girl', meaning: 'Goddess Lakshmi, one who is followed', origin: 'Sanskrit', popular: true },
  { id: 'bn-44', name: 'Samar', gender: 'unisex', meaning: 'Evening conversation, fruitful reward', origin: 'Arabic / Sanskrit', popular: true },
  { id: 'bn-45', name: 'Sky', gender: 'unisex', meaning: 'Limitless atmosphere, open freedom', origin: 'Old Norse', popular: true },
  { id: 'bn-26', name: 'Tara', gender: 'girl', meaning: 'Star, shining guiding light', origin: 'Sanskrit / Celtic', popular: true },
  { id: 'bn-12', name: 'Vivaan', gender: 'boy', meaning: 'Full of life, dawn rays', origin: 'Sanskrit', popular: true },
  { id: 'bn-10', name: 'Zayn', gender: 'boy', meaning: 'Beauty, grace, excellence', origin: 'Arabic', popular: true },
  { id: 'bn-30', name: 'Zara', gender: 'girl', meaning: 'Radiant flower, dawn princess', origin: 'Arabic / Hebrew', popular: true },
];

export interface BabyMilestoneStage {
  ageRange: string;
  stageName: string;
  emoji: string;
  cognitive: string;
  sensory: string;
  communication: string;
  movement: string;
  social: string;
  tryThisTogether: {
    title: string;
    description: string;
    emoji: string;
  };
}

export const babyMilestoneStages: BabyMilestoneStage[] = [
  {
    ageRange: '0–3 Months',
    stageName: 'Newborn Discovery',
    emoji: '🍼',
    cognitive: 'Watches faces intently and tracks moving objects across visual field.',
    sensory: 'Recognizes mother’s voice, smell, and calms with rhythmic rocking sounds.',
    communication: 'Makes cooing vowel sounds (ooh, aah) and cries distinctively for hunger vs tiredness.',
    movement: 'Lifts head briefly during tummy time; brings tiny hands to mouth.',
    social: 'First spontaneous social smiles (6–8 weeks) and calms with close gentle touch.',
    tryThisTogether: {
      title: '👶 Talk & Smile Exchange',
      description: 'Hold baby 10 inches from your face, make soft eye contact, and imitate their little coos and smiles.',
      emoji: '😊',
    },
  },
  {
    ageRange: '3–6 Months',
    stageName: 'Giggles & Rolling',
    emoji: '🧸',
    cognitive: 'Shows curiosity about the world; reaches for toys with both hands.',
    sensory: 'Enjoys textured fabric toys, soft rattles, and colorful high-contrast patterns.',
    communication: 'Laughs aloud, squeals with delight, and babbles consonant syllables (ba, da, ma).',
    movement: 'Rolls from tummy to back; pushes up onto elbows with chest raised.',
    social: 'Recognizes familiar family faces and enjoys playful interaction like peek-a-boo.',
    tryThisTogether: {
      title: '🪞 Tummy Time Mirror Play',
      description: 'Place an unbreakable baby-safe mirror in front of baby during tummy time to watch their own giggling expressions.',
      emoji: '🪞',
    },
  },
  {
    ageRange: '6–9 Months',
    stageName: 'Sitting & Exploring',
    emoji: '🥣',
    cognitive: 'Understands object permanence (searches for a toy hidden under a soft cloth).',
    sensory: 'Explores objects by putting them in mouth; enjoys water splashing during bath.',
    communication: 'Responds to their own name; strings sounds together ("bababa", "dadada").',
    movement: 'Sits independently without support; transfers toys from one hand to the other.',
    social: 'Distinguishes between family and strangers; shows excitement when seeing loved ones.',
    tryThisTogether: {
      title: '🥑 First Finger Food Discovery',
      description: 'Offer steamed carrot batons or soft avocado slices for baby to practice hand-to-mouth coordination.',
      emoji: '🥑',
    },
  },
  {
    ageRange: '9–12 Months',
    stageName: 'Crawling & First Words',
    emoji: '👣',
    cognitive: 'Imitates actions (clapping, drinking from toy cup); finds hidden objects easily.',
    sensory: 'Enjoys musical instruments, banging pots/spoons, and exploring crinkly paper.',
    communication: 'Says first meaningful word ("mama", "dada", "ball"); waves "bye-bye".',
    movement: 'Crawls smoothly on hands & knees; pulls up to stand on furniture (cruising).',
    social: 'Gives hugs to family and stuffed toys; tests cause-and-effect by dropping toys.',
    tryThisTogether: {
      title: '📖 Point & Name Storytime',
      description: 'Read a sturdy board book together, pointing at pictures of animals and making fun animal sounds.',
      emoji: '📚',
    },
  },
  {
    ageRange: '1–2 Years',
    stageName: 'Walking & Toddler Exploration',
    emoji: '🏃',
    cognitive: 'Sorts shapes and colors; follows simple 2-step requests ("Pick up the ball and give it to Mommy").',
    sensory: 'Enjoys finger painting, sensory bins (dry pasta/rice), and outdoor grass texture.',
    communication: 'Vocabulary expands to 20–50+ words; begins putting 2 words together ("more milk").',
    movement: 'Walks independently, climbs stairs with assistance, and stacks 4–6 wooden blocks.',
    social: 'Shows emerging empathy, plays alongside peers (parallel play), and asserts preferences.',
    tryThisTogether: {
      title: '🏰 Block Tower & Count',
      description: 'Build a tall block tower together, count "1, 2, 3!", and gently knock it down with laughter.',
      emoji: '🧱',
    },
  },
  {
    ageRange: '2–3 Years',
    stageName: 'Language Explosion & Imagination',
    emoji: '🎨',
    cognitive: 'Engages in imaginative pretend play (feeding a doll, driving a car); asks "Why?" often.',
    sensory: 'Discriminates musical rhythms, enjoys playdough sculpting, and dances to songs.',
    communication: 'Speaks in 3–4 word sentences; knows own name, age, and simple songs.',
    movement: 'Runs with balance, kicks a ball, jumps with both feet, and draws circles/lines.',
    social: 'Shows affection for playmates, shares with gentle guidance, and expresses range of emotions.',
    tryThisTogether: {
      title: '🌈 Color Sorting Safari',
      description: 'Scatter colorful household items and sort them into matching colored bowls together.',
      emoji: '🎨',
    },
  },
];

export const defaultBabyMoments = [
  { id: 'bm-1', momentKey: 'first_smile', title: 'First Sweet Smile', emoji: '😊', dateAchieved: '2026-02-14', notes: 'Smiled while looking at Mommy singing.' },
  { id: 'bm-2', momentKey: 'first_giggle', title: 'First Belly Laugh', emoji: '😂', dateAchieved: '2026-03-20', notes: 'Giggled during peek-a-boo with Dad.' },
  { id: 'bm-3', momentKey: 'first_tooth', title: 'First Tiny Tooth', emoji: '🦷', dateAchieved: '2026-05-10', notes: 'Bottom front central incisor emerged!' },
  { id: 'bm-4', momentKey: 'first_word', title: 'First Spoken Word', emoji: '💬', dateAchieved: '2026-06-18', notes: 'Said "Mama" while reaching out.' },
  { id: 'bm-5', momentKey: 'first_step', title: 'First Independent Steps', emoji: '👣', dateAchieved: null, notes: '' },
  { id: 'bm-6', momentKey: 'first_food', title: 'First Taste of Solid Food', emoji: '🥑', dateAchieved: '2026-04-02', notes: 'Loved sweet mashed avocado.' },
  { id: 'bm-7', momentKey: 'birthday_1', title: '1st Birthday Celebration', emoji: '🎂', dateAchieved: null, notes: '' },
];
