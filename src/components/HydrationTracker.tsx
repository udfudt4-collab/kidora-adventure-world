import { useState, useMemo } from 'react';
import { useApp } from '@/lib/store';
import {
  Droplets,
  Plus,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Award,
  Info,
  Calendar,
  Settings,
} from 'lucide-react';

export function HydrationTracker() {
  const {
    profile,
    children: familyChildren,
    hydrationData,
    addWaterIntake,
    resetTodayWaterIntake,
    setHydrationTarget,
  } = useApp();

  const [selectedChildId, setSelectedChildId] = useState<string>(profile?.id || 'child-1');
  const [customNote, setCustomNote] = useState<string>('');
  const [isEditingTarget, setIsEditingTarget] = useState<boolean>(false);
  const [targetInput, setTargetInput] = useState<number>(hydrationData.targetGlasses || 7);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const activeChild = familyChildren.find((c) => c.id === selectedChildId) || familyChildren[0];

  const todayGlasses = hydrationData.dailyIntakeByChild[selectedChildId] || 0;
  const targetGlasses = hydrationData.targetGlasses || 7;
  const mlPerGlass = hydrationData.mlPerGlass || 250;

  const currentMl = todayGlasses * mlPerGlass;
  const targetMl = targetGlasses * mlPerGlass;
  const percentComplete = Math.min(100, Math.round((todayGlasses / targetGlasses) * 100));

  // Past 7 days history for active child
  const past7DaysLogs = useMemo(() => {
    return hydrationData.historyLogs
      .filter((l) => l.childId === selectedChildId)
      .slice(0, 7);
  }, [hydrationData.historyLogs, selectedChildId]);

  const handleAddGlasses = (count: number) => {
    addWaterIntake(selectedChildId, count, customNote.trim() || undefined);
    setCustomNote('');
    if (todayGlasses + count >= targetGlasses) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
    }
  };

  const handleSaveTarget = (e: React.FormEvent) => {
    e.preventDefault();
    setHydrationTarget(targetInput);
    setIsEditingTarget(false);
  };

  return (
    <div className="space-y-6 animate-pop-in">
      {/* 1. TOP HERO BANNER & CHILD SWITCHER */}
      <div className="bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-sky-400/40">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
            Child Wellness & Daily Intake
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2">
            <span>Hydration Measure</span>
            <span className="text-2xl">💧</span>
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 font-medium leading-relaxed">
            Record daily water intake and foster healthy drinking habits. Adequate hydration improves energy, focus, and digestion in growing children.
          </p>
        </div>

        {/* Child Switcher */}
        {familyChildren.length > 1 && (
          <div className="bg-white/15 backdrop-blur-md p-2 rounded-2xl border border-white/25 flex items-center gap-1.5 shrink-0">
            {familyChildren.map((child) => (
              <button
                key={child.id}
                type="button"
                onClick={() => setSelectedChildId(child.id)}
                className={`btn-press px-3.5 py-2 rounded-xl text-xs font-black font-display transition-all cursor-pointer ${
                  selectedChildId === child.id
                    ? 'bg-amber-400 text-slate-950 shadow-soft'
                    : 'text-white hover:bg-white/15'
                }`}
              >
                🧒 {child.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {showCelebration && (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl p-4 sm:p-5 shadow-pop flex items-center justify-between gap-3 animate-pop-in">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎉</span>
            <div>
              <div className="font-black font-display text-sm sm:text-base">
                Daily Hydration Goal Completed! 🌟
              </div>
              <div className="text-xs text-emerald-100 font-medium">
                {activeChild.name} drank {todayGlasses} glasses ({currentMl}ml) today. Great job!
              </div>
            </div>
          </div>
          <span className="bg-white/20 text-white font-black text-xs px-3 py-1.5 rounded-xl shrink-0">
            Target Reached ✓
          </span>
        </div>
      )}

      {/* 2. TODAY'S PROGRESS & ONE-TAP ACTION CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* PROGRESS CARD (LEFT) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-soft border border-slate-200/80 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl shadow-xs">
                💧
              </div>
              <div>
                <h3 className="text-base font-black font-display text-slate-900">
                  Today's Hydration ({activeChild.name})
                </h3>
                <p className="text-xs text-slate-500">
                  Target: {targetGlasses} glasses ({targetMl}ml)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditingTarget(!isEditingTarget)}
              className="text-xs text-slate-400 hover:text-sky-600 p-2 rounded-xl transition-colors cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-1 font-bold"
              title="Change target glasses"
            >
              <Settings className="h-3.5 w-3.5" />
              <span>Target</span>
            </button>
          </div>

          {/* Edit Target Inline Drawer */}
          {isEditingTarget && (
            <form
              onSubmit={handleSaveTarget}
              className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex items-center justify-between gap-3 animate-pop-in"
            >
              <div className="text-xs font-bold text-sky-900">Daily Target (Glasses):</div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={2}
                  max={15}
                  value={targetInput}
                  onChange={(e) => setTargetInput(parseInt(e.target.value, 10) || 7)}
                  className="w-16 px-2.5 py-1.5 rounded-xl border border-sky-300 text-center font-black text-xs bg-white text-slate-800"
                />
                <button
                  type="submit"
                  className="btn-press px-3 py-1.5 rounded-xl bg-sky-600 text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  Save
                </button>
              </div>
            </form>
          )}

          {/* Big Circular & Number Display */}
          <div className="bg-gradient-to-br from-sky-50 via-teal-50 to-emerald-50 rounded-3xl p-6 border border-sky-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left space-y-1">
              <div className="text-[10px] font-black uppercase tracking-wider text-sky-800">
                Water Drank Today
              </div>
              <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                <span className="text-5xl font-black font-display text-slate-900">{todayGlasses}</span>
                <span className="text-xl font-bold text-slate-400 font-display">/ {targetGlasses} glasses</span>
              </div>
              <div className="text-sm font-bold text-sky-700">
                {currentMl} ml <span className="text-slate-400 font-medium">({percentComplete}% of daily goal)</span>
              </div>
            </div>

            {/* Visual Circular Glass Visualizer */}
            <div className="relative w-28 h-28 rounded-full border-4 border-white shadow-soft bg-white flex items-center justify-center">
              <div
                style={{
                  background: `conic-gradient(#0284c7 ${percentComplete * 3.6}deg, #e2e8f0 0deg)`,
                }}
                className="absolute inset-1 rounded-full flex items-center justify-center transition-all"
              >
                <div className="w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center text-center">
                  <span className="text-2xl">🌊</span>
                  <span className="text-xs font-black font-display text-sky-900 mt-0.5">
                    {percentComplete}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Add Intake Buttons */}
          <div className="space-y-3">
            <label className="block text-xs font-black font-display text-slate-700">
              Quick Log Intake
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleAddGlasses(1)}
                className="btn-press py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs flex flex-col items-center justify-center gap-1 shadow-soft cursor-pointer transition-transform"
              >
                <span className="text-lg">💧</span>
                <span>+1 Glass</span>
                <span className="text-[9px] text-sky-100 font-medium">(250ml)</span>
              </button>

              <button
                type="button"
                onClick={() => handleAddGlasses(2)}
                className="btn-press py-3 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-xs flex flex-col items-center justify-center gap-1 shadow-soft cursor-pointer transition-transform"
              >
                <span className="text-lg">🥤</span>
                <span>+2 Glasses</span>
                <span className="text-[9px] text-teal-100 font-medium">(500ml)</span>
              </button>

              <button
                type="button"
                onClick={() => handleAddGlasses(3)}
                className="btn-press py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-black text-xs flex flex-col items-center justify-center gap-1 shadow-soft cursor-pointer transition-transform"
              >
                <span className="text-lg">🍶</span>
                <span>+1 Bottle</span>
                <span className="text-[9px] text-indigo-100 font-medium">(750ml)</span>
              </button>
            </div>

            {/* Note & Reset Controls */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Add optional note (e.g. playground session)"
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={() => resetTodayWaterIntake(selectedChildId)}
                className="btn-press px-3 py-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 text-xs font-bold flex items-center gap-1 cursor-pointer bg-slate-50 hover:bg-rose-50"
                title="Reset today's count"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* 7-DAY HYDRATION TRENDS & TIPS (RIGHT) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black font-display text-slate-900">
                  Weekly Hydration (Past 7 Days)
                </h3>
                <p className="text-xs text-slate-500">Daily glasses consumed vs recommended target</p>
              </div>
              <span className="bg-sky-50 text-sky-700 text-xs font-black px-3 py-1 rounded-xl border border-sky-200">
                Target: {targetGlasses} Glasses
              </span>
            </div>

            {/* 7-Day Bar Chart */}
            <div className="pt-6 pb-2">
              <div className="h-44 flex items-end justify-between gap-2 border-b border-slate-200 pb-2 px-2">
                {past7DaysLogs.slice(0, 7).reverse().map((entry, idx) => {
                  const maxChartGlasses = 10;
                  const heightPercent = Math.min(100, Math.round((entry.glassesDrank / maxChartGlasses) * 100));
                  const isMetTarget = entry.glassesDrank >= targetGlasses;

                  return (
                    <div key={entry.id || idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                      {/* Tooltip */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap z-20 pointer-events-none shadow-md">
                        {entry.glassesDrank} glasses ({entry.glassesDrank * mlPerGlass}ml)
                      </div>

                      <span className="text-[10px] font-black text-slate-600 mb-1">
                        {entry.glassesDrank}
                      </span>

                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full max-w-[36px] rounded-t-xl transition-all ${
                          isMetTarget
                            ? 'bg-gradient-to-t from-sky-500 to-teal-400 shadow-xs'
                            : 'bg-gradient-to-t from-amber-400 to-orange-300'
                        }`}
                      />

                      <span className="text-[9px] font-bold text-slate-400 mt-1">
                        {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chart Legend */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-md bg-sky-500" />
                    <span>Goal Met ({targetGlasses}+ glasses)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-md bg-amber-400" />
                    <span>In Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HYDRATION TIPS & HABIT BUILDERS */}
          <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-3xl p-6 border border-sky-200/80 space-y-3">
            <h4 className="text-sm font-black font-display text-sky-900 flex items-center gap-2">
              <span>💡</span> Parent Tips for Child Hydration
            </h4>
            <ul className="space-y-2 text-xs text-sky-950 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-sky-600 font-bold">•</span>
                <span><strong>Morning Glass:</strong> Offer a fresh glass of water right upon waking to energize the metabolism.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-600 font-bold">•</span>
                <span><strong>Fun Fruit Infusions:</strong> Add orange slices, strawberries, or mint to make plain water exciting.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-600 font-bold">•</span>
                <span><strong>Play Breaks:</strong> Schedule water sips between Kidora learning quests and physical play.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
