import { useState } from 'react';
import { useApp } from '@/lib/store';
import { soundEngine } from '@/lib/soundEngine';
import {
  Rocket,
  Volume2,
  Sparkles,
  RefreshCw,
  Award,
  Globe,
  Sun,
  Moon,
  Compass,
  Thermometer,
  Zap,
} from 'lucide-react';
import { waterSound } from '@/lib/waterSound';

interface PlanetItem {
  id: string;
  name: string;
  tamilName: string;
  type: 'star' | 'terrestrial' | 'gas_giant' | 'ice_giant' | 'moon';
  emoji: string;
  orderFromSun: number;
  distanceFromSun: string;
  dayLength: string;
  yearLength: string;
  moonsCount: number;
  temperature: string;
  color: string;
  bgGradient: string;
  funFact: string;
  superpower: string;
}

const PLANETS_DATA: PlanetItem[] = [
  {
    id: 'sun',
    name: 'The Sun',
    tamilName: 'சூரியன் (Sooriyan)',
    type: 'star',
    emoji: '☀️',
    orderFromSun: 0,
    distanceFromSun: 'Center of Solar System',
    dayLength: '27 Earth days (rotation)',
    yearLength: '230 million years (around Milky Way)',
    moonsCount: 8,
    temperature: '5,500°C (Surface) / 15M°C (Core)',
    color: '#f59e0b',
    bgGradient: 'from-amber-500 via-orange-500 to-red-600',
    funFact: 'The Sun is so gigantic that over 1.3 million Earths could fit comfortably inside it!',
    superpower: 'Provides warm light and gravitational anchor that powers all life and orbits in our solar system!',
  },
  {
    id: 'mercury',
    name: 'Mercury',
    tamilName: 'புதன் (Budhan)',
    type: 'terrestrial',
    emoji: '🪨',
    orderFromSun: 1,
    distanceFromSun: '58 million km',
    dayLength: '59 Earth days',
    yearLength: '88 Earth days (Fastest orbit!)',
    moonsCount: 0,
    temperature: '-180°C (Night) to 430°C (Day)',
    color: '#94a3b8',
    bgGradient: 'from-slate-500 to-stone-700',
    funFact: 'Mercury speeds around the Sun at 47 km per second—the fastest planetary race car in space!',
    superpower: 'Super speedy sprinter world with shiny metallic core!',
  },
  {
    id: 'venus',
    name: 'Venus',
    tamilName: 'வெள்ளி (Velli)',
    type: 'terrestrial',
    emoji: '🟡',
    orderFromSun: 2,
    distanceFromSun: '108 million km',
    dayLength: '243 Earth days (Spins backwards!)',
    yearLength: '225 Earth days',
    moonsCount: 0,
    temperature: '465°C (Hottest Planet)',
    color: '#eab308',
    bgGradient: 'from-yellow-500 via-amber-600 to-orange-700',
    funFact: 'Venus is known as the "Morning Star" and shines brighter in our night sky than any star except the Moon!',
    superpower: 'Golden thermal blanket with glowing yellow clouds!',
  },
  {
    id: 'earth',
    name: 'Earth',
    tamilName: 'பூமி (Boomi)',
    type: 'terrestrial',
    emoji: '🌍',
    orderFromSun: 3,
    distanceFromSun: '150 million km (1 AU)',
    dayLength: '24 hours',
    yearLength: '365.25 days',
    moonsCount: 1,
    temperature: '15°C Average (Perfect for life!)',
    color: '#3b82f6',
    bgGradient: 'from-sky-500 via-blue-600 to-emerald-600',
    funFact: 'Earth is the only known planet in the entire universe that has liquid water oceans and thriving living creatures!',
    superpower: 'The vibrant sanctuary of oceans, rainforests, and human explorers!',
  },
  {
    id: 'moon',
    name: 'The Moon',
    tamilName: 'சந்திரன் (Chandran)',
    type: 'moon',
    emoji: '🌙',
    orderFromSun: 3,
    distanceFromSun: '384,400 km from Earth',
    dayLength: '27.3 Earth days',
    yearLength: '27.3 Earth days (Synchronous orbit)',
    moonsCount: 0,
    temperature: '-130°C to 120°C',
    color: '#cbd5e1',
    bgGradient: 'from-slate-400 via-indigo-900 to-slate-900',
    funFact: 'Footprints left by astronauts on the Moon will stay there for millions of years because there is no wind to blow them away!',
    superpower: 'Gentle night lantern that pulls our ocean ocean tides!',
  },
  {
    id: 'mars',
    name: 'Mars',
    tamilName: 'செவ்வாய் (Sevvai)',
    type: 'terrestrial',
    emoji: '🔴',
    orderFromSun: 4,
    distanceFromSun: '228 million km',
    dayLength: '24.6 hours',
    yearLength: '687 Earth days',
    moonsCount: 2,
    temperature: '-60°C Average',
    color: '#ef4444',
    bgGradient: 'from-red-600 via-orange-600 to-stone-800',
    funFact: 'Mars is home to Olympus Mons, a giant shield volcano 3 times taller than Mount Everest!',
    superpower: 'The Red Planet explorer frontier with robotic rovers roaming its rusty soil!',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    tamilName: 'வியாழன் (Vyaazhan)',
    type: 'gas_giant',
    emoji: '🪐',
    orderFromSun: 5,
    distanceFromSun: '778 million km',
    dayLength: '9.9 hours (Fastest spinning planet!)',
    yearLength: '12 Earth years',
    moonsCount: 95,
    temperature: '-110°C',
    color: '#d97706',
    bgGradient: 'from-amber-600 via-orange-700 to-stone-900',
    funFact: 'Jupiter’s famous Great Red Spot is a colossal swirling hurricane storm that is bigger than planet Earth itself!',
    superpower: 'Mighty cosmic shield giant that protects inner planets from asteroids with its gravity!',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    tamilName: 'சனி (Sani)',
    type: 'gas_giant',
    emoji: '🪐',
    orderFromSun: 6,
    distanceFromSun: '1.4 billion km',
    dayLength: '10.7 hours',
    yearLength: '29.5 Earth years',
    moonsCount: 146,
    temperature: '-140°C',
    color: '#eab308',
    bgGradient: 'from-yellow-500 via-amber-600 to-indigo-950',
    funFact: 'Saturn’s breathtaking rings are made of billions of pieces of glittering ice chunks, rocky dust, and cosmic crystals!',
    superpower: 'Crown jewel of space with thousand-ring halo and giant icy moon Titan!',
  },
  {
    id: 'uranus',
    name: 'Uranus',
    tamilName: 'யுரேனஸ் (Uranus)',
    type: 'ice_giant',
    emoji: '🔵',
    orderFromSun: 7,
    distanceFromSun: '2.9 billion km',
    dayLength: '17 hours',
    yearLength: '84 Earth years',
    moonsCount: 28,
    temperature: '-224°C (Coldest atmosphere!)',
    color: '#06b6d4',
    bgGradient: 'from-cyan-400 via-teal-600 to-slate-900',
    funFact: 'Uranus rotates tilted completely on its side, rolling like a bowling ball as it orbits the Sun!',
    superpower: 'Rolling turquoise ice giant with 13 faint dark rings!',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    tamilName: 'நெப்டியூன் (Neptune)',
    type: 'ice_giant',
    emoji: '🌊',
    orderFromSun: 8,
    distanceFromSun: '4.5 billion km',
    dayLength: '16 hours',
    yearLength: '165 Earth years',
    moonsCount: 16,
    temperature: '-214°C',
    color: '#2563eb',
    bgGradient: 'from-blue-600 via-indigo-700 to-slate-950',
    funFact: 'Neptune has the fastest supersonic winds in the entire solar system, blowing up to 2,000 km per hour!',
    superpower: 'Deep sapphire storm world with frozen geysers on its moon Triton!',
  },
];

export function SolarSystemExplorer() {
  const { addStars } = useApp();
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetItem>(PLANETS_DATA[3]); // Earth default
  const [subTab, setSubTab] = useState<'orbit' | 'cards' | 'quiz'>('orbit');

  // Quiz state
  const [quizQuestion, setQuizQuestion] = useState<{
    prompt: string;
    correct: PlanetItem;
    options: string[];
  }>({
    prompt: 'Which planet is famous for having magnificent glittering rings?',
    correct: PLANETS_DATA.find((p) => p.id === 'saturn') || PLANETS_DATA[7],
    options: ['Saturn 🪐', 'Mars 🔴', 'Mercury 🪨', 'Venus 🟡'],
  });
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const speakText = (text: string) => {
    soundEngine.speak(text);
  };

  const handleSelectPlanet = (p: PlanetItem) => {
    setSelectedPlanet(p);
    soundEngine.playPop();
    speakText(`${p.name}. ${p.tamilName}. Distance from sun: ${p.distanceFromSun}. ${p.funFact}`);
  };

  const generateQuiz = () => {
    setQuizFeedback(null);
    const target = PLANETS_DATA[Math.floor(Math.random() * PLANETS_DATA.length)];
    const others = PLANETS_DATA.filter((p) => p.id !== target.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((p) => `${p.name} ${p.emoji}`);
    const options = [`${target.name} ${target.emoji}`, ...others].sort(() => Math.random() - 0.5);

    setQuizQuestion({
      prompt: `Which celestial world matches: "${target.funFact}"?`,
      correct: target,
      options,
    });
    speakText(`Astronaut Question: Which celestial world matches this fact?`);
  };

  const handleAnswerQuiz = (choice: string) => {
    const isCorrect = choice.startsWith(quizQuestion.correct.name);
    if (isCorrect) {
      soundEngine.playCelebration();
      setQuizFeedback({ isCorrect: true, message: `🎉 Cosmic Genius! ${quizQuestion.correct.name} is correct! +5 Stars! ⭐` });
      addStars(5);
      speakText(`Cosmic genius! That is correct!`);
      setTimeout(() => generateQuiz(), 2200);
    } else {
      soundEngine.playWrong();
      setQuizFeedback({ isCorrect: false, message: 'Try again! Think about planet distances and sizes! 🚀' });
      speakText('Oops! Try another planet!');
    }
  };

  return (
    <div className="space-y-6 animate-pop-in">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-purple-400/40">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/10 text-purple-200 px-3 py-1 rounded-full border border-purple-400/30">
            Astronomy & Space Exploration
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2">
            <span>Cosmic Solar System Orbit</span>
            <span className="text-2xl">🪐🚀</span>
          </h2>
          <p className="text-xs sm:text-sm text-purple-200 font-medium leading-relaxed">
            Journey from the glowing Sun across all 8 majestic planets, moons, asteroid belts, orbit speeds, and space rover missions!
          </p>
        </div>

        {/* Subtab Switcher */}
        <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 flex items-center gap-1 shrink-0">
          {[
            { id: 'orbit', label: '🪐 Planetary Orbit' },
            { id: 'cards', label: '🌌 Planet Cards' },
            { id: 'quiz', label: '👨‍🚀 Astronaut Quiz' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setSubTab(tab.id as any);
                if (tab.id === 'quiz') generateQuiz();
              }}
              className={`btn-press px-4 py-2 rounded-xl text-xs font-black font-display transition-all cursor-pointer ${
                subTab === tab.id
                  ? 'bg-amber-400 text-slate-950 shadow-soft'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. SUBTAB A: INTERACTIVE ORBIT MAP */}
      {subTab === 'orbit' && (
        <div className="space-y-6">
          {/* Scrollable Solar System Planet Track */}
          <div className="bg-slate-950 rounded-3xl p-6 shadow-soft border-2 border-indigo-900/80 overflow-x-auto">
            <div className="text-xs font-black uppercase tracking-wider text-purple-300 pb-3 flex items-center justify-between">
              <span>🪐 Interactive Solar System (Tap any planet):</span>
              <span className="text-[11px] text-slate-400">Scroll sideways →</span>
            </div>

            <div className="flex items-center gap-4 min-w-[760px] py-4 px-2">
              {PLANETS_DATA.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPlanet(p)}
                  className={`btn-press flex flex-col items-center gap-2 p-3 rounded-2xl transition-all cursor-pointer ${
                    selectedPlanet.id === p.id
                      ? 'bg-purple-900/60 border-2 border-amber-400 scale-110 shadow-pop'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div
                    style={{ backgroundColor: p.color }}
                    className="w-12 h-12 rounded-full border-2 border-white/80 shadow-md flex items-center justify-center text-xl animate-float"
                  >
                    {p.emoji}
                  </div>
                  <span className="text-xs font-black text-white font-display whitespace-nowrap">{p.name}</span>
                  <span className="text-[10px] text-purple-300 font-medium">#{p.orderFromSun === 0 ? 'Star' : p.orderFromSun}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Planet Dossier Card */}
          <div className={`bg-gradient-to-br ${selectedPlanet.bgGradient} rounded-3xl p-6 sm:p-8 text-white shadow-soft space-y-6 border border-white/20`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                    {selectedPlanet.type.toUpperCase().replace('_', ' ')}
                  </span>
                  <span className="text-xs font-bold text-amber-300">
                    Order from Sun: #{selectedPlanet.orderFromSun}
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black font-display text-white">
                  {selectedPlanet.name} ({selectedPlanet.tamilName})
                </h3>
              </div>

              <button
                type="button"
                onClick={() => speakText(`${selectedPlanet.name}. ${selectedPlanet.tamilName}. ${selectedPlanet.superpower}. ${selectedPlanet.funFact}`)}
                className="btn-press px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-black text-xs flex items-center gap-2 cursor-pointer transition-colors self-start"
              >
                <Volume2 className="h-4 w-4" />
                <span>Hear Cosmic Audio</span>
              </button>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-black/25 rounded-2xl p-3.5 backdrop-blur-md space-y-0.5 border border-white/10">
                <span className="text-slate-300 text-[10px] font-bold uppercase">Distance to Sun</span>
                <div className="font-black text-white text-sm">{selectedPlanet.distanceFromSun}</div>
              </div>

              <div className="bg-black/25 rounded-2xl p-3.5 backdrop-blur-md space-y-0.5 border border-white/10">
                <span className="text-slate-300 text-[10px] font-bold uppercase">Day Length</span>
                <div className="font-black text-amber-300 text-sm">{selectedPlanet.dayLength}</div>
              </div>

              <div className="bg-black/25 rounded-2xl p-3.5 backdrop-blur-md space-y-0.5 border border-white/10">
                <span className="text-slate-300 text-[10px] font-bold uppercase">Orbit Year</span>
                <div className="font-black text-sky-300 text-sm">{selectedPlanet.yearLength}</div>
              </div>

              <div className="bg-black/25 rounded-2xl p-3.5 backdrop-blur-md space-y-0.5 border border-white/10">
                <span className="text-slate-300 text-[10px] font-bold uppercase">Moons & Temp</span>
                <div className="font-black text-emerald-300 text-sm">{selectedPlanet.moonsCount} Moons • {selectedPlanet.temperature.split(' ')[0]}</div>
              </div>
            </div>

            {/* Detailed Facts */}
            <div className="bg-black/30 rounded-2xl p-4 space-y-2 text-xs leading-relaxed border border-white/15">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <Zap className="h-4 w-4" />
                <span>Space Power: {selectedPlanet.superpower}</span>
              </div>
              <div className="text-white/95 font-medium">
                🚀 <strong>Astronaut Log:</strong> {selectedPlanet.funFact}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SUBTAB B: PLANET CARDS */}
      {subTab === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLANETS_DATA.map((p) => (
            <div
              key={p.id}
              onClick={() => handleSelectPlanet(p)}
              className="bg-white rounded-3xl p-5 shadow-soft border border-slate-200 space-y-3 hover:shadow-pop transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-3xl shadow-xs group-hover:scale-110 transition-transform">
                  {p.emoji}
                </div>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-xl">
                  {p.moonsCount} Moons
                </span>
              </div>

              <div className="space-y-0.5">
                <h4 className="text-base font-black font-display text-slate-900">{p.name}</h4>
                <p className="text-xs text-slate-500 font-bold">{p.tamilName}</p>
              </div>

              <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">
                {p.funFact}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 4. SUBTAB C: ASTRONAUT QUIZ */}
      {subTab === 'quiz' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6 text-center">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              Space Academy Astronaut Challenge
            </span>
            <div className="text-6xl py-2 animate-bounce-soft">{quizQuestion.correct.emoji}</div>
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
                className="btn-press py-4 px-4 rounded-2xl bg-gradient-to-br from-slate-50 to-purple-50 hover:from-purple-100 hover:to-indigo-100 text-slate-800 font-black font-display text-lg border-2 border-slate-200 hover:border-purple-400 shadow-soft cursor-pointer transition-all"
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
              <span>Next Space Flight Question</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
