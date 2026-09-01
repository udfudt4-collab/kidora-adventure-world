import { useState, useMemo, useEffect } from 'react';
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
  Sliders,
  Check,
  Zap,
  Volume2,
  VolumeX,
  Edit3,
  Bell,
  Clock,
} from 'lucide-react';
import { waterSound } from '@/lib/waterSound';
import { HydrationReminderModal } from '@/components/HydrationReminderModal';

const PRESET_TARGET_MLS = [1000, 1250, 1500, 1750, 2000, 2500];
const PRESET_GLASS_SIZES = [
  { ml: 100, label: '100 ml', desc: 'Small cup / Toddler' },
  { ml: 150, label: '150 ml', desc: 'Kid cup / Sippy' },
  { ml: 200, label: '200 ml', desc: 'Medium mug' },
  { ml: 250, label: '250 ml', desc: 'Standard glass' },
  { ml: 300, label: '300 ml', desc: 'Large tumbler' },
];

export function HydrationTracker() {
  const {
    profile,
    children: familyChildren,
    hydrationData,
    addWaterIntakeMl,
    resetTodayWaterIntake,
    setHydrationSettings,
  } = useApp();

  const [selectedChildId, setSelectedChildId] = useState<string>(profile?.id || 'child-1');
  const [customNote, setCustomNote] = useState<string>('');
  const [targetMlInput, setTargetMlInput] = useState<number>(hydrationData.targetMl || 1750);
  const [glassSizeInput, setGlassSizeInput] = useState<number>(hydrationData.mlPerGlass || 250);
  const [customMlInput, setCustomMlInput] = useState<string>('');
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);
  const [showReminderModal, setShowReminderModal] = useState<boolean>(false);
  const [reminderInterval, setReminderInterval] = useState<number>(() => {
    try {
      const val = localStorage.getItem('kidora_hydration_reminder_mins');
      return val ? parseInt(val, 10) : 45;
    } catch {
      return 45;
    }
  });

  const handleSetReminderInterval = (mins: number) => {
    setReminderInterval(mins);
    try {
      localStorage.setItem('kidora_hydration_reminder_mins', String(mins));
    } catch {}
    setSavedFeedback(mins === 0 ? 'Water reminders paused' : `Reminder set every ${mins} minutes!`);
    setTimeout(() => setSavedFeedback(null), 2000);
  };

  const activeChild = familyChildren.find((c) => c.id === selectedChildId) || familyChildren[0];

  const mlPerGlass = hydrationData.mlPerGlass || 250;
  const targetMl = hydrationData.targetMl || (hydrationData.targetGlasses ? hydrationData.targetGlasses * mlPerGlass : 1750);
  const targetGlasses = Math.max(1, Math.round(targetMl / mlPerGlass));

  const currentMl =
    hydrationData.dailyIntakeMlByChild && hydrationData.dailyIntakeMlByChild[selectedChildId] !== undefined
      ? hydrationData.dailyIntakeMlByChild[selectedChildId]
      : (hydrationData.dailyIntakeByChild[selectedChildId] || 0) * mlPerGlass;

  const currentGlasses = Math.round((currentMl / mlPerGlass) * 10) / 10;
  const percentComplete = Math.min(100, Math.round((currentMl / (targetMl || 1)) * 100));

  // Sync inputs when hydrationData updates
  useEffect(() => {
    setTargetMlInput(targetMl);
    setGlassSizeInput(mlPerGlass);
  }, [targetMl, mlPerGlass]);

  // Sound toggle sync
  useEffect(() => {
    waterSound.enabled = soundEnabled;
  }, [soundEnabled]);

  // Past 7 days history for active child
  const past7DaysLogs = useMemo(() => {
    return hydrationData.historyLogs
      .filter((l) => l.childId === selectedChildId)
      .slice(0, 7);
  }, [hydrationData.historyLogs, selectedChildId]);

  const handleAddMl = (mlToAdd: number, isGlassLog: boolean = false) => {
    if (mlToAdd <= 0) return;
    if (isGlassLog) {
      waterSound.playGlug();
    } else {
      waterSound.playDroplet();
    }

    addWaterIntakeMl(selectedChildId, mlToAdd, customNote.trim() || undefined);
    setCustomNote('');
    setCustomMlInput('');

    if (currentMl + mlToAdd >= targetMl) {
      setTimeout(() => {
        waterSound.playGoalCelebration();
      }, 400);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
    }
  };

  const handleAddGlasses = (glassesCount: number) => {
    const mlToAdd = Math.round(glassesCount * mlPerGlass);
    handleAddMl(mlToAdd, true);
  };

  // Instant apply settings when user clicks preset or changes number
  const applySettings = (newTarget: number, newGlass: number, feedbackMsg: string) => {
    const validTarget = Math.max(100, Math.min(5000, newTarget));
    const validGlass = Math.max(50, Math.min(1000, newGlass));
    setTargetMlInput(validTarget);
    setGlassSizeInput(validGlass);
    setHydrationSettings(validTarget, validGlass);
    setSavedFeedback(feedbackMsg);
    setTimeout(() => setSavedFeedback(null), 2000);
  };

  const calculatedGlassCount = Math.max(1, Math.round(((targetMlInput || 1750) / (glassSizeInput || 250)) * 10) / 10);

  return (
    <div className="space-y-6 animate-pop-in">
      {/* 1. TOP HERO BANNER & CHILD SWITCHER */}
      <div className="bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-sky-400/40">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
              Child Wellness & Hydration Tracker
            </span>
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="btn-press text-[11px] font-bold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full flex items-center gap-1 cursor-pointer transition-colors"
              title="Toggle sound effects"
            >
              {soundEnabled ? <Volume2 className="h-3.5 w-3.5 text-amber-300" /> : <VolumeX className="h-3.5 w-3.5 text-slate-300" />}
              <span>{soundEnabled ? 'Water Sound ON' : 'Muted'}</span>
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2">
            <span>Hydration Measure (ML & Glasses)</span>
            <span className="text-2xl">💧</span>
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 font-medium leading-relaxed">
            Set your child's daily target in <strong>ML</strong> and customize your household cup/glass capacity (e.g. 100ml or 250ml) for exact real-world logging.
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
                {activeChild.name} drank {currentMl.toLocaleString()} ml (~{currentGlasses} glasses) today!
              </div>
            </div>
          </div>
          <span className="bg-white/20 text-white font-black text-xs px-3 py-1.5 rounded-xl shrink-0">
            Goal Met ✓
          </span>
        </div>
      )}

      {/* 2. PROMINENT CUSTOMIZE TARGET & GLASS SIZE (ML) CARD */}
      <div className="bg-white rounded-3xl p-6 shadow-soft border-2 border-sky-300 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-lg">
              ⚙️
            </div>
            <div>
              <h3 className="text-base font-black font-display text-slate-900 flex items-center gap-2">
                <span>Daily Target & Glass Size Settings (ML)</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Edit below to match your child's target and your actual cup size (e.g. 100ml vs 250ml).
              </p>
            </div>
          </div>

          {savedFeedback && (
            <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5 animate-pop-in shrink-0">
              <Check className="h-3.5 w-3.5" /> {savedFeedback}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SECTION A: DAILY TARGET IN ML */}
          <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-800 flex items-center gap-1">
                <span>🎯 1. Daily Target:</span>
                <strong className="text-sky-700 font-extrabold text-sm ml-1">{targetMl} ML</strong>
              </label>
              <span className="text-[11px] text-slate-500 font-bold">
                (~{targetGlasses} glasses)
              </span>
            </div>

            {/* Target Presets */}
            <div className="flex flex-wrap gap-1.5">
              {PRESET_TARGET_MLS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => applySettings(preset, glassSizeInput, `Target set to ${preset} ml!`)}
                  className={`btn-press px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    targetMl === preset
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs scale-105'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:bg-sky-50'
                  }`}
                >
                  {preset} ml
                </button>
              ))}
            </div>

            {/* Custom Target Input Box */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-slate-600 font-bold">Custom Target ML:</span>
              <input
                type="number"
                min={100}
                max={5000}
                step={50}
                value={targetMlInput}
                onChange={(e) => setTargetMlInput(parseInt(e.target.value, 10) || 0)}
                className="w-24 px-3 py-1.5 rounded-xl border border-sky-300 font-black text-xs text-slate-900 bg-white text-center focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="1750"
              />
              <button
                type="button"
                onClick={() => applySettings(targetMlInput, glassSizeInput, `Target updated to ${targetMlInput} ml!`)}
                className="btn-press px-3 py-1.5 rounded-xl bg-sky-600 text-white font-bold text-xs cursor-pointer shadow-xs hover:bg-sky-700"
              >
                Set ML
              </button>
            </div>
          </div>

          {/* SECTION B: GLASS SIZE IN ML */}
          <div className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-800 flex items-center gap-1">
                <span>🥤 2. Glass / Cup Size:</span>
                <strong className="text-teal-700 font-extrabold text-sm ml-1">{mlPerGlass} ML / glass</strong>
              </label>
              <span className="text-[11px] text-slate-500 font-bold">
                (Customizable)
              </span>
            </div>

            {/* Glass Size Presets */}
            <div className="flex flex-wrap gap-1.5">
              {PRESET_GLASS_SIZES.map((g) => (
                <button
                  key={g.ml}
                  type="button"
                  onClick={() => applySettings(targetMlInput, g.ml, `Glass size set to ${g.ml} ml!`)}
                  className={`btn-press px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    mlPerGlass === g.ml
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs scale-105'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300 hover:bg-teal-50'
                  }`}
                  title={g.desc}
                >
                  {g.label}
                </button>
              ))}
            </div>

            {/* Custom Glass Size Input Box */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-slate-600 font-bold">Custom Glass ML:</span>
              <input
                type="number"
                min={50}
                max={1000}
                step={10}
                value={glassSizeInput}
                onChange={(e) => setGlassSizeInput(parseInt(e.target.value, 10) || 0)}
                className="w-24 px-3 py-1.5 rounded-xl border border-teal-300 font-black text-xs text-slate-900 bg-white text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="250"
              />
              <button
                type="button"
                onClick={() => applySettings(targetMlInput, glassSizeInput, `Glass capacity set to ${glassSizeInput} ml!`)}
                className="btn-press px-3 py-1.5 rounded-xl bg-teal-600 text-white font-bold text-xs cursor-pointer shadow-xs hover:bg-teal-700"
              >
                Set Glass ML
              </button>
            </div>
          </div>
        </div>

        {/* Live Calculation Footer Banner */}
        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-700 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-base">💡</span>
            <span>
              Current formula: Daily Target = <strong>{targetMl} ml</strong> = approx{' '}
              <strong className="text-sky-800">{targetGlasses} glasses</strong> of <strong>{mlPerGlass} ml</strong> each.
            </span>
          </div>
        </div>

        {/* SECTION C: SMART HYDRATION REMINDER WITH SOUND */}
        <div className="bg-gradient-to-r from-sky-500/10 via-teal-500/10 to-indigo-500/10 border border-sky-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-sky-600 animate-bounce-soft" />
              <h4 className="text-xs font-black font-display text-slate-900">
                Automated Water Reminders (With Water Glug Sound 🔊)
              </h4>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Friendly reminder popups prompt your child to drink a glass of water during learning quests.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
              {[
                { mins: 30, label: '30m' },
                { mins: 45, label: '45m' },
                { mins: 60, label: '60m' },
                { mins: 90, label: '90m' },
                { mins: 0, label: 'Off' },
              ].map((item) => (
                <button
                  key={item.mins}
                  type="button"
                  onClick={() => handleSetReminderInterval(item.mins)}
                  className={`btn-press px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                    reminderInterval === item.mins
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowReminderModal(true)}
              className="btn-press px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-xs flex items-center gap-1 cursor-pointer"
              title="Preview the hydration reminder popup"
            >
              <span>🔔 Test Popup</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. TODAY'S PROGRESS & ONE-TAP ACTION CARDS */}
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
                  Today's Intake ({activeChild.name})
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Goal: <strong className="text-sky-700">{targetMl.toLocaleString()} ml</strong> (~{targetGlasses} glasses @ {mlPerGlass}ml)
                </p>
              </div>
            </div>
          </div>

          {/* Big Number & Visual Progress Display */}
          <div className="bg-gradient-to-br from-sky-50 via-teal-50 to-emerald-50 rounded-3xl p-6 border border-sky-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left space-y-1">
              <div className="text-[10px] font-black uppercase tracking-wider text-sky-800">
                Water Drank Today (ML)
              </div>
              <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                <span className="text-5xl font-black font-display text-slate-900">
                  {currentMl.toLocaleString()}
                </span>
                <span className="text-xl font-bold text-slate-400 font-display">
                  / {targetMl.toLocaleString()} ml
                </span>
              </div>
              <div className="text-sm font-bold text-sky-700 flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                <span>~{currentGlasses} glasses</span>
                <span className="text-slate-400 font-normal">•</span>
                <span className="text-slate-600 font-medium">{percentComplete}% of goal</span>
                <span className="text-[11px] text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full font-bold">
                  {mlPerGlass} ml / glass
                </span>
              </div>
            </div>

            {/* Visual Circular Water Visualizer */}
            <div className="relative w-28 h-28 rounded-full border-4 border-white shadow-soft bg-white flex items-center justify-center shrink-0">
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

          {/* Quick Log Intake Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black font-display text-slate-800">
                Tap to Log Intake (With Water Sound 🔊)
              </label>
              <p className="text-[11px] text-slate-500 font-medium">
                Tap glass or quick ML button, or enter exact custom ML.
              </p>
            </div>

            {/* Quick Glass Log (Dynamic to user's glass size) */}
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleAddGlasses(1)}
                className="btn-press py-3 px-2 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs flex flex-col items-center justify-center gap-1 shadow-soft cursor-pointer transition-transform"
              >
                <span className="text-lg">💧</span>
                <span>+1 Glass</span>
                <span className="text-[10px] text-sky-100 font-bold">({mlPerGlass} ml)</span>
              </button>

              <button
                type="button"
                onClick={() => handleAddGlasses(2)}
                className="btn-press py-3 px-2 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-xs flex flex-col items-center justify-center gap-1 shadow-soft cursor-pointer transition-transform"
              >
                <span className="text-lg">🥤</span>
                <span>+2 Glasses</span>
                <span className="text-[10px] text-teal-100 font-bold">({mlPerGlass * 2} ml)</span>
              </button>

              <button
                type="button"
                onClick={() => handleAddMl(500, false)}
                className="btn-press py-3 px-2 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-black text-xs flex flex-col items-center justify-center gap-1 shadow-soft cursor-pointer transition-transform"
              >
                <span className="text-lg">🍶</span>
                <span>+1 Bottle</span>
                <span className="text-[10px] text-indigo-100 font-bold">(500 ml)</span>
              </button>
            </div>

            {/* Direct Quick ML Chips */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-bold text-slate-600">Quick ML shortcuts:</div>
              <div className="flex flex-wrap gap-1.5">
                {[50, 100, 150, 200, 250, 300, 400, 500].map((mlVal) => (
                  <button
                    key={mlVal}
                    type="button"
                    onClick={() => handleAddMl(mlVal, false)}
                    className="btn-press px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-sky-100 hover:text-sky-700 text-slate-700 text-[11px] font-bold border border-slate-200 transition-colors cursor-pointer"
                  >
                    +{mlVal} ml
                  </button>
                ))}
              </div>
            </div>

            {/* Custom ML Add Bar */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xs font-bold text-slate-700 shrink-0">Custom ML:</span>
                <input
                  type="number"
                  min={10}
                  max={2000}
                  step={10}
                  value={customMlInput}
                  onChange={(e) => setCustomMlInput(e.target.value)}
                  placeholder={`e.g. ${mlPerGlass}`}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <span className="text-xs font-bold text-slate-500 shrink-0">ml</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const val = parseInt(customMlInput, 10);
                  if (val > 0) handleAddMl(val, false);
                }}
                disabled={!customMlInput || parseInt(customMlInput, 10) <= 0}
                className="btn-press px-4 py-2 rounded-xl bg-sky-600 disabled:bg-slate-300 text-white font-bold text-xs cursor-pointer shadow-xs disabled:cursor-not-allowed transition-all shrink-0"
              >
                + Add ML
              </button>
            </div>

            {/* Optional Note & Reset Controls */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Optional note (e.g. playground session)"
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

        {/* 7-DAY HYDRATION TRENDS & PARENT GUIDE (RIGHT) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Weekly 7-Day Bar Chart */}
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black font-display text-slate-900">
                  Weekly Hydration (Past 7 Days)
                </h3>
                <p className="text-xs text-slate-500">Daily ML consumed vs target ({targetMl} ml)</p>
              </div>
              <span className="bg-sky-50 text-sky-700 text-xs font-black px-3 py-1 rounded-xl border border-sky-200">
                Target: {targetMl} ml
              </span>
            </div>

            {/* 7-Day Bar Chart */}
            <div className="pt-6 pb-2">
              <div className="h-44 flex items-end justify-between gap-2 border-b border-slate-200 pb-2 px-2">
                {past7DaysLogs.slice(0, 7).reverse().map((entry, idx) => {
                  const entryMl = entry.mlDrank !== undefined ? entry.mlDrank : entry.glassesDrank * (entry.mlPerGlass || mlPerGlass);
                  const entryTargetMl = entry.targetMl || targetMl;
                  const maxChartMl = Math.max(2500, targetMl * 1.2);
                  const heightPercent = Math.min(100, Math.round((entryMl / maxChartMl) * 100));
                  const isMetTarget = entryMl >= entryTargetMl;
                  const entryGlasses = Math.round((entryMl / (entry.mlPerGlass || mlPerGlass)) * 10) / 10;

                  return (
                    <div key={entry.id || idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                      {/* Hover Tooltip */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap z-20 pointer-events-none shadow-md">
                        {entryMl.toLocaleString()} ml (~{entryGlasses} glasses) {entry.notes ? `• ${entry.notes}` : ''}
                      </div>

                      <span className="text-[10px] font-black text-slate-600 mb-1">
                        {entryMl >= 1000 ? `${(entryMl / 1000).toFixed(1)}k` : `${entryMl}`}
                      </span>

                      <div
                        style={{ height: `${Math.max(8, heightPercent)}%` }}
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
                    <span>Goal Met ({targetMl}+ ml)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-md bg-amber-400" />
                    <span>In Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PARENT GUIDE & FLUID GUIDELINES */}
          <div className="bg-gradient-to-br from-sky-50 via-teal-50 to-indigo-50 rounded-3xl p-6 border border-sky-200/80 space-y-4">
            <h4 className="text-sm font-black font-display text-sky-950 flex items-center gap-2">
              <span>💡</span> Recommended Daily ML Guidelines for Children
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-white/80 p-3 rounded-2xl border border-sky-100">
                <div className="font-bold text-sky-900">Toddlers (1–3 yrs)</div>
                <div className="text-slate-600 font-medium mt-0.5">1,000 – 1,300 ml</div>
                <div className="text-[10px] text-slate-400">~10–13 cups of 100ml</div>
              </div>
              <div className="bg-white/80 p-3 rounded-2xl border border-sky-100">
                <div className="font-bold text-sky-900">Kids (4–8 yrs)</div>
                <div className="text-slate-600 font-medium mt-0.5">1,400 – 1,600 ml</div>
                <div className="text-[10px] text-slate-400">~6–8 glasses of 200ml</div>
              </div>
              <div className="bg-white/80 p-3 rounded-2xl border border-sky-100">
                <div className="font-bold text-sky-900">Pre-Teens (9–13 yrs)</div>
                <div className="text-slate-600 font-medium mt-0.5">1,800 – 2,400 ml</div>
                <div className="text-[10px] text-slate-400">~7–10 glasses of 250ml</div>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-sky-950 font-medium pt-1">
              <li className="flex items-start gap-2">
                <span className="text-sky-600 font-bold">•</span>
                <span><strong>Custom Glass Sizes:</strong> Measure your cup (e.g. 100ml sippy vs 250ml tumbler) in the top settings so each "+1 Glass" tap is accurate!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-600 font-bold">•</span>
                <span><strong>Play Breaks:</strong> Water sips between Kidora learning quests help keep children energetic and focused.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Smart Hydration Reminder Modal */}
      <HydrationReminderModal
        isOpen={showReminderModal}
        onClose={() => setShowReminderModal(false)}
      />
    </div>
  );
}
