/**
 * Warm, friendly, time-aware greeting and encouragement generator.
 * Speaks with genuine empathy like a caring friend to a parent.
 */

export interface ParentGreeting {
  title: string;
  subtitle: string;
  emoji: string;
  timeSlot: 'morning' | 'afternoon' | 'evening' | 'night';
}

const morningTemplates = [
  {
    title: (name: string) => `Good morning, ${name}! ☀️`,
    subtitle: 'Wishing you a calm start and happy smiles with your little ones.',
    emoji: '☕',
  },
  {
    title: (name: string) => `Rise and shine, ${name}! 🌼`,
    subtitle: 'Take a deep breath and a warm sip — you’ve got this today.',
    emoji: '🌻',
  },
  {
    title: (name: string) => `Fresh morning start, ${name}! 🌿`,
    subtitle: 'Kidora is ready to spark curiosity for your kids today.',
    emoji: '🌱',
  },
  {
    title: (name: string) => `Hey ${name}! Hope your morning feels gentle ✨`,
    subtitle: 'Every little hug and smile is making a big difference.',
    emoji: '🌈',
  },
];

const afternoonTemplates = [
  {
    title: (name: string) => `Good afternoon, ${name}! 🌤️`,
    subtitle: 'Midday check-in: Remember to drink some water and take a quick breath.',
    emoji: '💧',
  },
  {
    title: (name: string) => `Hey ${name}! Hope your day is flowing smoothly 💛`,
    subtitle: 'The kids are learning happily while you handle your day.',
    emoji: '✨',
  },
  {
    title: (name: string) => `Taking a quick pause, ${name}? ☕`,
    subtitle: 'You’re doing incredible work juggling everything for your family.',
    emoji: '🍪',
  },
  {
    title: (name: string) => `Good afternoon, ${name}! 🚀`,
    subtitle: 'Checking in on your family sanctuary • Everything is safe & sound.',
    emoji: '🛡️',
  },
];

const eveningTemplates = [
  {
    title: (name: string) => `Good evening, ${name}! 🌇`,
    subtitle: 'Winding down the day? Here’s your peaceful spot to check in.',
    emoji: '🍵',
  },
  {
    title: (name: string) => `Hey ${name}! Hope you had a lovely day 🌟`,
    subtitle: 'Family dinner, bedtime stories, or quiet moments — you did great today.',
    emoji: '🕯️',
  },
  {
    title: (name: string) => `Good evening, ${name}! 🌿`,
    subtitle: 'Another day of love and learning in the books. Be proud of yourself.',
    emoji: '🧡',
  },
  {
    title: (name: string) => `Cozy evening check-in, ${name} ✨`,
    subtitle: 'Your family hub is updated and all your private notes are safe.',
    emoji: '🛋️',
  },
];

const nightTemplates = [
  {
    title: (name: string) => `Quiet evening, ${name} 🌙`,
    subtitle: 'The house is calm. Here’s some peaceful me-time just for you.',
    emoji: '⭐',
  },
  {
    title: (name: string) => `Taking a little time for yourself, ${name}? ✨`,
    subtitle: 'Parenting is a 24/7 journey — you deserve this quiet break.',
    emoji: '🫖',
  },
  {
    title: (name: string) => `Rest well tonight, ${name} 💫`,
    subtitle: 'Everything is organized for tomorrow so you can sleep peacefully.',
    emoji: '🛌',
  },
  {
    title: (name: string) => `Hello in the quiet hours, ${name} 🕯️`,
    subtitle: 'Your private cycle, pregnancy, and family wellness sanctuary is right here.',
    emoji: '🌸',
  },
];

export const parentAffirmations = [
  "You don't have to be a perfect parent — being a loving one is everything.",
  "Small moments of genuine connection matter more than big grand plans.",
  "Taking care of yourself is an essential part of taking care of your children.",
  "You are your child's safest haven in this world.",
  "Take a breath — you are doing better than you think.",
];

export function getParentGreeting(parentName: string = 'Parent', date: Date = new Date()): ParentGreeting {
  const name = parentName.trim() || 'Parent';
  const hour = date.getHours();
  const dayIndex = date.getDate();

  let list = nightTemplates;
  let timeSlot: ParentGreeting['timeSlot'] = 'night';

  if (hour >= 5 && hour < 12) {
    list = morningTemplates;
    timeSlot = 'morning';
  } else if (hour >= 12 && hour < 17) {
    list = afternoonTemplates;
    timeSlot = 'afternoon';
  } else if (hour >= 17 && hour < 21) {
    list = eveningTemplates;
    timeSlot = 'evening';
  }

  const template = list[(dayIndex + hour) % list.length];

  return {
    title: template.title(name),
    subtitle: template.subtitle,
    emoji: template.emoji,
    timeSlot,
  };
}
