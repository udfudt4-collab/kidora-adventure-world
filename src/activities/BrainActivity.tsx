import { useState } from 'react';
import { generateBrainPuzzles, getDifficultyLevel, type BrainPuzzle } from '@/lib/content';

interface Props {
  age: number;
  onComplete: (stars: number) => void;
}

export function BrainActivity({ age, onComplete }: Props) {
  const [puzzles] = useState<BrainPuzzle[]>(() => {
    const level = getDifficultyLevel(age, 0.5);
    return generateBrainPuzzles(level);
  });
  const [idx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const puzzle = puzzles[idx];
  if (!puzzle) return null;

  const handleAnswer = (choice: string) => {
    if (showFeedback) return;
    setSelected(choice);
    setShowFeedback(true);
    const correct = choice === puzzle.answer;

    setTimeout(() => {
      onComplete(correct ? 3 : 1);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-pop">
      <div className="text-center mb-4">
        <div className="text-xs font-bold text-slate-400 uppercase">Logic Puzzle</div>
      </div>
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">{puzzle.emoji}</div>
        <p className="text-lg font-display font-bold text-slate-700">{puzzle.question}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {puzzle.options.map((c) => {
          const isCorrect = c === puzzle.answer;
          const isSelected = c === selected;
          let cls = 'bg-grape-50 text-slate-600';
          if (showFeedback) {
            if (isCorrect) cls = 'bg-mint-400 text-white scale-105';
            else if (isSelected) cls = 'bg-rose-200 text-rose-600';
            else cls = 'bg-slate-50 text-slate-300';
          }
          return (
            <button
              key={c}
              onClick={() => handleAnswer(c)}
              className={`btn-press ${cls} rounded-2xl py-5 text-xl font-display font-bold shadow-soft transition-all`}
            >
              {c}
            </button>
          );
        })}
      </div>
      {showFeedback && (
        <div className="text-center mt-4 animate-pop-in">
          {selected === puzzle.answer ? (
            <p className="text-mint-600 font-display font-bold text-lg">Brilliant! You solved it! ⭐</p>
          ) : (
            <p className="text-tangerine-600 font-display font-bold text-lg">Good try! The answer was {puzzle.answer} 💪</p>
          )}
        </div>
      )}
    </div>
  );
}
