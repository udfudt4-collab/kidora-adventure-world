import { useState } from 'react';
import { useApp } from '@/lib/store';
import { soundEngine } from '@/lib/soundEngine';
import {
  Apple,
  Volume2,
  Sparkles,
  Heart,
  Zap,
  CheckCircle2,
  RefreshCw,
  Award,
  ShieldCheck,
  Smile,
} from 'lucide-react';
import { waterSound } from '@/lib/waterSound';

interface FoodItem {
  id: string;
  name: string;
  tamilName: string;
  emoji: string;
  type: 'fruit' | 'vegetable';
  color: string;
  vitamins: string;
  superpower: string;
  funFact: string;
  taste: string;
}

const FOOD_ITEMS: FoodItem[] = [
  // Fruits
  {
    id: 'apple',
    name: 'Apple',
    tamilName: 'ஆப்பிள் (Aappil)',
    emoji: '🍎',
    type: 'fruit',
    color: 'from-rose-500 to-red-600',
    vitamins: 'Vitamin C & Fiber',
    superpower: 'Keeps doctors away and keeps your heart strong!',
    funFact: 'Apples float in water because 25% of their volume is air!',
    taste: 'Sweet & Crunchy',
  },
  {
    id: 'mango',
    name: 'Mango',
    tamilName: 'மாம்பழம் (Maambazham)',
    emoji: '🥭',
    type: 'fruit',
    color: 'from-amber-400 to-orange-500',
    vitamins: 'Vitamin A & C',
    superpower: 'Gives you sharp eagle eyesight and glowing skin!',
    funFact: 'Known as the King of Fruits in India and celebrated for thousands of years!',
    taste: 'Super Sweet & Juicy',
  },
  {
    id: 'banana',
    name: 'Banana',
    tamilName: 'வாழைப்பழம் (Vaazhaipazham)',
    emoji: '🍌',
    type: 'fruit',
    color: 'from-yellow-400 to-amber-500',
    vitamins: 'Potassium & Vitamin B6',
    superpower: 'Provides instant sports energy to run and jump high!',
    funFact: 'Bananas naturally curve upwards toward the sun as they grow!',
    taste: 'Sweet & Creamy',
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    tamilName: 'ஸ்ட்ராபெர்ரி (Strawberry)',
    emoji: '🍓',
    type: 'fruit',
    color: 'from-red-500 to-pink-600',
    vitamins: 'Vitamin C & Antioxidants',
    superpower: 'Protects body cells and makes you smile bright!',
    funFact: 'Strawberries are the only fruit with seeds wearing on the outside (about 200 seeds)!',
    taste: 'Sweet & Tangy',
  },
  {
    id: 'orange',
    name: 'Orange',
    tamilName: 'ஆரஞ்சு (Orange)',
    emoji: '🍊',
    type: 'fruit',
    color: 'from-orange-500 to-amber-600',
    vitamins: 'Rich Vitamin C',
    superpower: 'Shields you from colds, coughs, and gives winter immunity!',
    funFact: 'There are over 600 varieties of oranges grown around the world!',
    taste: 'Juicy & Citrus Burst',
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    tamilName: 'தர்பூசணி (Tharboosani)',
    emoji: '🍉',
    type: 'fruit',
    color: 'from-red-500 via-rose-500 to-emerald-600',
    vitamins: 'Hydration & Lycopene',
    superpower: '92% pure fresh water to keep you cool and energized on sunny days!',
    funFact: 'Early explorers used watermelons as natural canteens for carrying water!',
    taste: 'Refreshing & Sweet',
  },
  {
    id: 'grapes',
    name: 'Grapes',
    tamilName: 'திராட்சை (Thiraatchai)',
    emoji: '🍇',
    type: 'fruit',
    color: 'from-purple-500 to-indigo-600',
    vitamins: 'Vitamin K & Potassium',
    superpower: 'Boosts brain power and memory for school lessons!',
    funFact: 'Grapes can come in purple, green, red, and even golden colors!',
    taste: 'Pop-in-mouth Sweetness',
  },
  {
    id: 'pineapple',
    name: 'Pineapple',
    tamilName: 'அன்னாசிப்பழம் (Annaasipazham)',
    emoji: '🍍',
    type: 'fruit',
    color: 'from-yellow-500 to-amber-600',
    vitamins: 'Bromelain & Vitamin C',
    superpower: 'Helps digest food easily and calms tummy ache!',
    funFact: 'A single pineapple can take up to 2 years to grow to full sweet size!',
    taste: 'Tropical & Zesty',
  },
  {
    id: 'papaya',
    name: 'Papaya',
    tamilName: 'பப்பாளி (Pappaali)',
    emoji: '🍈',
    type: 'fruit',
    color: 'from-orange-400 to-amber-600',
    vitamins: 'Vitamin A, C & Papain',
    superpower: 'Smooth digestion and shiny healthy hair!',
    funFact: 'Papaya seeds are completely edible and taste like mild black pepper!',
    taste: 'Soft & Velvety Sweet',
  },
  {
    id: 'pomegranate',
    name: 'Pomegranate',
    tamilName: 'மாதுளம்பழம் (Maathulambazham)',
    emoji: '🍎',
    type: 'fruit',
    color: 'from-rose-600 to-red-800',
    vitamins: 'Iron & Antioxidants',
    superpower: 'Builds strong red blood and increases stamina!',
    funFact: 'Each pomegranate fruit contains hundreds of ruby-red gem seeds called arils!',
    taste: 'Crunchy Ruby Juice',
  },

  // Vegetables
  {
    id: 'carrot',
    name: 'Carrot',
    tamilName: 'கேரட் (Carrot)',
    emoji: '🥕',
    type: 'vegetable',
    color: 'from-orange-500 to-amber-600',
    vitamins: 'Beta-Carotene & Vitamin A',
    superpower: 'Gives superhero night vision and protects eyes!',
    funFact: 'Carrots were originally purple and yellow before orange ones were cultivated in Holland!',
    taste: 'Crunchy & Naturally Sweet',
  },
  {
    id: 'tomato',
    name: 'Tomato',
    tamilName: 'தக்காளி (Thakkaali)',
    emoji: '🍅',
    type: 'vegetable',
    color: 'from-red-500 to-rose-600',
    vitamins: 'Lycopene & Vitamin C',
    superpower: 'Protects skin from the sun and strengthens the heart!',
    funFact: 'Botanically a fruit, but culinarily loved as the world’s most versatile vegetable!',
    taste: 'Juicy & Tangy',
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    tamilName: 'பச்சை பூக்கோசு (Broccoli)',
    emoji: '🥦',
    type: 'vegetable',
    color: 'from-emerald-500 to-green-700',
    vitamins: 'Calcium & Vitamin K',
    superpower: 'Builds rock-solid bones and super-strong muscles!',
    funFact: 'Broccoli looks like cute miniature green trees from an enchanted forest!',
    taste: 'Crispy & Earthy',
  },
  {
    id: 'spinach',
    name: 'Spinach',
    tamilName: 'கீரை (Keerai)',
    emoji: '🥬',
    type: 'vegetable',
    color: 'from-green-600 to-emerald-800',
    vitamins: 'Iron & Folate',
    superpower: 'Powers up brain cells and fuels high endurance!',
    funFact: 'Popeye’s legendary superpower vegetable that gives heroes tremendous strength!',
    taste: 'Tender & Nutrient-dense',
  },
  {
    id: 'potato',
    name: 'Potato',
    tamilName: 'உருளைக்கிழங்கு (Urulaikkizhangu)',
    emoji: '🥔',
    type: 'vegetable',
    color: 'from-amber-600 to-stone-700',
    vitamins: 'Complex Carbohydrates & Vitamin C',
    superpower: 'Long-lasting energy for running, studying, and playing!',
    funFact: 'Potatoes were the very first vegetable to be grown in outer space in 1995!',
    taste: 'Warm & Comforting',
  },
  {
    id: 'brinjal',
    name: 'Brinjal / Eggplant',
    tamilName: 'கத்தரிக்காய் (Katharikaai)',
    emoji: '🍆',
    type: 'vegetable',
    color: 'from-purple-600 to-indigo-800',
    vitamins: 'Nasunin & Fiber',
    superpower: 'Brain membrane protector and digestive champion!',
    funFact: 'Called "Aubergine" in Europe and "Eggplant" in America because small ones looked like white goose eggs!',
    taste: 'Rich & Silky',
  },
  {
    id: 'corn',
    name: 'Sweet Corn',
    tamilName: 'மக்காச்சோளம் (Makkaacholam)',
    emoji: '🌽',
    type: 'vegetable',
    color: 'from-yellow-400 to-amber-500',
    vitamins: 'Lutein & Zeaxanthin',
    superpower: 'Keeps eyes bright and prevents screen fatigue!',
    funFact: 'There is always an even number of rows of kernels on every ear of corn (usually 16)!',
    taste: 'Sweet & Popping',
  },
  {
    id: 'peas',
    name: 'Green Peas',
    tamilName: 'பட்டாணி (Pattaani)',
    emoji: '🫛',
    type: 'vegetable',
    color: 'from-emerald-400 to-green-600',
    vitamins: 'Plant Protein & Zinc',
    superpower: 'Helps you grow taller and repair scrapes quickly!',
    funFact: 'Peas grow snugly inside cozy green pods like little pearl treasures!',
    taste: 'Sweet & Snappy',
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    tamilName: 'வெள்ளரிக்காய் (Vellarikkaai)',
    emoji: '🥒',
    type: 'vegetable',
    color: 'from-teal-500 to-emerald-600',
    vitamins: '96% Hydration & Silica',
    superpower: 'Cools your body down instantly on hot afternoons!',
    funFact: 'The inside temperature of a fresh cucumber can be up to 20 degrees cooler than the outside air!',
    taste: 'Ultra Cool & Crisp',
  },
  {
    id: 'beetroot',
    name: 'Beetroot',
    tamilName: 'பீட்ரூட் (Beetroot)',
    emoji: '🍠',
    type: 'vegetable',
    color: 'from-rose-700 to-purple-900',
    vitamins: 'Nitrates & Natural Folate',
    superpower: 'Makes your blood pump with champion stamina and athletic power!',
    funFact: 'Its natural deep magenta juice was used as natural ink in ancient royal letters!',
    taste: 'Sweet & Earthy Ruby',
  },
];

export function FruitsVeggieExplorer() {
  const { addStars } = useApp();
  const [subTab, setSubTab] = useState<'fruits' | 'veggies' | 'plate_builder' | 'quiz'>('fruits');
  const [selectedFood, setSelectedFood] = useState<FoodItem>(FOOD_ITEMS[0]);
  
  // Plate Builder state
  const [plate, setPlate] = useState<FoodItem[]>([]);

  // Quiz state
  const [quizQuestion, setQuizQuestion] = useState<{
    prompt: string;
    target: FoodItem;
    options: string[];
  }>({
    prompt: 'Which food gives you sharp night vision & has rich Vitamin A?',
    target: FOOD_ITEMS.find((f) => f.id === 'carrot') || FOOD_ITEMS[10],
    options: ['Carrot 🥕', 'Watermelon 🍉', 'Potato 🥔', 'Grapes 🍇'],
  });
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const speakText = (text: string) => {
    soundEngine.speak(text);
  };

  const handleSelectFood = (item: FoodItem) => {
    setSelectedFood(item);
    soundEngine.playPop();
    speakText(`${item.name}. ${item.tamilName}. ${item.superpower}`);
  };

  const handleAddToPlate = (item: FoodItem) => {
    if (plate.length >= 6) return;
    setPlate([...plate, item]);
    soundEngine.playChime();
    speakText(`Added ${item.name} to your healthy rainbow plate!`);
  };

  const handleRemoveFromPlate = (index: number) => {
    setPlate(plate.filter((_, i) => i !== index));
    soundEngine.playPop();
  };

  const handleEatPlate = () => {
    if (plate.length === 0) return;
    soundEngine.playCelebration();
    speakText('Yummy! Super healthy meal eaten! Great nutrition for your body and brain!');
    addStars(10);
    setPlate([]);
  };

  const generateQuiz = () => {
    setQuizFeedback(null);
    const target = FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)];
    const others = FOOD_ITEMS.filter((f) => f.id !== target.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((f) => `${f.name} ${f.emoji}`);
    const options = [`${target.name} ${target.emoji}`, ...others].sort(() => Math.random() - 0.5);

    setQuizQuestion({
      prompt: `Which healthy food has the power: "${target.superpower}"?`,
      target,
      options,
    });
    speakText(`Which healthy food has this superpower: ${target.superpower}?`);
  };

  const handleAnswerQuiz = (choice: string) => {
    const isCorrect = choice.startsWith(quizQuestion.target.name);
    if (isCorrect) {
      soundEngine.playCelebration();
      setQuizFeedback({ isCorrect: true, message: `🎉 Correct! ${quizQuestion.target.name} is a nutritional champion! +5 Stars! 🌟` });
      addStars(5);
      speakText(`Correct! ${quizQuestion.target.name} is a healthy choice!`);
      setTimeout(() => generateQuiz(), 2200);
    } else {
      soundEngine.playWrong();
      setQuizFeedback({ isCorrect: false, message: 'Try again! Think about its health superpower! 🍎' });
      speakText('Oops! Try another food!');
    }
  };

  const displayedList = FOOD_ITEMS.filter((f) =>
    subTab === 'fruits' ? f.type === 'fruit' : f.type === 'vegetable'
  );

  return (
    <div className="space-y-6 animate-pop-in">
      {/* 1. Top Section Banner */}
      <div className="bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-amber-300/40">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
            Nutrition & Nature Explorer
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2">
            <span>Fruits & Vegetables Garden</span>
            <span className="text-2xl">🍎🥕</span>
          </h2>
          <p className="text-xs sm:text-sm text-emerald-50 font-medium leading-relaxed">
            Discover juicy fruits, crunchy veggies, vitamins, superpowers, and Tamil vocabulary! Build a healthy rainbow plate and test your nutrition smarts.
          </p>
        </div>

        {/* Sub-Tab Navigation Bar */}
        <div className="bg-white/15 backdrop-blur-md p-1.5 rounded-2xl border border-white/25 flex flex-wrap items-center gap-1 shrink-0">
          {[
            { id: 'fruits', label: '🍎 Sweet Fruits' },
            { id: 'veggies', label: '🥕 Crunchy Veggies' },
            { id: 'plate_builder', label: '🥗 Rainbow Plate' },
            { id: 'quiz', label: '🏆 Nutrition Quiz' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setSubTab(tab.id as any);
                if (tab.id === 'fruits') setSelectedFood(FOOD_ITEMS[0]);
                if (tab.id === 'veggies') setSelectedFood(FOOD_ITEMS[10]);
                if (tab.id === 'quiz') generateQuiz();
              }}
              className={`btn-press px-3.5 py-2 rounded-xl text-xs font-black font-display transition-all cursor-pointer ${
                subTab === tab.id
                  ? 'bg-amber-400 text-slate-950 shadow-soft scale-105'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. SUBTAB A & B: FRUITS & VEGETABLES EXPLORER */}
      {(subTab === 'fruits' || subTab === 'veggies') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* List Grid (Left) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-soft border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black font-display text-slate-800 flex items-center gap-2">
                <span>Tap any {subTab === 'fruits' ? 'fruit' : 'vegetable'} to explore:</span>
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">
                {displayedList.length} Items Loaded
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {displayedList.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectFood(item)}
                  className={`btn-press p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border-2 ${
                    selectedFood.id === item.id
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 border-amber-500 shadow-pop scale-105'
                      : 'bg-slate-50 hover:bg-emerald-50 text-slate-800 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <span className="text-xs font-black font-display">{item.name}</span>
                  <span className="text-[10px] font-bold opacity-75 truncate max-w-[85px]">
                    {item.tamilName.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Details & Superpower Showcase (Right) */}
          <div className="lg:col-span-5 space-y-5">
            <div className={`bg-gradient-to-br ${selectedFood.color} rounded-3xl p-6 text-white shadow-soft space-y-4`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                  {selectedFood.type === 'fruit' ? '🍎 Delicious Fruit' : '🥦 Power Vegetable'}
                </span>
                <button
                  type="button"
                  onClick={() => speakText(`${selectedFood.name}. ${selectedFood.tamilName}. ${selectedFood.superpower}. ${selectedFood.funFact}`)}
                  className="btn-press p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-colors"
                  title="Speak out loud"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
                    {selectedFood.name}
                  </div>
                  <div className="text-sm font-extrabold text-white/90">{selectedFood.tamilName}</div>
                  <div className="text-xs font-bold text-amber-200 mt-1">Taste: {selectedFood.taste}</div>
                </div>
                <div className="text-6xl animate-bounce-soft">{selectedFood.emoji}</div>
              </div>

              <div className="bg-black/20 rounded-2xl p-3.5 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <Zap className="h-3.5 w-3.5" />
                  <span>Superpower: {selectedFood.superpower}</span>
                </div>
                <div className="text-white/90 leading-relaxed font-medium">
                  🧪 <strong>Vitamins:</strong> {selectedFood.vitamins}
                </div>
              </div>
            </div>

            {/* Fun Fact Card */}
            <div className="bg-white rounded-3xl p-5 shadow-soft border border-slate-200 space-y-3">
              <h4 className="text-xs font-black font-display text-slate-800 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>Did You Know?</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {selectedFood.funFact}
              </p>

              <button
                type="button"
                onClick={() => handleAddToPlate(selectedFood)}
                className="btn-press w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black font-display text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Add {selectedFood.name} to Rainbow Plate</span>
                <span>🥗</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. SUBTAB C: RAINBOW PLATE BUILDER */}
      {subTab === 'plate_builder' && (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              Interactive Healthy Meal Builder
            </span>
            <h3 className="text-2xl font-black font-display text-slate-900">
              Build Your Super Rainbow Salad Plate 🥗✨
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
              Pick up to 6 different colored fruits and vegetables to create a nutrient-packed balanced meal for your explorer body!
            </p>
          </div>

          {/* The Plate Display Area */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-full bg-gradient-to-b from-slate-100 to-sky-50 border-8 border-white shadow-2xl flex items-center justify-center p-6 text-center">
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-emerald-300 pointer-events-none" />

            {plate.length === 0 ? (
              <div className="text-slate-400 space-y-1">
                <div className="text-5xl">🍽️</div>
                <div className="text-xs font-bold">Plate is empty!</div>
                <div className="text-[11px]">Click items below to add</div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 justify-center items-center max-w-[200px]">
                {plate.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleRemoveFromPlate(idx)}
                    className="btn-press w-12 h-12 rounded-2xl bg-white shadow-soft border border-emerald-200 flex items-center justify-center text-2xl hover:scale-110 transition-transform cursor-pointer relative group"
                    title={`Click to remove ${item.name}`}
                  >
                    <span>{item.emoji}</span>
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100">✕</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleEatPlate}
              disabled={plate.length === 0}
              className="btn-press px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black font-display text-sm shadow-pop flex items-center gap-2 cursor-pointer disabled:opacity-40"
            >
              <span>Eat Healthy Meal & Earn 10 ⭐</span>
              <span>😋</span>
            </button>
            <button
              type="button"
              onClick={() => setPlate([])}
              disabled={plate.length === 0}
              className="btn-press px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer disabled:opacity-40"
            >
              Clear Plate
            </button>
          </div>

          {/* Quick Item Picker Tray */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-black font-display text-slate-800">
              Tap to add ingredients ({plate.length}/6 items):
            </h4>
            <div className="flex flex-wrap gap-2">
              {FOOD_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleAddToPlate(item)}
                  className="btn-press px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 border border-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{item.emoji}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. SUBTAB D: NUTRITION QUIZ */}
      {subTab === 'quiz' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6 text-center">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              Nutrition Champion Challenge
            </span>
            <h3 className="text-2xl font-black font-display text-slate-900">
              {quizQuestion.prompt}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3.5 pt-2">
            {quizQuestion.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleAnswerQuiz(opt)}
                className="btn-press py-4 px-4 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50 hover:from-emerald-100 hover:to-teal-100 text-slate-800 font-black font-display text-lg border-2 border-slate-200 hover:border-emerald-400 shadow-soft cursor-pointer transition-all"
              >
                {opt}
              </button>
            ))}
          </div>

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
              <span>Next Superpower Question</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
