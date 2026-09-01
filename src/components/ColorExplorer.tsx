import { useState } from 'react';
import { useApp } from '@/lib/store';
import { soundEngine } from '@/lib/soundEngine';
import {
  Palette,
  Volume2,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  FlaskConical,
  HelpCircle,
  Award,
} from 'lucide-react';
import { waterSound } from '@/lib/waterSound';

interface ColorItem {
  id: string;
  name: string;
  tamilName: string;
  hex: string;
  textColor: string;
  bgGradient: string;
  borderClass: string;
  items: { emoji: string; name: string }[];
  funFact: string;
}

const COLOR_PALETTE: ColorItem[] = [
  {
    id: 'red',
    name: 'Red',
    tamilName: 'சிவப்பு (Sivappu)',
    hex: '#ef4444',
    textColor: 'text-white',
    bgGradient: 'from-red-500 to-rose-600',
    borderClass: 'border-red-400',
    items: [
      { emoji: '🍎', name: 'Crisp Apple' },
      { emoji: '🍓', name: 'Sweet Strawberry' },
      { emoji: '🚒', name: 'Firetruck' },
      { emoji: '🌹', name: 'Red Rose' },
    ],
    funFact: 'Red is the color of strawberries, apples, and superhero capes!',
  },
  {
    id: 'blue',
    name: 'Blue',
    tamilName: 'நீலம் (Neelam)',
    hex: '#3b82f6',
    textColor: 'text-white',
    bgGradient: 'from-blue-500 to-indigo-600',
    borderClass: 'border-blue-400',
    items: [
      { emoji: '🌊', name: 'Ocean Waves' },
      { emoji: '🫐', name: 'Blueberries' },
      { emoji: '🐬', name: 'Dolphin' },
      { emoji: '🌌', name: 'Night Sky' },
    ],
    funFact: 'Blue is the color of the clear sunny sky and deep ocean oceans!',
  },
  {
    id: 'yellow',
    name: 'Yellow',
    tamilName: 'மஞ்சள் (Manjal)',
    hex: '#eab308',
    textColor: 'text-slate-950',
    bgGradient: 'from-yellow-400 to-amber-500',
    borderClass: 'border-yellow-400',
    items: [
      { emoji: '☀️', name: 'Warm Sun' },
      { emoji: '🍌', name: 'Ripe Banana' },
      { emoji: '🌻', name: 'Sunflower' },
      { emoji: '🐥', name: 'Baby Chick' },
    ],
    funFact: 'Yellow is the bright color of morning sunlight and yummy bananas!',
  },
  {
    id: 'green',
    name: 'Green',
    tamilName: 'பச்சை (Pachai)',
    hex: '#22c55e',
    textColor: 'text-white',
    bgGradient: 'from-green-500 to-emerald-600',
    borderClass: 'border-green-400',
    items: [
      { emoji: '🍃', name: 'Tree Leaves' },
      { emoji: '🐸', name: 'Playful Frog' },
      { emoji: '🥑', name: 'Fresh Avocado' },
      { emoji: '🦖', name: 'Dinosaur' },
    ],
    funFact: 'Green is the color of lush jungle forests, frogs, and sweet peas!',
  },
  {
    id: 'orange',
    name: 'Orange',
    tamilName: 'ஆரஞ்சு (Orange)',
    hex: '#f97316',
    textColor: 'text-white',
    bgGradient: 'from-orange-500 to-amber-600',
    borderClass: 'border-orange-400',
    items: [
      { emoji: '🍊', name: 'Juicy Orange' },
      { emoji: '🥕', name: 'Crunchy Carrot' },
      { emoji: '🦊', name: 'Cosmic Fox' },
      { emoji: '🎃', name: 'Pumpkin' },
    ],
    funFact: 'Orange is made by mixing warm Red and bright Yellow together!',
  },
  {
    id: 'purple',
    name: 'Purple',
    tamilName: 'ஊதா (Oodha)',
    hex: '#a855f7',
    textColor: 'text-white',
    bgGradient: 'from-purple-500 to-violet-600',
    borderClass: 'border-purple-400',
    items: [
      { emoji: '🍇', name: 'Grapes' },
      { emoji: '🍆', name: 'Eggplant' },
      { emoji: '🔮', name: 'Magic Crystal' },
      { emoji: '👑', name: 'Royal Robe' },
    ],
    funFact: 'Purple is the royal color made by blending mysterious Blue and brave Red!',
  },
  {
    id: 'pink',
    name: 'Pink',
    tamilName: 'இளஞ்சிவப்பு (Ilanjivappu)',
    hex: '#ec4899',
    textColor: 'text-white',
    bgGradient: 'from-pink-500 to-rose-500',
    borderClass: 'border-pink-400',
    items: [
      { emoji: '🦩', name: 'Flamingo' },
      { emoji: '🌸', name: 'Cherry Blossom' },
      { emoji: '🧁', name: 'Cupcake' },
      { emoji: '🎀', name: 'Ribbon' },
    ],
    funFact: 'Pink is soft and cheerful, made by mixing Red and White!',
  },
  {
    id: 'cyan',
    name: 'Sky Blue / Cyan',
    tamilName: 'வான நீலம் (Vaana Neelam)',
    hex: '#06b6d4',
    textColor: 'text-slate-950',
    bgGradient: 'from-cyan-400 to-sky-500',
    borderClass: 'border-cyan-400',
    items: [
      { emoji: '💎', name: 'Shiny Diamond' },
      { emoji: '🧊', name: 'Cool Ice' },
      { emoji: '🪶', name: 'Peacock Feather' },
      { emoji: '🏖️', name: 'Island Lagoon' },
    ],
    funFact: 'Cyan is the sparkling color of tropical lagoons and crystals!',
  },
  {
    id: 'brown',
    name: 'Brown',
    tamilName: 'பழுப்பு (Pazhuppu)',
    hex: '#78350f',
    textColor: 'text-white',
    bgGradient: 'from-amber-800 to-stone-900',
    borderClass: 'border-amber-700',
    items: [
      { emoji: '🐻', name: 'Teddy Bear' },
      { emoji: '🍫', name: 'Chocolate' },
      { emoji: '🪵', name: 'Tree Trunk' },
      { emoji: '🥥', name: 'Coconut' },
    ],
    funFact: 'Brown is the grounding color of rich garden soil, trees, and chocolate!',
  },
  {
    id: 'gold',
    name: 'Gold',
    tamilName: 'தங்கம் (Thangam)',
    hex: '#eab308',
    textColor: 'text-slate-950',
    bgGradient: 'from-yellow-400 via-amber-300 to-yellow-600',
    borderClass: 'border-amber-300',
    items: [
      { emoji: '🏆', name: 'Winner Trophy' },
      { emoji: '⭐', name: 'Shining Star' },
      { emoji: '🪙', name: 'Gold Coin' },
      { emoji: '👑', name: 'Golden Crown' },
    ],
    funFact: 'Gold is the glowing color of treasure chests and champion medals!',
  },
];

interface MixingRule {
  c1: string;
  c2: string;
  resultName: string;
  resultTamil: string;
  resultHex: string;
  resultEmoji: string;
}

const MIXING_RULES: MixingRule[] = [
  { c1: 'red', c2: 'yellow', resultName: 'Orange', resultTamil: 'ஆரஞ்சு', resultHex: '#f97316', resultEmoji: '🍊' },
  { c1: 'blue', c2: 'yellow', resultName: 'Green', resultTamil: 'பச்சை', resultHex: '#22c55e', resultEmoji: '🍃' },
  { c1: 'red', c2: 'blue', resultName: 'Purple', resultTamil: 'ஊதா', resultHex: '#a855f7', resultEmoji: '🍇' },
  { c1: 'red', c2: 'pink', resultName: 'Magenta Rose', resultTamil: 'ரோஜா நிறம்', resultHex: '#e11d48', resultEmoji: '🌹' },
  { c1: 'blue', c2: 'cyan', resultName: 'Deep Aqua', resultTamil: 'ஆழ்கடல் நீலம்', resultHex: '#0284c7', resultEmoji: '🌊' },
  { c1: 'green', c2: 'yellow', resultName: 'Lime Green', resultTamil: 'எலுமிச்சை பச்சை', resultHex: '#84cc16', resultEmoji: '🍋' },
  { c1: 'red', c2: 'green', resultName: 'Earth Brown', resultTamil: 'பழுப்பு', resultHex: '#78350f', resultEmoji: '🪵' },
  { c1: 'yellow', c2: 'orange', resultName: 'Amber Glow', resultTamil: 'சூரிய நிறம்', resultHex: '#d97706', resultEmoji: '🌅' },
];

export function ColorExplorer() {
  const { addStars } = useApp();
  const [activeTab, setActiveTab] = useState<'safari' | 'mixing' | 'quiz'>('safari');
  const [selectedColor, setSelectedColor] = useState<ColorItem>(COLOR_PALETTE[0]);

  // Mixing Lab State
  const [mixColor1, setMixColor1] = useState<string>('red');
  const [mixColor2, setMixColor2] = useState<string>('yellow');
  const [mixedResult, setMixedResult] = useState<MixingRule | null>(MIXING_RULES[0]);
  const [isMixing, setIsMixing] = useState<boolean>(false);

  // Quiz State
  const [quizQuestion, setQuizQuestion] = useState<{
    prompt: string;
    targetEmoji: string;
    correctName: string;
    options: string[];
  }>({
    prompt: 'What color is a juicy 🍓 Strawberry?',
    targetEmoji: '🍓',
    correctName: 'Red',
    options: ['Red', 'Blue', 'Green', 'Yellow'],
  });
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const speakText = (text: string) => {
    soundEngine.speak(text);
  };

  const handleSelectColor = (c: ColorItem) => {
    setSelectedColor(c);
    soundEngine.playPop();
    speakText(`${c.name}. ${c.tamilName}. ${c.funFact}`);
  };

  const handleMixColors = () => {
    setIsMixing(true);
    soundEngine.playPop();

    setTimeout(() => {
      // Find matching rule
      const found =
        MIXING_RULES.find(
          (r) =>
            (r.c1 === mixColor1 && r.c2 === mixColor2) ||
            (r.c1 === mixColor2 && r.c2 === mixColor1)
        ) || {
          c1: mixColor1,
          c2: mixColor2,
          resultName: 'Custom Fusion Color',
          resultTamil: 'புது மாய நிறம்',
          resultHex: '#6366f1',
          resultEmoji: '✨',
        };

      setMixedResult(found);
      setIsMixing(false);
      soundEngine.playCelebration();
      speakText(`${found.resultName}! Magical color mix!`);
      addStars(3);
    }, 600);
  };

  const generateColorQuiz = () => {
    setQuizFeedback(null);
    const target = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
    const randomItem = target.items[Math.floor(Math.random() * target.items.length)];
    const others = COLOR_PALETTE.filter((c) => c.name !== target.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((c) => c.name);
    const options = [target.name, ...others].sort(() => Math.random() - 0.5);

    setQuizQuestion({
      prompt: `What color is the ${randomItem.name} ${randomItem.emoji}?`,
      targetEmoji: randomItem.emoji,
      correctName: target.name,
      options,
    });
    speakText(`What color is the ${randomItem.name}?`);
  };

  const handleAnswerQuiz = (choice: string) => {
    if (choice === quizQuestion.correctName) {
      soundEngine.playCelebration();
      setQuizFeedback({ isCorrect: true, message: '🎉 Super Match! You know your colors! +5 Stars!' });
      addStars(5);
      speakText('Super match! That is correct!');
      setTimeout(() => {
        generateColorQuiz();
      }, 2000);
    } else {
      soundEngine.playWrong();
      setQuizFeedback({ isCorrect: false, message: 'Not quite, try another color! 🎨' });
      speakText('Oops! Try again!');
    }
  };

  return (
    <div className="space-y-6 animate-pop-in">
      {/* 1. Top Header */}
      <div className="bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-pink-400/40">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
            Art, Science & Color Discovery
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2">
            <span>Rainbow Colors & Mixing Lab</span>
            <span className="text-2xl">🎨🌈</span>
          </h2>
          <p className="text-xs sm:text-sm text-pink-100 font-medium leading-relaxed">
            Explore 10+ vibrant colors with English and Tamil names, real-world objects, and experiment in the Magic Color Mixing Pot!
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-white/15 backdrop-blur-md p-1.5 rounded-2xl border border-white/25 flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('safari')}
            className={`btn-press px-4 py-2 rounded-xl text-xs font-black font-display transition-all cursor-pointer ${
              activeTab === 'safari'
                ? 'bg-amber-400 text-slate-950 shadow-soft'
                : 'text-white hover:bg-white/15'
            }`}
          >
            🌈 Color Safari
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('mixing')}
            className={`btn-press px-4 py-2 rounded-xl text-xs font-black font-display transition-all cursor-pointer ${
              activeTab === 'mixing'
                ? 'bg-amber-400 text-slate-950 shadow-soft'
                : 'text-white hover:bg-white/15'
            }`}
          >
            🧪 Magic Mix Lab
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('quiz');
              generateColorQuiz();
            }}
            className={`btn-press px-4 py-2 rounded-xl text-xs font-black font-display transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-amber-400 text-slate-950 shadow-soft'
                : 'text-white hover:bg-white/15'
            }`}
          >
            🏆 Color Detective
          </button>
        </div>
      </div>

      {/* 2. TAB A: COLOR SAFARI */}
      {activeTab === 'safari' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Colors Palette Grid (Left) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-soft border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black font-display text-slate-800 flex items-center gap-2">
                <span>Tap any color palette:</span>
              </h3>
              <span className="text-xs font-bold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-xl">
                10+ Primary & Radiant Colors
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {COLOR_PALETTE.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleSelectColor(c)}
                  className={`btn-press p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border-2 ${
                    selectedColor.id === c.id
                      ? `${c.bgGradient} ${c.textColor} shadow-pop scale-105 border-slate-950/20`
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  <div
                    style={{ backgroundColor: c.hex }}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-soft"
                  />
                  <span className="text-xs font-black font-display">{c.name}</span>
                  <span className="text-[10px] font-bold opacity-85 truncate max-w-[100px]">
                    {c.tamilName.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Details & Real-World Items (Right) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Big Color Showcase Card */}
            <div
              className={`bg-gradient-to-br ${selectedColor.bgGradient} ${selectedColor.textColor} rounded-3xl p-6 shadow-soft space-y-4`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                  Color Discovery
                </span>
                <button
                  type="button"
                  onClick={() => speakText(`${selectedColor.name}. ${selectedColor.tamilName}. ${selectedColor.funFact}`)}
                  className="btn-press p-2 rounded-xl bg-white/20 hover:bg-white/30 cursor-pointer transition-colors"
                  title="Hear pronunciation"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-black font-display tracking-tight">
                  {selectedColor.name}
                </div>
                <div className="text-sm font-extrabold opacity-90">{selectedColor.tamilName}</div>
              </div>

              <div className="bg-black/20 rounded-2xl p-3.5 text-xs font-medium leading-relaxed">
                💡 {selectedColor.funFact}
              </div>
            </div>

            {/* Real World Objects Grid */}
            <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-200 space-y-4">
              <h4 className="text-xs font-black font-display text-slate-800">
                Things that are {selectedColor.name} in our world:
              </h4>

              <div className="grid grid-cols-2 gap-3">
                {selectedColor.items.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => speakText(`${item.name} is ${selectedColor.name}`)}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 hover:bg-sky-50 transition-colors cursor-pointer"
                  >
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="text-xs font-black font-display text-slate-800">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB B: MAGIC COLOR MIXING LAB */}
      {activeTab === 'mixing' && (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              Chemical & Art Science Experiments
            </span>
            <h3 className="text-2xl font-black font-display text-slate-900">
              Magic Color Mixing Pot 🧪✨
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
              Pick two colors, pour them into the magic cauldron, and watch them combine into an exciting brand new color!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Color 1 Picker */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 text-center">
              <label className="text-xs font-black font-display text-slate-700">1. Pick First Color:</label>
              <div className="flex flex-wrap gap-2 justify-center">
                {['red', 'blue', 'yellow', 'green', 'pink'].map((cId) => {
                  const cObj = COLOR_PALETTE.find((c) => c.id === cId);
                  return (
                    <button
                      key={cId}
                      type="button"
                      onClick={() => setMixColor1(cId)}
                      style={{ backgroundColor: cObj?.hex }}
                      className={`btn-press w-11 h-11 rounded-2xl border-4 transition-transform cursor-pointer ${
                        mixColor1 === cId ? 'border-slate-950 scale-110 shadow-pop' : 'border-white'
                      }`}
                      title={cObj?.name}
                    />
                  );
                })}
              </div>
              <div className="text-xs font-black text-slate-800 capitalize">{mixColor1}</div>
            </div>

            {/* Mixing Action / Center Cauldron */}
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="text-3xl font-black text-slate-400">+</div>
              <button
                type="button"
                onClick={handleMixColors}
                disabled={isMixing}
                className="btn-press px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 text-white font-black font-display text-sm shadow-pop flex items-center gap-2 hover:opacity-95 cursor-pointer disabled:opacity-50"
              >
                <FlaskConical className={`h-4 w-4 ${isMixing ? 'animate-spin' : ''}`} />
                <span>{isMixing ? 'Mixing Paints...' : 'Mix Magic Colors!'}</span>
              </button>
            </div>

            {/* Color 2 Picker */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 text-center">
              <label className="text-xs font-black font-display text-slate-700">2. Pick Second Color:</label>
              <div className="flex flex-wrap gap-2 justify-center">
                {['yellow', 'blue', 'red', 'cyan', 'pink'].map((cId) => {
                  const cObj = COLOR_PALETTE.find((c) => c.id === cId);
                  return (
                    <button
                      key={cId}
                      type="button"
                      onClick={() => setMixColor2(cId)}
                      style={{ backgroundColor: cObj?.hex }}
                      className={`btn-press w-11 h-11 rounded-2xl border-4 transition-transform cursor-pointer ${
                        mixColor2 === cId ? 'border-slate-950 scale-110 shadow-pop' : 'border-white'
                      }`}
                      title={cObj?.name}
                    />
                  );
                })}
              </div>
              <div className="text-xs font-black text-slate-800 capitalize">{mixColor2}</div>
            </div>
          </div>

          {/* Mixed Result Showcase */}
          {mixedResult && (
            <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 rounded-3xl p-6 border-2 border-purple-200 text-center space-y-4 animate-pop-in">
              <div className="text-xs font-black uppercase tracking-wider text-purple-900">
                🎉 Color Fusion Success!
              </div>

              <div className="flex items-center justify-center gap-4">
                <div
                  style={{ backgroundColor: mixedResult.resultHex }}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-pop flex items-center justify-center text-3xl"
                >
                  {mixedResult.resultEmoji}
                </div>
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-black font-display text-slate-900">
                    {mixedResult.resultName}
                  </div>
                  <div className="text-sm font-bold text-purple-700">
                    {mixedResult.resultTamil}
                  </div>
                  <div className="text-xs text-slate-600 font-medium mt-1">
                    Formula: <strong className="capitalize">{mixColor1}</strong> + <strong className="capitalize">{mixColor2}</strong> = <strong>{mixedResult.resultName}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. TAB C: COLOR DETECTIVE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6 text-center">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-violet-100 text-violet-800 px-3 py-1 rounded-full">
              Color Detective Quiz
            </span>
            <div className="text-6xl py-2 animate-bounce-soft">{quizQuestion.targetEmoji}</div>
            <h3 className="text-2xl font-black font-display text-slate-900">
              {quizQuestion.prompt}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-3.5 pt-2">
            {quizQuestion.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleAnswerQuiz(opt)}
                className="btn-press py-4 px-4 rounded-2xl bg-gradient-to-br from-slate-50 to-purple-50 hover:from-purple-100 hover:to-pink-100 text-slate-800 font-black font-display text-lg border-2 border-slate-200 hover:border-purple-400 shadow-soft cursor-pointer transition-all"
              >
                {opt}
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
              onClick={generateColorQuiz}
              className="btn-press px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 mx-auto cursor-pointer transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Next Color Clue</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
