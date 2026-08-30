import { useState, useMemo } from 'react';
import { useApp } from '@/lib/store';
import type { SleepLogEntry, SleepQuality } from '@/lib/types';
import {
  Moon,
  Sun,
  Clock,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  TrendingUp,
  Award,
  Info,
  Calendar,
} from 'lucide-react';

const QUALITY_OPTIONS: { id: SleepQuality; label: string; emoji: string; desc: string }[] = [
  { id: 'peaceful', label: 'Peaceful', emoji: '😴', desc: 'Slept calmly all night' },
  { id: 'deep', label: 'Deep Sleep', emoji: '🌙', desc: 'Sound, uninterrupted' },
  { id: 'fair', label: 'Fair Sleep', emoji: '😐', desc: 'Woke up 1-2 times' },
  { id: 'restless', label: 'Restless', emoji: '🥱', desc: 'Frequent waking' },
];

export function SleepTracker() {
  const { profile, children: familyChildren, sleepLogs, addSleepLog, deleteSleepLog } = useApp();

  const [selectedChildId, setSelectedChildId] = useState<string>(profile?.id || 'child-1');
  const [date, setDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [bedtime, setBedtime] = useState<string>('20:30');
  const [wakeTime, setWakeTime] = useState<string>('06:45');
  const [quality, setQuality] = useState<SleepQuality>('peaceful');
  const [notes, setNotes] = useState<string>('');
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  // Duration calculation
  const computedDuration = useMemo(() => {
    try {
      const [bHour, bMin] = bedtime.split(':').map(Number);
      const [wHour, wMin] = wakeTime.split(':').map(Number);

      const bDate = new Date(2000, 0, 1, bHour, bMin);
      let wDate = new Date(2000, 0, 1, wHour, wMin);

      // If wake time is earlier in the day than bedtime, it crossed midnight
      if (wDate <= bDate) {
        wDate = new Date(2000, 0, 2, wHour, wMin);
      }

      const diffMs = wDate.getTime() - bDate.getTime();
      const totalHours = diffMs / (1000 * 60 * 60);
      const hours = Math.floor(totalHours);
      const mins = Math.round((totalHours - hours) * 60);

      return {
        totalHours: Number(totalHours.toFixed(2)),
        hours,
        mins,
        formatted: `${hours}h ${mins > 0 ? `${mins}m` : ''}`,
      };
    } catch {
      return { totalHours: 10, hours: 10, mins: 0, formatted: '10h' };
    }
  }, [bedtime, wakeTime]);

  const activeChild = familyChildren.find((c) => c.id === selectedChildId) || familyChildren[0];

  const childSleepLogs = useMemo(() => {
    return sleepLogs.filter((l) => l.childId === selectedChildId);
  }, [sleepLogs, selectedChildId]);

  const latestLog = childSleepLogs[0];

  // 7-day average calculation
  const past7DaysLogs = useMemo(() => {
    return childSleepLogs.slice(0, 7);
  }, [childSleepLogs]);

  const averageHours = useMemo(() => {
    if (past7DaysLogs.length === 0) return 10.0;
    const total = past7DaysLogs.reduce((acc, curr) => acc + curr.durationHours, 0);
    return (total / past7DaysLogs.length).toFixed(1);
  }, [past7DaysLogs]);

  const handleLogSleep = (e: React.FormEvent) => {
    e.preventDefault();
    addSleepLog({
      childId: selectedChildId,
      date,
      bedtime,
      wakeTime,
      durationHours: computedDuration.totalHours,
      quality,
      notes: notes.trim() || undefined,
    });

    setNotes('');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  // Recommended sleep guidelines by child age
  const ageRecommended = useMemo(() => {
    const age = activeChild?.age || 6;
    if (age <= 3) return { min: 11, max: 14, label: '11–14 hours (Toddler)' };
    if (age <= 5) return { min: 10, max: 13, label: '10–13 hours (Preschool)' };
    if (age <= 12) return { min: 9, max: 12, label: '9–12 hours (School Age)' };
    return { min: 8, max: 10, label: '8–10 hours (Teens)' };
  }, [activeChild]);

  return (
    <div className="space-y-6 animate-pop-in">
      {/* 1. TOP HEADER BANNER & CHILD SWITCHER */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-indigo-700/50">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
            Child Wellness & Rest Tracker
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2">
            <span>Sleep Measure</span>
            <span className="text-2xl">😴</span>
          </h2>
          <p className="text-xs sm:text-sm text-indigo-200 font-medium leading-relaxed">
            Track bedtime, wake-up times, and rest quality. Proper sleep promotes emotional balance, memory, and cognitive growth.
          </p>
        </div>

        {/* Child Selector */}
        {familyChildren.length > 1 && (
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 flex items-center gap-1.5 shrink-0">
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

      {/* 2. THREE KEY METRIC TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl shadow-xs">
            🌙
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Latest Rest Log
            </div>
            <div className="text-xl font-black font-display text-slate-900">
              {latestLog ? `${latestLog.durationHours}h` : '10.25h'}
            </div>
            <div className="text-[10px] font-bold text-emerald-600">
              Quality: {latestLog ? latestLog.quality.toUpperCase() : 'PEACEFUL 😴'}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl shadow-xs">
            📈
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              7-Day Average
            </div>
            <div className="text-xl font-black font-display text-slate-900">{averageHours} hrs/night</div>
            <div className="text-[10px] font-bold text-indigo-600">Consistent Routine ✨</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl shadow-xs">
            🎯
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Age Recommendation
            </div>
            <div className="text-xl font-black font-display text-slate-900">{ageRecommended.min}–{ageRecommended.max}h</div>
            <div className="text-[10px] font-bold text-slate-500">{ageRecommended.label}</div>
          </div>
        </div>
      </div>

      {/* 3. LOG SLEEP FORM & 7-DAY VISUAL TREND */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LOG FORM (LEFT) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-soft border border-slate-200/80 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl shadow-xs">
              ⏰
            </div>
            <div>
              <h3 className="text-base font-black font-display text-slate-900">
                Log Sleep for {activeChild.name}
              </h3>
              <p className="text-xs text-slate-500">Record nightly bedtime and wake up time</p>
            </div>
          </div>

          {showSuccessToast && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex items-center gap-3 animate-pop-in">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <div className="text-xs font-bold text-emerald-800">
                Sleep log successfully recorded and added to trends!
              </div>
            </div>
          )}

          <form onSubmit={handleLogSleep} className="space-y-4">
            <div>
              <label className="block text-xs font-black font-display text-slate-700 mb-1">
                Sleep Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black font-display text-slate-700 mb-1 flex items-center gap-1">
                  <Moon className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Bedtime</span>
                </label>
                <input
                  type="time"
                  value={bedtime}
                  onChange={(e) => setBedtime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black font-display text-slate-700 mb-1 flex items-center gap-1">
                  <Sun className="h-3.5 w-3.5 text-amber-500" />
                  <span>Wake-Up Time</span>
                </label>
                <input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Computed Duration Banner */}
            <div className="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-3.5 flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900">Total Calculated Sleep:</span>
              <span className="text-sm font-black font-display text-indigo-700 bg-white px-3 py-1 rounded-xl shadow-xs">
                {computedDuration.formatted} ({computedDuration.totalHours} hrs)
              </span>
            </div>

            {/* Sleep Quality Selector */}
            <div>
              <label className="block text-xs font-black font-display text-slate-700 mb-1.5">
                Sleep Quality Indicator
              </label>
              <div className="grid grid-cols-2 gap-2">
                {QUALITY_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuality(opt.id)}
                    className={`btn-press p-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-all text-left ${
                      quality === opt.id
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-soft'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-lg">{opt.emoji}</span>
                    <div className="truncate">
                      <div className="font-bold">{opt.label}</div>
                      <div className={`text-[9px] ${quality === opt.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {opt.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-black font-display text-slate-700 mb-1">
                Parent Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Read bedtime story, woke up once for water"
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="btn-press w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black font-display text-xs sm:text-sm shadow-pop flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Save Sleep Log</span>
              <span>✓</span>
            </button>
          </form>
        </div>

        {/* 7-DAY VISUAL SLEEP TREND CHART (RIGHT) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black font-display text-slate-900">
                  Weekly Sleep Trends (Past 7 Days)
                </h3>
                <p className="text-xs text-slate-500">Visual comparison against daily recommended target</p>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-black px-3 py-1 rounded-xl border border-emerald-200">
                Target: {ageRecommended.min}h+
              </span>
            </div>

            {/* 7-Day Bar Chart */}
            <div className="pt-6 pb-2">
              <div className="h-44 flex items-end justify-between gap-2 border-b border-slate-200 pb-2 px-2">
                {past7DaysLogs.slice(0, 7).reverse().map((entry, idx) => {
                  const maxChartHours = 12;
                  const heightPercent = Math.min(100, Math.round((entry.durationHours / maxChartHours) * 100));
                  const isMetTarget = entry.durationHours >= ageRecommended.min;

                  return (
                    <div key={entry.id || idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                      {/* Floating hover tooltip */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap z-20 pointer-events-none shadow-md">
                        {entry.durationHours}h ({entry.bedtime} - {entry.wakeTime})
                      </div>

                      <span className="text-[10px] font-black text-slate-600 mb-1">
                        {entry.durationHours}h
                      </span>

                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full max-w-[36px] rounded-t-xl transition-all ${
                          isMetTarget
                            ? 'bg-gradient-to-t from-indigo-600 to-purple-500 shadow-xs'
                            : 'bg-gradient-to-t from-amber-500 to-orange-400'
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
                    <span className="w-3 h-3 rounded-md bg-indigo-600" />
                    <span>Met Target ({ageRecommended.min}h+)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-md bg-amber-500" />
                    <span>Under Target</span>
                  </div>
                </div>
                <span className="text-indigo-600 font-bold">Goal: 9-11 Hours Recommended</span>
              </div>
            </div>
          </div>

          {/* HISTORICAL SLEEP LOGS LIST */}
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-200/80 space-y-4">
            <h3 className="text-base font-black font-display text-slate-900">
              Recent Rest Logs ({childSleepLogs.length})
            </h3>

            <div className="divide-y divide-slate-100">
              {childSleepLogs.map((log) => {
                const qObj = QUALITY_OPTIONS.find((q) => q.id === log.quality);
                return (
                  <div key={log.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center text-xl">
                        {qObj?.emoji || '😴'}
                      </div>
                      <div>
                        <div className="text-xs font-black font-display text-slate-800 flex items-center gap-2">
                          <span>
                            {new Date(log.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                          <span className="bg-indigo-100 text-indigo-800 text-[10px] px-2 py-0.5 rounded-md font-bold">
                            {log.durationHours} hrs
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {log.bedtime} to {log.wakeTime} • {qObj?.label}
                          {log.notes && ` • "${log.notes}"`}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteSleepLog(log.id)}
                      className="btn-press text-slate-300 hover:text-rose-500 p-2 rounded-xl transition-colors cursor-pointer"
                      title="Delete log"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
