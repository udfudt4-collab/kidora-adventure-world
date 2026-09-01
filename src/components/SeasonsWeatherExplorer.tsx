import { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { soundEngine } from '@/lib/soundEngine';
import {
  Sun,
  CloudRain,
  CloudLightning,
  Snowflake,
  Wind,
  Sparkles,
  RefreshCw,
  ThermometerSun,
  Shirt,
  Compass,
  Volume2,
} from 'lucide-react';

interface SeasonData {
  id: string;
  name: string;
  tamilName: string;
  tamilPhonetic: string;
  emoji: string;
  months: string;
  weatherDescription: string;
  natureChanges: string;
  clothingTips: string[];
  seasonalFoods: string[];
  funActivity: string;
  color: string;
  bgGradient: string;
}

const SEASONS_DATA: SeasonData[] = [
  {
    id: 'summer',
    name: 'Summer Season',
    tamilName: 'கோடைக்காலம்',
    tamilPhonetic: 'Kodaikaalam',
    emoji: '☀️',
    months: 'March to June',
    weatherDescription: 'Bright golden sunshine, long warm days, and clear blue skies!',
    natureChanges: 'Trees offer cool shade, sunflowers bloom, and juicy sweet mangoes ripen on branches.',
    clothingTips: ['Light cotton shirts 👕', 'Sun hat & cap 🧢', 'Cool sunglasses 🕶️', 'Comfy sandals 🩴'],
    seasonalFoods: ['Sweet juicy mangoes 🥭', 'Chilled watermelon 🍉', 'Refreshing tender coconut 🥥', 'Ice cream 🍦'],
    funActivity: 'Building sandcastles at the beach and swimming in the pool! 🏖️',
    color: 'from-amber-500 via-orange-500 to-yellow-500',
    bgGradient: 'from-amber-50 to-orange-100',
  },
  {
    id: 'monsoon',
    name: 'Monsoon / Rainy Season',
    tamilName: 'மழைக்காலம்',
    tamilPhonetic: 'Mazaikaalam',
    emoji: '🌧️',
    months: 'July to September',
    weatherDescription: 'Dark stormy clouds, gentle pitter-patter drizzle, thunder, and fresh earthy petrichor!',
    natureChanges: 'Lush green grass carpets the Earth, rivers swell with water, frogs croak, and peacocks dance!',
    clothingTips: ['Waterproof raincoat 🧥', 'Bright umbrella ☂️', 'Rubber gumboots 👢'],
    seasonalFoods: ['Steaming hot soup 🍲', 'Roasted corn on the cob 🌽', 'Crispy pakoras & herbal tea 🫖'],
    funActivity: 'Floating colorful paper boats in puddles and watching the magical 7-color rainbow! ⛵🌈',
    color: 'from-sky-600 via-blue-600 to-indigo-700',
    bgGradient: 'from-sky-50 to-blue-100',
  },
  {
    id: 'autumn',
    name: 'Autumn / Fall Season',
    tamilName: 'இலையுதிர்காலம்',
    tamilPhonetic: 'Ilaiyuthirkaalam',
    emoji: '🍂',
    months: 'October to November',
    weatherDescription: 'Brisk refreshing breeze, pleasant sunny afternoons, and golden twilight evenings.',
    natureChanges: 'Tree leaves change colors to fiery gold, orange, and red, gently swirling down to the ground.',
    clothingTips: ['Cozy cardigans & hoodies 🧥', 'Light jackets 🧥', 'Sneakers 👟'],
    seasonalFoods: ['Crisp red apples 🍎', 'Sweet pumpkin pie 🥧', 'Roasted walnuts & almonds 🌰'],
    funActivity: 'Jumping into crunchy piles of dry leaves and collecting colorful autumn foliage! 🍁',
    color: 'from-amber-600 via-orange-600 to-red-700',
    bgGradient: 'from-orange-50 to-amber-100',
  },
  {
    id: 'winter',
    name: 'Winter Season',
    tamilName: 'குளிர்காலம்',
    tamilPhonetic: 'Kulirkaalam',
    emoji: '❄️',
    months: 'December to February',
    weatherDescription: 'Chilly frosty mornings, soft misty fog, crisp air, and glistening snowflakes in the mountains!',
    natureChanges: 'Some animals hibernate in warm caves, deciduous trees rest, and frost blankets the grass.',
    clothingTips: ['Warm wool sweater 🧶', 'Soft wool scarf 🧣', 'Fuzzy beanie & mittens 🧤'],
    seasonalFoods: ['Hot cocoa with marshmallows ☕', 'Warm porridge 🥣', 'Sweet oranges & carrots 🥕'],
    funActivity: 'Building friendly snowmen with carrot noses and cozying up with bedtime storybooks! ⛄📖',
    color: 'from-blue-600 via-cyan-600 to-slate-700',
    bgGradient: 'from-blue-50 to-cyan-100',
  },
  {
    id: 'spring',
    name: 'Spring Season',
    tamilName: 'வசந்தகாலம்',
    tamilPhonetic: 'Vasanthakaalam',
    emoji: '🌸',
    months: 'February to March',
    weatherDescription: 'Pleasant gentle warmth, mild breezes, sunny blue skies, and nature waking up with joy!',
    natureChanges: 'Fresh green leaves sprout on trees, colorful wildflowers blossom, and baby birds hatch in nests!',
    clothingTips: ['Casual floral dresses 👗', 'Denim overalls 👖', 'Light sneakers 👟'],
    seasonalFoods: ['Fresh sweet strawberries 🍓', 'Crisp green peas 🫛', 'Fresh fruit smoothies 🥤'],
    funActivity: 'Planting flower seeds in the garden, flying high kites, and chasing cheerful butterflies! 🪁🦋',
    color: 'from-pink-500 via-rose-500 to-emerald-500',
    bgGradient: 'from-pink-50 to-emerald-100',
  },
];

type WeatherType = 'sunny' | 'rainy' | 'storm' | 'snowy' | 'windy' | 'rainbow';

export function SeasonsWeatherExplorer() {
  const { addStars } = useApp();
  const [selectedSeason, setSelectedSeason] = useState<SeasonData>(SEASONS_DATA[0]);
  const [simulatedWeather, setSimulatedWeather] = useState<WeatherType>('sunny');
  const [wardrobeCheck, setWardrobeCheck] = useState<{ [key: string]: boolean }>({});

  // Seasons Quiz State
  const [quizQuestion, setQuizQuestion] = useState<{
    prompt: string;
    correctSeason: SeasonData;
    options: SeasonData[];
  }>({
    prompt: 'In which season do we enjoy sweet juicy mangoes and wear light cotton clothes?',
    correctSeason: SEASONS_DATA[0],
    options: [SEASONS_DATA[0], SEASONS_DATA[1], SEASONS_DATA[2], SEASONS_DATA[3]],
  });
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Weather simulation sound trigger
  const handleTriggerWeather = (type: WeatherType) => {
    setSimulatedWeather(type);
    if (type === 'sunny') {
      soundEngine.playBirdChirp();
      soundEngine.speak('Bright sunny weather! Birds are singing!');
    } else if (type === 'rainy') {
      soundEngine.playRainSound();
      soundEngine.speak('Pitter patter raindrops! Bring your umbrella!');
    } else if (type === 'storm') {
      soundEngine.playThunderSound();
      soundEngine.speak('Rumble rumble thunder! Safe inside the cozy house!');
    } else if (type === 'windy') {
      soundEngine.playWindSound();
      soundEngine.speak('Whoosh! The gentle breeze is blowing leaves!');
    } else if (type === 'snowy') {
      soundEngine.playPop();
      soundEngine.speak('Glistening snowflakes falling gently!');
    } else if (type === 'rainbow') {
      soundEngine.playCelebration();
      soundEngine.speak('Look at the magical seven color rainbow in the sky!');
    }
  };

  const handleSelectSeason = (season: SeasonData) => {
    setSelectedSeason(season);
    soundEngine.playPop();
    soundEngine.speak(`${season.name}. In Tamil, ${season.tamilPhonetic}. ${season.weatherDescription}`);
  };

  const generateQuiz = () => {
    setQuizFeedback(null);
    const target = SEASONS_DATA[Math.floor(Math.random() * SEASONS_DATA.length)];
    const others = SEASONS_DATA.filter((s) => s.id !== target.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [target, ...others].sort(() => Math.random() - 0.5);

    const prompts = [
      `In which season is the weather "${target.weatherDescription}"?`,
      `In which season do we do this fun activity: "${target.funActivity}"?`,
      `Which season is called "${target.tamilName}" (${target.tamilPhonetic}) in Tamil?`,
    ];
    const prompt = prompts[Math.floor(Math.random() * prompts.length)];

    setQuizQuestion({
      prompt,
      correctSeason: target,
      options,
    });
    soundEngine.speak(prompt);
  };

  const handleAnswerQuiz = (choice: SeasonData) => {
    if (choice.id === quizQuestion.correctSeason.id) {
      soundEngine.playCelebration();
      setQuizFeedback({
        isCorrect: true,
        message: `🎉 Correct Meteorologist! ${quizQuestion.correctSeason.name} (${quizQuestion.correctSeason.tamilName}) is right! +5 Stars! ⭐`,
      });
      addStars(5);
      soundEngine.speak(`Superb! ${quizQuestion.correctSeason.name} is correct!`);
      setTimeout(() => generateQuiz(), 2400);
    } else {
      soundEngine.playWrong();
      setQuizFeedback({ isCorrect: false, message: 'Try again! Think about the weather and clothes! 🌤️' });
      soundEngine.speak('Oops! Try another season!');
    }
  };

  return (
    <div className="space-y-8 animate-pop-in">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-teal-600 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-sky-400/40">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
            Earth Science & Meteorology
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2">
            <span>Seasons & Weather Explorer</span>
            <span className="text-2xl">☀️🌧️🍂❄️🌸</span>
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 font-medium leading-relaxed">
            Explore 5 wonderful seasons, English & Tamil season names, weather simulator lab, clothing tips, seasonal foods, and weather quizzes!
          </p>
        </div>

        {/* Season Quick Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-white/15 backdrop-blur-md p-1.5 rounded-2xl border border-white/25">
          {SEASONS_DATA.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSelectSeason(s)}
              className={`btn-press px-3 py-1.5 rounded-xl text-xs font-black font-display transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedSeason.id === s.id
                  ? 'bg-amber-400 text-slate-950 shadow-soft scale-105'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <span>{s.emoji}</span>
              <span className="hidden sm:inline">{s.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interactive Season Showcase & Wardrobe */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Season Detail Showcase (7 cols) */}
        <div className={`lg:col-span-7 bg-gradient-to-br ${selectedSeason.color} rounded-3xl p-6 sm:p-8 text-white shadow-soft space-y-6`}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              📅 {selectedSeason.months}
            </span>
            <span className="text-2xl">{selectedSeason.emoji}</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
              {selectedSeason.name}
            </h3>
            <div className="text-xl font-black text-amber-200">
              {selectedSeason.tamilName} ({selectedSeason.tamilPhonetic})
            </div>
            <p className="text-sm text-white/90 font-medium pt-1">
              {selectedSeason.weatherDescription}
            </p>
          </div>

          {/* Nature & Changes */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 space-y-1">
            <div className="text-xs font-black uppercase text-amber-300 tracking-wider">
              🌿 What Happens in Nature:
            </div>
            <p className="text-xs text-white/95 font-medium leading-relaxed">
              {selectedSeason.natureChanges}
            </p>
          </div>

          {/* Seasonal Delights & Foods */}
          <div className="space-y-2">
            <div className="text-xs font-black uppercase text-white/90 tracking-wider">
              🍉 Yummy Seasonal Treats:
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSeason.seasonalFoods.map((food, i) => (
                <span
                  key={i}
                  className="bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-white border border-white/20 shadow-xs"
                >
                  {food}
                </span>
              ))}
            </div>
          </div>

          {/* Fun Activity Card */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
            <span className="text-3xl">🎉</span>
            <div>
              <div className="text-[10px] font-black uppercase text-amber-200">Favorite Season Fun:</div>
              <p className="text-xs font-bold text-white mt-0.5">{selectedSeason.funActivity}</p>
            </div>
          </div>
        </div>

        {/* Dress-Up Wardrobe & Weather Simulator (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Season Wardrobe Guide */}
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-200 space-y-4">
            <div className="flex items-center gap-2">
              <Shirt className="h-5 w-5 text-indigo-600" />
              <h4 className="text-base font-black font-display text-slate-800">
                What to Wear in {selectedSeason.name.split(' ')[0]}?
              </h4>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Tap the clothes to pack them into your adventure backpack:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedSeason.clothingTips.map((cloth, idx) => {
                const key = `${selectedSeason.id}-${idx}`;
                const isPacked = wardrobeCheck[key];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      soundEngine.playPop();
                      setWardrobeCheck((prev) => ({ ...prev, [key]: !prev[key] }));
                    }}
                    className={`btn-press p-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between border cursor-pointer ${
                      isPacked
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>{cloth}</span>
                    <span>{isPacked ? '✅' : '➕'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Live Weather Simulator */}
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ThermometerSun className="h-5 w-5 text-amber-500" />
                <h4 className="text-base font-black font-display text-slate-800">
                  Weather Simulator Lab
                </h4>
              </div>
              <span className="text-[10px] font-black uppercase bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full">
                Live Simulator
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'sunny' as WeatherType, label: 'Sunny', emoji: '☀️', icon: Sun, color: 'text-amber-500' },
                { id: 'rainy' as WeatherType, label: 'Rain', emoji: '🌧️', icon: CloudRain, color: 'text-blue-500' },
                { id: 'storm' as WeatherType, label: 'Thunder', emoji: '⚡', icon: CloudLightning, color: 'text-purple-600' },
                { id: 'snowy' as WeatherType, label: 'Snow', emoji: '❄️', icon: Snowflake, color: 'text-cyan-500' },
                { id: 'windy' as WeatherType, label: 'Wind', emoji: '💨', icon: Wind, color: 'text-teal-500' },
                { id: 'rainbow' as WeatherType, label: 'Rainbow', emoji: '🌈', icon: Sparkles, color: 'text-rose-500' },
              ].map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => handleTriggerWeather(w.id)}
                  className={`btn-press p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
                    simulatedWeather === w.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-soft scale-105'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="text-2xl">{w.emoji}</span>
                  <span className="text-[11px] font-black">{w.label}</span>
                </button>
              ))}
            </div>

            {/* Weather Screen Animation Box */}
            <div
              className={`h-24 rounded-2xl flex items-center justify-center text-center p-4 transition-all ${
                simulatedWeather === 'sunny'
                  ? 'bg-gradient-to-r from-amber-200 to-yellow-300 text-amber-950 animate-pulse'
                  : simulatedWeather === 'rainy'
                  ? 'bg-gradient-to-r from-sky-400 to-blue-600 text-white'
                  : simulatedWeather === 'storm'
                  ? 'bg-gradient-to-r from-slate-800 to-purple-950 text-white'
                  : simulatedWeather === 'snowy'
                  ? 'bg-gradient-to-r from-cyan-200 to-blue-200 text-slate-900'
                  : simulatedWeather === 'windy'
                  ? 'bg-gradient-to-r from-teal-200 to-emerald-300 text-teal-950'
                  : 'bg-gradient-to-r from-rose-400 via-amber-300 to-indigo-400 text-slate-950 font-black'
              }`}
            >
              <div className="font-black font-display text-sm flex items-center gap-2">
                <span className="text-2xl">
                  {simulatedWeather === 'sunny' && '☀️'}
                  {simulatedWeather === 'rainy' && '🌧️ 💧'}
                  {simulatedWeather === 'storm' && '⚡ ⛈️'}
                  {simulatedWeather === 'snowy' && '❄️ ⛄'}
                  {simulatedWeather === 'windy' && '🍃 💨'}
                  {simulatedWeather === 'rainbow' && '🌈 ✨'}
                </span>
                <span>
                  {simulatedWeather === 'sunny' && 'Bright sunshine shining over Kidora Sanctuary!'}
                  {simulatedWeather === 'rainy' && 'Gentle rain tapping on the rooftop!'}
                  {simulatedWeather === 'storm' && 'Thunderstorm rolling across the sky!'}
                  {simulatedWeather === 'snowy' && 'Fluffy snowflakes floating through the air!'}
                  {simulatedWeather === 'windy' && 'Fresh breeze swirling colorful leaves!'}
                  {simulatedWeather === 'rainbow' && 'Magnificent 7-color rainbow arching across the sky!'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Seasons & Weather Quiz Game */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6 text-center">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider bg-sky-100 text-sky-800 px-3 py-1 rounded-full">
            🌦️ Weather & Seasons Detective Quiz
          </span>
          <h3 className="text-2xl font-black font-display text-slate-900">
            {quizQuestion.prompt}
          </h3>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-3.5 pt-2">
          {quizQuestion.options.map((season) => (
            <button
              key={season.id}
              type="button"
              onClick={() => handleAnswerQuiz(season)}
              className="btn-press py-4 px-4 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50 hover:from-sky-100 hover:to-indigo-100 text-slate-800 hover:text-indigo-950 font-black font-display text-base sm:text-lg border-2 border-slate-200 hover:border-sky-400 shadow-soft cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <span className="text-2xl">{season.emoji}</span>
              <span>{season.name.split(' ')[0]}</span>
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
            <span>Next Weather Question</span>
          </button>
        </div>
      </div>
    </div>
  );
}
