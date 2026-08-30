// Pregnancy Journey Database & Guides for Parents

export interface WeekInfo {
  week: number;
  trimester: 1 | 2 | 3;
  fruitComparison: string;
  fruitEmoji: string;
  lengthCm: number;
  weightGrams: number;
  babyDevelopment: string;
  motherBody: string;
  weeklyTip: string;
}

export const pregnancyWeeks: WeekInfo[] = [
  {
    week: 4,
    trimester: 1,
    fruitComparison: 'Poppy Seed',
    fruitEmoji: '🌱',
    lengthCm: 0.1,
    weightGrams: 0.1,
    babyDevelopment: 'Blastocyst implants into the uterine lining. The neural tube begins forming.',
    motherBody: 'May experience light spotting, tender breasts, and early hormonal shifts.',
    weeklyTip: 'Start daily prenatal vitamins with 400mcg+ folic acid.',
  },
  {
    week: 8,
    trimester: 1,
    fruitComparison: 'Raspberry',
    fruitEmoji: '🫐',
    lengthCm: 1.6,
    weightGrams: 1.0,
    babyDevelopment: 'Tiny webbed fingers and toes develop. Heart beats at ~150-170 bpm.',
    motherBody: 'Morning sickness, heightened sense of smell, and fatigue are common.',
    weeklyTip: 'Eat small, frequent meals with complex carbohydrates to ease nausea.',
  },
  {
    week: 12,
    trimester: 1,
    fruitComparison: 'Plum',
    fruitEmoji: '🍑',
    lengthCm: 5.4,
    weightGrams: 14,
    babyDevelopment: 'All vital organs, reflexes, fingernails, and vocal cords are formed.',
    motherBody: 'Nausea begins subsiding as the placenta takes over hormone production.',
    weeklyTip: 'Schedule your first trimester nuchal translucency scan with your doctor.',
  },
  {
    week: 16,
    trimester: 2,
    fruitComparison: 'Avocado',
    fruitEmoji: '🥑',
    lengthCm: 11.6,
    weightGrams: 100,
    babyDevelopment: 'Baby can hear your voice and make facial expressions. Eyes react to light.',
    motherBody: 'Pregnancy glow appears, energy levels return, and baby bump begins showing.',
    weeklyTip: 'Talk and play gentle music to baby—they are already listening!',
  },
  {
    week: 20,
    trimester: 2,
    fruitComparison: 'Banana',
    fruitEmoji: '🍌',
    lengthCm: 25.6,
    weightGrams: 300,
    babyDevelopment: 'Halfway mark! Vernix caseosa and lanugo protect baby’s delicate skin.',
    motherBody: 'You can feel distinct baby flutter kicks (quickening).',
    weeklyTip: 'Time for the comprehensive mid-pregnancy anatomy ultrasound scan.',
  },
  {
    week: 24,
    trimester: 2,
    fruitComparison: 'Mango',
    fruitEmoji: '🥭',
    lengthCm: 30.0,
    weightGrams: 600,
    babyDevelopment: 'Lungs begin producing surfactant. Taste buds are fully functional.',
    motherBody: 'Uterus expands upward. Mild Braxton Hicks contractions may begin.',
    weeklyTip: 'Stay hydrated with 8–10 glasses of water daily to support amniotic fluid.',
  },
  {
    week: 28,
    trimester: 3,
    fruitComparison: 'Eggplant',
    fruitEmoji: '🍆',
    lengthCm: 37.6,
    weightGrams: 1000,
    babyDevelopment: 'Baby can open and close their eyes, dream during REM sleep, and blink.',
    motherBody: 'Shortness of breath as the growing baby presses against the diaphragm.',
    weeklyTip: 'Start monitoring daily kick counts—aim for 10 kicks within 2 hours.',
  },
  {
    week: 32,
    trimester: 3,
    fruitComparison: 'Pineapple',
    fruitEmoji: '🍍',
    lengthCm: 42.4,
    weightGrams: 1700,
    babyDevelopment: 'Bones are fully hardened except for the flexible skull for birth.',
    motherBody: 'Lower back aches and frequent urination as baby settles lower.',
    weeklyTip: 'Practice pelvic tilts and gentle prenatal stretches for lower back relief.',
  },
  {
    week: 36,
    trimester: 3,
    fruitComparison: 'Honeydew Melon',
    fruitEmoji: '🍈',
    lengthCm: 47.4,
    weightGrams: 2600,
    babyDevelopment: 'Baby is head-down in vertex position. Immune system absorbs maternal antibodies.',
    motherBody: 'Baby drops into pelvis (lightening), making breathing easier.',
    weeklyTip: 'Pack your hospital birth bag and finalize your birth preferences plan.',
  },
  {
    week: 40,
    trimester: 3,
    fruitComparison: 'Watermelon',
    fruitEmoji: '🍉',
    lengthCm: 51.2,
    weightGrams: 3400,
    babyDevelopment: 'Full term! Baby is ready to meet the world and take their first breath.',
    motherBody: 'Cervix ripens and effaces. Contractions become regular and stronger.',
    weeklyTip: 'Rest, stay calm, and contact your doctor when contractions are 5 min apart.',
  },
];

export function getWeekData(week: number): WeekInfo {
  const found = pregnancyWeeks.find((w) => w.week === week);
  if (found) return found;
  // Interpolate nearest
  const sorted = [...pregnancyWeeks].sort((a, b) => Math.abs(a.week - week) - Math.abs(b.week - week));
  return {
    ...sorted[0],
    week,
    trimester: week <= 13 ? 1 : week <= 27 ? 2 : 3,
  };
}

export interface FoodGuideItem {
  name: string;
  category: 'superfood' | 'avoid';
  nutrient?: string;
  reason: string;
  emoji: string;
}

export const pregnancyFoodGuide: FoodGuideItem[] = [
  {
    name: 'Leafy Greens (Spinach, Kale)',
    category: 'superfood',
    nutrient: 'Folate & Iron',
    reason: 'Crucial for neural tube closure and red blood cell production.',
    emoji: '🥬',
  },
  {
    name: 'Eggs (Well Cooked)',
    category: 'superfood',
    nutrient: 'Choline & Protein',
    reason: 'Essential for baby brain development and cellular growth.',
    emoji: '🥚',
  },
  {
    name: 'Wild Salmon (Cooked)',
    category: 'superfood',
    nutrient: 'Omega-3 DHA',
    reason: 'Builds baby’s brain and retina tissue with low mercury risk.',
    emoji: '🐟',
  },
  {
    name: 'Greek Yogurt & Pasteurized Dairy',
    category: 'superfood',
    nutrient: 'Calcium & Probiotics',
    reason: 'Builds strong fetal bones and teeth while supporting mother digestion.',
    emoji: '🥛',
  },
  {
    name: 'Avocados & Nuts',
    category: 'superfood',
    nutrient: 'Healthy Fats & Potassium',
    reason: 'Helps relieve leg cramps and supports fetal skin growth.',
    emoji: '🥑',
  },
  {
    name: 'Raw or Undercooked Meat & Seafood',
    category: 'avoid',
    reason: 'Risk of toxoplasmosis, salmonella, and harmful bacteria.',
    emoji: '🥩',
  },
  {
    name: 'Unpasteurized Cheeses (Brie, Feta)',
    category: 'avoid',
    reason: 'Risk of Listeria monocytogenes which can cross the placenta.',
    emoji: '🧀',
  },
  {
    name: 'High-Mercury Fish (Shark, Swordfish, King Mackerel)',
    category: 'avoid',
    reason: 'Mercury can harm baby’s developing nervous system.',
    emoji: '🦈',
  },
  {
    name: 'Excess Caffeine (>200mg/day)',
    category: 'avoid',
    reason: 'Elevated heart rate and reduced fetal blood flow.',
    emoji: '☕',
  },
];

export interface PrenatalExercise {
  title: string;
  trimesterSafe: string;
  benefit: string;
  steps: string;
  emoji: string;
}

export const prenatalExercises: PrenatalExercise[] = [
  {
    title: 'Brisk Walking',
    trimesterSafe: 'All Trimesters (1, 2, 3)',
    benefit: 'Cardiovascular endurance & gentle joint mobility',
    steps: '20–30 minutes daily on flat terrain with supportive footwear.',
    emoji: '👟',
  },
  {
    title: 'Pelvic Floor Kegels',
    trimesterSafe: 'All Trimesters (1, 2, 3)',
    benefit: 'Strengthens pelvic floor for labor and postpartum recovery',
    steps: 'Contract pelvic muscles for 5 seconds, release for 5 seconds, repeat 10x.',
    emoji: '🧘‍♀️',
  },
  {
    title: 'Cat-Cow Spinal Stretch',
    trimesterSafe: 'Trimesters 1 & 2',
    benefit: 'Relieves lower back compression and aligns posture',
    steps: 'On all fours, inhale arching gently up, exhale rounding spine smoothly.',
    emoji: '🐈',
  },
  {
    title: 'Prenatal Squats against Wall',
    trimesterSafe: 'Trimesters 2 & 3',
    benefit: 'Opens the pelvis and strengthens quadriceps for labor',
    steps: 'Stand against a smooth wall, slide down into gentle squat, hold 5s.',
    emoji: '🦵',
  },
];

export const doctorQuestions = [
  'Is my current weight gain trajectory within the healthy recommended range for my BMI?',
  'What prenatal tests or scans are scheduled for my next checkup?',
  'Are there any specific vitamins, iron, or DHA supplements I should adjust?',
  'What symptoms (e.g., headache, swelling, reduced kicks) require immediate contact?',
  'When should I register with the hospital labor and delivery ward?',
  'Can I review my birth plan preferences and pain management options with you?',
];
