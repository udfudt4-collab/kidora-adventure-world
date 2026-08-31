import { useState } from 'react';
import { useApp } from '@/lib/store';
import type { ThemedQuest, ThemedQuestTask } from '@/lib/types';
import { X, Sparkles, Trophy, CheckCircle2, Clock, Gift, ArrowRight } from 'lucide-react';

interface ThemedQuestPlayModalProps {
  quest: ThemedQuest;
  onClose: () => void;
  onOpenChest?: () => void;
}

export function ThemedQuestPlayModal({ quest, onClose, onOpenChest }: ThemedQuestPlayModalProps) {
  const { completeThemedQuestTask, completeThemedQuest, addStars } = useApp();

  const [tasks, setTasks] = useState<ThemedQuestTask[]>(quest.tasks);
  const [isCompleted, setIsCompleted] = useState<boolean>(quest.completed);

  const handleToggleTask = (taskId: string) => {
    completeThemedQuestTask(quest.id, taskId);
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t))
    );
  };

  const handleFinishQuest = () => {
    completeThemedQuest(quest.id);
    addStars(quest.totalPoints);
    setIsCompleted(true);
  };

  const allDone = tasks.every((t) => t.done);
  const currentPoints = tasks.filter((t) => t.done).reduce((acc, t) => acc + t.points, 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
      <div className="bg-white rounded-4xl max-w-lg w-full p-6 sm:p-7 shadow-pop border border-slate-200 relative max-h-[90vh] overflow-y-auto no-scrollbar space-y-5">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Themed Hero Banner */}
        <div
          className={`bg-gradient-to-r ${quest.bannerGradient} rounded-3xl p-5 sm:p-6 text-white shadow-soft space-y-2`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white">
              24-Hour Co-op Epic Quest
            </span>
            <div className="flex items-center gap-1 text-xs font-bold bg-black/20 px-2.5 py-1 rounded-xl">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>{quest.deadlineHours}h Remaining</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <div className="text-4xl">{quest.emoji}</div>
            <div>
              <h2 className="text-2xl font-black font-display text-white tracking-tight">
                {quest.title}
              </h2>
              <p className="text-xs text-amber-100 font-medium">
                {quest.subtitle} ({quest.companionName} {quest.companionEmoji})
              </p>
            </div>
          </div>
        </div>

        {/* Points & Chest Progress Bar */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Quest Progress
            </div>
            <div className="text-lg font-black font-display text-slate-900">
              {currentPoints} / {quest.totalPoints} Points
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl shadow-2xs">
              🎁
            </div>
            <div className="text-right">
              <div className="text-xs font-black text-amber-800">Mystery Chest</div>
              <div className="text-[10px] text-slate-400 font-bold">
                {allDone ? 'Unlocked! ✓' : 'Complete 4 tasks'}
              </div>
            </div>
          </div>
        </div>

        {/* Success Banner if Completed */}
        {isCompleted && (
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl p-5 shadow-soft flex items-center justify-between gap-3 animate-pop-in">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-amber-300 shrink-0" />
              <div>
                <div className="font-black font-display text-sm sm:text-base">
                  🎉 Quest Complete!
                </div>
                <div className="text-xs text-emerald-100">
                  Earned +{quest.totalPoints} Adventure Points & Mystery Chest!
                </div>
              </div>
            </div>

            {onOpenChest && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenChest();
                }}
                className="btn-press px-4 py-2 rounded-xl bg-white text-slate-900 font-black text-xs cursor-pointer shadow-soft shrink-0"
              >
                Open Chest 🎁
              </button>
            )}
          </div>
        )}

        {/* 4 Multi-Discipline Tasks Checklist */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-black font-display text-slate-700 uppercase tracking-wider">
            Quest Checklist (Complete all 4)
          </h4>

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
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{task.emoji}</span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      {task.categoryName}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        task.done ? 'line-through opacity-75' : ''
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                    +{task.points} pts
                  </span>
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
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleFinishQuest}
            disabled={!allDone || isCompleted}
            className={`btn-press w-full py-4 rounded-2xl font-black font-display text-sm flex items-center justify-center gap-2 shadow-pop transition-all ${
              allDone && !isCompleted
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 cursor-pointer'
                : isCompleted
                ? 'bg-emerald-500 text-white cursor-default'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span>
              {isCompleted
                ? 'Quest Successfully Conquered! ✓'
                : `Complete Quest (+${quest.totalPoints} Pts + 🎁 Chest)`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
