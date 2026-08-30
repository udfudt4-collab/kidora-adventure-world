import { Sparkles, Moon, Sun } from 'lucide-react';

interface GentleTimeLimitModalProps {
  childName: string;
  minutesPlayed: number;
  onClose: () => void;
}

export function GentleTimeLimitModal({
  childName,
  minutesPlayed,
  onClose,
}: GentleTimeLimitModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="bg-gradient-to-b from-indigo-900 to-slate-900 text-white rounded-4xl shadow-pop max-w-sm w-full p-6 text-center animate-pop-in border border-indigo-700/50">
        {/* Animated Moon & Stars */}
        <div className="w-16 h-16 rounded-3xl bg-indigo-800/80 border border-indigo-600/50 text-amber-300 flex items-center justify-center mx-auto mb-4 shadow-soft animate-float">
          <Moon className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 bg-indigo-800/60 border border-indigo-600/40 text-indigo-200 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          <span>✨</span> Daily Adventure Time Complete
        </div>

        <h3 className="text-2xl font-black font-display text-white mb-2">
          Wonderful Adventure, {childName}!
        </h3>

        <p className="text-xs text-indigo-200 leading-relaxed mb-5 max-w-xs mx-auto">
          You had a fantastic {minutesPlayed}-minute learning session today! Your stars, creations, and garden are safely saved. Time to rest your eyes, explore the real world, or play with family!
        </p>

        <div className="bg-indigo-950/60 rounded-2xl p-3 border border-indigo-800/50 text-left space-y-1.5 mb-6 text-xs text-indigo-300">
          <div className="flex items-center gap-2 text-amber-300 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Kido says:</span>
          </div>
          <p className="italic">
            "Your world will be waiting right here for our next adventure tomorrow! 🌈"
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="btn-press w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 font-black font-display text-sm shadow-pop flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Save & Rest My Eyes</span>
          <span>🌿</span>
        </button>
      </div>
    </div>
  );
}
