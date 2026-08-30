import { useState } from 'react';
import { getTodayRealWorldMission } from '@/lib/realWorld';
import { useVoice } from '@/lib/useVoice';
import { Confetti } from './Confetti';
import { Companion } from './Companion';
import { X, Sparkles, CheckCircle2, Award, HeartHandshake } from 'lucide-react';

interface RealWorldMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  childName: string;
  isCompleted: boolean;
  onComplete: (missionId: string, stars: number) => void;
}

export function RealWorldMissionModal({
  isOpen,
  onClose,
  childName,
  isCompleted: initialCompleted,
  onComplete,
}: RealWorldMissionModalProps) {
  const { speak } = useVoice();
  const mission = getTodayRealWorldMission();
  const [completed, setCompleted] = useState(initialCompleted);
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>([false, false, false]);

  if (!isOpen) return null;

  const handleToggleStep = (index: number) => {
    const updated = [...checkedSteps];
    updated[index] = !updated[index];
    setCheckedSteps(updated);

    if (updated.every(Boolean)) {
      setCompleted(true);
      speak('Hooray! You completed your real-world exploration mission!', true);
      onComplete(mission.id, mission.starsReward);
    }
  };

  const handleQuickFinish = () => {
    setCompleted(true);
    speak('Awesome job, Explorer! You explored the real world!', true);
    onComplete(mission.id, mission.starsReward);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in select-none">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-emerald-50 via-white to-teal-50 rounded-4xl shadow-2xl border-4 border-emerald-400 overflow-hidden flex flex-col max-h-[90vh] text-slate-900">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 px-6 py-4 flex items-center justify-between text-white shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/30 rounded-2xl flex items-center justify-center text-2xl border-2 border-white/40">
              🧩
            </div>
            <div>
              <h2 className="text-xl font-black font-display tracking-tight flex items-center gap-1.5">
                Real-World Explorer Mission
              </h2>
              <p className="text-xs font-bold text-emerald-100">
                Screen-Free Hands-On Adventure
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn-press w-9 h-9 bg-black/20 hover:bg-black/30 rounded-full flex items-center justify-center text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {completed ? (
            <div className="text-center py-6 space-y-4 animate-pop-in">
              <Confetti show={true} />
              <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center text-5xl shadow-pop text-white border-2 border-emerald-200">
                {mission.emoji}
              </div>
              <div>
                <span className="bg-emerald-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">
                  Mission Accomplished! 🌟
                </span>
                <h3 className="text-2xl font-black font-display text-slate-900 mt-2">
                  {mission.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto mt-2 leading-relaxed">
                  Fantastic job putting down the screen and exploring your home, {childName}! You earned the <strong>{mission.badgeName}</strong> recognition!
                </p>
              </div>

              <div className="bg-emerald-100/80 rounded-2xl p-3 max-w-xs mx-auto border border-emerald-300 font-display font-black text-emerald-900 text-sm flex items-center justify-center gap-2">
                <span>⭐</span>
                <span>+{mission.starsReward} Stars Added to Your World!</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="btn-press px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:scale-105 transition-transform text-white font-black font-display text-sm rounded-2xl shadow-pop cursor-pointer"
              >
                Back to Kidora
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-pop-in">
              {/* Mission Prompt Card */}
              <div className="bg-gradient-to-b from-emerald-500 to-teal-600 text-white rounded-3xl p-5 shadow-pop text-center space-y-3 relative overflow-hidden">
                <div className="text-6xl animate-bounce-soft">{mission.emoji}</div>
                <h3 className="text-2xl font-black font-display tracking-tight">
                  {mission.title}
                </h3>
                <p className="text-sm font-bold text-emerald-50 max-w-md mx-auto leading-relaxed">
                  "{mission.prompt}"
                </p>
                <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                  <HeartHandshake className="h-3.5 w-3.5" />
                  <span>Fun to do with a parent or helper!</span>
                </div>
              </div>

              {/* Check-off Steps */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-soft space-y-2.5">
                <div className="text-xs font-black uppercase text-slate-500">Check off as you discover:</div>
                {['First discovery found! 🔎', 'Second discovery found! ✨', 'Third discovery found! 🎉'].map((label, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggleStep(idx)}
                    className={`w-full p-3 rounded-2xl border text-left font-display font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                      checkedSteps[idx]
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50/50'
                    }`}
                  >
                    <span>{label}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      checkedSteps[idx] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                    }`}>
                      {checkedSteps[idx] && <CheckCircle2 className="h-4 w-4" />}
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick complete button */}
              <button
                type="button"
                onClick={handleQuickFinish}
                className="btn-press w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black font-display text-sm rounded-2xl shadow-pop flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>I COMPLETED THIS MISSION!</span>
                <span>⭐</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
