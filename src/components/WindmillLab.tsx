import { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import {
  Wind,
  Zap,
  Sparkles,
  Sun,
  Lightbulb,
  TreePine,
  ShieldCheck,
  RefreshCw,
  Award,
  Volume2,
  Play,
  RotateCw,
} from 'lucide-react';
import { waterSound } from '@/lib/waterSound';

type WindSpeedLevel = 'breeze' | 'moderate' | 'strong' | 'storm';

interface WindConfig {
  id: WindSpeedLevel;
  label: string;
  speedKmh: number;
  rpm: number;
  watts: number;
  homesPowered: number;
  soundPitch: number;
  emoji: string;
  color: string;
}

const WIND_LEVELS: WindConfig[] = [
  {
    id: 'breeze',
    label: 'Gentle Breeze 🍃',
    speedKmh: 15,
    rpm: 12,
    watts: 350,
    homesPowered: 2,
    soundPitch: 1.0,
    emoji: '🍃',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'moderate',
    label: 'Fresh Wind 💨',
    speedKmh: 35,
    rpm: 28,
    watts: 850,
    homesPowered: 6,
    soundPitch: 1.2,
    emoji: '💨',
    color: 'from-sky-400 to-blue-600',
  },
  {
    id: 'strong',
    label: 'Brisk Gale 🌪️',
    speedKmh: 65,
    rpm: 48,
    watts: 1800,
    homesPowered: 14,
    soundPitch: 1.4,
    emoji: '🌪️',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'storm',
    label: 'Turbo Typhoon ⚡',
    speedKmh: 90,
    rpm: 72,
    watts: 3200,
    homesPowered: 25,
    soundPitch: 1.6,
    emoji: '⚡',
    color: 'from-amber-500 via-rose-500 to-purple-700',
  },
];

export function WindmillLab() {
  const { addStars } = useApp();
  const [subTab, setSubTab] = useState<'turbine' | 'village' | 'quiz'>('turbine');
  const [windLevel, setWindLevel] = useState<WindSpeedLevel>('moderate');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [manualBoost, setManualBoost] = useState(0);
  const [totalEnergyGenerated, setTotalEnergyGenerated] = useState(120);

  const activeConfig = WIND_LEVELS.find((w) => w.id === windLevel) || WIND_LEVELS[1];
  const currentSpeedRpm = activeConfig.rpm + manualBoost;
  const currentWatts = activeConfig.watts + manualBoost * 25;
  const homesLit = Math.min(25, activeConfig.homesPowered + Math.floor(manualBoost / 2));

  // Spin rotation animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + (currentSpeedRpm / 60) * 15) % 360);
      setTotalEnergyGenerated((prev) => prev + Math.round(currentWatts / 500));
    }, 50);

    return () => clearInterval(interval);
  }, [currentSpeedRpm, currentWatts]);

  // Decay manual boost
  useEffect(() => {
    if (manualBoost > 0) {
      const decay = setTimeout(() => {
        setManualBoost((prev) => Math.max(0, prev - 2));
      }, 400);
      return () => clearTimeout(decay);
    }
  }, [manualBoost]);

  const handleManualBlow = () => {
    setManualBoost((prev) => Math.min(40, prev + 8));
    waterSound.playDroplet();
    if (manualBoost > 25) {
      addStars(1);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6 animate-pop-in">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-sky-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-sky-300/40">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
            Eco Science & Clean Energy Lab
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2">
            <span>Windmill Clean Power Studio</span>
            <span className="text-2xl">🌬️⚡</span>
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 font-medium leading-relaxed">
            Discover how natural wind currents spin aerodynamic turbine blades (காற்றாலை) to produce 100% pollution-free electrical energy for our planet!
          </p>
        </div>

        {/* Subtab Navigator */}
        <div className="bg-white/15 backdrop-blur-md p-1.5 rounded-2xl border border-white/25 flex items-center gap-1 shrink-0">
          {[
            { id: 'turbine', label: '🌬️ Wind Turbine' },
            { id: 'village', label: '💡 Power Village' },
            { id: 'quiz', label: '🌱 Eco Facts & Quiz' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSubTab(tab.id as any)}
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

      {/* 2. SUBTAB A: INTERACTIVE TURBINE SIMULATOR */}
      {subTab === 'turbine' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Wind Turbine Interactive Stage (Left) */}
          <div className="lg:col-span-6 bg-gradient-to-b from-sky-400 via-sky-300 to-emerald-200 rounded-3xl p-8 shadow-soft border-2 border-sky-300 relative overflow-hidden flex flex-col items-center justify-between min-h-[420px]">
            {/* Background Clouds */}
            <div className="absolute top-4 left-6 text-4xl opacity-70 animate-float pointer-events-none">☁️</div>
            <div className="absolute top-8 right-8 text-5xl opacity-60 animate-float pointer-events-none" style={{ animationDelay: '1.2s' }}>☁️</div>
            <div className="absolute top-2 right-20 text-3xl opacity-40 animate-float pointer-events-none">🕊️</div>

            {/* Live Watts Indicator Badge */}
            <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-pop border border-white flex items-center gap-2 z-10">
              <Zap className="h-5 w-5 text-amber-500 animate-bounce-soft" />
              <div>
                <div className="text-[10px] uppercase font-black tracking-wider text-slate-500">Output Power</div>
                <div className="text-lg font-black font-display text-slate-900">{currentWatts.toLocaleString()} Watts ⚡</div>
              </div>
            </div>

            {/* 3D-styled SVG Windmill Graphic */}
            <div className="relative my-4 flex flex-col items-center justify-center">
              {/* Rotor Blades with Live Rotation Angle */}
              <div
                style={{ transform: `rotate(${rotationAngle}deg)` }}
                className="w-48 h-48 relative flex items-center justify-center transition-transform duration-75 ease-linear pointer-events-none"
              >
                {/* Center Hub */}
                <div className="w-8 h-8 rounded-full bg-slate-800 border-4 border-white shadow-md z-20" />

                {/* Blade 1 (Top) */}
                <div className="absolute -top-14 w-6 h-28 bg-gradient-to-t from-slate-200 to-white rounded-t-full shadow-md border border-slate-300 origin-bottom" />

                {/* Blade 2 (Bottom Right 120deg) */}
                <div
                  style={{ transform: 'rotate(120deg)' }}
                  className="absolute -top-14 w-6 h-28 bg-gradient-to-t from-slate-200 to-white rounded-t-full shadow-md border border-slate-300 origin-bottom"
                />

                {/* Blade 3 (Bottom Left 240deg) */}
                <div
                  style={{ transform: 'rotate(240deg)' }}
                  className="absolute -top-14 w-6 h-28 bg-gradient-to-t from-slate-200 to-white rounded-t-full shadow-md border border-slate-300 origin-bottom"
                />
              </div>

              {/* Tower Mast */}
              <div className="w-8 h-36 bg-gradient-to-b from-slate-300 via-slate-100 to-slate-400 rounded-b-lg shadow-inner -mt-10 border-x-2 border-slate-300 flex flex-col items-center justify-end pb-2">
                <div className="w-3 h-5 bg-amber-400 rounded-xs animate-pulse-soft" />
              </div>

              {/* Ground Grass Hill */}
              <div className="w-64 h-12 bg-emerald-500 rounded-t-full shadow-md -mt-2 flex items-center justify-center gap-4 text-sm">
                <span>🌱</span>
                <span>🌼</span>
                <span>🌲</span>
                <span>🌾</span>
              </div>
            </div>

            {/* Tap to Blow Wind Turbo Button */}
            <button
              type="button"
              onClick={handleManualBlow}
              className="btn-press px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black font-display text-xs shadow-pop flex items-center gap-2 cursor-pointer z-10"
            >
              <Wind className="h-4 w-4" />
              <span>Tap to Blow Super Wind! 💨 (+{manualBoost} Boost)</span>
            </button>
          </div>

          {/* Control Console (Right) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Wind Speed Presets */}
            <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm font-black font-display text-slate-800 flex items-center gap-2">
                  <Wind className="h-4 w-4 text-sky-600" />
                  <span>Control Natural Wind Speed:</span>
                </h3>
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-xl">
                  {activeConfig.speedKmh} km/h
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {WIND_LEVELS.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => {
                      setWindLevel(w.id);
                      waterSound.playDroplet();
                      speakText(`${w.label}. Generating ${w.watts} Watts of green energy!`);
                    }}
                    className={`btn-press p-4 rounded-2xl text-left transition-all cursor-pointer border-2 flex flex-col justify-between space-y-2 ${
                      windLevel === w.id
                        ? 'bg-gradient-to-br from-sky-500 to-indigo-600 text-white border-sky-600 shadow-pop scale-105'
                        : 'bg-slate-50 hover:bg-sky-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="text-2xl">{w.emoji}</div>
                    <div>
                      <div className="text-xs font-black font-display">{w.label}</div>
                      <div className={`text-[11px] font-bold ${windLevel === w.id ? 'text-sky-100' : 'text-slate-500'}`}>
                        {w.speedKmh} km/h • {w.watts}W
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Eco Metrics */}
            <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 rounded-3xl p-6 border-2 border-emerald-200 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-2">
                <span>🌱</span> Live Eco Impact & Clean Energy Metrics
              </h4>

              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="bg-white p-3 rounded-2xl shadow-xs border border-emerald-100">
                  <div className="text-xl">🏡</div>
                  <div className="text-lg font-black font-display text-slate-900">{homesLit}</div>
                  <div className="text-[10px] text-slate-500 font-bold">Homes Powered</div>
                </div>

                <div className="bg-white p-3 rounded-2xl shadow-xs border border-emerald-100">
                  <div className="text-xl">🌲</div>
                  <div className="text-lg font-black font-display text-emerald-700">+{Math.round(totalEnergyGenerated / 10)}</div>
                  <div className="text-[10px] text-slate-500 font-bold">Trees Saved</div>
                </div>

                <div className="bg-white p-3 rounded-2xl shadow-xs border border-emerald-100">
                  <div className="text-xl">💨</div>
                  <div className="text-lg font-black font-display text-sky-700">{currentSpeedRpm}</div>
                  <div className="text-[10px] text-slate-500 font-bold">Turbine RPM</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed bg-white/70 p-3 rounded-xl border border-emerald-100">
                💡 <strong>Tamil Science Word:</strong> Windmill is called <strong>காற்றாலை (Kaatraalai)</strong>. It converts free moving air into electricity without releasing any smoke or carbon!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. SUBTAB B: POWER VILLAGE SIMULATION */}
      {subTab === 'village' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              Smart Eco Village Simulation
            </span>
            <h3 className="text-2xl font-black font-display text-slate-900">
              Kidora Eco Village Power Grid 💡🏡
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
              See the power flow from the high-altitude windmills directly into schools, homes, hospital wards, and electric vehicle stations!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {[
              { title: 'Kidora School', emoji: '🏫', demand: '400W', isLit: currentWatts >= 350 },
              { title: 'Community Hospital', emoji: '🏥', demand: '800W', isLit: currentWatts >= 800 },
              { title: 'Sunny Homes', emoji: '🏡', demand: '1,200W', isLit: currentWatts >= 1200 },
              { title: 'EV Charging Station', emoji: '🚗⚡', demand: '2,000W', isLit: currentWatts >= 1800 },
            ].map((facility) => (
              <div
                key={facility.title}
                className={`p-5 rounded-3xl border-2 text-center space-y-2 transition-all ${
                  facility.isLit
                    ? 'bg-amber-50 border-amber-400 shadow-pop scale-105'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="text-4xl">{facility.emoji}</div>
                <div className="font-black font-display text-xs text-slate-900">{facility.title}</div>
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                  facility.isLit ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-600'
                }`}>
                  {facility.isLit ? '⚡ Powered ON' : '⏳ Low Wind'}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-sky-50 rounded-2xl p-4 text-center text-xs text-sky-900 font-bold border border-sky-200">
            Increase wind speed in the first tab to light up all 4 major village facilities! 🌟
          </div>
        </div>
      )}

      {/* 4. SUBTAB C: ECO FACTS & QUIZ */}
      {subTab === 'quiz' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6 text-center">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              Clean Energy Scholar Challenge
            </span>
            <div className="text-6xl py-2">🌬️⚡</div>
            <h3 className="text-2xl font-black font-display text-slate-900">
              How does a Wind Turbine create electricity?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              'By burning coal in an engine',
              'Wind turns the blades which spins a generator! ✓',
              'By drinking fresh water',
              'By absorbing heat from lava',
            ].map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (idx === 1) {
                    waterSound.playGoalCelebration();
                    addStars(10);
                    speakText('Brilliant! Wind kinetic energy spins the internal generator to make clean electricity!');
                  } else {
                    speakText('Oops! Try again! Wind energy turns the blades!');
                  }
                }}
                className="btn-press p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-slate-800 font-black font-display text-xs border-2 border-slate-200 hover:border-emerald-400 shadow-soft cursor-pointer transition-all text-left"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
