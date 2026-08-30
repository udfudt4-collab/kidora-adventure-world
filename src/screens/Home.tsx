import { useState, useEffect } from 'react';
import { LivingWorld } from '@/components/LivingWorld';
import { StarCounter, StreakBadge } from '@/components/StatBadges';
import { useApp } from '@/lib/store';
import { getTodayStoryAdventure } from '@/lib/adventure';
import { useVoice } from '@/lib/useVoice';
import { Compass, Sparkles, Home as HomeIcon, Palette, Heart, Award, ArrowRight } from 'lucide-react';
import type { Screen } from '@/lib/types';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const { profile } = useApp();
  const { speak } = useVoice();
  const adventure = getTodayStoryAdventure();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const todayDate = new Date().toISOString().slice(0, 10);
  const adventureDone = profile?.lastAdventureDate === todayDate;
  const [showStarBurst, setShowStarBurst] = useState(false);

  useEffect(() => {
    if (profile?.voiceEnabled) {
      speak(`${greeting}, ${profile.name}! Every day is a new adventure!`, profile.voiceEnabled);
    }
  }, []);

  if (!profile) return null;

  const completedMissions = adventure.missions.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedMissions / adventure.missions.length) * 100);

  return (
    <div
      className="relative min-h-screen pb-20 font-sans select-none overflow-x-hidden"
      style={{
        background: 'linear-gradient(180deg, #f0f9ff 0%, #fdf4ff 50%, #f0fdf4 100%)',
      }}
    >
      <div className="max-w-lg mx-auto px-4 py-3 space-y-4">
        {/* ===================================================================== */}
        {/* TOP HUD BAR                                                           */}
        {/* ===================================================================== */}
        <div className="flex items-center justify-between z-30 relative pt-1">
          {/* Stars & Streak */}
          <div className="flex items-center gap-2">
            <div
              onClick={() => {
                setShowStarBurst(true);
                setTimeout(() => setShowStarBurst(false), 1200);
              }}
              className="cursor-pointer"
              title="Your stars"
            >
              <StarCounter count={profile.stars} />
            </div>
            <StreakBadge streak={profile.streak} />
          </div>

          {/* Quick World Map & Parent Area Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('world')}
              className="btn-press bg-white/90 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-soft border border-sky-100 text-xs font-black text-sky-700 font-display"
              title="Open World Map"
            >
              <Compass className="h-4 w-4 text-sky-500" />
              <span>Map 🗺️</span>
            </button>
            <button
              onClick={() => onNavigate('parent')}
              className="btn-press bg-white/90 backdrop-blur-md rounded-full w-9 h-9 flex items-center justify-center shadow-soft border border-slate-100 text-base"
              title="Parent Dashboard & Settings"
            >
              👨‍👩‍👧
            </button>
          </div>
        </div>

        {/* Greeting Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-black font-display text-slate-800 tracking-tight flex items-center justify-center gap-2">
            <span>{greeting}, {profile.name}!</span>
            <span className="text-xl animate-wiggle">👋</span>
          </h1>
          <p className="text-xs font-bold text-slate-500 mt-0.5">
            Every day is a new adventure in Kidora! 🌈
          </p>
        </div>

        {/* ===================================================================== */}
        {/* 1. LIVING INTERACTIVE WORLD                                           */}
        {/* ===================================================================== */}
        <div className="relative">
          <LivingWorld
            onNavigate={onNavigate}
            onSelectHero={() => onNavigate('my-kidora')}
          />
        </div>

        {/* ===================================================================== */}
        {/* 2. 🌟 TODAY'S ADVENTURE MAIN CTA HERO CARD                             */}
        {/* ===================================================================== */}
        <div className="relative bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 rounded-4xl p-5 shadow-pop text-white border-4 border-white/80 animate-pop-in space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl shadow-inner animate-float">
                {adventure.storyCharacterEmoji || adventure.themeEmoji}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/30 backdrop-blur-xs px-2 py-0.5 rounded-full font-display">
                  🌟 TODAY'S ADVENTURE
                </span>
                <h2 className="text-lg font-black font-display mt-0.5 leading-tight">
                  {adventure.storyTitle}
                </h2>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-black bg-white/25 backdrop-blur-xs px-2.5 py-1 rounded-full font-display">
                {completedMissions}/{adventure.missions.length} Missions
              </span>
            </div>
          </div>

          <p className="text-xs text-white/95 leading-relaxed font-medium">
            {adventure.storyIntro}
          </p>

          {/* Mission icons preview */}
          <div className="flex items-center gap-1.5 pt-1 overflow-x-auto pb-1">
            {adventure.missions.map((m, idx) => (
              <div
                key={m.id}
                className={`flex-1 py-1.5 px-1 rounded-xl text-center backdrop-blur-xs border transition-all ${
                  m.completed
                    ? 'bg-emerald-400/90 border-white text-white font-bold'
                    : 'bg-white/20 border-white/30 text-white/90'
                }`}
                title={m.title}
              >
                <div className="text-base">{m.completed ? '✅' : m.emoji}</div>
                <div className="text-[8px] font-bold truncate mt-0.5">M{idx + 1}</div>
              </div>
            ))}
          </div>

          {/* Big Glowing Action Button */}
          <button
            onClick={() => onNavigate('adventure')}
            className="btn-press w-full py-3.5 bg-white text-orange-600 rounded-2xl font-black font-display text-base shadow-pop flex items-center justify-center gap-2 hover:bg-amber-50 transition-colors"
          >
            <span>{adventureDone ? 'Play Adventure Again! 🚀' : completedMissions > 0 ? 'Continue Adventure! 🚀' : 'START ADVENTURE 🚀'}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Hub Navigation Cards */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          <button
            onClick={() => onNavigate('my-kidora')}
            className="btn-press bg-white rounded-3xl p-3 shadow-soft border border-slate-100 text-center space-y-1 hover:border-amber-300 transition-colors"
          >
            <div className="text-3xl animate-float">🏠</div>
            <div className="text-xs font-black text-slate-800 font-display">My Kidora</div>
            <div className="text-[10px] text-slate-400 font-bold">Sanctuary & Hero</div>
          </button>

          <button
            onClick={() => onNavigate('create')}
            className="btn-press bg-white rounded-3xl p-3 shadow-soft border border-slate-100 text-center space-y-1 hover:border-pink-300 transition-colors"
          >
            <div className="text-3xl animate-float" style={{ animationDelay: '0.5s' }}>🎨</div>
            <div className="text-xs font-black text-slate-800 font-display">Kidora Create</div>
            <div className="text-[10px] text-slate-400 font-bold">Living Artwork</div>
          </button>

          <button
            onClick={() => onNavigate('world')}
            className="btn-press bg-white rounded-3xl p-3 shadow-soft border border-slate-100 text-center space-y-1 hover:border-sky-300 transition-colors"
          >
            <div className="text-3xl animate-float" style={{ animationDelay: '1s' }}>🗺️</div>
            <div className="text-xs font-black text-slate-800 font-display">World Map</div>
            <div className="text-[10px] text-slate-400 font-bold">6 Magic Realms</div>
          </button>
        </div>
      </div>

      {/* Star Burst Effect */}
      {showStarBurst && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl"
              style={{
                left: '50%',
                top: '50%',
                animation: `starBurst 1s ease-out forwards`,
                animationDelay: `${i * 0.05}s`,
                transform: `rotate(${i * 30}deg)`,
              }}
            >
              ⭐
            </div>
          ))}
          <style>{`
            @keyframes starBurst {
              0% { transform: rotate(0deg) translateY(0); opacity: 1; }
              100% { transform: rotate(0deg) translateY(-200px); opacity: 0; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}

export default Home;
