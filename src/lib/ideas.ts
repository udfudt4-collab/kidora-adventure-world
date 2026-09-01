// Community Ideas, Feature Voting & Beta Co-Creation Hub Data
import type { CommunityIdea, IdeaCategory, IdeaStatus } from './types';

export const IDEA_CATEGORIES: { id: IdeaCategory; title: string; emoji: string; color: string }[] = [
  { id: 'games', title: 'Games & Puzzles', emoji: '🎮', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  { id: 'languages', title: 'Languages & Voice', emoji: '🗣️', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { id: 'learning', title: 'Learning & Phonics', emoji: '🧠', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { id: 'parent', title: 'Parent Zone & Health', emoji: '👨‍👩‍👧', color: 'bg-rose-100 text-rose-800 border-rose-200' },
  { id: 'creative', title: 'Art & World Decor', emoji: '🎨', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { id: 'general', title: 'General & Magic World', emoji: '✨', color: 'bg-sky-100 text-sky-800 border-sky-200' },
];

export const IDEA_STATUS_CONFIG: Record<
  IdeaStatus,
  { label: string; emoji: string; bg: string; text: string; border: string }
> = {
  in_development: {
    label: 'In Development',
    emoji: '🚀',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  planned: {
    label: 'Planned for Next Release',
    emoji: '📅',
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    border: 'border-sky-200',
  },
  under_review: {
    label: 'Under Review',
    emoji: '💡',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  completed: {
    label: 'Live in Beta',
    emoji: '🎉',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
  },
};

export const defaultCommunityIdeas: CommunityIdea[] = [
  {
    id: 'idea-1',
    title: 'Tamil Voice Narration & Traditional Story Lore',
    description:
      'Please add full audio voice narration in classical & spoken Tamil for story missions and phonics letter cards so kids can listen and learn authentic Tamil pronunciation naturally.',
    category: 'languages',
    authorName: 'Priya & Kavitha (Mom & Teacher)',
    authorAvatar: '👩‍🏫',
    votesCount: 148,
    votedByMe: false,
    status: 'in_development',
    tags: ['Tamil', 'Voice Narration', 'Bilingual'],
    officialResponse: {
      responderName: 'Karthik & Dev Team',
      responderTitle: 'Kidora Engineering & Pedagogy',
      message:
        'Great news! We are currently studio recording native Tamil voice tracks for storybooks, phonics puzzles, and character greetings. Target release is in our upcoming Beta v1.6.0 update!',
      respondedAt: '2026-08-30',
    },
    comments: [
      {
        id: 'c-1',
        authorName: 'Suresh M.',
        authorRole: 'parent',
        comment: 'This will be wonderful for our kids at home to learn their mother tongue!',
        createdAt: '2026-08-30',
      },
    ],
    createdAt: '2026-08-28',
  },
  {
    id: 'idea-2',
    title: 'Audio-Only Bedtime Story Mode with Sleep Timer (No Screen Blue Light)',
    description:
      'A cozy night-time mode where the screen dims to a calming starry night and soft narration plays relaxing bedtime adventures so children can fall asleep without staring at the screen.',
    category: 'parent',
    authorName: 'Dr. Ananya S. (Child Psychologist)',
    authorAvatar: '🩺',
    votesCount: 124,
    votedByMe: false,
    status: 'planned',
    tags: ['Bedtime', 'Audio Only', 'Sleep Health'],
    officialResponse: {
      responderName: 'Sarah Jenkins',
      responderTitle: 'Kidora Wellness Lead',
      message:
        'We love this idea! A zero-blue-light audio relaxation player with soft ambient jungle sounds and gentle 15-minute sleep timers is on our development roadmap.',
      respondedAt: '2026-08-29',
    },
    comments: [],
    createdAt: '2026-08-27',
  },
  {
    id: 'idea-3',
    title: '1v1 Live Friend Challenges with Mystery Rewards',
    description:
      'Allow children to invite friends via a fun invite code for live 2-minute Math sprints, Word scrambles, or movement jumping jack challenges with winner badges and mystery chests!',
    category: 'games',
    authorName: 'Rahul (Age 8) & Parent Arvind',
    authorAvatar: '👦',
    votesCount: 112,
    votedByMe: true,
    status: 'completed',
    tags: ['Friend Battles', 'Puzzles', 'Multiplayer'],
    officialResponse: {
      responderName: 'Kidora Product Team',
      responderTitle: 'Game Design',
      message:
        'Now live in Beta! You can visit the ⚔️ Friend vs Friend Battles tab inside Challenges to send battle challenges, earn +50 points, and open 3D Mystery Chests!',
      respondedAt: '2026-08-31',
    },
    comments: [
      {
        id: 'c-2',
        authorName: 'Deepak V.',
        authorRole: 'parent',
        comment: 'My son tested the Volcano Quest battle with his cousin today and loved it!',
        createdAt: '2026-08-31',
      },
    ],
    createdAt: '2026-08-25',
  },
  {
    id: 'idea-4',
    title: 'Printable Weekly Milestone, Sleep & Hydration Certificates',
    description:
      'Provide a one-tap button for parents to generate a cute printable PDF or image summary of weekly learning achievements, hydration streaks, and sleep logs to hang on the fridge.',
    category: 'parent',
    authorName: 'Meera Rajesh',
    authorAvatar: '👩‍👧',
    votesCount: 96,
    votedByMe: false,
    status: 'completed',
    tags: ['Printables', 'Parent Report', 'Fridge Certificates'],
    officialResponse: {
      responderName: 'Kidora Team',
      responderTitle: 'Parent Experience',
      message:
        'Live in Beta! Parents can now tap "Share Image to WhatsApp / Save Certificate" on all completed missions and download progress summaries from the Parent Dashboard.',
      respondedAt: '2026-08-30',
    },
    comments: [],
    createdAt: '2026-08-26',
  },
  {
    id: 'idea-5',
    title: 'Multiplication Tables & Fast Math Sprint Gates',
    description:
      'Add multiplication tables (2x to 12x) and fast-paced visual speed drills with rocket fuel boosts for kids in 3rd to 5th grade.',
    category: 'learning',
    authorName: 'Vikram Sundaram',
    authorAvatar: '👨‍👦',
    votesCount: 78,
    votedByMe: false,
    status: 'under_review',
    tags: ['Math', 'Multiplication', 'Speed Sprints'],
    officialResponse: {
      responderName: 'Math Content Team',
      responderTitle: 'Curriculum Designers',
      message:
        'We have designed the 4-tier age adaptation and are currently building the dedicated Times Table Cosmic Launcher game. Thanks for the suggestion!',
      respondedAt: '2026-08-31',
    },
    comments: [],
    createdAt: '2026-08-29',
  },
  {
    id: 'idea-6',
    title: 'More Avatar Costumes: Explorer Hats, Capes & Nature Pets',
    description:
      'Unlockable wizard capes, astronaut helmets, and baby dragon companions that walk beside the character in the Living World.',
    category: 'creative',
    authorName: 'Maya (Age 7)',
    authorAvatar: '👧',
    votesCount: 65,
    votedByMe: false,
    status: 'in_development',
    tags: ['Avatars', 'Cosmetics', 'Living World'],
    comments: [],
    createdAt: '2026-08-30',
  },
];
