import { useState } from 'react';
import { generateBrainPuzzles, getDifficultyLevel, type BrainPuzzle } from '@/lib/content';
import { useVoice } from '@/lib/useVoice';
import { Volume2, Sparkles, Brain } from 'lucide-react';

interface Props {
  age: number;
  onComplete: (stars: number) => void;
}

export function BrainActivity({ age, onComplete }: Props) {
  const { speak } = useVoice();
  const [puzzles] = useState<BrainPuzzle[]>(() => {
    const level = getDifficultyLevel(age, 0.5);
    return generateBrainPuzzles(level);
  });
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const puzzle = puzzles[0];
  if (!puzzle) return null;

  const handleSpeak = () => {
    speak(`${puzzle.question}. ${puzzle.hint || ''}`, true);
  };

  const handleAnswer = (choice: string) => {
    if (showFeedback) return;
    setSelected(choice);
    setShowFeedback(true);
    const correct = choice === puzzle.answer;

    if (correct) {
      speak(`Brilliant! You solved it! The answer is ${puzzle.answer}`, true);
    } else {
      speak(`Good thinking! The correct answer was ${puzzle.answer}`, true);
    }

    setTimeout(() => {
      onComplete(correct ? 3 : 1);
    }, 1800);
  };

  return (
    <div className="bg-white rounded-4xl p-6 sm:p-7 shadow-pop border border-slate-100 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-1">
          <Brain className="w-3 h-3" />
          <span>{puzzle.category} Puzzle</span>
        </span>
        <button
          type="button"
          onClick={handleSpeak}
          className="btn-press p-2 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors cursor-pointer"
          title="Listen to riddle question"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Hero Emoji & Question */}
      <div className="text-center space-y-3">
        <div className="text-5xl sm:text-6xl animate-bounce-soft">{puzzle.emoji}</div>
        <h3 className="text-lg sm:text-xl font-display font-black text-slate-800 leading-snug">
          {puzzle.question}
        </h3>
        {puzzle.hint && !showFeedback && (
          <p className="text-xs text-slate-400 font-bold">
            💡 Hint: {puzzle.hint}
          </p>
        )}
      </div>

      {/* Answer Choices Grid */}
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {puzzle.options.map((opt) => {
          const isCorrect = opt === puzzle.answer;
          const isSelected = opt === selected;
          let btnStyle = 'bg-slate-50 hover:bg-purple-50 text-slate-700 border border-slate-200';

          if (showFeedback) {
            if (isCorrect) btnStyle = 'bg-emerald-500 text-white border-emerald-400 scale-102 shadow-soft';
            else if (isSelected) btnStyle = 'bg-rose-200 text-rose-700 border-rose-300';
            else btnStyle = 'bg-slate-50 text-slate-300 border-slate-100';
          }

          return (
            <button
              key={opt}
              type="button"
              onClick={() => handleAnswer(opt)}
              disabled={showFeedback}
              className={`btn-press min-h-[56px] p-3 rounded-2xl font-black font-display text-sm sm:text-base shadow-xs transition-all flex items-center justify-center text-center cursor-pointer ${btnStyle}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback Alert */}
      {showFeedback && (
        <div className="text-center animate-pop-in">
          {selected === puzzle.answer ? (
            <p className="text-emerald-600 font-display font-black text-base">
              🎉 Brilliant deduction! You cracked the logic riddle! ⭐⭐⭐
            </p>
          ) : (
            <p className="text-amber-600 font-display font-black text-sm">
              Good try! The answer was {puzzle.answer} 💪
            </p>
          )}
        </div>
      )}
    </div>
  );
}
