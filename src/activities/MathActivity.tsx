import { useState } from 'react';
import { generateMathProblems, getDifficultyLevel, type MathProblem } from '@/lib/content';

interface Props {
  age: number;
  onComplete: (stars: number) => void;
}

export function MathActivity({ age, onComplete }: Props) {
  const [problems] = useState<MathProblem[]>(() => {
    const level = getDifficultyLevel(age, 0.5);
    return generateMathProblems(age, level);
  });
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const problem = problems[idx];
  if (!problem) return null;

  const handleAnswer = (choice: number) => {
    if (showFeedback) return;
    setSelected(choice);
    setShowFeedback(true);
    const correct = choice === problem.answer;
    const newCorrect = correct ? correctCount + 1 : correctCount;
    setCorrectCount(newCorrect);

    setTimeout(() => {
      if (idx < problems.length - 1) {
        setIdx(idx + 1);
        setSelected(null);
        setShowFeedback(false);
      } else {
        const stars = newCorrect;
        onComplete(Math.max(1, Math.round((stars / problems.length) * 3)));
      }
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-pop">
      <div className="text-center mb-4">
        <div className="text-xs font-bold text-slate-400 uppercase">Problem {idx + 1} of {problems.length}</div>
      </div>
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">{problem.emoji}</div>
        <p className="text-lg font-display font-bold text-slate-700">{problem.scenario}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {problem.choices.map((c) => {
          const isCorrect = c === problem.answer;
          const isSelected = c === selected;
          let cls = 'bg-sky-50 text-slate-600';
          if (showFeedback) {
            if (isCorrect) cls = 'bg-mint-400 text-white scale-105';
            else if (isSelected) cls = 'bg-rose-200 text-rose-600';
            else cls = 'bg-slate-50 text-slate-300';
          }
          return (
            <button
              key={c}
              onClick={() => handleAnswer(c)}
              className={`btn-press ${cls} rounded-2xl py-6 text-2xl font-display font-bold shadow-soft transition-all`}
            >
              {c}
            </button>
          );
        })}
      </div>
      {showFeedback && (
        <div className="text-center mt-4 animate-pop-in">
          {selected === problem.answer ? (
            <p className="text-mint-600 font-display font-bold text-lg">Amazing! You got it! ⭐</p>
          ) : (
            <p className="text-tangerine-600 font-display font-bold text-lg">Almost! The answer was {problem.answer} 💪</p>
          )}
        </div>
      )}
    </div>
  );
}
