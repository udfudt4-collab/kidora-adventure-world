import { useState } from 'react';
import { getTodayMystery } from '@/lib/mystery';
import { useVoice } from '@/lib/useVoice';
import { Confetti } from './Confetti';
import { Companion } from './Companion';
import { X, Sparkles, CheckCircle2, AlertCircle, Award } from 'lucide-react';

interface DailyMysteryModalProps {
  isOpen: boolean;
  onClose: () => void;
  childName: string;
  isAlreadySolvedToday: boolean;
  onSolveMystery: (mysteryId: string, stars: number, collectibleId: string, worldItem: string) => void;
}

export function DailyMysteryModal({
  isOpen,
  onClose,
  childName,
  isAlreadySolvedToday,
  onSolveMystery,
}: DailyMysteryModalProps) {
  const { speak } = useVoice();
  const mystery = getTodayMystery();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isCompleted, setIsCompleted] = useState(isAlreadySolvedToday);

  if (!isOpen) return null;

  const currentClue = mystery.clues[currentStep];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (option === currentClue.correctAnswer) {
      setFeedback('correct');
      speak('That is right! Great detective work!', true);
      setTimeout(() => {
        setFeedback('idle');
        setSelectedOption(null);
        if (currentStep < mystery.clues.length - 1) {
          setCurrentStep((prev) => prev + 1);
        } else {
          setIsCompleted(true);
          onSolveMystery(mystery.id, mystery.rewardStars, mystery.rewardCollectible.id, mystery.worldGrowItem);
        }
      }, 1000);
    } else {
      setFeedback('wrong');
      speak('Oops, not quite! Try another clue.', true);
      setTimeout(() => {
        setFeedback('idle');
        setSelectedOption(null);
      }, 900);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-fade-in select-none">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 rounded-4xl shadow-2xl border-4 border-amber-400 overflow-hidden flex flex-col max-h-[90vh] text-white">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-6 py-4 flex items-center justify-between text-white shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/30 rounded-2xl flex items-center justify-center text-2xl border-2 border-white/40">
              🔎
            </div>
            <div>
              <h2 className="text-xl font-black font-display tracking-tight flex items-center gap-1.5">
                Daily Mystery Mission
              </h2>
              <p className="text-xs font-bold text-amber-100">
                The Mystery of Kidora
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
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {isCompleted ? (
            <div className="text-center py-6 space-y-4 animate-pop-in">
              <Confetti show={true} />
              <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-amber-400 to-orange-400 rounded-3xl flex items-center justify-center text-5xl shadow-pop border-2 border-amber-200">
                {mystery.emoji}
              </div>
              <div>
                <span className="bg-emerald-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">
                  Mystery Solved Today! 🎉
                </span>
                <h3 className="text-2xl font-black font-display text-white mt-2">
                  {mystery.title}
                </h3>
                <p className="text-xs text-slate-300 font-medium max-w-sm mx-auto mt-2 leading-relaxed">
                  Brilliant deduction, Detective {childName}! You cracked all clues and restored harmony to Kidora!
                </p>
              </div>

              {/* Rewards Box */}
              <div className="bg-white/10 rounded-3xl p-4 border border-amber-400/40 text-left space-y-3 max-w-md mx-auto">
                <div className="text-xs font-black uppercase text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" /> Rewards Unlocked
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700">
                    <div className="text-2xl mb-1">⭐</div>
                    <div className="font-black text-amber-400">+{mystery.rewardStars} XP</div>
                    <div className="text-[10px] text-slate-400">Explorer Stars</div>
                  </div>
                  <div className="bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700">
                    <div className="text-2xl mb-1">{mystery.rewardCollectible.emoji}</div>
                    <div className="font-black text-amber-400 line-clamp-1">{mystery.rewardCollectible.title}</div>
                    <div className="text-[10px] text-slate-400">Backpack Relic</div>
                  </div>
                  <div className="bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700">
                    <div className="text-2xl mb-1">🌱</div>
                    <div className="font-black text-emerald-400 line-clamp-1">{mystery.worldGrowItem}</div>
                    <div className="text-[10px] text-slate-400">World Sprout</div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="btn-press px-8 py-3.5 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 hover:scale-105 transition-transform text-white font-black font-display text-sm rounded-2xl shadow-pop cursor-pointer"
              >
                Back to Living World
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-pop-in">
              {/* Mystery Story Banner */}
              <div className="bg-slate-800/90 rounded-3xl p-4 border border-amber-300/30 flex items-start gap-3">
                <Companion emotion="thinking" childName={childName} size={60} showDialogue={false} />
                <div className="flex-1">
                  <div className="text-[11px] font-black uppercase text-amber-400 flex items-center gap-1">
                    <span>🕵️ Step {currentStep + 1} of {mystery.clues.length}</span>
                  </div>
                  <h3 className="text-base font-black font-display text-white mt-0.5">
                    {mystery.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mt-1 leading-relaxed">
                    {mystery.storyPrompt}
                  </p>
                </div>
              </div>

              {/* Step Progress Tracker */}
              <div className="flex items-center gap-2 px-1">
                {mystery.clues.map((clue, idx) => (
                  <div
                    key={clue.id}
                    className={`flex-1 h-2 rounded-full transition-all ${
                      idx < currentStep
                        ? 'bg-emerald-400'
                        : idx === currentStep
                        ? 'bg-amber-400 animate-pulse-soft'
                        : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              {/* Current Clue Card */}
              <div className="bg-white text-slate-900 rounded-3xl p-5 shadow-pop border-2 border-amber-300 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-black uppercase text-amber-600 flex items-center gap-1.5">
                    <span className="text-xl">{currentClue.emoji}</span> Clue #{currentStep + 1}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    💡 Hint: {currentClue.hint}
                  </span>
                </div>

                <div className="text-base font-black font-display text-slate-900 text-center py-2">
                  {currentClue.question}
                </div>

                {/* Clue Options */}
                <div className="space-y-2.5">
                  {currentClue.options?.map((option) => {
                    const isSelected = selectedOption === option;
                    let btnStyle = 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-800';
                    if (isSelected) {
                      if (feedback === 'correct') {
                        btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 scale-102';
                      } else if (feedback === 'wrong') {
                        btnStyle = 'bg-rose-100 border-rose-500 text-rose-900 scale-98';
                      }
                    }

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleOptionSelect(option)}
                        disabled={feedback !== 'idle'}
                        className={`btn-press w-full p-4 rounded-2xl border-2 font-display font-black text-sm text-left flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {isSelected && feedback === 'correct' && (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 animate-pop-in" />
                        )}
                        {isSelected && feedback === 'wrong' && (
                          <AlertCircle className="h-5 w-5 text-rose-600 animate-pop-in" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
