// Baby Hub Data: Names Directory, Developmental Milestones & Baby Moments

import type { BabyName, BabyMoment } from './types';

export const defaultBabyMoments: BabyMoment[] = [
  { id: 'bm-1', momentKey: 'first_smile', title: 'First Sweet Smile', emoji: '😊', dateAchieved: '2026-02-14', notes: 'Smiled warmly after morning bath!' },
  { id: 'bm-2', momentKey: 'first_word', title: 'First Spoken Word', emoji: '💬', dateAchieved: null, notes: '' },
  { id: 'bm-3', momentKey: 'first_step', title: 'First Independent Steps', emoji: '👣', dateAchieved: null, notes: '' },
  { id: 'bm-4', momentKey: 'first_tooth', title: 'First Tiny Tooth', emoji: '🦷', dateAchieved: '2026-06-10', notes: 'Bottom front tooth emerged.' },
  { id: 'bm-5', momentKey: 'birthday', title: '1st Birthday Celebration', emoji: '🎂', dateAchieved: null, notes: '' },
];

export const babyNamesDatabase: BabyName[] = [
  // ==========================================
  // 🌺 AUTHENTIC & BEAUTIFUL TAMIL NAMES (BOYS)
  // ==========================================
  { id: 'bn-tm-1', name: 'Iniyan', gender: 'boy', meaning: 'Sweet-natured, kind-hearted, pleasant', origin: 'Tamil', popular: true },
  { id: 'bn-tm-2', name: 'Mugilan', gender: 'boy', meaning: 'Like a rain-bearing cloud, generous', origin: 'Tamil', popular: true },
  { id: 'bn-tm-3', name: 'Yazhan', gender: 'boy', meaning: 'Sweet as the melodious Yazh instrument', origin: 'Tamil', popular: true },
  { id: 'bn-tm-4', name: 'Kavin', gender: 'boy', meaning: 'Beauty, grace, elegance, handsome', origin: 'Tamil', popular: true },
  { id: 'bn-tm-5', name: 'Elango', gender: 'boy', meaning: 'Young prince, author of Silappatikaram', origin: 'Tamil', popular: true },
  { id: 'bn-tm-6', name: 'Mithran', gender: 'boy', meaning: 'Loyal friend, radiant sun, companion', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-7', name: 'Dheera', gender: 'boy', meaning: 'Courageous, brave warrior, fearless', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-8', name: 'Chezhiyan', gender: 'boy', meaning: 'Prosperous, ruler of the Pandyan kingdom', origin: 'Tamil', popular: true },
  { id: 'bn-tm-9', name: 'Anbarasan', gender: 'boy', meaning: 'King of love and compassion', origin: 'Tamil', popular: true },
  { id: 'bn-tm-10', name: 'Pugazh', gender: 'boy', meaning: 'Fame, glorious reputation, honor', origin: 'Tamil', popular: true },
  { id: 'bn-tm-11', name: 'Maran', gender: 'boy', meaning: 'Valiant, brave heart, Cupid of Tamil lore', origin: 'Tamil', popular: true },
  { id: 'bn-tm-12', name: 'Valavan', gender: 'boy', meaning: 'Capable, skilled ruler, Chola dynasty title', origin: 'Tamil', popular: true },
  { id: 'bn-tm-13', name: 'Vetri', gender: 'boy', meaning: 'Victory, triumph, undefeated success', origin: 'Tamil', popular: true },
  { id: 'bn-tm-14', name: 'Aadvik', gender: 'boy', meaning: 'Unique, unparalleled, one of a kind', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-15', name: 'Rudran', gender: 'boy', meaning: 'Fierce protector, radiant like sunrise', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-16', name: 'Nalan', gender: 'boy', meaning: 'Virtuous, good-hearted, noble king', origin: 'Tamil', popular: true },
  { id: 'bn-tm-17', name: 'Thamizhan', gender: 'boy', meaning: 'One who embodies the spirit of Tamil culture', origin: 'Tamil', popular: true },
  { id: 'bn-tm-18', name: 'Ezhil', gender: 'boy', meaning: 'Radiant charm, natural beauty', origin: 'Tamil', popular: true },
  { id: 'bn-tm-19', name: 'Nedumaaran', gender: 'boy', meaning: 'Steadfast leader, noble warrior', origin: 'Tamil', popular: false },
  { id: 'bn-tm-20', name: 'Karkee', gender: 'boy', meaning: 'Creative thinker, brilliant mind', origin: 'Tamil', popular: false },
  { id: 'bn-tm-21', name: 'Siddharth', gender: 'boy', meaning: 'One who has accomplished his noble goal', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-22', name: 'Madhavan', gender: 'boy', meaning: 'Born of springtime, charming, radiant', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-23', name: 'Saravanan', gender: 'boy', meaning: 'Born among the reeds, Lord Murugan', origin: 'Tamil', popular: true },
  { id: 'bn-tm-24', name: 'Thirumaran', gender: 'boy', meaning: 'Auspicious victor, noble soul', origin: 'Tamil', popular: false },
  { id: 'bn-tm-25', name: 'Senthamizh', gender: 'boy', meaning: 'Pure and classical Tamil language', origin: 'Tamil', popular: true },
  { id: 'bn-tm-26', name: 'Gowtham', gender: 'boy', meaning: 'Dispeller of darkness, bright thinker', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-27', name: 'Akilan', gender: 'boy', meaning: 'Ruler of the universe, boundless mind', origin: 'Tamil', popular: true },
  { id: 'bn-tm-28', name: 'Kandha', gender: 'boy', meaning: 'Beloved warrior, youth and courage', origin: 'Tamil', popular: true },
  { id: 'bn-tm-29', name: 'Manikandan', gender: 'boy', meaning: 'Shining jewel, peaceful guardian', origin: 'Tamil', popular: false },
  { id: 'bn-tm-30', name: 'Sanjith', gender: 'boy', meaning: 'Always victorious, conqueror of hearts', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-31', name: 'Pranav', gender: 'boy', meaning: 'Sacred primordial sound Om', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-32', name: 'Rithvik', gender: 'boy', meaning: 'Desire, scholar, focused scholar', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-33', name: 'Thendralan', gender: 'boy', meaning: 'Bringer of gentle southern breeze', origin: 'Tamil', popular: false },
  { id: 'bn-tm-34', name: 'Velan', gender: 'boy', meaning: 'Wielder of the victorious divine spear', origin: 'Tamil', popular: true },

  // ==========================================
  // 🌺 AUTHENTIC & BEAUTIFUL TAMIL NAMES (GIRLS)
  // ==========================================
  { id: 'bn-tm-35', name: 'Yazhini', gender: 'girl', meaning: 'Melodious like the sweet ancient Yazh harp', origin: 'Tamil', popular: true },
  { id: 'bn-tm-36', name: 'Nila', gender: 'girl', meaning: 'The peaceful luminous moon, moonbeam', origin: 'Tamil', popular: true },
  { id: 'bn-tm-37', name: 'Vennila', gender: 'girl', meaning: 'Bright, pure white moonlight', origin: 'Tamil', popular: true },
  { id: 'bn-tm-38', name: 'Kayalvizhi', gender: 'girl', meaning: 'Eyes as sparkling and graceful as a fish', origin: 'Tamil', popular: true },
  { id: 'bn-tm-39', name: 'Pragathi', gender: 'girl', meaning: 'Continuous progress, wisdom, forward growth', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-40', name: 'Tamizharasi', gender: 'girl', meaning: 'Queen of the sweet Tamil language', origin: 'Tamil', popular: true },
  { id: 'bn-tm-41', name: 'Ilakiya', gender: 'girl', meaning: 'Rich literature, artistic expression', origin: 'Tamil', popular: true },
  { id: 'bn-tm-42', name: 'Semmalar', gender: 'girl', meaning: 'Fragrant and beautiful fresh red blossom', origin: 'Tamil', popular: false },
  { id: 'bn-tm-43', name: 'Oviya', gender: 'girl', meaning: 'A masterpiece painting, artistically beautiful', origin: 'Tamil', popular: true },
  { id: 'bn-tm-44', name: 'Harini', gender: 'girl', meaning: 'Graceful like a deer, serene and pure', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-45', name: 'Kanimozhi', gender: 'girl', meaning: 'One whose words are sweet as fresh fruit', origin: 'Tamil', popular: true },
  { id: 'bn-tm-46', name: 'Dharani', gender: 'girl', meaning: 'The nurturing earth, steadfast and resilient', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-47', name: 'Pavithra', gender: 'girl', meaning: 'Pure, holy, radiant soul', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-48', name: 'Inba', gender: 'girl', meaning: 'Joy, delight, pure happiness', origin: 'Tamil', popular: true },
  { id: 'bn-tm-49', name: 'Madhumitha', gender: 'girl', meaning: 'Sweet friend, pleasant harmony', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-50', name: 'Thenmozhi', gender: 'girl', meaning: 'Sweet-spoken like pure wild honey', origin: 'Tamil', popular: true },
  { id: 'bn-tm-51', name: 'Sivanya', gender: 'girl', meaning: 'Graceful, benevolent, auspicious divine light', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-52', name: 'Mathivathani', gender: 'girl', meaning: 'Face as radiant and soothing as full moon', origin: 'Tamil', popular: false },
  { id: 'bn-tm-53', name: 'Malar', gender: 'girl', meaning: 'Blossoming flower, fresh spring flower', origin: 'Tamil', popular: true },
  { id: 'bn-tm-54', name: 'Niranjana', gender: 'girl', meaning: 'Pure, unblemished, luminous light', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-55', name: 'Vaanmathi', gender: 'girl', meaning: 'Full moon adorning the evening sky', origin: 'Tamil', popular: true },
  { id: 'bn-tm-56', name: 'Aadhira', gender: 'girl', meaning: 'Quick, lightning, shining star', origin: 'Tamil', popular: true },
  { id: 'bn-tm-57', name: 'Kaviyazhini', gender: 'girl', meaning: 'Poetic music from the sweet Yazh strings', origin: 'Tamil', popular: false },
  { id: 'bn-tm-58', name: 'Magizhmalar', gender: 'girl', meaning: 'Joyous blossoming flower', origin: 'Tamil', popular: false },
  { id: 'bn-tm-59', name: 'Nithila', gender: 'girl', meaning: 'Pristine glowing sea pearl', origin: 'Tamil', popular: true },
  { id: 'bn-tm-60', name: 'Tamizhazhagi', gender: 'girl', meaning: 'The classic beauty of Tamil heritage', origin: 'Tamil', popular: false },
  { id: 'bn-tm-61', name: 'Tharani', gender: 'girl', meaning: 'Sunbeam, boat guiding across the waters', origin: 'Tamil', popular: true },
  { id: 'bn-tm-62', name: 'Vaigai', gender: 'girl', meaning: 'The legendary river flowing through Madurai', origin: 'Tamil', popular: false },
  { id: 'bn-tm-63', name: 'Abinaya', gender: 'girl', meaning: 'Expressive classical dance expression', origin: 'Tamil', popular: true },
  { id: 'bn-tm-64', name: 'Brinda', gender: 'girl', meaning: 'Sacred basil, divine protector', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-65', name: 'Deepshika', gender: 'girl', meaning: 'Flame of a bright golden lamp', origin: 'Tamil / Sanskrit', popular: true },
  { id: 'bn-tm-66', name: 'Janani', gender: 'girl', meaning: 'Motherly love, source of life', origin: 'Tamil / Sanskrit', popular: true },

  // ==========================================
  // 🌺 AUTHENTIC & BEAUTIFUL TAMIL NAMES (UNISEX)
  // ==========================================
  { id: 'bn-tm-67', name: 'Anbu', gender: 'unisex', meaning: 'Unconditional love, affection, caring', origin: 'Tamil', popular: true },
  { id: 'bn-tm-68', name: 'Tamizh', gender: 'unisex', meaning: 'Sweetness, classical language, culture', origin: 'Tamil', popular: true },
  { id: 'bn-tm-69', name: 'Mugil', gender: 'unisex', meaning: 'Gentle rain cloud bringing prosperity', origin: 'Tamil', popular: true },
  { id: 'bn-tm-70', name: 'Ponni', gender: 'unisex', meaning: 'Golden Kaveri river, radiant wealth', origin: 'Tamil', popular: true },
  { id: 'bn-tm-71', name: 'Kadal', gender: 'unisex', meaning: 'Vast ocean of infinite wisdom', origin: 'Tamil', popular: false },
  { id: 'bn-tm-72', name: 'Sudar', gender: 'unisex', meaning: 'Glowing ray of light, flame of insight', origin: 'Tamil', popular: true },
  { id: 'bn-tm-73', name: 'Vaanam', gender: 'unisex', meaning: 'Infinite open sky, boundless freedom', origin: 'Tamil', popular: false },
  { id: 'bn-tm-74', name: 'Ilavenil', gender: 'unisex', meaning: 'Early spring season, fresh blossoms', origin: 'Tamil', popular: true },
  { id: 'bn-tm-75', name: 'Thulir', gender: 'unisex', meaning: 'Tender green shoot, new beginning', origin: 'Tamil', popular: true },

  // ==========================================
  // 🇮🇳 SANSKRIT & PAN-INDIAN NAMES (BOYS)
  // ==========================================
  { id: 'bn-sk-1', name: 'Aarav', gender: 'boy', meaning: 'Peaceful, calm sound, wisdom and melody', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-2', name: 'Advait', gender: 'boy', meaning: 'Unique, non-dual, limitless consciousness', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-3', name: 'Reyansh', gender: 'boy', meaning: 'Ray of sunlight, part of Lord Vishnu', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-4', name: 'Vivaan', gender: 'boy', meaning: 'Full of vibrant life, morning dawn rays', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-5', name: 'Kabir', gender: 'boy', meaning: 'Great, powerful, renowned mystic poet', origin: 'Arabic / Sanskrit', popular: true },
  { id: 'bn-sk-6', name: 'Dhruv', gender: 'boy', meaning: 'Steadfast, North Star, unshakable faith', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-7', name: 'Arjun', gender: 'boy', meaning: 'Bright, shining, noble legendary archer', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-8', name: 'Ishaan', gender: 'boy', meaning: 'The sun, northeast auspicious direction', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-9', name: 'Vihaan', gender: 'boy', meaning: 'Dawn, morning, start of a new era', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-10', name: 'Kian', gender: 'boy', meaning: 'Grace of God, ancient king', origin: 'Persian / Sanskrit', popular: true },
  { id: 'bn-sk-11', name: 'Rohan', gender: 'boy', meaning: 'Ascending, growing, healing fragrance', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-12', name: 'Shaurya', gender: 'boy', meaning: 'Bravery, heroism, fearless valor', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-13', name: 'Devansh', gender: 'boy', meaning: 'Part of the divine, spiritual gift', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-14', name: 'Ayush', gender: 'boy', meaning: 'Long life, blessing of health', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-15', name: 'Tanish', gender: 'boy', meaning: 'Ambition, jewel of the family', origin: 'Sanskrit', popular: true },

  // ==========================================
  // 🇮🇳 SANSKRIT & PAN-INDIAN NAMES (GIRLS)
  // ==========================================
  { id: 'bn-sk-16', name: 'Ananya', gender: 'girl', meaning: 'Incomparable, unique, matchless beauty', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-17', name: 'Saanvi', gender: 'girl', meaning: 'Goddess Lakshmi, one who is followed', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-18', name: 'Diya', gender: 'girl', meaning: 'Bright lamp, divine radiant light', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-19', name: 'Tara', gender: 'girl', meaning: 'Star, guiding light in the dark sky', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-20', name: 'Isha', gender: 'girl', meaning: 'One who protects, sovereign ruler', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-21', name: 'Aadhya', gender: 'girl', meaning: 'First power, origin of all energy', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-22', name: 'Kiara', gender: 'girl', meaning: 'Bright, clear, light of dawn', origin: 'Irish / Sanskrit', popular: true },
  { id: 'bn-sk-23', name: 'Myra', gender: 'girl', meaning: 'Beloved, fragrant sweet resin, wonderful', origin: 'Greek / Sanskrit', popular: true },
  { id: 'bn-sk-24', name: 'Navya', gender: 'girl', meaning: 'Fresh, new, praiseworthy and modern', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-25', name: 'Avani', gender: 'girl', meaning: 'Mother earth, grounded and fertile', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-26', name: 'Tanvi', gender: 'girl', meaning: 'Slender, delicate, graceful beauty', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-27', name: 'Rhea', gender: 'girl', meaning: 'Flowing stream, gentle graceful soul', origin: 'Greek / Sanskrit', popular: true },
  { id: 'bn-sk-28', name: 'Meera', gender: 'girl', meaning: 'Prosperous, devotion, ocean boundary', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-29', name: 'Siya', gender: 'girl', meaning: 'Goddess Sita, radiant moonlight', origin: 'Sanskrit', popular: true },
  { id: 'bn-sk-30', name: 'Trisha', gender: 'girl', meaning: 'Wish, noble thirst for knowledge', origin: 'Sanskrit / Latin', popular: true },

  // ==========================================
  // 🌍 MODERN GLOBAL & NATURE NAMES (BOYS)
  // ==========================================
  { id: 'bn-gl-1', name: 'Leo', gender: 'boy', meaning: 'Lion, brave, fearless and courageous', origin: 'Latin', popular: true },
  { id: 'bn-gl-2', name: 'Lucas', gender: 'boy', meaning: 'Bright, shining, light-bringer', origin: 'Greek', popular: true },
  { id: 'bn-gl-3', name: 'Ethan', gender: 'boy', meaning: 'Strong, firm, enduring character', origin: 'Hebrew', popular: true },
  { id: 'bn-gl-4', name: 'Oliver', gender: 'boy', meaning: 'Olive tree, peace and harmony', origin: 'Latin', popular: true },
  { id: 'bn-gl-5', name: 'Noah', gender: 'boy', meaning: 'Rest, peace, comfort, calm waters', origin: 'Hebrew', popular: true },
  { id: 'bn-gl-6', name: 'Liam', gender: 'boy', meaning: 'Resolute protector, strong-willed', origin: 'Irish', popular: true },
  { id: 'bn-gl-7', name: 'Alexander', gender: 'boy', meaning: 'Defender of the people, noble guide', origin: 'Greek', popular: true },
  { id: 'bn-gl-8', name: 'Zayn', gender: 'boy', meaning: 'Beauty, grace, excellence in spirit', origin: 'Arabic', popular: true },
  { id: 'bn-gl-9', name: 'Felix', gender: 'boy', meaning: 'Happy, fortunate, blessed with luck', origin: 'Latin', popular: true },
  { id: 'bn-gl-10', name: 'Jasper', gender: 'boy', meaning: 'Bringer of treasure, speckled stone', origin: 'Persian', popular: true },

  // ==========================================
  // 🌍 MODERN GLOBAL & NATURE NAMES (GIRLS)
  // ==========================================
  { id: 'bn-gl-11', name: 'Sophia', gender: 'girl', meaning: 'Wisdom, divine knowledge, deep insight', origin: 'Greek', popular: true },
  { id: 'bn-gl-12', name: 'Chloe', gender: 'girl', meaning: 'Blooming, green shoot, springtime vitality', origin: 'Greek', popular: true },
  { id: 'bn-gl-13', name: 'Maya', gender: 'girl', meaning: 'Illusion, magic, creative water energy', origin: 'Sanskrit / Greek', popular: true },
  { id: 'bn-gl-14', name: 'Isla', gender: 'girl', meaning: 'Island, peaceful retreat among waters', origin: 'Scottish', popular: true },
  { id: 'bn-gl-15', name: 'Mia', gender: 'girl', meaning: 'Beloved, ocean star, cherished one', origin: 'Italian / Scandinavian', popular: true },
  { id: 'bn-gl-16', name: 'Zara', gender: 'girl', meaning: 'Radiant flower, dawn princess, blossom', origin: 'Arabic / Hebrew', popular: true },
  { id: 'bn-gl-17', name: 'Olivia', gender: 'girl', meaning: 'Olive tree symbol of lasting peace', origin: 'Latin', popular: true },
  { id: 'bn-gl-18', name: 'Emma', gender: 'girl', meaning: 'Universal, whole, boundless warmth', origin: 'Germanic', popular: true },
  { id: 'bn-gl-19', name: 'Aurora', gender: 'girl', meaning: 'Goddess of dawn, Northern lights', origin: 'Latin', popular: true },
  { id: 'bn-gl-20', name: 'Luna', gender: 'girl', meaning: 'Shining moon, celestial glow', origin: 'Latin', popular: true },

  // ==========================================
  // 🌍 UNISEX GLOBAL & MODERN NAMES
  // ==========================================
  { id: 'bn-gl-21', name: 'Kai', gender: 'unisex', meaning: 'Ocean, sea, forgiveness and recovery', origin: 'Hawaiian / Japanese', popular: true },
  { id: 'bn-gl-22', name: 'Arya', gender: 'unisex', meaning: 'Noble, honorable, spiritual melody', origin: 'Sanskrit / Persian', popular: true },
  { id: 'bn-gl-23', name: 'Rowan', gender: 'unisex', meaning: 'Little red one, protective rowan tree', origin: 'Gaelic', popular: true },
  { id: 'bn-gl-24', name: 'Milan', gender: 'unisex', meaning: 'Gracious, union, coming together in love', origin: 'Slavic / Sanskrit', popular: true },
  { id: 'bn-gl-25', name: 'Samar', gender: 'unisex', meaning: 'Evening conversation under the stars', origin: 'Arabic / Sanskrit', popular: true },
  { id: 'bn-gl-26', name: 'Sky', gender: 'unisex', meaning: 'Limitless atmosphere, open freedom', origin: 'Old Norse', popular: true },
  { id: 'bn-gl-27', name: 'River', gender: 'unisex', meaning: 'Flowing body of fresh pure water', origin: 'English', popular: true },
  { id: 'bn-gl-28', name: 'Eden', gender: 'unisex', meaning: 'Delight, paradise, peaceful garden', origin: 'Hebrew', popular: true },
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
    cognitive: 'Explores cause and effect; looks for dropped objects (early object permanence).',
    sensory: 'Enjoys finger foods, exploring different textures, and listening to cheerful nursery rhymes.',
    communication: 'Responds to own name and understands simple tone changes in parent’s voice.',
    movement: 'Sits without support, rocks on hands and knees, and reaches while balanced.',
    social: 'Shows stranger awareness and prefers familiar family members.',
    tryThisTogether: {
      title: '📦 Peek-a-Boo & Hide-the-Toy',
      description: 'Hide a favorite rattle under a soft blanket while baby watches, and cheer when they pull the blanket away!',
      emoji: '🎁',
    },
  },
  {
    ageRange: '9–12 Months',
    stageName: 'Standing & First Words',
    emoji: '🚶',
    cognitive: 'Imitates actions (clapping, waving bye-bye); drinks from a sippy cup with help.',
    sensory: 'Points to pictures in bedtime storybooks and enjoys listening to rhythmic bedtime stories.',
    communication: 'Says first intentional words (mama, dada, ball) and understands simple instructions like "give me".',
    movement: 'Pulls up to stand, cruises along furniture, and may take first independent steps.',
    social: 'Shows affection with hugs, waves goodbye enthusiastically, and plays interactive games.',
    tryThisTogether: {
      title: '🎵 Action Rhyme & Clap Along',
      description: 'Sing interactive songs like "Pat-a-Cake" or "Clap Your Hands" together with big cheerful hand gestures.',
      emoji: '👏',
    },
  },
];
