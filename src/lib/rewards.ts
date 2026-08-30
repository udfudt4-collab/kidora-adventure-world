import type { Theme } from './types';

export interface ShareableReward {
  badgeName: string;
  theme: Theme;
  certificateTitle: string;
  certificateMessage: string;
  certificateEmoji: string;
  challengeTitle: string;
  challengeQuestion: string;
  challengeEmoji: string;
  showcaseTitle: string;
  showcaseDescription: string;
  showcaseEmoji: string;
}

const rewards: Record<string, ShareableReward> = {
  'Jungle Explorer': {
    badgeName: 'Jungle Explorer',
    theme: 'jungle',
    certificateTitle: 'Jungle Explorer Certificate',
    certificateMessage: 'explored the magical jungle and helped Leo find his way home!',
    certificateEmoji: '🦜',
    challengeTitle: 'Can you find 5 jungle animals?',
    challengeQuestion: 'How many animals can you spot hiding in the jungle?',
    challengeEmoji: '🌳',
    showcaseTitle: 'Jungle Adventure Story',
    showcaseDescription: 'completed a jungle adventure with 6 missions!',
    showcaseEmoji: '🌴',
  },
  'Space Cadet': {
    badgeName: 'Space Cadet',
    theme: 'space',
    certificateTitle: 'Space Cadet Certificate',
    certificateMessage: 'rescued a lost robot from Mars and completed a space mission!',
    certificateEmoji: '👨‍🚀',
    challengeTitle: 'Can you name 3 planets?',
    challengeQuestion: 'Which planet is closest to the sun?',
    challengeEmoji: '🚀',
    showcaseTitle: 'Space Rescue Mission',
    showcaseDescription: 'completed a space rescue adventure with 6 missions!',
    showcaseEmoji: '🪐',
  },
  'Dino Discoverer': {
    badgeName: 'Dino Discoverer',
    theme: 'dinosaurs',
    certificateTitle: 'Dino Discoverer Certificate',
    certificateMessage: 'solved the mystery of the dinosaur footprints!',
    certificateEmoji: '🦴',
    challengeTitle: 'Can you match the dinos?',
    challengeQuestion: 'Which dinosaur had the longest neck?',
    challengeEmoji: '🦖',
    showcaseTitle: 'Dinosaur Mystery Story',
    showcaseDescription: 'completed a dinosaur valley adventure with 6 missions!',
    showcaseEmoji: '🦕',
  },
  'Ocean Diver': {
    badgeName: 'Ocean Diver',
    theme: 'ocean',
    certificateTitle: 'Ocean Diver Certificate',
    certificateMessage: 'helped Finn the dolphin prepare for the Pearl Festival!',
    certificateEmoji: '🐠',
    challengeTitle: 'Can you find 6 sea creatures?',
    challengeQuestion: 'Which sea creature has 8 arms?',
    challengeEmoji: '🌊',
    showcaseTitle: 'Ocean Festival Story',
    showcaseDescription: 'completed an ocean world adventure with 6 missions!',
    showcaseEmoji: '🐬',
  },
  'Castle Hero': {
    badgeName: 'Castle Hero',
    theme: 'castle',
    certificateTitle: 'Castle Hero Certificate',
    certificateMessage: 'found all the missing gems and befriended a dragon!',
    certificateEmoji: '👑',
    challengeTitle: 'Can you solve the riddle?',
    challengeQuestion: 'I have a crown but no head. What am I?',
    challengeEmoji: '🏰',
    showcaseTitle: 'Castle Adventure Story',
    showcaseDescription: 'completed a fantasy castle adventure with 6 missions!',
    showcaseEmoji: '💎',
  },
  'Little Scientist': {
    badgeName: 'Little Scientist',
    theme: 'science',
    certificateTitle: 'Little Scientist Certificate',
    certificateMessage: 'helped Professor Quark fix the experiment and made a discovery!',
    certificateEmoji: '⚗️',
    challengeTitle: 'Can you guess the science answer?',
    challengeQuestion: 'What do plants need to grow?',
    challengeEmoji: '🔬',
    showcaseTitle: 'Science Lab Story',
    showcaseDescription: 'completed a science lab adventure with 6 missions!',
    showcaseEmoji: '🧪',
  },
  'Creative Star': {
    badgeName: 'Creative Star',
    theme: 'creativity',
    certificateTitle: 'Creative Star Certificate',
    certificateMessage: 'created amazing art and helped Pip at the Art Festival!',
    certificateEmoji: '🎨',
    challengeTitle: 'Can you draw a rainbow?',
    challengeQuestion: 'How many colors are in a rainbow?',
    challengeEmoji: '🌈',
    showcaseTitle: 'Art Festival Story',
    showcaseDescription: 'completed a creative studio adventure with 6 missions!',
    showcaseEmoji: '🖌️',
  },
};

export function getShareableReward(badgeName: string): ShareableReward | null {
  return rewards[badgeName] ?? null;
}

export function getAllShareableRewards(): ShareableReward[] {
  return Object.values(rewards);
}

export const APP_PUBLIC_URL = 'https://kidora-liard.vercel.app/';

export function getMissionPraise(childName: string, stars: number, missionType?: string, missionIndex = 0): {
  headline: string;
  subtext: string;
  voiceText: string;
} {
  const type = (missionType || 'challenge').toLowerCase();
  
  // 1 STAR: Warm, uplifting encouragement & "ALL THE BEST"
  if (stars <= 1) {
    const list1Star = [
      {
        headline: `ALL THE BEST, ${childName}! 💪`,
        subtext: type.includes('math')
          ? `Math takes practice! Every problem you try makes you smarter! ⭐`
          : type.includes('word') || type.includes('read')
          ? `Every new word makes you a stronger reader! Keep exploring! ⭐`
          : type.includes('brain') || type.includes('logic')
          ? `Keep training your brain! You're getting sharper every time! ⭐`
          : type.includes('science')
          ? `Great curiosity! Science is all about trying and discovering! ⭐`
          : `Every step makes you smarter and stronger! Proud of your effort! ⭐`,
      },
      {
        headline: `GOOD TRY, ${childName}! 🌟`,
        subtext: `You're on the learning journey! The next challenge is yours! ⭐`,
      },
      {
        headline: `KEEP SHINING, ${childName}! 🚀`,
        subtext: `Great explorers never give up! All the best for the next quest! ⭐`,
      },
    ];
    const picked = list1Star[missionIndex % list1Star.length] ?? list1Star[0]!;
    return {
      headline: picked.headline,
      subtext: picked.subtext,
      voiceText: `${picked.headline.replace(/[^\w\s,]/gi, '')}! ${picked.subtext.replace(/[^\w\s,]/gi, '')}`,
    };
  }

  // 2 STARS: High-energy recognition of great progress
  if (stars === 2) {
    const list2Stars = [
      {
        headline: `GREAT JOB, ${childName}! 👏`,
        subtext: type.includes('math')
          ? `Awesome math thinking! Your calculation skills are getting super sharp! ⭐⭐`
          : type.includes('word')
          ? `Great word power! You unlocked tricky vocabulary like a pro! ⭐⭐`
          : type.includes('brain') || type.includes('logic')
          ? `Sharp deductive reasoning! You solved that logic puzzle smoothly! ⭐⭐`
          : type.includes('science')
          ? `Wonderful observations! A true young explorer at work! ⭐⭐`
          : `Awesome effort on this ${missionType || 'challenge'}! You're doing great! ⭐⭐`,
      },
      {
        headline: `FANTASTIC, ${childName}! 🌈`,
        subtext: `You're making incredible progress! Let's keep exploring! ⭐⭐`,
      },
      {
        headline: `WAY TO GO, ${childName}! 🎯`,
        subtext: `Smart thinking and steady focus! Super proud of your work! ⭐⭐`,
      },
    ];
    const picked = list2Stars[missionIndex % list2Stars.length] ?? list2Stars[0]!;
    return {
      headline: picked.headline,
      subtext: picked.subtext,
      voiceText: `${picked.headline.replace(/[^\w\s,]/gi, '')}! ${picked.subtext.replace(/[^\w\s,]/gi, '')}`,
    };
  }

  // 3 STARS: Full mastery & important challenges completed — "BRAVO!" & "SUPERSTAR!"
  const list3Stars = [
    {
      headline: `BRAVO, ${childName}! 🎉`,
      subtext: type.includes('math')
        ? `You conquered this math challenge with brilliant mastery! ⭐⭐⭐`
        : type.includes('word')
        ? `You mastered these words with flying colors! True vocabulary champ! ⭐⭐⭐`
        : type.includes('brain') || type.includes('logic')
        ? `Unstoppable brainpower! You cracked the logic puzzle perfectly! ⭐⭐⭐`
        : type.includes('science')
        ? `Brilliant scientific discovery! A master junior scientist! ⭐⭐⭐`
        : type.includes('creat') || type.includes('art')
        ? `A masterpiece of imagination! Outstanding artistic creativity! ⭐⭐⭐`
        : `You conquered this mission with flying colors! 3 Stars Unlocked! ⭐⭐⭐`,
    },
    {
      headline: `SUPERSTAR ${childName}! 🌟`,
      subtext: `Incredible skill and focus! Maximum stars earned on this quest! ⭐⭐⭐`,
    },
    {
      headline: `GENIUS AT WORK, ${childName}! 💡`,
      subtext: `You solved that challenge like a true master! Spectacular job! ⭐⭐⭐`,
    },
    {
      headline: `OUTSTANDING, ${childName}! 🚀`,
      subtext: `Rocketing through missions with perfect precision! Top score! ⭐⭐⭐`,
    },
  ];
  const picked = list3Stars[missionIndex % list3Stars.length] ?? list3Stars[0]!;
  return {
    headline: picked.headline,
    subtext: picked.subtext,
    voiceText: `${picked.headline.replace(/[^\w\s,]/gi, '')}! ${picked.subtext.replace(/[^\w\s,]/gi, '')}`,
  };
}

export function getWhatsAppShareText(childName: string, badgeName?: string, stars?: number, theme?: string): string {
  const badgeText = badgeName ? `\n🏆 *Badge Unlocked:* ${badgeName}` : '';
  const starText = stars ? `\n⭐ *Stars Earned:* +${stars} Stars` : '';
  const themeText = theme ? `\n🗺️ *World Explored:* ${theme}` : '';

  return `🎉 *Proud Parent Moment!* 🌟\n\nMy superstar *${childName}* just conquered today's adventure on *Kidora Adventure World*! 🚀${badgeText}${starText}${themeText}\n\n🎨 Kidora is a playful, screen-safe learning app with Math, Logic, Science, Art & Stories for kids! 🌈\n\n📲 *Play on Web & Download Android APK here:* ${APP_PUBLIC_URL}`;
}

export function getWhatsAppShareUrl(childName: string, badgeName?: string, stars?: number, theme?: string): string {
  const text = getWhatsAppShareText(childName, badgeName, stars, theme);
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

export function getMissionWhatsAppShareUrl(childName: string, missionTitle: string, stars: number): string {
  const text = `🎉 *Proud Parent Moment!* 🌟\n\nMy child *${childName}* just conquered the *${missionTitle}* mission and earned *+${stars} Stars* on *Kidora Adventure World*! 🚀\n\n🧠 Fun, screen-safe Math, Logic & Science learning for kids! 🌈\n\n📲 *Play & Download here:* ${APP_PUBLIC_URL}`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

