import { useState } from 'react';
import { generateWordProblems, getDifficultyLevel, type WordProblem } from '@/lib/content';

interface Props {
  age: number;
  onComplete: (stars: number) => void;
}

export function WordsActivity({ age, onComplete }: Props) {
  const [problems] = useState<WordProblem[]>(() => {
    const level = getDifficultyLevel(age, 0.5);
    return generateWordProblems(level);
  });
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const problem = problems[idx];
  if (!problem) return null;

  const wordDisplay = problem.word.split('').map((letter) =>
    letter === problem.missingLetter ? '_' : letter
  ).join(' ');

  const handleAnswer = (choice: string) => {
    if (showFeedback) return;
    setSelected(choice);
    setShowFeedback(true);
    const correct = choice === problem.missingLetter;
    if (correct) setCorrectCount(c => c + 1);

    setTimeout(() => {
      if (idx < problems.length - 1) {
        setIdx(idx + 1);
        setSelected(null);
        setShowFeedback(false);
      } else {
        const stars = correctCount + (correct ? 1 : 0);
        onComplete(Math.max(1, Math.round((stars / problems.length) * 3)));
      }
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-pop">
      <div className="text-center mb-4">
        <div className="text-xs font-bold text-slate-400 uppercase">Word {idx + 1} of {problems.length}</div>
      </div>
      <div className="text-center mb-6">
        <div className="text-6xl mb-3">{problem.emoji}</div>
        <p className="text-sm text-slate-500 mb-2">{problem.hint}</p>
        <div className="text-3xl font-display font-extrabold text-slate-700 tracking-widest">
          {wordDisplay}
        </div>
      </div>
      <p className="text-center text-sm font-bold text-slate-400 mb-3">Which letter is missing?</p>
      <div className="grid grid-cols-4 gap-2">
        {problem.options.map((c) => {
          const isCorrect = c === problem.missingLetter;
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
              className={`btn-press ${cls} rounded-2xl py-5 text-2xl font-display font-bold shadow-soft transition-all`}
            >
              {c}
            </button>
          );
        })}
      </div>
      {showFeedback && (
        <div className="text-center mt-4 animate-pop-in">
          {selected === problem.missingLetter ? (
            <p className="text-mint-600 font-display font-bold text-lg">Yes! That's right! ⭐</p>
          ) : (
            <p className="text-tangerine-600 font-display font-bold text-lg">Almost! It was "{problem.missingLetter}" 💪</p>
          )}
        </div>
      )}
    </div>
  );
}
