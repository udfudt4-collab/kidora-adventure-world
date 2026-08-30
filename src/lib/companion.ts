export type CompanionEmotion =
  | 'welcoming'
  | 'excited'
  | 'thinking'
  | 'laughing'
  | 'curious'
  | 'celebrating'
  | 'encouraging'
  | 'resting';

export interface CompanionState {
  name: string;
  species: 'magic-fox' | 'cosmic-dragon' | 'star-bear';
  emotion: CompanionEmotion;
  dialogue?: string;
}

export const companionPhrases: Record<CompanionEmotion, string[]> = {
  welcoming: [
    "Hey Explorer! I'm Kido, your adventure buddy! 🌟",
    "Welcome back! A brand new mystery is waiting for us today! ✨",
    "Ready for fun? The whole world is glowing today! 🌈",
  ],
  excited: [
    "WOOHOO! Look at that shiny secret! 🤩",
    "This is going to be our most epic adventure yet! 🚀",
    "I can't wait to see what you discover! ✨",
  ],
  thinking: [
    "Hmm... let's look closely at the pattern together! 🤔",
    "Take your time, superhero! We've got this! 💡",
    "Let me check my magic compass... 🧭",
  ],
  laughing: [
    "Hehehe! That tickles! 😂",
    "You are so much fun to explore with! 💖",
    "Best adventure ever! ✨",
  ],
  curious: [
    "Ooh! What do you think is hiding behind that cloud? 🔎",
    "I wonder where this magical trail leads... 🐾",
    "Let's investigate! 🌿",
  ],
  celebrating: [
    "BRAVO! You solved it! You're brilliant! 🥳🎉",
    "SUPERSTAR! The whole world is sparkling for you! 🌟",
    "High paw! You are an amazing explorer! 🐾✨",
  ],
  encouraging: [
    "Mistakes just mean your brain is growing bigger! 💪",
    "We can figure it out together, partner! 💚",
    "Try one more time—I believe in you! 🌈",
  ],
  resting: [
    "ZZZ... dreaming of starry constellations... 🌙",
    "Resting up for tomorrow's quest! 😴",
  ],
};

export function getRandomCompanionPhrase(emotion: CompanionEmotion, childName?: string): string {
  const list = companionPhrases[emotion] || companionPhrases.welcoming;
  const raw = list[Math.floor(Math.random() * list.length)] ?? "Let's explore together!";
  if (childName) {
    return raw.replace(/Explorer|superhero|partner/g, childName);
  }
  return raw;
}
