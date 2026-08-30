import type { AvatarConfig } from './types';

export const skinTones = ['#FFE0BD', '#FFCD94', '#EAC086', '#C68642', '#8D5524', '#5C3317'];
export const hairColors = ['#3B2417', '#6B4423', '#A0522D', '#D4A017', '#B22222', '#2F4F4F', '#FF69B4', '#8B00FF'];
export const outfitColors = ['#38bdf8', '#34d399', '#fbbf24', '#f472b6', '#a78bfa', '#fb923c', '#f87171', '#60a5fa'];
export const hatOptions = ['none', 'crown', 'cap', 'wizard', 'party'];
export const accessoryOptions = ['none', 'glasses', 'bowtie', 'scarf', 'wings'];

export const defaultAvatar: AvatarConfig = {
  skin: skinTones[1],
  hair: 'short',
  hairColor: hairColors[1],
  outfit: outfitColors[0],
  hat: 'none',
  accessory: 'none',
};

export const petOptions: { type: string; emoji: string; colors: string[] }[] = [
  { type: 'puppy', emoji: '🐶', colors: ['#D4A574', '#8B4513', '#E8E8E8'] },
  { type: 'kitten', emoji: '🐱', colors: ['#F0C8A0', '#5C4033', '#E8E8E8'] },
  { type: 'bunny', emoji: '🐰', colors: ['#F5F5F0', '#C8A878', '#FFB6C1'] },
  { type: 'panda', emoji: '🐼', colors: ['#FFFFFF', '#2F2F2F', '#E8E8E8'] },
  { type: 'fox', emoji: '🦊', colors: ['#E07020', '#8B4513', '#F5DEB3'] },
  { type: 'dino', emoji: '🦖', colors: ['#34d399', '#059669', '#a7f3d0'] },
  { type: 'dragon', emoji: '🐉', colors: ['#34d399', '#10b981', '#fbbf24'] },
  { type: 'unicorn', emoji: '🦄', colors: ['#f9a8d4', '#c4b5fd', '#fde68a'] },
];

export const petNames = ['Buddy', 'Luna', 'Pip', 'Sparky', 'Mochi', 'Ziggy', 'Coco', 'Pepper'];

export const hairStyles = ['short', 'long', 'curly', 'spiky', 'bun', 'bald'];
