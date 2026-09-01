import { useState } from 'react';
import { useApp } from '@/lib/store';
import { soundEngine } from '@/lib/soundEngine';
import {
  Volume2,
  Sparkles,
  Award,
  RefreshCw,
  Search,
  CheckCircle2,
  Compass,
  Heart,
  Baby,
  Smile,
  Shield,
  Zap,
} from 'lucide-react';

interface AnimalItem {
  id: string;
  name: string;
  tamilName: string;
  tamilPhonetic: string;
  category: 'wild' | 'farm' | 'ocean' | 'birds' | 'pets';
  emoji: string;
  soundText: string;
  babyName: string;
  babyEmoji: string;
  habitat: string;
  diet: 'Herbivore 🌿' | 'Carnivore 🥩' | 'Omnivore 🍓🥩' | 'Insectivore 🪲';
  superpower: string;
  funFact: string;
  color: string;
}

const ANIMALS_DATA: AnimalItem[] = [
  // 1. WILD SAFARI & JUNGLE
  {
    id: 'lion',
    name: 'Lion',
    tamilName: 'சிங்கம்',
    tamilPhonetic: 'Singam',
    category: 'wild',
    emoji: '🦁',
    soundText: 'Roaaar! Roaaar!',
    babyName: 'Cub',
    babyEmoji: '🦁',
    habitat: 'Savannah & Grasslands',
    diet: 'Carnivore 🥩',
    superpower: 'King of the Jungle with a mighty roar that echoes 8 km away!',
    funFact: 'A pride of lions can have up to 30 lions living together as a big family.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'elephant',
    name: 'Elephant',
    tamilName: 'யானை',
    tamilPhonetic: 'Yaanai',
    category: 'wild',
    emoji: '🐘',
    soundText: 'Pawoooo! Trumpet!',
    babyName: 'Calf',
    babyEmoji: '🐘',
    habitat: 'Tropical Rainforests & Savannah',
    diet: 'Herbivore 🌿',
    superpower: 'Super smart memory and a trunk with over 40,000 muscles!',
    funFact: 'Elephants use their big ears to fan themselves and cool down in the hot sun.',
    color: 'from-slate-600 to-slate-800',
  },
  {
    id: 'tiger',
    name: 'Tiger',
    tamilName: 'புலி',
    tamilPhonetic: 'Puli',
    category: 'wild',
    emoji: '🐯',
    soundText: 'Grrr-Roar!',
    babyName: 'Cub',
    babyEmoji: '🐯',
    habitat: 'Dense Mangrove & Bamboo Forests',
    diet: 'Carnivore 🥩',
    superpower: 'Incredible night vision and powerful swimming ability!',
    funFact: 'Every single tiger has unique stripe patterns, like human fingerprints.',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'giraffe',
    name: 'Giraffe',
    tamilName: 'ஒட்டகச்சிவிங்கி',
    tamilPhonetic: 'Ottagachivingi',
    category: 'wild',
    emoji: '🦒',
    soundText: 'Hummm-Bleat!',
    babyName: 'Calf',
    babyEmoji: '🦒',
    habitat: 'African Savannah',
    diet: 'Herbivore 🌿',
    superpower: 'Tallest mammal on Earth with a 45 cm blue-black tongue to reach tall acacia trees!',
    funFact: 'Giraffes only need between 10 minutes and 2 hours of sleep per day.',
    color: 'from-yellow-500 to-amber-600',
  },
  {
    id: 'zebra',
    name: 'Zebra',
    tamilName: 'வரிக்குதிரை',
    tamilPhonetic: 'Varikkuthirai',
    category: 'wild',
    emoji: '🦓',
    soundText: 'Neigh-Bark!',
    babyName: 'Foal',
    babyEmoji: '🦓',
    habitat: 'Grasslands & Shrublands',
    diet: 'Herbivore 🌿',
    superpower: 'Dazzle camouflage stripes that confuse predators and repel flies!',
    funFact: 'Zebras sleep standing up so they can quickly run from predators.',
    color: 'from-slate-700 to-slate-900',
  },
  {
    id: 'kangaroo',
    name: 'Kangaroo',
    tamilName: 'கங்காரு',
    tamilPhonetic: 'Kangaroo',
    category: 'wild',
    emoji: '🦘',
    soundText: 'Chortle-Thump!',
    babyName: 'Joey',
    babyEmoji: '🦘',
    habitat: 'Australian Outback & Bush',
    diet: 'Herbivore 🌿',
    superpower: 'Super hopping legs that leap up to 9 meters in a single bound!',
    funFact: 'Mother kangaroos carry their tiny joeys in a cozy belly pouch.',
    color: 'from-amber-600 to-amber-800',
  },

  // 2. FARM FRIENDS
  {
    id: 'cow',
    name: 'Cow',
    tamilName: 'பசு மாடு',
    tamilPhonetic: 'Pasu Maadu',
    category: 'farm',
    emoji: '🐮',
    soundText: 'Moooo! Moooo!',
    babyName: 'Calf',
    babyEmoji: '🐮',
    habitat: 'Farm Meadows & Pastures',
    diet: 'Herbivore 🌿',
    superpower: 'Produces wholesome delicious milk and has a 360-degree panoramic view!',
    funFact: 'Cows have four stomach chambers to help them digest sweet green grass.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'horse',
    name: 'Horse',
    tamilName: 'குதிரை',
    tamilPhonetic: 'Kuthirai',
    category: 'farm',
    emoji: '🐴',
    soundText: 'Neighhhh! Snort!',
    babyName: 'Foal',
    babyEmoji: '🐴',
    habitat: 'Farm Stables & Open Plains',
    diet: 'Herbivore 🌿',
    superpower: 'High-speed gallop reaching 88 km/h and strong endurance!',
    funFact: 'Horses can run just a few hours after being born!',
    color: 'from-amber-700 to-orange-800',
  },
  {
    id: 'sheep',
    name: 'Sheep',
    tamilName: 'செம்மறி ஆடு',
    tamilPhonetic: 'Semmari Aadu',
    category: 'farm',
    emoji: '🐑',
    soundText: 'Baaaa! Baaaa!',
    babyName: 'Lamb',
    babyEmoji: '🐑',
    habitat: 'Rolling Hills & Farm Meadows',
    diet: 'Herbivore 🌿',
    superpower: 'Grows cozy warm natural wool that keeps humans warm in winter!',
    funFact: 'Sheep have great memories and can recognize over 50 different face shapes.',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    id: 'duck',
    name: 'Duck',
    tamilName: 'வாத்து',
    tamilPhonetic: 'Vaathu',
    category: 'farm',
    emoji: '🦆',
    soundText: 'Quack! Quack! Quack!',
    babyName: 'Duckling',
    babyEmoji: '🐥',
    habitat: 'Ponds, Lakes & Wetlands',
    diet: 'Omnivore 🍓🥩',
    superpower: 'Waterproof feathers and webbed feet that paddle like mini propellers!',
    funFact: 'Duck feathers are naturally oiled so water droplets slide right off without getting them wet.',
    color: 'from-sky-500 to-indigo-600',
  },

  // 3. OCEAN & SEA CREATURES
  {
    id: 'dolphin',
    name: 'Dolphin',
    tamilName: 'டால்பின்',
    tamilPhonetic: 'Dolphin',
    category: 'ocean',
    emoji: '🐬',
    soundText: 'Click-Click! Whistle!',
    babyName: 'Calf',
    babyEmoji: '🐬',
    habitat: 'Sunny Coral Reefs & Open Oceans',
    diet: 'Carnivore 🥩',
    superpower: 'Echolocation sonar to navigate underwater and acrobatic leaping spins!',
    funFact: 'Dolphins sleep with one eye open and half of their brain awake to breathe.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'whale',
    name: 'Blue Whale',
    tamilName: 'திமிங்கலம்',
    tamilPhonetic: 'Timingalam',
    category: 'ocean',
    emoji: '🐋',
    soundText: 'Wooo-Huuu! Ocean Song!',
    babyName: 'Calf',
    babyEmoji: '🐋',
    habitat: 'Deep Blue Oceans Worldwide',
    diet: 'Carnivore 🥩',
    superpower: 'Largest animal to ever exist on planet Earth — bigger than any dinosaur!',
    funFact: 'A blue whale’s heart is as big as a small car and beats only 5 to 6 times a minute underwater.',
    color: 'from-blue-600 to-indigo-800',
  },
  {
    id: 'turtle',
    name: 'Sea Turtle',
    tamilName: 'கடல் ஆமை',
    tamilPhonetic: 'Kadal Aamai',
    category: 'ocean',
    emoji: '🐢',
    soundText: 'Hiss-Gulp!',
    babyName: 'Hatchling',
    babyEmoji: '🐢',
    habitat: 'Warm Tropical Seas & Sandy Beaches',
    diet: 'Herbivore 🌿',
    superpower: 'Navigates across thousands of miles using the Earth’s magnetic field!',
    funFact: 'Sea turtles have existed on Earth for over 100 million years!',
    color: 'from-emerald-600 to-green-700',
  },
  {
    id: 'octopus',
    name: 'Octopus',
    tamilName: 'எண்காலி',
    tamilPhonetic: 'Enkaali',
    category: 'ocean',
    emoji: '🐙',
    soundText: 'Whoosh-Ink!',
    babyName: 'Larva / Fry',
    babyEmoji: '🐙',
    habitat: 'Coral Reefs & Ocean Trenches',
    diet: 'Carnivore 🥩',
    superpower: 'Three hearts, blue blood, and the ability to instantly change color & texture to hide!',
    funFact: 'An octopus has 8 flexible arms with hundreds of taste-sensing suction cups.',
    color: 'from-purple-500 to-pink-600',
  },

  // 4. BIRDS OF THE SKY
  {
    id: 'peacock',
    name: 'Peacock',
    tamilName: 'மயில்',
    tamilPhonetic: 'Mayil',
    category: 'birds',
    emoji: '🦚',
    soundText: 'May-Aww! May-Aww!',
    babyName: 'Peachick',
    babyEmoji: '🦚',
    habitat: 'Indian Forests & Gardens',
    diet: 'Omnivore 🍓🥩',
    superpower: 'Magnificent iridescent eye-spotted tail feathers that fan out in a dazzling dance!',
    funFact: 'The peacock is the National Bird of India and loves to dance when rain clouds appear.',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    id: 'parrot',
    name: 'Parrot',
    tamilName: 'கிளி',
    tamilPhonetic: 'Kili',
    category: 'birds',
    emoji: '🦜',
    soundText: 'Squawk! Hello Explorer!',
    babyName: 'Chick',
    babyEmoji: '🦜',
    habitat: 'Tropical Rainforest Canopies',
    diet: 'Herbivore 🌿',
    superpower: 'Can mimic human words, whistle tunes, and crack tough nuts with its curved beak!',
    funFact: 'Some parrots can live up to 80 years and have brilliant problem-solving brains.',
    color: 'from-green-500 to-amber-500',
  },
  {
    id: 'owl',
    name: 'Owl',
    tamilName: 'ஆந்தை',
    tamilPhonetic: 'Aanthai',
    category: 'birds',
    emoji: '🦉',
    soundText: 'Hoo-Hoo! Hoo-Hoo!',
    babyName: 'Owlet',
    babyEmoji: '🦉',
    habitat: 'Woodlands, Barns & Hollow Trees',
    diet: 'Carnivore 🥩',
    superpower: 'Silent flight feathers and can rotate its head 270 degrees!',
    funFact: 'Owls have tube-shaped eyes that give them extraordinary night binocular vision.',
    color: 'from-amber-600 to-yellow-700',
  },

  // 5. LOVABLE PETS
  {
    id: 'dog',
    name: 'Dog',
    tamilName: 'நாய்',
    tamilPhonetic: 'Naai',
    category: 'pets',
    emoji: '🐶',
    soundText: 'Woof! Woof! Bark!',
    babyName: 'Puppy',
    babyEmoji: '🐶',
    habitat: 'Cozy Homes & Backyards',
    diet: 'Omnivore 🍓🥩',
    superpower: 'Super sniffer nose 10,000 times stronger than humans and unconditional loyalty!',
    funFact: 'Dogs can learn up to 250 words and hand gestures.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'cat',
    name: 'Cat',
    tamilName: 'பூனை',
    tamilPhonetic: 'Poonai',
    category: 'pets',
    emoji: '🐱',
    soundText: 'Meowww! Purrrr!',
    babyName: 'Kitten',
    babyEmoji: '🐱',
    habitat: 'Homes & Sunlit Windowsills',
    diet: 'Carnivore 🥩',
    superpower: 'Acrobatic balance, flexible spine, and a calming therapeutic purr!',
    funFact: 'Cats can jump up to 6 times their height in a single leap.',
    color: 'from-pink-500 to-rose-600',
  },
];

export function AnimalsExplorer() {
  const { addStars } = useApp();
  const [activeCategory, setActiveCategory] = useState<'all' | 'wild' | 'farm' | 'ocean' | 'birds' | 'pets'>('all');
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalItem>(ANIMALS_DATA[0]);

  // Sound Quiz State
  const [quizQuestion, setQuizQuestion] = useState<{
    prompt: string;
    correct: AnimalItem;
    options: AnimalItem[];
  }>({
    prompt: 'Which animal says: "Roaaar! Roaaar!" and is the King of the Jungle?',
    correct: ANIMALS_DATA[0],
    options: [ANIMALS_DATA[0], ANIMALS_DATA[1], ANIMALS_DATA[6], ANIMALS_DATA[10]],
  });
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Speak helper
  const speakText = (text: string) => {
    soundEngine.speak(text);
  };

  const handleSelectAnimal = (animal: AnimalItem) => {
    setSelectedAnimal(animal);
    soundEngine.playPop();
    speakText(`${animal.name}. In Tamil: ${animal.tamilPhonetic}. It says ${animal.soundText}. ${animal.superpower}`);
  };

  const handlePlaySound = (animal: AnimalItem) => {
    soundEngine.playCelebration();
    setTimeout(() => {
      speakText(`${animal.name} says: ${animal.soundText}! In Tamil, ${animal.tamilPhonetic}!`);
    }, 300);
  };

  const generateQuiz = () => {
    setQuizFeedback(null);
    const target = ANIMALS_DATA[Math.floor(Math.random() * ANIMALS_DATA.length)];
    const others = ANIMALS_DATA.filter((a) => a.id !== target.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [target, ...others].sort(() => Math.random() - 0.5);

    const isSoundQuiz = Math.random() > 0.5;
    const prompt = isSoundQuiz
      ? `Which animal makes this sound: "${target.soundText}"?`
      : `Which animal has the superpower: "${target.superpower}"?`;

    setQuizQuestion({
      prompt,
      correct: target,
      options,
    });
    speakText(prompt);
  };

  const handleAnswerQuiz = (choice: AnimalItem) => {
    if (choice.id === quizQuestion.correct.id) {
      soundEngine.playCelebration();
      setQuizFeedback({
        isCorrect: true,
        message: `🎉 Brilliant Explorer! ${quizQuestion.correct.name} (${quizQuestion.correct.tamilName}) is correct! +5 Stars! ⭐`,
      });
      addStars(5);
      speakText(`Brilliant explorer! ${quizQuestion.correct.name} is correct!`);
      setTimeout(() => generateQuiz(), 2400);
    } else {
      soundEngine.playWrong();
      setQuizFeedback({ isCorrect: false, message: 'Try again! Listen closely to the clues! 🐾' });
      speakText('Oops! Try another animal!');
    }
  };

  const filteredAnimals =
    activeCategory === 'all'
      ? ANIMALS_DATA
      : ANIMALS_DATA.filter((a) => a.category === activeCategory);

  return (
    <div className="space-y-6 animate-pop-in">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-emerald-400/40">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
            Wildlife Biology & Animal Kingdom
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2">
            <span>Animal Kingdom & Safari World</span>
            <span className="text-2xl">🦁🐬🦜</span>
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
            Discover 20+ wild, farm, ocean, and sky creatures with animal sounds, English & Tamil names, baby animal names, habitats, and diets!
          </p>
        </div>

        {/* Category Switcher */}
        <div className="bg-white/15 backdrop-blur-md p-1.5 rounded-2xl border border-white/25 flex items-center gap-1 shrink-0 flex-wrap">
          {[
            { id: 'all', label: 'All 🐾' },
            { id: 'wild', label: 'Wild 🦁' },
            { id: 'farm', label: 'Farm 🐮' },
            { id: 'ocean', label: 'Ocean 🐬' },
            { id: 'birds', label: 'Birds 🦜' },
            { id: 'pets', label: 'Pets 🐶' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as any)}
              className={`btn-press px-3 py-1.5 rounded-xl text-xs font-black font-display transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-400 text-slate-950 shadow-soft'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Animal Grid & Showcase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Animals Grid (Left 7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-soft border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-black font-display text-slate-800 flex items-center gap-2">
              <span>Tap any animal to hear sound & learn:</span>
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">
              {filteredAnimals.length} Animals
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {filteredAnimals.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectAnimal(item)}
                className={`btn-press p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border-2 ${
                  selectedAnimal.id === item.id
                    ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 border-emerald-500 shadow-pop scale-105'
                    : 'bg-slate-50 hover:bg-emerald-50 text-slate-800 border-slate-200 hover:border-emerald-300'
                }`}
              >
                <span className="text-3xl animate-float">{item.emoji}</span>
                <span className="text-xs font-black font-display text-slate-900">{item.name}</span>
                <span className="text-[10px] font-bold text-slate-500">{item.tamilName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Animal Hero Card (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Big Animal Showcase Card */}
          <div className={`bg-gradient-to-br ${selectedAnimal.color} rounded-3xl p-6 text-white shadow-soft space-y-4`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                {selectedAnimal.diet} • {selectedAnimal.habitat}
              </span>
              <button
                type="button"
                onClick={() => handlePlaySound(selectedAnimal)}
                className="btn-press p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-colors flex items-center gap-1 text-xs font-bold"
                title="Hear Animal Sound"
              >
                <Volume2 className="h-4 w-4" />
                <span>Hear Sound</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-4xl font-black font-display tracking-tight text-white flex items-baseline gap-2">
                  <span>{selectedAnimal.name}</span>
                </div>
                <div className="text-lg font-black text-amber-200">{selectedAnimal.tamilName} ({selectedAnimal.tamilPhonetic})</div>
                <div className="text-xs text-white/90 font-bold bg-black/20 px-2.5 py-1 rounded-lg inline-block">
                  🗣️ Sound: <em>"{selectedAnimal.soundText}"</em>
                </div>
              </div>
              <div className="text-7xl animate-bounce-soft">{selectedAnimal.emoji}</div>
            </div>

            {/* Baby Animal Pill */}
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 text-xs font-bold text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Baby className="h-4 w-4 text-amber-300" />
                <span>Baby Name: <strong>{selectedAnimal.babyName}</strong></span>
              </div>
              <span className="text-xl">{selectedAnimal.babyEmoji}</span>
            </div>

            {/* Fun Fact Quote */}
            <div className="bg-black/20 rounded-2xl p-3 text-xs font-medium text-white/95 leading-relaxed">
              ⚡ <strong>Superpower:</strong> {selectedAnimal.superpower}
            </div>
          </div>

          {/* Quick Biology Fact Box */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-slate-800">
              <Compass className="h-4 w-4 text-emerald-600" />
              <span>Did You Know?</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {selectedAnimal.funFact}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Interactive Animal Sounds & Superpower Quiz Game */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6 text-center">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
            🐾 Wildlife Safari Detective Quiz
          </span>
          <h3 className="text-2xl font-black font-display text-slate-900">
            {quizQuestion.prompt}
          </h3>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-3.5 pt-2">
          {quizQuestion.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleAnswerQuiz(opt)}
              className="btn-press py-4 px-4 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50 hover:from-emerald-100 hover:to-teal-100 text-slate-800 hover:text-emerald-950 font-black font-display text-base sm:text-lg border-2 border-slate-200 hover:border-emerald-400 shadow-soft cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <span className="text-2xl">{opt.emoji}</span>
              <span>{opt.name}</span>
            </button>
          ))}
        </div>

        {/* Feedback Banner */}
        {quizFeedback && (
          <div
            className={`p-4 rounded-2xl font-black font-display text-sm animate-pop-in ${
              quizFeedback.isCorrect
                ? 'bg-emerald-500 text-white shadow-soft'
                : 'bg-rose-100 text-rose-800 border border-rose-200'
            }`}
          >
            {quizFeedback.message}
          </div>
        )}

        <div className="pt-2">
          <button
            type="button"
            onClick={generateQuiz}
            className="btn-press px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 mx-auto cursor-pointer transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Next Animal Question</span>
          </button>
        </div>
      </div>
    </div>
  );
}
