import { useState } from 'react';
import { useApp } from '@/lib/store';
import type { Screen, KidChallenge, KidChallengeCategory } from '@/lib/types';
import { CHALLENGE_CATEGORIES } from '@/lib/challenges';
import { ChallengePlayModal } from '@/components/ChallengePlayModal';
import { CreateChallengeModal } from '@/components/CreateChallengeModal';
import {
  Trophy,
  Flame,
  Plus,
  Play,
  Mail,
  CheckCircle2,
  Sparkles,
  Shield,
  Star,
  Award,
  Users,
  Zap,
} from 'lucide-react';

interface ChallengesProps {
  onNavigate: (screen: Screen) => void;
}

type TabType = 'active' | 'invitations' | 'completed';

export function Challenges({ onNavigate }: ChallengesProps) {
  const {
    kidChallenges,
    categoryPoints,
    acceptKidChallenge,
    profile,
  } = useApp();

  const [activeTab, setActiveTab] = useState<TabType>('active');
  const [playingChallenge, setPlayingChallenge] = useState<KidChallenge | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [selectedInitialCat, setSelectedInitialCat] = useState<KidChallengeCategory | undefined>(undefined);

  const activeList = kidChallenges.filter((c) => c.status === 'active');
  const invitationsList = kidChallenges.filter((c) => c.status === 'invitation');
  const completedList = kidChallenges.filter((c) => c.status === 'completed');

  const handleStartWithCategory = (catId: KidChallengeCategory) => {
    setSelectedInitialCat(catId);
    setIsCreateModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-sky-50 to-emerald-50 pb-24 font-body">
      {/* 1. TOP HEADER HERO BANNER */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white pt-8 pb-12 px-4 sm:px-6 relative overflow-hidden shadow-soft">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider">
              <Shield className="w-3 h-3" /> Child-Safe & Supervised Friends Arena
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white flex items-center gap-2.5">
              <span>Kid Challenges</span>
              <span className="text-3xl">⚔️</span>
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
              Challenge friends and buddies to fun movement sprints, brain battles, kindness ripples, and habit streaks!
            </p>
          </div>

          {/* Quick Create Challenge CTA */}
          <button
            type="button"
            onClick={() => {
              setSelectedInitialCat(undefined);
              setIsCreateModalOpen(true);
            }}
            className="btn-press px-6 py-4 rounded-3xl bg-white text-slate-900 font-black font-display text-sm shadow-pop flex items-center gap-2 cursor-pointer transition-transform shrink-0"
          >
            <span className="text-xl">🚀</span>
            <span>+ Challenge a Friend</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 space-y-8 relative z-20">
        {/* 2. DIVERSE ACHIEVEMENT BADGES BAR */}
        <div className="bg-white rounded-3xl p-5 shadow-soft border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black font-display uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Your Achievement Badges & Points</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-bold">
              Celebrate all types of greatness!
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Active Hero', emoji: '🏃', pts: categoryPoints.activeHero, color: 'bg-amber-50 text-amber-900 border-amber-200' },
              { label: 'Brain Master', emoji: '🧠', pts: categoryPoints.brainMaster, color: 'bg-sky-50 text-sky-900 border-sky-200' },
              { label: 'Creative Star', emoji: '🎨', pts: categoryPoints.creativeStar, color: 'bg-pink-50 text-pink-900 border-pink-200' },
              { label: 'Kindness Champ', emoji: '💚', pts: categoryPoints.kindnessChampion, color: 'bg-emerald-50 text-emerald-900 border-emerald-200' },
              { label: 'Healthy Hero', emoji: '💧', pts: categoryPoints.healthyHero, color: 'bg-cyan-50 text-cyan-900 border-cyan-200' },
              { label: 'Adventure Star', emoji: '🌟', pts: categoryPoints.adventureMaster, color: 'bg-purple-50 text-purple-900 border-purple-200' },
            ].map((badge, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl border text-center space-y-1 shadow-2xs ${badge.color}`}
              >
                <div className="text-2xl">{badge.emoji}</div>
                <div className="text-[10px] font-black uppercase tracking-wider truncate">
                  {badge.label}
                </div>
                <div className="text-base font-black font-display">{badge.pts} pts</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. 6 CHALLENGE CATEGORY QUICK LAUNCHERS */}
        <div className="space-y-3">
          <h3 className="text-base font-black font-display text-slate-900 flex items-center gap-2">
            <span>Explore Challenge Types</span>
            <span className="text-xs text-slate-400 font-bold">(Tap to Start)</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CHALLENGE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleStartWithCategory(cat.id)}
                className="btn-press bg-white hover:bg-slate-50 p-4 rounded-3xl border border-slate-200/80 shadow-soft text-left flex flex-col justify-between gap-3 cursor-pointer transition-all hover:border-amber-300"
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 text-white flex items-center justify-center text-xl shadow-2xs">
                  {cat.emoji}
                </div>
                <div>
                  <div className="text-xs font-black font-display text-slate-900 leading-snug">
                    {cat.title}
                  </div>
                  <div className="text-[9px] text-slate-500 font-medium leading-tight mt-0.5 line-clamp-2">
                    {cat.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 4. MAIN TABS: ACTIVE | INVITATIONS | COMPLETED */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('active')}
                className={`btn-press px-4 py-2 rounded-2xl text-xs font-black font-display transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'active'
                    ? 'bg-slate-900 text-white shadow-soft'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Active Challenges</span>
                <span className="bg-amber-400 text-slate-900 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                  {activeList.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('invitations')}
                className={`btn-press px-4 py-2 rounded-2xl text-xs font-black font-display transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'invitations'
                    ? 'bg-slate-900 text-white shadow-soft'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>Invitations</span>
                {invitationsList.length > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black animate-pulse">
                    {invitationsList.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('completed')}
                className={`btn-press px-4 py-2 rounded-2xl text-xs font-black font-display transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'completed'
                    ? 'bg-slate-900 text-white shadow-soft'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Completed</span>
                <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                  {completedList.length}
                </span>
              </button>
            </div>
          </div>

          {/* TAB 1: ACTIVE CHALLENGES */}
          {activeTab === 'active' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeList.length === 0 ? (
                <div className="col-span-full bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
                  <span className="text-4xl">🌟</span>
                  <h4 className="text-base font-black font-display text-slate-800">
                    No Active Challenges Right Now
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Challenge a friend or one of our friendly Kidora buddies like Maya or Arun!
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(true)}
                    className="btn-press px-5 py-2.5 rounded-2xl bg-amber-500 text-white font-bold text-xs cursor-pointer shadow-soft"
                  >
                    Start a Challenge Now
                  </button>
                </div>
              ) : (
                activeList.map((ch) => (
                  <div
                    key={ch.id}
                    className="bg-white rounded-3xl p-6 shadow-soft border border-slate-200/80 space-y-4 hover:border-amber-400 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{ch.emoji}</span>
                          <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                            {ch.badgeReward}
                          </span>
                        </div>

                        <div className="text-xs font-bold text-slate-500 flex items-center gap-1">
                          <span>vs {ch.opponent.name}</span>
                          <span className="text-base">{ch.opponent.avatarEmoji}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-base font-black font-display text-slate-900">
                          {ch.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {ch.description}
                        </p>
                      </div>

                      {/* Streak Dots */}
                      {ch.streakDays > 1 && (
                        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3 flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-950 flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                            <span>Day {ch.currentDay} of {ch.streakDays}</span>
                          </span>

                          <div className="flex items-center gap-1.5">
                            {ch.dayCompleted.map((done, idx) => (
                              <span
                                key={idx}
                                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${
                                  done
                                    ? 'bg-emerald-500 text-white'
                                    : idx + 1 === ch.currentDay
                                    ? 'bg-amber-400 text-slate-900 border border-amber-500'
                                    : 'bg-slate-200 text-slate-400'
                                }`}
                              >
                                {done ? '✓' : `D${idx + 1}`}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setPlayingChallenge(ch)}
                      className="btn-press w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black font-display text-xs shadow-pop flex items-center justify-center gap-2 cursor-pointer transition-transform"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Play Today's Challenge (+{ch.pointsReward} Pts)</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: INVITATIONS */}
          {activeTab === 'invitations' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {invitationsList.length === 0 ? (
                <div className="col-span-full bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-2">
                  <span className="text-4xl">📨</span>
                  <h4 className="text-base font-black font-display text-slate-800">
                    No Pending Invitations
                  </h4>
                  <p className="text-xs text-slate-500">
                    When friends or challenge buddies invite you, their challenges appear here!
                  </p>
                </div>
              ) : (
                invitationsList.map((ch) => (
                  <div
                    key={ch.id}
                    className="bg-white rounded-3xl p-6 shadow-soft border-2 border-sky-300 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-sky-100 text-sky-800 px-3 py-1 rounded-full animate-pulse">
                          Incoming Challenge 📨
                        </span>
                        <span className="text-xs font-black text-amber-600">
                          +{ch.pointsReward} Pts
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-3xl shrink-0">
                          {ch.opponent.avatarEmoji}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-500">
                            {ch.opponent.name} challenged you!
                          </div>
                          <h4 className="text-base font-black font-display text-slate-900">
                            {ch.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600">{ch.description}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        acceptKidChallenge(ch.id);
                        setActiveTab('active');
                      }}
                      className="btn-press w-full py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black font-display text-xs shadow-pop flex items-center justify-center gap-2 cursor-pointer transition-transform"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Accept Challenge & Play</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: COMPLETED */}
          {activeTab === 'completed' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedList.length === 0 ? (
                <div className="col-span-full bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-2">
                  <span className="text-4xl">🏅</span>
                  <h4 className="text-base font-black font-display text-slate-800">
                    No Completed Challenges Yet
                  </h4>
                  <p className="text-xs text-slate-500">
                    Complete your daily active challenges to earn badges and achievement points!
                  </p>
                </div>
              ) : (
                completedList.map((ch) => (
                  <div
                    key={ch.id}
                    className="bg-white rounded-3xl p-6 shadow-soft border border-emerald-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{ch.emoji}</span>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                          Completed ✓
                        </span>
                      </div>
                      <span className="text-xl">{ch.reactionEmoji || '👏'}</span>
                    </div>

                    <div>
                      <h4 className="text-base font-black font-display text-slate-900">
                        {ch.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        vs {ch.opponent.name} {ch.opponent.avatarEmoji} • Won{' '}
                        <strong>{ch.badgeReward}</strong> (+{ch.pointsReward} Pts)
                      </p>
                    </div>

                    <div className="text-[10px] text-slate-400 font-bold pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span>Streak: {ch.streakDays} Days</span>
                      <span>Verified Child-Safe ✓</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* PLAY MODAL */}
      {playingChallenge && (
        <ChallengePlayModal
          challenge={playingChallenge}
          onClose={() => setPlayingChallenge(null)}
        />
      )}

      {/* CREATE MODAL */}
      {isCreateModalOpen && (
        <CreateChallengeModal
          initialCategory={selectedInitialCat}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  );
}
