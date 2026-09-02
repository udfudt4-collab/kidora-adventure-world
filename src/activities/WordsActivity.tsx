import { useState, useMemo } from 'react';
import { generateWordProblems, getDifficultyLevel, shuffle, type WordProblem } from '@/lib/content';
import { useVoice } from '@/lib/useVoice';
import { Sparkles, Volume2, Award, Star, CheckCircle2 } from 'lucide-react';

interface Props {
  age: number;
  onComplete: (stars: number) => void;
}

export function WordsActivity({ age, onComplete }: Props) {
  const { speak } = useVoice();
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

  // Ensure options are always shuffled uniquely per problem
  const currentOptions = useMemo(() => {
    return shuffle(problem.options);
  }, [problem]);

  const handleSpeak = () => {
    speak(`${problem.word}. ${problem.hint}`, true);
  };

  const handleAnswer = (choice: string) => {
    if (showFeedback) return;
    setSelected(choice);
    setShowFeedback(true);
    const correct = choice === problem.missingLetter;
    if (correct) {
      setCorrectCount((c) => c + 1);
      speak(`Correct! ${problem.word}!`, true);
    } else {
      speak(`Good try! The missing letter was ${problem.missingLetter}.`, true);
    }

    setTimeout(() => {
      if (idx < problems.length - 1) {
        setIdx(idx + 1);
        setSelected(null);
        setShowFeedback(false);
      } else {
        const totalScore = correctCount + (correct ? 1 : 0);
        onComplete(Math.max(1, Math.round((totalScore / problems.length) * 3)));
      }
    }, 1500);
  };

  const tierBadge = {
    beginner: { label: '🌱 3-Letter Phonics', color: 'bg-emerald-100 text-emerald-800' },
    explorer: { label: `⭐ ${problem.word.length}-Letter Word`, color: 'bg-sky-100 text-sky-800' },
    master: { label: `🚀 ${problem.word.length}-Letter Vocabulary`, color: 'bg-purple-100 text-purple-800' },
    genius: { label: `🧠 ${problem.word.length}-Letter Science Word`, color: 'bg-amber-100 text-amber-900' },
  }[problem.difficultyTier];

  // Tile dimensions adjusted by word length to fit all mobile screens on one line
  const letterLength = problem.word.length;
  const tileClass =
    letterLength >= 9
      ? 'w-7 h-10 sm:w-10 sm:h-12 text-lg sm:text-2xl rounded-xl'
      : letterLength >= 7
      ? 'w-8 h-11 sm:w-11 sm:h-13 text-xl sm:text-3xl rounded-xl'
      : 'w-10 h-12 sm:w-12 sm:h-14 text-2xl sm:text-3xl rounded-2xl';

  return (
    <div className="bg-white rounded-4xl p-5 sm:p-7 shadow-pop border border-slate-100 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${tierBadge.color}`}>
          {tierBadge.label} • {problem.category}
        </span>
        <div className="text-xs font-black text-slate-400">
          Word {idx + 1} of {problems.length}
        </div>
      </div>

      {/* Hero Emoji & Spoken Clue */}
      <div className="text-center space-y-3">
        <div className="text-6xl sm:text-7xl animate-bounce-soft">{problem.emoji}</div>
        <div className="flex items-center justify-center gap-2">
          <p className="text-sm sm:text-base font-bold text-slate-600 max-w-sm">
            {problem.hint}
          </p>
          <button
            type="button"
            onClick={handleSpeak}
            className="btn-press p-2 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors cursor-pointer shrink-0"
            title="Listen to word hint"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Word Tiles with Missing Slot */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 pt-2 overflow-x-auto no-scrollbar pb-1">
          {problem.word.split('').map((letter, letterIdx) => {
            const isMissingSlot = letterIdx === problem.missingIndex;
            return (
              <div
                key={letterIdx}
                className={`${tileClass} shrink-0 flex items-center justify-center font-display font-black transition-all shadow-xs ${
                  isMissingSlot
                    ? showFeedback
                      ? selected === problem.missingLetter
                        ? 'bg-emerald-500 text-white border-2 border-emerald-400 scale-105'
                        : 'bg-rose-100 text-rose-600 border-2 border-rose-300'
                      : 'bg-amber-100 border-3 border-dashed border-amber-400 text-amber-600 animate-pulse'
                    : 'bg-slate-100 border border-slate-200 text-slate-800'
                }`}
              >
                {isMissingSlot
                  ? showFeedback
                    ? problem.missingLetter
                    : '?'
                  : letter}
              </div>
            );
          })}
        </div>
      </div>

      {/* Options Grid */}
      <div className="space-y-2">
        <p className="text-center text-xs font-black uppercase tracking-wider text-slate-400">
          Choose the missing letter:
        </p>

        <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto">
          {currentOptions.map((opt) => {
            const isCorrect = opt === problem.missingLetter;
            const isSelected = opt === selected;
            let btnStyle = 'bg-slate-50 hover:bg-sky-50 text-slate-700 border border-slate-200';

            if (showFeedback) {
              if (isCorrect) btnStyle = 'bg-emerald-500 text-white border-emerald-400 scale-105 shadow-soft';
              else if (isSelected) btnStyle = 'bg-rose-200 text-rose-700 border-rose-300';
              else btnStyle = 'bg-slate-50 text-slate-300 border-slate-100';
            }

            return (
              <button
                key={opt}
                type="button"
                onClick={() => handleAnswer(opt)}
                disabled={showFeedback}
                className={`btn-press h-14 rounded-2xl font-black font-display text-2xl shadow-xs transition-all flex items-center justify-center cursor-pointer ${btnStyle}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Banner */}
      {showFeedback && (
        <div className="text-center animate-pop-in">
          {selected === problem.missingLetter ? (
            <p className="text-emerald-600 font-display font-black text-lg flex items-center justify-center gap-1.5">
              <span>🌟 Excellent!</span>
              <span className="font-bold text-slate-700 text-base">"{problem.word}"</span>
            </p>
          ) : (
            <p className="text-amber-600 font-display font-black text-sm">
              Almost! The word is "{problem.word}" 💪
            </p>
          )}
        </div>
      )}
    </div>
  );
}
