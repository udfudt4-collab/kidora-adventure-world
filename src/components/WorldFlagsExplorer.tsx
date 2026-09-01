import { useState } from 'react';
import { useApp } from '@/lib/store';
import {
  Globe,
  Volume2,
  Sparkles,
  Award,
  RefreshCw,
  MapPin,
  Compass,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { waterSound } from '@/lib/waterSound';

interface CountryItem {
  id: string;
  name: string;
  tamilName: string;
  flag: string;
  continent: 'Asia' | 'Europe' | 'Americas' | 'Africa' | 'Oceania';
  capital: string;
  nationalSymbol: string;
  landmark: { name: string; emoji: string };
  greeting: { word: string; meaning: string };
  funFact: string;
  color: string;
}

const COUNTRIES_DATA: CountryItem[] = [
  {
    id: 'in',
    name: 'India',
    tamilName: 'இந்தியா (India)',
    flag: '🇮🇳',
    continent: 'Asia',
    capital: 'New Delhi',
    nationalSymbol: 'Royal Bengal Tiger 🐅 & Lotus 🪷',
    landmark: { name: 'Taj Mahal', emoji: '🕌' },
    greeting: { word: 'Vanakkam / Namaste', meaning: 'I bow to the divine in you' },
    funFact: 'India is the birthplace of chess, yoga, zero (0), and the world’s largest biodiversity sanctuaries!',
    color: 'from-orange-500 via-white to-emerald-600',
  },
  {
    id: 'jp',
    name: 'Japan',
    tamilName: 'ஜப்பான் (Japan)',
    flag: '🇯🇵',
    continent: 'Asia',
    capital: 'Tokyo',
    nationalSymbol: 'Green Pheasant 🐦 & Cherry Blossom 🌸',
    landmark: { name: 'Mount Fuji', emoji: '🗻' },
    greeting: { word: 'Konnichiwa (こんにちは)', meaning: 'Good day / Hello' },
    funFact: 'Japan has super-fast bullet trains called Shinkansen that travel at 320 km/h with zero delays!',
    color: 'from-rose-500 to-red-600',
  },
  {
    id: 'us',
    name: 'United States',
    tamilName: 'அமெரிக்கா (USA)',
    flag: '🇺🇸',
    continent: 'Americas',
    capital: 'Washington, D.C.',
    nationalSymbol: 'Bald Eagle 🦅',
    landmark: { name: 'Statue of Liberty', emoji: '🗽' },
    greeting: { word: 'Hello / Howdy!', meaning: 'Friendly American greeting' },
    funFact: 'The USA has 50 diverse states and the world’s oldest national park, Yellowstone!',
    color: 'from-blue-600 via-red-500 to-indigo-700',
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    tamilName: 'இங்கிலாந்து (UK)',
    flag: '🇬🇧',
    continent: 'Europe',
    capital: 'London',
    nationalSymbol: 'Lion 🦁 & Red Rose 🌹',
    landmark: { name: 'Big Ben & Tower Bridge', emoji: '🕰️' },
    greeting: { word: 'Cheerio / Good Day', meaning: 'Polite British greeting' },
    funFact: 'London has the world’s oldest underground railway network known as the Tube!',
    color: 'from-blue-700 via-rose-600 to-red-700',
  },
  {
    id: 'fr',
    name: 'France',
    tamilName: 'பிரான்ஸ் (France)',
    flag: '🇫🇷',
    continent: 'Europe',
    capital: 'Paris',
    nationalSymbol: 'Gallic Rooster 🐓 & Iris ⚜️',
    landmark: { name: 'Eiffel Tower', emoji: '🗼' },
    greeting: { word: 'Bonjour!', meaning: 'Good morning / Good day' },
    funFact: 'The Eiffel Tower grows up to 15 centimeters taller during hot summer days because metal expands!',
    color: 'from-blue-600 via-slate-100 to-red-600',
  },
  {
    id: 'au',
    name: 'Australia',
    tamilName: 'ஆஸ்திரேலியா (Australia)',
    flag: '🇦🇺',
    continent: 'Oceania',
    capital: 'Canberra',
    nationalSymbol: 'Red Kangaroo 🦘 & Emu 🐦',
    landmark: { name: 'Sydney Opera House', emoji: '🎭' },
    greeting: { word: "G'day Mate!", meaning: 'Good day friend!' },
    funFact: 'Australia is both a country and an entire continent, home to the Great Barrier Reef!',
    color: 'from-blue-600 to-teal-700',
  },
  {
    id: 'ca',
    name: 'Canada',
    tamilName: 'கனடா (Canada)',
    flag: '🇨🇦',
    continent: 'Americas',
    capital: 'Ottawa',
    nationalSymbol: 'North American Beaver 🦫 & Maple Leaf 🍁',
    landmark: { name: 'Niagara Falls', emoji: '🌊' },
    greeting: { word: 'Hello / Bonjour', meaning: 'English & French bilingual greeting' },
    funFact: 'Canada has more lakes than all other countries in the world combined!',
    color: 'from-red-600 via-rose-100 to-red-600',
  },
  {
    id: 'eg',
    name: 'Egypt',
    tamilName: 'எகிப்து (Egypt)',
    flag: '🇪🇬',
    continent: 'Africa',
    capital: 'Cairo',
    nationalSymbol: 'Steppe Eagle 🦅',
    landmark: { name: 'Great Pyramids of Giza', emoji: '🏜️' },
    greeting: { word: 'Marhaban (مرحبا)', meaning: 'Welcome' },
    funFact: 'The Great Pyramid of Giza was the tallest man-made structure in the world for over 3,800 years!',
    color: 'from-amber-600 via-yellow-500 to-stone-800',
  },
  {
    id: 'br',
    name: 'Brazil',
    tamilName: 'பிரேசில் (Brazil)',
    flag: '🇧🇷',
    continent: 'Americas',
    capital: 'Brasília',
    nationalSymbol: 'Jaguar 🐆',
    landmark: { name: 'Amazon Rainforest', emoji: '🌴' },
    greeting: { word: 'Olá!', meaning: 'Hello in Portuguese' },
    funFact: 'The Amazon Rainforest in Brazil produces over 20% of Earth’s total oxygen!',
    color: 'from-green-500 via-yellow-400 to-blue-600',
  },
  {
    id: 'za',
    name: 'South Africa',
    tamilName: 'தென்னாப்பிரிக்கா (South Africa)',
    flag: '🇿🇦',
    continent: 'Africa',
    capital: 'Pretoria / Cape Town',
    nationalSymbol: 'Springbok Antelope 🦌',
    landmark: { name: 'Table Mountain', emoji: '⛰️' },
    greeting: { word: 'Sawubona!', meaning: 'I see you / Hello in Zulu' },
    funFact: 'Known as the Rainbow Nation with 11 official languages and magnificent wildlife safaris!',
    color: 'from-emerald-600 via-amber-400 to-blue-700',
  },
  {
    id: 'sg',
    name: 'Singapore',
    tamilName: 'சிங்கப்பூர் (Singapore)',
    flag: '🇸🇬',
    continent: 'Asia',
    capital: 'Singapore City',
    nationalSymbol: 'The Merlion 🦁🐟',
    landmark: { name: 'Gardens by the Bay', emoji: '🌳' },
    greeting: { word: 'Vanakkam / Ni Hao / Hello', meaning: 'Multicultural greeting' },
    funFact: 'Known as the "Garden City", Singapore has giant solar Supertrees that collect rainwater and generate clean electricity!',
    color: 'from-red-500 to-rose-600',
  },
  {
    id: 'ae',
    name: 'United Arab Emirates',
    tamilName: 'ஐக்கிய அரபு அமீரகம் (UAE)',
    flag: '🇦🇪',
    continent: 'Asia',
    capital: 'Abu Dhabi',
    nationalSymbol: 'Arabian Falcon 🦅',
    landmark: { name: 'Burj Khalifa', emoji: '🏙️' },
    greeting: { word: 'As-salamu alaykum', meaning: 'Peace be upon you' },
    funFact: 'Burj Khalifa in Dubai is the world’s tallest building, standing 828 meters high into the clouds!',
    color: 'from-emerald-600 via-rose-600 to-stone-800',
  },
  {
    id: 'de',
    name: 'Germany',
    tamilName: 'ஜெர்மனி (Germany)',
    flag: '🇩🇪',
    continent: 'Europe',
    capital: 'Berlin',
    nationalSymbol: 'Federal Eagle 🦅',
    landmark: { name: 'Neuschwanstein Castle', emoji: '🏰' },
    greeting: { word: 'Guten Tag!', meaning: 'Good day' },
    funFact: 'Germany has over 20,000 fairy-tale castles and pioneered modern renewable wind & solar energy!',
    color: 'from-stone-900 via-red-600 to-amber-400',
  },
  {
    id: 'lk',
    name: 'Sri Lanka',
    tamilName: 'இலங்கை (Sri Lanka)',
    flag: '🇱🇰',
    continent: 'Asia',
    capital: 'Colombo',
    nationalSymbol: 'Lion with Sword 🦁🗡️',
    landmark: { name: 'Sigiriya Rock Fortress', emoji: '🏛️' },
    greeting: { word: 'Vanakkam / Ayubowan', meaning: 'May you live long' },
    funFact: 'Known as the Pearl of the Indian Ocean, famous for emerald tea plantations and coral beaches!',
    color: 'from-amber-500 via-emerald-600 to-orange-600',
  },
];

export function WorldFlagsExplorer() {
  const { addStars } = useApp();
  const [subTab, setSubTab] = useState<'flags' | 'landmarks' | 'quiz'>('flags');
  const [continentFilter, setContinentFilter] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<CountryItem>(COUNTRIES_DATA[0]);

  // Quiz state
  const [quizQuestion, setQuizQuestion] = useState<{
    prompt: string;
    correctCountry: CountryItem;
    options: string[];
  }>({
    prompt: 'Which country has the flag 🇮🇳 and capital New Delhi?',
    correctCountry: COUNTRIES_DATA[0],
    options: ['India 🇮🇳', 'Japan 🇯🇵', 'France 🇫🇷', 'Canada 🇨🇦'],
  });
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectCountry = (item: CountryItem) => {
    setSelectedCountry(item);
    waterSound.playDroplet();
    speakText(`${item.name}. Capital: ${item.capital}. Greeting: ${item.greeting.word}. ${item.funFact}`);
  };

  const generateQuiz = () => {
    setQuizFeedback(null);
    const target = COUNTRIES_DATA[Math.floor(Math.random() * COUNTRIES_DATA.length)];
    const others = COUNTRIES_DATA.filter((c) => c.id !== target.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((c) => `${c.name} ${c.flag}`);
    const options = [`${target.name} ${target.flag}`, ...others].sort(() => Math.random() - 0.5);

    const isFlagQuiz = Math.random() > 0.5;
    const prompt = isFlagQuiz
      ? `Which country has the flag ${target.flag} and capital ${target.capital}?`
      : `Where would you find the famous landmark "${target.landmark.name} ${target.landmark.emoji}"?`;

    setQuizQuestion({
      prompt,
      correctCountry: target,
      options,
    });
    speakText(prompt);
  };

  const handleAnswerQuiz = (choice: string) => {
    const isCorrect = choice.startsWith(quizQuestion.correctCountry.name);
    if (isCorrect) {
      setQuizFeedback({ isCorrect: true, message: `🎉 Super Navigator! ${quizQuestion.correctCountry.name} is correct! +5 Stars! 🌟` });
      addStars(5);
      speakText(`Super navigator! ${quizQuestion.correctCountry.name} is correct!`);
      setTimeout(() => generateQuiz(), 2200);
    } else {
      setQuizFeedback({ isCorrect: false, message: 'Try again! Check the flag symbols! 🌍' });
      speakText('Oops! Try another country!');
    }
  };

  const filteredCountries = continentFilter === 'all'
    ? COUNTRIES_DATA
    : COUNTRIES_DATA.filter((c) => c.continent === continentFilter);

  return (
    <div className="space-y-6 animate-pop-in">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-blue-400/40">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
            Global Geography & World Cultures
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2">
            <span>Countries & World Flags Expedition</span>
            <span className="text-2xl">🌍🚩</span>
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
            Travel around the globe! Explore national flags, capital cities, famous landmarks, native greetings, and fascinating world heritage.
          </p>
        </div>

        {/* Navigation Subtabs */}
        <div className="bg-white/15 backdrop-blur-md p-1.5 rounded-2xl border border-white/25 flex items-center gap-1 shrink-0">
          {[
            { id: 'flags', label: '🚩 Flags & Capitals' },
            { id: 'landmarks', label: '🏛️ World Wonders' },
            { id: 'quiz', label: '🏆 Flag Detective' },
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

      {/* 2. SUBTAB A: FLAGS & CAPITALS */}
      {subTab === 'flags' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Country Grid (Left) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-soft border border-slate-200 space-y-4">
            {/* Continent Pills */}
            <div className="flex items-center gap-1.5 flex-wrap pb-3 border-b border-slate-100">
              {['all', 'Asia', 'Europe', 'Americas', 'Africa', 'Oceania'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setContinentFilter(c)}
                  className={`btn-press px-3 py-1.5 rounded-xl text-xs font-black capitalize transition-colors cursor-pointer ${
                    continentFilter === c
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {c === 'all' ? '🌏 All Continents' : c}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredCountries.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleSelectCountry(c)}
                  className={`btn-press p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border-2 ${
                    selectedCountry.id === c.id
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-blue-600 shadow-pop scale-105'
                      : 'bg-slate-50 hover:bg-blue-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <span className="text-4xl shadow-xs">{c.flag}</span>
                  <span className="text-xs font-black font-display text-center mt-1">{c.name}</span>
                  <span className={`text-[10px] font-bold ${selectedCountry.id === c.id ? 'text-blue-100' : 'text-slate-500'}`}>
                    {c.capital}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Country Detailed Dossier (Right) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 text-white shadow-soft border-2 border-indigo-500/30 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full">
                  {selectedCountry.continent} Expedition
                </span>
                <button
                  type="button"
                  onClick={() => speakText(`${selectedCountry.name}. ${selectedCountry.tamilName}. Capital is ${selectedCountry.capital}. Greeting is ${selectedCountry.greeting.word}. ${selectedCountry.funFact}`)}
                  className="btn-press p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                  title="Speak country profile"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-3xl font-black font-display">{selectedCountry.name}</div>
                  <div className="text-xs font-bold text-indigo-300">{selectedCountry.tamilName}</div>
                  <div className="text-xs text-slate-300 flex items-center gap-1 pt-1">
                    <MapPin className="h-3.5 w-3.5 text-amber-400" />
                    <span>Capital: <strong>{selectedCountry.capital}</strong></span>
                  </div>
                </div>
                <div className="text-6xl drop-shadow-md">{selectedCountry.flag}</div>
              </div>

              {/* Dossier Grid */}
              <div className="space-y-2.5 pt-2 border-t border-indigo-800/60 text-xs">
                <div className="bg-white/5 rounded-2xl p-3 border border-white/10 flex items-center justify-between">
                  <span className="text-slate-400 font-bold">🗣️ Native Greeting:</span>
                  <span className="font-black text-amber-300">"{selectedCountry.greeting.word}"</span>
                </div>

                <div className="bg-white/5 rounded-2xl p-3 border border-white/10 flex items-center justify-between">
                  <span className="text-slate-400 font-bold">🏛️ Famous Landmark:</span>
                  <span className="font-black text-emerald-300">{selectedCountry.landmark.name} {selectedCountry.landmark.emoji}</span>
                </div>

                <div className="bg-white/5 rounded-2xl p-3 border border-white/10 flex items-center justify-between">
                  <span className="text-slate-400 font-bold">🐅 National Symbol:</span>
                  <span className="font-bold text-white/90">{selectedCountry.nationalSymbol}</span>
                </div>
              </div>

              <div className="bg-blue-900/40 rounded-2xl p-3.5 border border-blue-400/30 text-xs text-blue-100 leading-relaxed font-medium">
                💡 <strong>Explorer Fact:</strong> {selectedCountry.funFact}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SUBTAB B: WORLD LANDMARKS */}
      {subTab === 'landmarks' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {COUNTRIES_DATA.map((c) => (
            <div
              key={c.id}
              onClick={() => handleSelectCountry(c)}
              className="bg-white rounded-3xl p-5 shadow-soft border border-slate-200 space-y-3 hover:shadow-pop transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl group-hover:scale-110 transition-transform">{c.landmark.emoji}</span>
                <span className="text-2xl">{c.flag}</span>
              </div>
              <div className="space-y-0.5">
                <h4 className="text-base font-black font-display text-slate-900">{c.landmark.name}</h4>
                <p className="text-xs text-slate-500 font-bold">{c.name}, {c.continent}</p>
              </div>
              <p className="text-xs text-slate-600 font-medium line-clamp-2">
                {c.funFact}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 4. SUBTAB C: FLAG DETECTIVE QUIZ */}
      {subTab === 'quiz' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6 text-center">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              World Geography Quest
            </span>
            <div className="text-6xl py-2">{quizQuestion.correctCountry.flag}</div>
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
                className="btn-press py-4 px-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 hover:from-blue-100 hover:to-indigo-100 text-slate-800 font-black font-display text-lg border-2 border-slate-200 hover:border-blue-400 shadow-soft cursor-pointer transition-all"
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
              <span>Next Expedition Clue</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
