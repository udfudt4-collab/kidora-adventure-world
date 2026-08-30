import { useState } from 'react';
import { useApp } from '@/lib/store';
import {
  calculateCycleEstimates,
  formatDateShort,
  type CycleCalculations,
} from '@/lib/cycleTracker';
import type { CycleEntry } from '@/lib/types';
import {
  Calendar as CalendarIcon,
  Heart,
  Sparkles,
  ShieldCheck,
  Plus,
  Trash2,
  AlertTriangle,
  Info,
  Clock,
  ChevronLeft,
  ChevronRight,
  Bell,
} from 'lucide-react';

export function PeriodTracker() {
  const { periodTrackerData, updatePeriodTrackerData, addPeriodCycle, deletePeriodCycle } = useApp();

  const [activeMonthOffset, setActiveMonthOffset] = useState(0);
  const [showLogModal, setShowLogModal] = useState(false);
  const [logStartDate, setLogStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [logEndDate, setLogEndDate] = useState('');
  const [logFlow, setLogFlow] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [logNotes, setLogNotes] = useState('');

  const estimates: CycleCalculations = calculateCycleEstimates(periodTrackerData);

  // Month navigation
  const currentCalendarDate = new Date();
  currentCalendarDate.setMonth(currentCalendarDate.getMonth() + activeMonthOffset);
  const currentYear = currentCalendarDate.getFullYear();
  const currentMonth = currentCalendarDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // Calendar matrix calculation
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handleCycleLengthChange = (val: number) => {
    updatePeriodTrackerData({ cycleLengthDays: val });
  };

  const handlePeriodDurationChange = (val: number) => {
    updatePeriodTrackerData({ periodDurationDays: val });
  };

  const handleToggleReminder = () => {
    updatePeriodTrackerData({ reminderEnabled: !periodTrackerData.reminderEnabled });
  };

  const handleSaveCycle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logStartDate) return;
    addPeriodCycle({
      startDate: logStartDate,
      endDate: logEndDate || undefined,
      flow: logFlow,
      notes: logNotes.trim() || undefined,
    });
    setShowLogModal(false);
    setLogNotes('');
  };

  return (
    <div className="space-y-6 font-sans select-none animate-fade-in">
      {/* Privacy Guarantee & Medical Disclaimer */}
      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-4.5 space-y-2">
        <div className="flex items-center gap-2 text-rose-900 font-display font-black text-sm">
          <ShieldCheck className="h-5 w-5 text-rose-600 shrink-0" />
          <span>Parent Confidentiality Notice & Medical Disclaimer</span>
        </div>
        <p className="text-xs text-rose-800 leading-relaxed">
          This tracking tool is <strong>strictly private to your parent account</strong> and is never shown in the child adventure interface.
        </p>
        <div className="bg-white/80 rounded-2xl p-3 border border-rose-100 flex items-start gap-2 text-xs font-semibold text-rose-900">
          <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
          <span>
            <strong>Important:</strong> Fertile window and ovulation dates are estimates and may vary from cycle to cycle. They should not be used as guaranteed medical or contraceptive predictions.
          </span>
        </div>
      </div>

      {/* Primary Key Cycle Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Next Period Card */}
        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-5 text-white shadow-soft relative overflow-hidden">
          <div className="text-xs font-black uppercase text-rose-100 flex items-center justify-between">
            <span>Estimated Next Period</span>
            <span>🌸</span>
          </div>
          <div className="text-2xl font-black font-display mt-2">
            {formatDateShort(estimates.nextPeriodStart)}
          </div>
          <div className="text-xs font-bold text-rose-100 mt-1">
            {estimates.daysUntilNextPeriod > 0
              ? `In about ${estimates.daysUntilNextPeriod} days`
              : estimates.daysUntilNextPeriod === 0
              ? 'Expected today'
              : 'Cycle in progress'}
          </div>
        </div>

        {/* Fertile Window Card */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-5 text-white shadow-soft relative overflow-hidden">
          <div className="text-xs font-black uppercase text-purple-100 flex items-center justify-between">
            <span>Estimated Fertile Window</span>
            <span>✨</span>
          </div>
          <div className="text-lg font-black font-display mt-2">
            {formatDateShort(estimates.fertileWindowStart)} – {formatDateShort(estimates.fertileWindowEnd)}
          </div>
          <div className="text-xs font-bold text-purple-100 mt-1">
            Approximate 6-day fertile window
          </div>
        </div>

        {/* Estimated Ovulation Date Card */}
        <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl p-5 text-white shadow-soft relative overflow-hidden">
          <div className="text-xs font-black uppercase text-teal-100 flex items-center justify-between">
            <span>Estimated Ovulation</span>
            <span>🎯</span>
          </div>
          <div className="text-2xl font-black font-display mt-2">
            {formatDateShort(estimates.ovulationDate)}
          </div>
          <div className="text-xs font-bold text-teal-100 mt-1">
            Day 14 of typical cycle
          </div>
        </div>
      </div>

      {/* Cycle Settings & Quick Actions Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black font-display text-slate-800">
              Cycle Settings & Parameters
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Customize your typical cycle lengths for tailored estimates
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowLogModal(true)}
            className="btn-press px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-display font-black text-xs rounded-2xl shadow-soft flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Log Period Date
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
          {/* Cycle Length Slider */}
          <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Cycle Length:</span>
              <span className="font-black text-rose-600">{periodTrackerData.cycleLengthDays || 28} Days</span>
            </div>
            <input
              type="range"
              min="21"
              max="40"
              value={periodTrackerData.cycleLengthDays || 28}
              onChange={(e) => handleCycleLengthChange(parseInt(e.target.value, 10))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>21d (Short)</span>
              <span>28d (Avg)</span>
              <span>40d (Long)</span>
            </div>
          </div>

          {/* Period Duration Slider */}
          <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Period Duration:</span>
              <span className="font-black text-rose-600">{periodTrackerData.periodDurationDays || 5} Days</span>
            </div>
            <input
              type="range"
              min="2"
              max="8"
              value={periodTrackerData.periodDurationDays || 5}
              onChange={(e) => handlePeriodDurationChange(parseInt(e.target.value, 10))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>2 Days</span>
              <span>5 Days</span>
              <span>8 Days</span>
            </div>
          </div>

          {/* Reminders Toggle */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Bell className="h-3.5 w-3.5 text-rose-500" />
                <span>Cycle Reminders</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Gentle discreet alerts</p>
            </div>
            <button
              type="button"
              onClick={handleToggleReminder}
              className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                periodTrackerData.reminderEnabled ? 'bg-rose-500 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 bg-white rounded-full shadow-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Monthly Calendar View */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-rose-500" />
            <h3 className="text-base font-black font-display text-slate-800">
              {monthNames[currentMonth]} {currentYear}
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveMonthOffset((prev) => prev - 1)}
              className="btn-press w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveMonthOffset(0)}
              className="btn-press px-2.5 py-1 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setActiveMonthOffset((prev) => prev + 1)}
              className="btn-press w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 flex-wrap text-[11px] font-bold text-slate-600 bg-slate-50 p-2.5 rounded-2xl">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <span>Period Days</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-purple-400" />
            <span>Fertile Window</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-teal-500" />
            <span>Estimated Ovulation</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full border-2 border-dashed border-rose-400" />
            <span>Predicted Next Period</span>
          </div>
        </div>

        {/* Day Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-xs font-black text-slate-400 py-1">
              {day}
            </div>
          ))}

          {/* Blank offset days */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-10 sm:h-12" />
          ))}

          {/* Month Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const thisDate = new Date(currentYear, currentMonth, dayNum);
            const thisDateStr = thisDate.toISOString().split('T')[0];

            // Check if matches logged period
            const isLoggedPeriod = periodTrackerData.cycles.some((c) => {
              const s = new Date(c.startDate);
              const e = c.endDate ? new Date(c.endDate) : new Date(s.getTime() + 4 * 86400000);
              return thisDate >= s && thisDate <= e;
            });

            // Check if matches predicted next period
            const isPredictedPeriod =
              thisDate >= estimates.nextPeriodStart && thisDate <= estimates.nextPeriodEnd;

            // Check if fertile window
            const isFertile =
              thisDate >= estimates.fertileWindowStart && thisDate <= estimates.fertileWindowEnd;

            // Check if ovulation
            const isOvulation =
              thisDate.toDateString() === estimates.ovulationDate.toDateString();

            const isToday = thisDate.toDateString() === new Date().toDateString();

            let dayStyle = 'text-slate-700 hover:bg-slate-100';
            let badgeStyle = '';

            if (isLoggedPeriod) {
              dayStyle = 'bg-rose-500 text-white font-black shadow-xs';
            } else if (isOvulation) {
              dayStyle = 'bg-teal-500 text-white font-black shadow-xs';
            } else if (isFertile) {
              dayStyle = 'bg-purple-100 text-purple-900 font-black border border-purple-300';
            } else if (isPredictedPeriod) {
              dayStyle = 'bg-rose-50 border-2 border-dashed border-rose-400 text-rose-900 font-bold';
            }

            return (
              <div
                key={`day-${dayNum}`}
                className={`h-10 sm:h-12 rounded-2xl flex flex-col items-center justify-center text-xs transition-all relative ${dayStyle} ${
                  isToday && !isLoggedPeriod && !isOvulation ? 'ring-2 ring-amber-400 font-black' : ''
                }`}
              >
                <span>{dayNum}</span>
                {isOvulation && <span className="text-[9px] leading-none">✨</span>}
                {isToday && !isLoggedPeriod && !isOvulation && (
                  <span className="w-1 h-1 bg-amber-500 rounded-full mt-0.5" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Cycle History Table */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black font-display text-slate-800">
            Recorded Cycle History
          </h3>
          <span className="text-xs text-slate-400 font-bold">
            {periodTrackerData.cycles.length} Past Logs
          </span>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {periodTrackerData.cycles.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-400 font-medium">
              No previous cycles recorded yet. Tap "Log Period Date" to begin.
            </div>
          ) : (
            periodTrackerData.cycles.map((c) => (
              <div
                key={c.id}
                className="bg-slate-50 rounded-2xl p-3.5 flex items-center justify-between text-xs border border-slate-100"
              >
                <div>
                  <div className="font-black font-display text-slate-800 flex items-center gap-2">
                    <span className="text-rose-500">🌸</span>
                    <span>{c.startDate}</span>
                    {c.endDate && <span className="text-slate-400">→ {c.endDate}</span>}
                  </div>
                  {c.notes && (
                    <p className="text-slate-500 font-medium text-[11px] mt-0.5">{c.notes}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">
                    {c.flow || 'medium'} flow
                  </span>
                  <button
                    type="button"
                    onClick={() => deletePeriodCycle(c.id)}
                    className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Delete log"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Log Period Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4 animate-pop-in">
            <h3 className="text-lg font-black font-display text-slate-900">
              Log Period Entry
            </h3>

            <form onSubmit={handleSaveCycle} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  required
                  value={logStartDate}
                  onChange={(e) => setLogStartDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  End Date (Optional)
                </label>
                <input
                  type="date"
                  value={logEndDate}
                  onChange={(e) => setLogEndDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Flow Intensity
                </label>
                <select
                  value={logFlow}
                  onChange={(e) => setLogFlow(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                >
                  <option value="light">Light</option>
                  <option value="medium">Medium</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Private Notes
                </label>
                <textarea
                  rows={2}
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  placeholder="Optional symptoms or cycle notes..."
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="btn-press flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-press flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs rounded-xl shadow-soft cursor-pointer"
                >
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
