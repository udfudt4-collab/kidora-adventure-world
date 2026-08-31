import { useState } from 'react';
import { useApp } from '@/lib/store';
import type { KidChallengeCategory, KidChallengeOpponent } from '@/lib/types';
import { CHALLENGE_CATEGORIES, KIDORA_BUDDIES } from '@/lib/challenges';
import { X, Sparkles, Trophy, Users, Flame, Shield, ArrowRight } from 'lucide-react';

interface CreateChallengeModalProps {
  onClose: () => void;
  initialCategory?: KidChallengeCategory;
}

export function CreateChallengeModal({ onClose, initialCategory }: CreateChallengeModalProps) {
  const { createKidChallenge } = useApp();

  const [category, setCategory] = useState<KidChallengeCategory>(initialCategory || 'sprint');
  const [selectedOpponent, setSelectedOpponent] = useState<KidChallengeOpponent>(KIDORA_BUDDIES[0]);
  const [streakDays, setStreakDays] = useState<number>(3);
  const [customTitle, setCustomTitle] = useState<string>('');

  const selectedCategoryObj = CHALLENGE_CATEGORIES.find((c) => c.id === category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title =
      customTitle.trim() ||
      `${selectedOpponent.name}'s ${selectedCategoryObj?.title || 'Kid'} Challenge`;

    createKidChallenge(category, title, selectedOpponent, streakDays);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-pop border border-slate-200 relative max-h-[90vh] overflow-y-auto no-scrollbar space-y-6">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center text-2xl shadow-soft">
            ⚔️
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
              Child-Safe Friendly Arena
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900 mt-0.5">
              Start a Challenge
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* STEP 1: PICK CATEGORY */}
          <div>
            <label className="block text-xs font-black font-display text-slate-800 mb-2">
              1. Choose Challenge Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CHALLENGE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`btn-press p-3 rounded-2xl border text-left flex flex-col items-start gap-1 cursor-pointer transition-all ${
                    category === cat.id
                      ? 'bg-amber-500 text-white border-amber-500 shadow-soft scale-102'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-2xl">{cat.emoji}</span>
                  <div className="text-xs font-bold leading-tight">{cat.title}</div>
                  <div
                    className={`text-[9px] font-medium leading-tight line-clamp-1 ${
                      category === cat.id ? 'text-amber-100' : 'text-slate-500'
                    }`}
                  >
                    {cat.badgeTitle}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2: PICK OPPONENT */}
          <div>
            <label className="block text-xs font-black font-display text-slate-800 mb-2 flex items-center justify-between">
              <span>2. Who Do You Want to Challenge?</span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <Shield className="w-3 h-3" /> COPPA Protected
              </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {KIDORA_BUDDIES.map((buddy) => (
                <button
                  key={buddy.id}
                  type="button"
                  onClick={() => setSelectedOpponent(buddy)}
                  className={`btn-press p-2.5 rounded-2xl border text-left flex items-center gap-2 cursor-pointer transition-all ${
                    selectedOpponent.id === buddy.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-soft'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-2xl">{buddy.avatarEmoji}</span>
                  <div className="truncate">
                    <div className="text-xs font-bold truncate">{buddy.name}</div>
                    <div
                      className={`text-[9px] font-medium uppercase ${
                        selectedOpponent.id === buddy.id ? 'text-indigo-200' : 'text-slate-400'
                      }`}
                    >
                      {buddy.type}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: STREAK DURATION */}
          <div>
            <label className="block text-xs font-black font-display text-slate-800 mb-2 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              <span>3. Challenge Streak Length</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { days: 1, label: '1 Day', sub: 'Quick Quest' },
                { days: 3, label: '3 Days 🔥', sub: 'Explorer Streak' },
                { days: 7, label: '7 Days 🏆', sub: 'Super Hero' },
              ].map((opt) => (
                <button
                  key={opt.days}
                  type="button"
                  onClick={() => setStreakDays(opt.days)}
                  className={`btn-press p-2.5 rounded-2xl border text-center cursor-pointer transition-all ${
                    streakDays === opt.days
                      ? 'bg-orange-500 text-white border-orange-500 shadow-soft'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-black font-display">{opt.label}</div>
                  <div
                    className={`text-[9px] ${
                      streakDays === opt.days ? 'text-orange-100' : 'text-slate-400'
                    }`}
                  >
                    {opt.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Optional Title */}
          <div>
            <label className="block text-xs font-black font-display text-slate-800 mb-1">
              Challenge Title (Optional)
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder={`e.g. ${selectedOpponent.name}'s ${selectedCategoryObj?.title}`}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="btn-press w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black font-display text-sm shadow-pop flex items-center justify-center gap-2 cursor-pointer transition-transform"
            >
              <span>Launch Challenge 🚀</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
