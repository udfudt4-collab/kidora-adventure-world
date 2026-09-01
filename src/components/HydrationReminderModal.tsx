import { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { Droplets, Sparkles, X, Volume2, CheckCircle2, Clock } from 'lucide-react';
import { waterSound } from '@/lib/waterSound';

interface HydrationReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSipTaken?: () => void;
}

export function HydrationReminderModal({ isOpen, onClose, onSipTaken }: HydrationReminderModalProps) {
  const { profile, hydrationData, addWaterIntakeMl, addStars } = useApp();
  const [hasTakenSip, setHasTakenSip] = useState(false);

  const mlPerGlass = hydrationData?.mlPerGlass || 250;
  const childName = profile?.name || 'Explorer';

  useEffect(() => {
    if (isOpen) {
      setHasTakenSip(false);
      // Play gentle sound alert
      waterSound.playGlug();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTakeGlass = () => {
    waterSound.playGlug();
    addWaterIntakeMl(profile?.id || 'child-1', mlPerGlass, 'Water Reminder Sip');
    addStars(5);
    setHasTakenSip(true);
    if (onSipTaken) onSipTaken();
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleRemindLater = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-pop-in">
      <div className="bg-gradient-to-b from-sky-500 via-sky-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border-2 border-sky-300 relative overflow-hidden text-center space-y-5">
        {/* Floating Bubble Decors */}
        <div className="absolute top-2 right-4 text-3xl opacity-40 animate-float pointer-events-none">🫧</div>
        <div className="absolute bottom-4 left-3 text-4xl opacity-30 animate-float pointer-events-none" style={{ animationDelay: '1s' }}>🌊</div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Mascot & Glass Icon */}
        <div className="relative inline-block mx-auto">
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-pop mx-auto animate-bounce-soft">
            🥤
          </div>
          <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded-full shadow-xs">
            💧 +5 ⭐
          </span>
        </div>

        {/* Header Title */}
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
            Smart Water Break ⏰
          </span>
          <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
            Time for a Fresh Sip, {childName}!
          </h3>
          <p className="text-xs sm:text-sm text-sky-100 font-medium leading-relaxed">
            Drinking water keeps your brain sharp, your body fast, and fuels your learning power!
          </p>
        </div>

        {/* Action Buttons */}
        {hasTakenSip ? (
          <div className="bg-emerald-500 text-white rounded-2xl p-4 flex items-center justify-center gap-2 font-black font-display text-sm animate-pop-in shadow-soft">
            <CheckCircle2 className="h-5 w-5" />
            <span>Awesome! Logged {mlPerGlass} ml & +5 Stars! 🌟</span>
          </div>
        ) : (
          <div className="space-y-2.5 pt-1">
            <button
              type="button"
              onClick={handleTakeGlass}
              className="btn-press w-full py-3.5 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black font-display text-sm flex items-center justify-center gap-2 shadow-pop cursor-pointer transition-all"
            >
              <span>💧 I Drank 1 Glass ({mlPerGlass} ml)</span>
              <span>✨</span>
            </button>

            <button
              type="button"
              onClick={handleRemindLater}
              className="btn-press w-full py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Clock className="h-3.5 w-3.5" />
              <span>Remind me in 30 minutes</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
