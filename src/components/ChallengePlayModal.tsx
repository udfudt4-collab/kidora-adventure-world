import { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import type { KidChallenge, KidChallengeTask } from '@/lib/types';
import { CHALLENGE_CATEGORIES } from '@/lib/challenges';
import {
  X,
  Sparkles,
  CheckCircle2,
  Trophy,
  Play,
  RotateCcw,
  Star,
  Award,
  Heart,
  Flame,
  ThumbsUp,
} from 'lucide-react';

interface ChallengePlayModalProps {
  challenge: KidChallenge;
  onClose: () => void;
}

export function ChallengePlayModal({ challenge, onClose }: ChallengePlayModalProps) {
  const { completeKidChallengeTask, completeKidChallengeDay, addStars } = useApp();

  const [tasks, setTasks] = useState<KidChallengeTask[]>(challenge.tasks);
  const [selectedReaction, setSelectedReaction] = useState<string>('👏');
  const [isCompletedToday, setIsCompletedToday] = useState<boolean>(false);

  // Sprint Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(20);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Brain Battle Mini Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number | null>>({ 0: null, 1: null, 2: null });

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const catObj = CHALLENGE_CATEGORIES.find((c) => c.id === challenge.category);

  const handleToggleTask = (taskId: string) => {
    completeKidChallengeTask(challenge.id, taskId);
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t))
    );
  };

  const handleFinishDay = () => {
    completeKidChallengeDay(challenge.id, selectedReaction);
    addStars(challenge.pointsReward);
    setIsCompletedToday(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const allTasksDone = tasks.every((t) => t.done);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-pop border border-slate-200 relative max-h-[90vh] overflow-y-auto no-scrollbar space-y-5">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Opponent & Streak */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center text-3xl shadow-soft">
            {challenge.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                {catObj?.title}
              </span>
              <span className="text-xs font-bold text-slate-500">
                vs {challenge.opponent.name} {challenge.opponent.avatarEmoji}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900 mt-0.5">
              {challenge.title}
            </h2>
          </div>
        </div>

        {/* Streak Progress Dots (Day 1, 2, 3...) */}
        {challenge.streakDays > 1 && (
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between">
            <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{challenge.streakDays}-Day Challenge Streak:</span>
            </div>
            <div className="flex items-center gap-2">
              {challenge.dayCompleted.map((done, idx) => {
                const dayNum = idx + 1;
                const isCurrent = dayNum === challenge.currentDay;
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-center w-7 h-7 rounded-xl text-xs font-black transition-all ${
                      done
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : isCurrent
                        ? 'bg-amber-400 text-slate-900 border-2 border-amber-500 ring-2 ring-amber-200'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {done ? '✓' : `D${dayNum}`}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Success Banner if finished */}
        {isCompletedToday && (
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-2xl flex items-center gap-3 animate-pop-in">
            <Trophy className="w-8 h-8 text-amber-300 shrink-0" />
            <div>
              <div className="font-black font-display text-sm">
                Awesome Job! Challenge Completed! 🎉
              </div>
              <div className="text-xs text-emerald-100">
                +{challenge.pointsReward} Points awarded to {catObj?.badgeTitle}!
              </div>
            </div>
          </div>
        )}

        {/* SPECIFIC INTERACTIVE PLAY PANELS */}

        {/* 1. ADVENTURE SPRINT TIMER */}
        {challenge.category === 'sprint' && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200 text-center space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-amber-800">
              ⏱️ Active Movement Timer
            </div>
            <div className="text-4xl font-black font-display text-slate-900">
              00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
            </div>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="btn-press px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xs flex items-center gap-1 cursor-pointer shadow-soft"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isTimerRunning ? 'Pause' : 'Start 20s Balance / Sprint'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(20);
                }}
                className="btn-press px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. BRAIN BATTLE MINI-QUIZ */}
        {challenge.category === 'brain' && (
          <div className="space-y-3 bg-sky-50/80 rounded-2xl p-4 border border-sky-200">
            <div className="text-xs font-black uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
              <span>🧠</span> 2-Minute Quick Brain Challenge
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-white p-3 rounded-xl border border-sky-100">
                <p className="font-bold text-slate-800 mb-2">Q1: What is 7 + 5?</p>
                <div className="flex gap-2">
                  {[10, 12, 14].map((ans, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQuizAnswers({ ...quizAnswers, 0: ans })}
                      className={`btn-press flex-1 py-1.5 rounded-lg font-bold border text-center cursor-pointer transition-all ${
                        quizAnswers[0] === ans
                          ? ans === 12
                            ? 'bg-emerald-500 text-white border-emerald-500'
                            : 'bg-rose-500 text-white border-rose-500'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {ans}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-sky-100">
                <p className="font-bold text-slate-800 mb-2">Q2: Complete pattern: 🍎 🍌 🍎 🍌 ?</p>
                <div className="flex gap-2">
                  {['🍎', '🍇', '🍌'].map((emoji, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQuizAnswers({ ...quizAnswers, 1: idx })}
                      className={`btn-press flex-1 py-1.5 rounded-lg font-bold border text-center cursor-pointer transition-all ${
                        quizAnswers[1] === idx
                          ? emoji === '🍎'
                            ? 'bg-emerald-500 text-white border-emerald-500'
                            : 'bg-rose-500 text-white border-rose-500'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. CREATIVE REACTION PICKER */}
        {challenge.category === 'creative' && (
          <div className="bg-pink-50/80 rounded-2xl p-4 border border-pink-200 space-y-2 text-center">
            <div className="text-xs font-black uppercase tracking-wider text-pink-900">
              🎨 Send a Fun Reaction to {challenge.opponent.name}!
            </div>
            <div className="flex items-center justify-center gap-3">
              {[
                { emoji: '👏', label: 'Bravo!' },
                { emoji: '💖', label: 'Love it!' },
                { emoji: '🌟', label: 'Stunning!' },
                { emoji: '🔥', label: 'Epic!' },
              ].map((r) => (
                <button
                  key={r.emoji}
                  type="button"
                  onClick={() => setSelectedReaction(r.emoji)}
                  className={`btn-press p-2.5 rounded-2xl border text-xl flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    selectedReaction === r.emoji
                      ? 'bg-pink-500 text-white border-pink-500 shadow-soft scale-110'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span>{r.emoji}</span>
                  <span className="text-[9px] font-bold">{r.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. KINDNESS RIPPLES BANNER */}
        {challenge.category === 'kindness' && (
          <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200 flex items-center gap-3">
            <Heart className="w-8 h-8 text-emerald-500 fill-emerald-500 shrink-0" />
            <div>
              <div className="text-xs font-black font-display text-emerald-950">
                Kindness Ripple Effect 💚
              </div>
              <p className="text-[11px] text-emerald-800 font-medium leading-relaxed">
                When you share, help, or give a kind compliment, your actions bring joy to everyone around you!
              </p>
            </div>
          </div>
        )}

        {/* Tasks Checklist */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black font-display text-slate-700 uppercase tracking-wider">
              Today's Challenge Steps
            </h4>
            <span className="text-xs font-bold text-slate-400">
              {tasks.filter((t) => t.done).length} / {tasks.length} Done
            </span>
          </div>

          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleToggleTask(task.id)}
                className={`btn-press p-3.5 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  task.done
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{task.emoji || '⭐'}</span>
                  <span className={`text-xs font-bold ${task.done ? 'line-through opacity-75' : ''}`}>
                    {task.text}
                  </span>
                </div>

                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-black transition-colors ${
                    task.done
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-slate-300 text-transparent'
                  }`}
                >
                  ✓
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleFinishDay}
            disabled={!allTasksDone || isCompletedToday}
            className={`btn-press w-full py-4 rounded-2xl font-black font-display text-sm flex items-center justify-center gap-2 shadow-pop transition-all ${
              allTasksDone && !isCompletedToday
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span>Complete Today's Challenge (+{challenge.pointsReward} Pts)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
