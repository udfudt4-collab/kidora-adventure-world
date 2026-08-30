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
  superfoods: string;
  safeExercise: string;
  doctorQuestion: string;
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
    superfoods: 'Dark leafy greens (Spinach, Kale) & fortified cereals for folate.',
    safeExercise: 'Gentle 20-minute daily walking on flat ground.',
    doctorQuestion: 'Which prenatal vitamin formula do you recommend for my history?',
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
    superfoods: 'Ginger tea, whole wheat crackers, and Greek yogurt.',
    safeExercise: 'Pelvic floor Kegel contractions (10 reps, 3x daily).',
    doctorQuestion: 'What options do I have if morning sickness affects my hydration?',
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
    superfoods: 'Cooked wild salmon & chia seeds for Omega-3 DHA.',
    safeExercise: 'Gentle cat-cow spinal stretch on a yoga mat.',
    doctorQuestion: 'When should we schedule the 12-week ultrasound and genetic screening?',
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
    superfoods: 'Avocados, almonds, and lean poultry for iron and protein.',
    safeExercise: 'Brisk walking & side-lying leg lifts.',
    doctorQuestion: 'Is my blood pressure and hemoglobin levels within normal range?',
  },
  {
    week: 18,
    trimester: 2,
    fruitComparison: 'Bell Pepper',
    fruitEmoji: '🫑',
    lengthCm: 14.2,
    weightGrams: 190,
    babyDevelopment: 'Myelin develops to insulate nerves. Baby practices swallowing amniotic fluid.',
    motherBody: 'You may feel soft fluttering kicks (quickening) for the first time.',
    weeklyTip: 'Rest your feet elevated in the evening to reduce ankle swelling.',
    superfoods: 'Pasteurized cottage cheese, lentils, and sweet potatoes.',
    safeExercise: 'Prenatal yoga with modified poses avoiding flat-back lying.',
    doctorQuestion: 'What should I prepare for our upcoming 20-week anatomy scan?',
  },
  {
    week: 20,
    trimester: 2,
    fruitComparison: 'Banana',
    fruitEmoji: '🍌',
    lengthCm: 25.6,
    weightGrams: 300,
    babyDevelopment: 'Halfway mark! Vernix caseosa and lanugo protect baby’s delicate skin.',
    motherBody: 'You can feel distinct baby flutter kicks and movements.',
    weeklyTip: 'Time for the comprehensive mid-pregnancy anatomy ultrasound scan.',
    superfoods: 'Hard-boiled eggs for choline and calcium-rich dairy.',
    safeExercise: 'Pelvic tilts and gentle wall squats.',
    doctorQuestion: 'Can we review the anatomy scan results and placenta position?',
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
    superfoods: 'Fresh berries, oats, and pumpkin seeds for magnesium.',
    safeExercise: 'Supported squats and seated pelvic rocking on an exercise ball.',
    doctorQuestion: 'When is my gestational diabetes glucose screening test scheduled?',
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
    superfoods: 'Iron-rich beans, spinach with lemon juice, and lean meats.',
    safeExercise: 'Gentle swimming or water aerobics to relieve joint pressure.',
    doctorQuestion: 'If I am Rh-negative, when do I receive the RhoGAM injection?',
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
    superfoods: 'Prunes, flaxseeds, and plenty of warm water to support digestion.',
    safeExercise: 'Tailor sitting (butterfly stretch) to open hips gently.',
    doctorQuestion: 'What are the signs of preterm labor I should watch out for?',
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
    superfoods: 'Small nutrient-dense snacks: trail mix, bananas, bone broth.',
    safeExercise: 'Slow relaxed walking and gentle birth ball bouncing.',
    doctorQuestion: 'When will we perform the Group B Strep (GBS) swab test?',
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
    superfoods: 'Dates, electrolyte coconut water, and light easily digestible broths.',
    safeExercise: 'Gentle pelvic swaying and slow rhythmic breathing.',
    doctorQuestion: 'At what contraction frequency and intensity should I head to the hospital?',
  },
];

export function getWeekData(week: number): WeekInfo {
  const found = pregnancyWeeks.find((w) => w.week === week);
  if (found) return found;
  const sorted = [...pregnancyWeeks].sort((a, b) => Math.abs(a.week - week) - Math.abs(b.week - week));
  return {
    ...sorted[0],
    week,
    trimester: week <= 13 ? 1 : week <= 27 ? 2 : 3,
  };
}

export const medicalDisclaimer =
  'Medical Review Notice: The pregnancy and developmental information provided in Kidora is curated for educational purposes and parental guidance. It is not intended as a substitute for professional medical advice, diagnosis, or personalized care. Always consult your qualified obstetrician, pediatrician, or healthcare provider regarding any health questions or symptoms.';

export const weightTrackingGuidance =
  'Your recorded weight is shown for your personal tracking and history. Every mother and pregnancy journey is unique. Please discuss your personalized pregnancy weight goals with your healthcare professional.';

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
