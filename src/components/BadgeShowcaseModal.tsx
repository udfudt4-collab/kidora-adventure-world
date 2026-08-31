import { useApp } from '@/lib/store';
import type { BadgeCollectible } from '@/lib/types';
import { X, Trophy, Award, Lock, Sparkles, Star } from 'lucide-react';

interface BadgeShowcaseModalProps {
  onClose: () => void;
}

export function BadgeShowcaseModal({ onClose }: BadgeShowcaseModalProps) {
  const { collectedBadges } = useApp();

  const unlockedCount = collectedBadges.filter((b) => b.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
      <div className="bg-white rounded-4xl max-w-xl w-full p-6 sm:p-7 shadow-pop border border-slate-200 relative max-h-[90vh] overflow-y-auto no-scrollbar space-y-6">
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
            🏅
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
              Collectible Badges & Achievements
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900 mt-0.5">
              Badge Showcase ({unlockedCount}/{collectedBadges.length})
            </h2>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {collectedBadges.map((badge) => {
            const rarityStyles = {
              common: 'border-slate-200 bg-slate-50',
              rare: 'border-sky-300 bg-gradient-to-br from-sky-50 to-indigo-50',
              epic: 'border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50',
              legendary: 'border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 ring-2 ring-amber-200',
            }[badge.rarity];

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-3xl border text-center space-y-2 flex flex-col justify-between transition-all ${
                  badge.unlocked
                    ? `${rarityStyles} shadow-soft hover:scale-103`
                    : 'bg-slate-100/70 border-slate-200 opacity-60'
                }`}
              >
                <div>
                  <div className="relative inline-block mb-1">
                    <span className="text-4xl block">{badge.unlocked ? badge.emoji : '🔒'}</span>
                    {badge.unlocked && (
                      <span className="absolute -top-1 -right-1 text-xs">✨</span>
                    )}
                  </div>
                  <div className="text-xs font-black font-display text-slate-900 leading-tight">
                    {badge.title}
                  </div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                    {badge.category}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-slate-600 font-medium leading-tight">
                    {badge.description}
                  </p>
                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[9px] font-bold">
                    <span className="capitalize text-amber-700">{badge.rarity}</span>
                    <span className={badge.unlocked ? 'text-emerald-600' : 'text-slate-400'}>
                      {badge.unlocked ? '✓ Unlocked' : 'Locked'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-center justify-between text-xs font-bold text-amber-950">
          <span>Complete Quests & Streaks to unlock all badges!</span>
          <span className="text-amber-600 font-black">⭐ Keep Exploring!</span>
        </div>
      </div>
    </div>
  );
}
