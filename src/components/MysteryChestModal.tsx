import { useState } from 'react';
import { useApp } from '@/lib/store';
import type { MysteryChestReward } from '@/lib/types';
import { X, Sparkles, Trophy, Award, Gift, CheckCircle2 } from 'lucide-react';

interface MysteryChestModalProps {
  onClose: () => void;
}

export function MysteryChestModal({ onClose }: MysteryChestModalProps) {
  const { unopenedChests, openMysteryChest } = useApp();

  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [openedReward, setOpenedReward] = useState<MysteryChestReward | null>(null);

  const handleOpenChest = () => {
    if (unopenedChests <= 0 || isOpening) return;
    setIsOpening(true);

    setTimeout(() => {
      const reward = openMysteryChest();
      setOpenedReward(reward);
      setIsOpening(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
      <div className="bg-gradient-to-b from-amber-500 via-orange-500 to-rose-600 rounded-4xl max-w-sm w-full p-6 sm:p-7 text-white text-center shadow-pop relative overflow-hidden space-y-5 border-2 border-amber-300">
        {/* Decorative sparkles */}
        <div className="absolute top-3 left-4 text-2xl animate-float opacity-80 pointer-events-none">✨</div>
        <div className="absolute top-6 right-6 text-2xl animate-float opacity-80 pointer-events-none" style={{ animationDelay: '1s' }}>🌟</div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-amber-100">
            Adventure Reward Vault
          </span>
          <h2 className="text-2xl font-black font-display text-white mt-1">
            Mystery Treasure Chest 🎁
          </h2>
        </div>

        {!openedReward ? (
          <div className="space-y-5 py-4">
            {/* Animated Chest */}
            <div className="relative flex justify-center items-center py-2">
              <div
                className={`text-7xl transition-transform duration-300 ${
                  isOpening ? 'animate-bounce scale-125' : 'hover:scale-110 cursor-pointer animate-float'
                }`}
                onClick={handleOpenChest}
              >
                🎁
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-amber-100 font-medium leading-relaxed">
                Unlock bonus stars, avatar accessories, and special titles!
              </p>
              <div className="text-sm font-black font-display text-white">
                You have <span className="text-amber-200 underline">{unopenedChests} Chests</span> ready to open!
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenChest}
              disabled={unopenedChests <= 0 || isOpening}
              className={`btn-press w-full py-4 rounded-2xl font-black font-display text-sm shadow-pop flex items-center justify-center gap-2 transition-transform ${
                unopenedChests > 0 && !isOpening
                  ? 'bg-white text-slate-900 hover:bg-amber-100 cursor-pointer'
                  : 'bg-white/30 text-white/60 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{isOpening ? 'Opening Chest...' : '🔓 Open Chest Now!'}</span>
            </button>
          </div>
        ) : (
          /* REWARD REVEAL PANEL */
          <div className="space-y-5 py-3 animate-pop-in">
            <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-3xl p-5 space-y-3">
              <div className="text-6xl animate-bounce-soft">{openedReward.emoji}</div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full text-amber-200">
                  {openedReward.type.toUpperCase()} UNLOCKED!
                </span>
                <h3 className="text-xl font-black font-display text-white mt-1">
                  {openedReward.label}
                </h3>
                <p className="text-xs text-amber-100 font-medium mt-0.5">
                  {openedReward.description}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {unopenedChests > 0 && (
                <button
                  type="button"
                  onClick={() => setOpenedReward(null)}
                  className="btn-press flex-1 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-black font-display text-xs cursor-pointer"
                >
                  Open Another ({unopenedChests})
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="btn-press flex-1 py-3 rounded-2xl bg-white text-slate-900 font-black font-display text-xs cursor-pointer shadow-soft"
              >
                Collect & Done ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
