import { useState } from 'react';
import { generateScienceFacts, type ScienceFact } from '@/lib/content';

interface Props {
  age: number;
  onComplete: (stars: number) => void;
}

export function ScienceActivity({ onComplete }: Props) {
  const [facts] = useState<ScienceFact[]>(() => generateScienceFacts());
  const [phase, setPhase] = useState<'learn' | 'quiz' | 'done'>('learn');
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const fact = facts[0];
  if (!fact) return null;

  const handleAnswer = (choice: string) => {
    if (showFeedback) return;
    setSelected(choice);
    setShowFeedback(true);
    const correct = choice === fact.answer;
    setTimeout(() => {
      onComplete(correct ? 3 : 1);
    }, 1500);
  };

  if (phase === 'learn') {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-pop">
        <div className="text-center mb-4">
          <div className="text-xs font-bold text-slate-400 uppercase">Discovery Lab</div>
        </div>
        <div className="text-center mb-6">
          <div className="text-6xl mb-3 animate-float">{fact.emoji}</div>
          <h3 className="text-xl font-display font-bold text-slate-700 mb-3">{fact.title}</h3>
          <div className="bg-mint-50 rounded-2xl p-4">
            <p className="text-slate-600">{fact.fact}</p>
          </div>
        </div>
        <button
          onClick={() => setPhase('quiz')}
          className="btn-press w-full bg-mint-400 text-white font-display font-bold text-lg rounded-2xl py-4 shadow-pop"
        >
          Let's try a question! 🔬
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-pop">
      <div className="text-center mb-4">
        <div className="text-xs font-bold text-slate-400 uppercase">Quick Quiz!</div>
      </div>
      <div className="text-center mb-6">
        <div className="text-4xl mb-3">{fact.emoji}</div>
        <p className="text-lg font-display font-bold text-slate-700">{fact.question}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {fact.options.map((c) => {
          const isCorrect = c === fact.answer;
          const isSelected = c === selected;
          let cls = 'bg-mint-50 text-slate-600';
          if (showFeedback) {
            if (isCorrect) cls = 'bg-mint-400 text-white scale-105';
            else if (isSelected) cls = 'bg-rose-200 text-rose-600';
            else cls = 'bg-slate-50 text-slate-300';
          }
          return (
            <button
              key={c}
              onClick={() => handleAnswer(c)}
              className={`btn-press ${cls} rounded-2xl py-5 text-lg font-display font-bold shadow-soft transition-all`}
            >
              {c}
            </button>
          );
        })}
      </div>
      {showFeedback && (
        <div className="text-center mt-4 animate-pop-in">
          {selected === fact.answer ? (
            <p className="text-mint-600 font-display font-bold text-lg">You're a scientist! ⭐</p>
          ) : (
            <p className="text-tangerine-600 font-display font-bold text-lg">Good guess! It was {fact.answer} 💪</p>
          )}
        </div>
      )}
    </div>
  );
}
