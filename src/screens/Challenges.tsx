import { useState } from 'react';
import { useApp } from '@/lib/store';
import type { Screen, KidChallenge, KidChallengeCategory, ThemedQuest } from '@/lib/types';
import { CHALLENGE_CATEGORIES } from '@/lib/challenges';
import { ChallengePlayModal } from '@/components/ChallengePlayModal';
import { CreateChallengeModal } from '@/components/CreateChallengeModal';
import { ThemedQuestPlayModal } from '@/components/ThemedQuestPlayModal';
import { MysteryChestModal } from '@/components/MysteryChestModal';
import { BadgeShowcaseModal } from '@/components/BadgeShowcaseModal';
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
  Gift,
  Compass,
  TrendingUp,
  Clock,
} from 'lucide-react';

interface ChallengesProps {
  onNavigate: (screen: Screen) => void;
}

type MainTab = 'quests' | 'battles' | 'teams' | 'records' | 'badges';

export function Challenges({ onNavigate }: ChallengesProps) {
  const {
    kidChallenges,
    categoryPoints,
    acceptKidChallenge,
    themedQuests,
    teamChallenges,
    personalRecords,
    collectedBadges,
    unopenedChests,
    contributeToTeamChallenge,
    updatePersonalRecord,
  } = useApp();

  const [activeTab, setActiveTab] = useState<MainTab>('quests');
  const [playingChallenge, setPlayingChallenge] = useState<KidChallenge | null>(null);
  const [playingQuest, setPlayingQuest] = useState<ThemedQuest | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isChestModalOpen, setIsChestModalOpen] = useState<boolean>(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState<boolean>(false);

  const activeBattles = kidChallenges.filter((c) => c.status === 'active');
  const invitationsList = kidChallenges.filter((c) => c.status === 'invitation');

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-gradient-to-b from-amber-50 via-sky-50 to-emerald-50 pb-24 font-body select-none">
      {/* 1. TOP HEADER HERO BANNER */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white pt-8 pb-14 px-4 sm:px-6 relative overflow-hidden shadow-soft">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider">
              <Shield className="w-3 h-3" /> Child-Safe • Cooperative • Self-Motivating
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white flex items-center gap-2.5">
              <span>Kidora Challenge Arena</span>
              <span className="text-3xl">⚔️</span>
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
              Conquer themed quests with friends, challenge buddies, beat your personal score, and open mystery treasure chests!
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => setIsChestModalOpen(true)}
              className="btn-press px-4 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black font-display text-xs shadow-soft flex items-center gap-2 cursor-pointer transition-transform"
            >
              <Gift className="w-4 h-4" />
              <span>🎁 Treasure Vault ({unopenedChests})</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-press px-5 py-3.5 rounded-2xl bg-white text-slate-900 font-black font-display text-xs shadow-pop flex items-center gap-2 cursor-pointer transition-transform"
            >
              <span>🚀 + Challenge Friend</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 space-y-8 relative z-20">
        {/* 2. DIVERSE ACHIEVEMENT BADGES BAR */}
        <div className="bg-white rounded-3xl p-5 shadow-soft border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black font-display uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Your Achievement Badges & Points</span>
            </h3>
            <button
              type="button"
              onClick={() => setIsBadgeModalOpen(true)}
              className="text-xs text-amber-600 font-bold hover:underline cursor-pointer"
            >
              View Badge Showcase →
            </button>
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

        {/* 3. SUB NAVIGATION TABS */}
        <div className="space-y-5">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-slate-200 pb-3">
            {[
              { id: 'quests' as MainTab, label: 'Epic Themed Quests', emoji: '🌋' },
              { id: 'battles' as MainTab, label: `1-on-1 Battles ${invitationsList.length > 0 ? `(${invitationsList.length})` : ''}`, emoji: '⚔️' },
              { id: 'teams' as MainTab, label: 'Team Co-op (500 pts)', emoji: '🦁' },
              { id: 'records' as MainTab, label: 'Beat Your Score 🔥', emoji: '📈' },
              { id: 'badges' as MainTab, label: 'Badge Collection', emoji: '🏅' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`btn-press px-4 py-2.5 rounded-2xl text-xs font-black font-display transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-soft scale-102'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ======================================================== */}
          {/* TAB 1: EPIC THEMED QUESTS */}
          {/* ======================================================== */}
          {activeTab === 'quests' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black font-display text-slate-900">
                    Active Themed Quests (24-Hour Co-op)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Complete 4 diverse missions with your quest buddy to cool lava, navigate stars, and earn mystery chests!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {themedQuests.map((quest) => (
                  <div
                    key={quest.id}
                    className="bg-white rounded-3xl p-6 shadow-soft border border-slate-200/80 space-y-4 flex flex-col justify-between hover:border-amber-300 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                          {quest.theme.toUpperCase()} QUEST
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          <span>{quest.deadlineHours}h Remaining</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{quest.emoji}</div>
                        <div>
                          <h4 className="text-lg font-black font-display text-slate-900">
                            {quest.title}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {quest.subtitle} ({quest.companionName} {quest.companionEmoji})
                          </p>
                        </div>
                      </div>

                      {/* 4 Task mini previews */}
                      <div className="space-y-1.5 pt-1">
                        {quest.tasks.map((task) => (
                          <div
                            key={task.id}
                            className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                              task.done
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span className="flex items-center gap-1.5 font-bold">
                              <span>{task.emoji}</span>
                              <span className={task.done ? 'line-through opacity-75' : ''}>
                                {task.text}
                              </span>
                            </span>
                            <span className="text-[10px] font-black text-amber-600">
                              +{task.points} pts
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPlayingQuest(quest)}
                      className="btn-press w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black font-display text-xs shadow-pop flex items-center justify-center gap-2 cursor-pointer transition-transform"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>{quest.completed ? 'View Conquered Quest ✓' : 'Play Quest (+100 Pts + 🎁 Chest)'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: 1-ON-1 BATTLES & INVITATIONS */}
          {/* ======================================================== */}
          {activeTab === 'battles' && (
            <div className="space-y-6">
              {/* Invitations section if any */}
              {invitationsList.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black font-display uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-sky-500" />
                    <span>Incoming Battle Invitations ({invitationsList.length})</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {invitationsList.map((ch) => (
                      <div
                        key={ch.id}
                        className="bg-white rounded-3xl p-5 shadow-soft border-2 border-sky-300 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-3xl shrink-0">
                            {ch.opponent.avatarEmoji}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-500">
                              {ch.opponent.name} challenged you!
                            </div>
                            <h5 className="text-sm font-black font-display text-slate-900">
                              {ch.title}
                            </h5>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => acceptKidChallenge(ch.id)}
                          className="btn-press px-4 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs cursor-pointer shadow-soft shrink-0"
                        >
                          Accept ✓
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Active Battles */}
              <div className="space-y-3">
                <h4 className="text-xs font-black font-display uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Active Battles & Streaks ({activeBattles.length})</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeBattles.map((ch) => (
                    <div
                      key={ch.id}
                      className="bg-white rounded-3xl p-6 shadow-soft border border-slate-200/80 space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{ch.emoji}</span>
                          <span className="text-xs font-bold text-slate-500">
                            vs {ch.opponent.name} {ch.opponent.avatarEmoji}
                          </span>
                        </div>
                        <h4 className="text-base font-black font-display text-slate-900">
                          {ch.title}
                        </h4>
                        <p className="text-xs text-slate-500">{ch.description}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setPlayingChallenge(ch)}
                        className="btn-press w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black font-display text-xs shadow-soft flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Play Battle (+{ch.pointsReward} Pts)</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: TEAM CO-OP CHALLENGES */}
          {/* ======================================================== */}
          {activeTab === 'teams' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black font-display text-slate-900">
                    🦁 Team Co-op Challenges (You + Friends)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Cooperate with your team members to reach 500 points together before time runs out!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamChallenges.map((team) => {
                  const percent = Math.min(100, Math.round((team.currentPoints / team.targetPoints) * 100));
                  return (
                    <div
                      key={team.id}
                      className="bg-white rounded-3xl p-6 shadow-soft border border-slate-200/80 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl">{team.emoji}</span>
                          <div>
                            <h4 className="text-base font-black font-display text-slate-900">
                              {team.teamName}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">
                              vs {team.opponentTeamName}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
                          {team.daysRemaining > 0 ? `${team.daysRemaining} days left` : 'Completed ✓'}
                        </span>
                      </div>

                      {/* Team Progress Bar */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-black font-display text-slate-800">
                          <span>Team Goal: 500 Points</span>
                          <span className="text-emerald-600">{team.currentPoints} / 500 ({percent}%)</span>
                        </div>
                        <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${percent}%` }}
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                          />
                        </div>
                      </div>

                      {/* Team Member Avatars & Contributions */}
                      <div className="bg-slate-50 rounded-2xl p-3 space-y-2">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                          Team Contributions
                        </span>
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          {team.members.map((m) => (
                            <div key={m.id} className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                              <span className="text-lg">{m.avatarEmoji}</span>
                              <span>{m.name}:</span>
                              <span className="text-amber-600 font-black">{m.pointsContributed} pts</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => contributeToTeamChallenge(team.id, 25)}
                        disabled={team.completed}
                        className={`btn-press w-full py-3.5 rounded-2xl font-black font-display text-xs shadow-soft flex items-center justify-center gap-2 ${
                          team.completed
                            ? 'bg-emerald-500 text-white cursor-default'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                        }`}
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>{team.completed ? '500 Points Reached! 🎉' : '+ Contribute 25 Points to Team'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: BEAT YOUR OWN SCORE (SOLO MASTERY) */}
          {/* ======================================================== */}
          {activeTab === 'records' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black font-display text-slate-900">
                    🔥 Beat Your Own Score (Personal Growth)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Challenge yourself to break your personal best scores across skills!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Object.values(personalRecords).map((rec) => {
                  const isNewBest = rec.todayScore >= rec.bestScore;
                  return (
                    <div
                      key={rec.category}
                      className="bg-white rounded-3xl p-5 shadow-soft border border-slate-200/80 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl">{rec.emoji}</span>
                          {isNewBest && (
                            <span className="bg-orange-100 text-orange-800 text-[10px] font-black px-2.5 py-0.5 rounded-full animate-pulse">
                              Personal Best! 🔥
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="text-sm font-black font-display text-slate-900">
                            {rec.categoryTitle}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-bold">
                            Last played: {rec.lastPlayed}
                          </span>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-3 flex items-center justify-around text-center">
                          <div>
                            <div className="text-[10px] font-black uppercase text-slate-400">Personal Best</div>
                            <div className="text-xl font-black font-display text-amber-600">{rec.bestScore} pts</div>
                          </div>
                          <div className="w-px h-8 bg-slate-200" />
                          <div>
                            <div className="text-[10px] font-black uppercase text-slate-400">Today</div>
                            <div className="text-xl font-black font-display text-slate-800">{rec.todayScore} pts</div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => updatePersonalRecord(rec.category, rec.bestScore + 5)}
                        className="btn-press w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black font-display text-xs shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Flame className="w-3.5 h-3.5 fill-white" />
                        <span>Can you beat {rec.bestScore} pts? Play →</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: BADGES & TREASURE VAULT */}
          {/* ======================================================== */}
          {activeTab === 'badges' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black font-display text-slate-900">
                    🏅 Badge Collection & Mystery Vault
                  </h3>
                  <p className="text-xs text-slate-500">
                    Collect all 8 badges and open mystery chests for rare accessories and titles!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsChestModalOpen(true)}
                  className="btn-press px-4 py-2 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs cursor-pointer shadow-soft flex items-center gap-1.5"
                >
                  <Gift className="w-4 h-4" />
                  <span>Open Treasure Chest ({unopenedChests})</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {collectedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-3xl border text-center space-y-2 flex flex-col justify-between ${
                      badge.unlocked
                        ? 'bg-white border-amber-300 shadow-soft'
                        : 'bg-slate-100/70 border-slate-200 opacity-60'
                    }`}
                  >
                    <div>
                      <span className="text-4xl block mb-1">{badge.unlocked ? badge.emoji : '🔒'}</span>
                      <div className="text-xs font-black font-display text-slate-900">
                        {badge.title}
                      </div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase">
                        {badge.category}
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-600 font-medium leading-tight">
                      {badge.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      {playingQuest && (
        <ThemedQuestPlayModal
          quest={playingQuest}
          onClose={() => setPlayingQuest(null)}
          onOpenChest={() => setIsChestModalOpen(true)}
        />
      )}

      {playingChallenge && (
        <ChallengePlayModal
          challenge={playingChallenge}
          onClose={() => setPlayingChallenge(null)}
        />
      )}

      {isCreateModalOpen && (
        <CreateChallengeModal
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      {isChestModalOpen && (
        <MysteryChestModal
          onClose={() => setIsChestModalOpen(false)}
        />
      )}

      {isBadgeModalOpen && (
        <BadgeShowcaseModal
          onClose={() => setIsBadgeModalOpen(false)}
        />
      )}
    </div>
  );
}
