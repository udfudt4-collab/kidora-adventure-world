import { useState } from "react";
import { ArrowLeft, Star, Flame, Bell, Volume2, Sparkles, Clock, Trash2, Award, BookOpen, Palette } from "lucide-react";
import { useApp } from "@/lib/store";
import type { Screen } from "@/lib/types";

export interface ParentDashboardProps {
  onNavigate?: (screen: Screen) => void;
  onBack?: () => void;
  childName?: string;
  childAge?: number;
}

export function ParentDashboard({
  onNavigate,
  onBack,
  childName,
  childAge,
}: ParentDashboardProps) {
  const { profile, creations, unlocks, saveProfile, resetProfile } = useApp();

  const activeName = childName || profile?.name || "Explorer";
  const activeAge = childAge || profile?.age || 6;
  const starsCount = profile?.stars ?? 0;
  const streakCount = profile?.streak ?? 0;
  const adventuresCount = profile?.totalAdventures ?? 0;
  const creationsCount = creations?.length ?? 0;
  const badgesCount = unlocks?.filter((u) => u.category === "badge")?.length ?? 0;

  const screenTimeLimit = profile?.dailyLimitMin ?? 30;
  const notificationsEnabled = profile?.notificationsEnabled ?? true;
  const preferredTime = profile?.reminderTime ?? "08:00";
  const voiceNarration = profile?.voiceEnabled ?? true;
  const reducedMotion = profile?.reducedMotion ?? false;

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (onNavigate) {
      onNavigate("home");
    }
  };

  const handleTimeChange = (time: string) => {
    saveProfile({ reminderTime: time });
  };

  const handleNotificationToggle = () => {
    saveProfile({ notificationsEnabled: !notificationsEnabled });
  };

  const handleVoiceToggle = () => {
    saveProfile({ voiceEnabled: !voiceNarration });
  };

  const handleMotionToggle = () => {
    saveProfile({ reducedMotion: !reducedMotion });
  };

  const handleScreenTimeChange = (limit: number) => {
    saveProfile({ dailyLimitMin: limit });
  };

  const handleReset = async () => {
    await resetProfile();
    setShowResetConfirm(false);
    if (onNavigate) {
      onNavigate("home");
    }
  };

  const getTimeLabel = (time: string) => {
    switch (time) {
      case "07:00": return "7:00 AM";
      case "07:30": return "7:30 AM";
      case "08:00": return "8:00 AM";
      case "08:30": return "8:30 AM";
      case "09:00": return "9:00 AM";
      case "16:00": return "4:00 PM";
      case "17:00": return "5:00 PM";
      default: return time;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/80 py-6 px-4 flex justify-center text-slate-800 font-sans pb-16">
      <div className="w-full max-w-md space-y-4">
        {/* Top Header */}
        <div className="relative flex items-center justify-center py-2">
          <button
            onClick={handleBack}
            className="btn-press absolute left-0 h-10 w-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"
            title="Back to Home"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-slate-800 font-display">Parent Dashboard</h1>
            <p className="text-xs text-slate-400 font-medium">Insights, Controls & Learning</p>
          </div>
        </div>

        {/* 1. CHILD PROFILE CARD */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-display">
                CHILD PROFILE
              </span>
              <h2 className="text-2xl font-black text-slate-800 font-display">
                {activeName}, age {activeAge}
              </h2>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-amber-500 font-black text-xl">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <span>{starsCount}</span>
              </div>
              <span className="text-xs text-slate-400 font-semibold flex items-center justify-end gap-1">
                {streakCount} day streak <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="rounded-2xl bg-sky-50/70 border border-sky-100 p-3 text-center">
              <p className="text-2xl font-black text-sky-700 font-display">{adventuresCount}</p>
              <p className="text-[11px] text-sky-600 font-semibold uppercase tracking-wider mt-0.5">Adventures</p>
            </div>
            <div className="rounded-2xl bg-emerald-50/70 border border-emerald-100 p-3 text-center">
              <p className="text-2xl font-black text-emerald-700 font-display">{creationsCount}</p>
              <p className="text-[11px] text-emerald-600 font-semibold uppercase tracking-wider mt-0.5">Creations</p>
            </div>
            <div className="rounded-2xl bg-amber-50/70 border border-amber-100 p-3 text-center">
              <p className="text-2xl font-black text-amber-700 font-display">{badgesCount}</p>
              <p className="text-[11px] text-amber-600 font-semibold uppercase tracking-wider mt-0.5">Badges</p>
            </div>
          </div>
        </div>

        {/* 2. ACTIVITY BREAKDOWN */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-display">
              ACTIVITY BREAKDOWN
            </span>
            <span className="text-xs text-slate-400 font-medium">Core Skills</span>
          </div>

          {adventuresCount === 0 && creationsCount === 0 ? (
            <div className="py-4 text-center">
              <div className="text-3xl mb-1">🌱</div>
              <p className="text-sm text-slate-500 font-medium">
                No activities completed yet.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Data and learning skills will appear here after {activeName} plays!
              </p>
            </div>
          ) : (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5 text-sky-500" /> Math & Logic</span>
                <span className="text-slate-500 font-bold">{Math.max(1, adventuresCount * 2)} Quests</span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5"><Palette className="h-3.5 w-3.5 text-emerald-500" /> Creativity & Art</span>
                <span className="text-slate-500 font-bold">{creationsCount} Artwork</span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5"><Award className="h-3.5 w-3.5 text-amber-500" /> Explorer Badges</span>
                <span className="text-slate-500 font-bold">{badgesCount} Earned</span>
              </div>
            </div>
          )}
        </div>

        {/* 3. SCREEN TIME */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-display">
              SCREEN TIME
            </span>
            <div className="flex items-center gap-1 text-sky-600 font-bold text-xs bg-sky-50 px-2 py-0.5 rounded-full">
              <Clock className="h-3.5 w-3.5" />
              <span>Recommended 20-30 min</span>
            </div>
          </div>

          <div className="flex items-center justify-between font-bold">
            <span className="text-sm text-slate-700">Daily limit</span>
            <span className="text-base text-slate-900 font-black">{screenTimeLimit} min</span>
          </div>

          <input
            type="range"
            min="10"
            max="120"
            step="5"
            value={screenTimeLimit}
            onChange={(e) => handleScreenTimeChange(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />

          <div className="flex justify-between text-[10px] font-bold text-slate-400 px-0.5">
            <span>10 min</span>
            <span>30 min</span>
            <span>60 min</span>
            <span>120 min</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            We encourage meaningful screen time. After the daily adventure, children are encouraged to take a break and explore the real world.
          </p>
        </div>

        {/* 4. DAILY REMINDERS CARD */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-display flex items-center gap-1.5">
              <Bell className="h-3.5 w-3.5 text-emerald-500" />
              DAILY REMINDERS
            </span>
            {notificationsEnabled && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-800">Daily adventure push</p>
              <p className="text-xs text-slate-400">1 fun learning quest reminder each day</p>
            </div>
            <button
              type="button"
              onClick={handleNotificationToggle}
              className={`h-7 w-12 rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer flex items-center ${
                notificationsEnabled ? "bg-emerald-500" : "bg-slate-200"
              }`}
              aria-label="Toggle daily reminders"
            >
              <div
                className={`h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                  notificationsEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Preferred Time Dropdown (Visible when Toggle is ON) */}
          {notificationsEnabled && (
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-800">Reminder time</span>
              <select
                value={preferredTime}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
              >
                <option value="07:00">7:00 AM</option>
                <option value="07:30">7:30 AM</option>
                <option value="08:00">8:00 AM (Recommended)</option>
                <option value="08:30">8:30 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="16:00">4:00 PM (After School)</option>
                <option value="17:00">5:00 PM</option>
              </select>
            </div>
          )}

          <p className="text-[11px] text-slate-400 leading-normal">
            {notificationsEnabled
              ? `We'll send ${activeName} a new adventure quest reminder every morning at ${getTimeLabel(preferredTime)}.`
              : "Daily quest notifications are currently paused."}
          </p>
        </div>

        {/* 5. SETTINGS */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 space-y-4">
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-display flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            PREFERENCES
          </span>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <Volume2 className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-bold text-slate-800">Voice narration</span>
              </div>
              <p className="text-xs text-slate-400">Read stories and questions aloud</p>
            </div>
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`h-7 w-12 rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer flex items-center ${
                voiceNarration ? "bg-emerald-500" : "bg-slate-200"
              }`}
              aria-label="Toggle voice narration"
            >
              <div
                className={`h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                  voiceNarration ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div>
              <span className="text-sm font-bold text-slate-800">Reduced motion</span>
              <p className="text-xs text-slate-400">Calmer animations for sensitive children</p>
            </div>
            <button
              type="button"
              onClick={handleMotionToggle}
              className={`h-7 w-12 rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer flex items-center ${
                reducedMotion ? "bg-emerald-500" : "bg-slate-200"
              }`}
              aria-label="Toggle reduced motion"
            >
              <div
                className={`h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                  reducedMotion ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* 6. RECENT CREATIONS GALLERY */}
        {creations && creations.length > 0 && (
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-display">
                RECENT CREATIONS ({creations.length})
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {creations.slice(0, 6).map((c) => (
                <div key={c.id} className="bg-slate-50 rounded-2xl p-2.5 text-center border border-slate-100">
                  <div className="text-2xl mb-1">{c.type === "drawing" ? "🎨" : "📖"}</div>
                  <div className="text-xs font-bold text-slate-700 truncate">{c.title || "Artwork"}</div>
                  <div className="text-[10px] text-slate-400 capitalize">{c.type}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. RESET PROFILE */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 space-y-3">
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-display flex items-center gap-1.5 text-rose-500">
            <Trash2 className="h-3.5 w-3.5" />
            RESET PROFILE
          </span>
          <p className="text-xs text-slate-400">
            This will reset all stars, streaks, and progress to start a fresh adventure journey.
          </p>

          {!showResetConfirm ? (
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="btn-press rounded-2xl bg-rose-50 border border-rose-200 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-100 cursor-pointer transition-colors"
            >
              Reset Profile Progress
            </button>
          ) : (
            <div className="p-3 bg-rose-50/80 rounded-2xl border border-rose-200 space-y-2">
              <p className="text-xs font-bold text-rose-700">Are you sure? This cannot be undone.</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-press bg-rose-600 text-white rounded-xl px-3 py-1.5 text-xs font-bold shadow-sm"
                >
                  Yes, Reset Everything
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="btn-press bg-white text-slate-600 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 pt-3 pb-6 font-medium">
          Kidora Adventure World — Better screen time, not more. 💚
        </p>
      </div>
    </div>
  );
}

export default ParentDashboard;
