import { useState, useEffect, useRef } from 'react';
import { Mascot } from '@/components/Mascot';
import { Pet } from '@/components/Pet';
import { StarCounter, StreakBadge } from '@/components/StatBadges';
import { useApp } from '@/lib/store';
import { getTodayStoryAdventure } from '@/lib/adventure';
import { getPlantStage, plantEmoji, plantStageName } from '@/lib/content';
import { useVoice } from '@/lib/useVoice';
import type { Screen } from '@/lib/types';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
}

interface FloatingElement {
  id: string;
  emoji: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export function Home({ onNavigate }: HomeProps) {
  const { profile } = useApp();
  const { speak } = useVoice();
  const adventure = getTodayStoryAdventure();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const todayDate = new Date().toISOString().slice(0, 10);
  const adventureDone = profile?.lastAdventureDate === todayDate;
  const [showAdventureBanner, setShowAdventureBanner] = useState(true);
  const [tappedObject, setTappedObject] = useState<string | null>(null);
  const [showStarBurst, setShowStarBurst] = useState(false);
  const worldRef = useRef<HTMLDivElement>(null);

  // Generate floating creatures and particles once
  const [creatures] = useState<FloatingElement[]>(() =>
    Array.from({ length: 6 }).map((_, i) => ({
      id: `c${i}`,
      emoji: ['🦋', '🐝', '🦜', '🐞', '🦢', '🌸'][i] ?? '✨',
      x: 5 + Math.random() * 85,
      y: 10 + Math.random() * 50,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 4,
    }))
  );
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
    }))
  );

  useEffect(() => {
    if (profile?.voiceEnabled) {
      speak(`${greeting}, ${profile.name}! Are you ready for an adventure?`, profile?.voiceEnabled);
    }
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!profile) return null;

  const plantStage = getPlantStage(profile.totalAdventures);
  const completedMissions = adventure.missions.filter(m => m.completed).length;

  const worldObjects: { id: string; emoji: string; label: string; x: number; y: number; size: string; screen?: Screen; locked?: boolean }[] = [
    { id: 'home', emoji: '🏠', label: 'My Home', x: 50, y: 70, size: 'text-5xl' },
    { id: 'rocket', emoji: '🚀', label: 'Space', x: 80, y: 25, size: 'text-4xl', screen: 'adventure' },
    { id: 'forest', emoji: '🌳', label: 'Jungle', x: 20, y: 30, size: 'text-5xl', screen: 'adventure' },
    { id: 'dino', emoji: '🦖', label: 'Dino Valley', x: 85, y: 55, size: 'text-4xl', screen: 'adventure' },
    { id: 'ocean', emoji: '🌊', label: 'Ocean', x: 15, y: 55, size: 'text-4xl', screen: 'adventure' },
    { id: 'castle', emoji: '🏰', label: 'Castle', x: 50, y: 18, size: 'text-4xl', screen: 'adventure' },
    { id: 'studio', emoji: '🎨', label: 'Art Studio', x: 75, y: 80, size: 'text-4xl', screen: 'create' },
    { id: 'garden', emoji: plantEmoji[plantStage], label: plantStageName[plantStage], x: 25, y: 82, size: 'text-4xl', screen: 'collections' },
  ];

  const handleObjectTap = (obj: { id: string; label: string; screen?: Screen }) => {
    setTappedObject(obj.id);
    if (profile.voiceEnabled) {
      speak(obj.label, true);
    }
    setTimeout(() => setTappedObject(null), 600);
    if (obj.screen) {
      const targetScreen = obj.screen;
      setTimeout(() => onNavigate(targetScreen), 500);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(180deg, #7dd3fc 0%, #a7f3d0 35%, #fde68a 70%, #fed7aa 100%)' }}>
      {/* Sky: Sun + Clouds */}
      <div className="absolute top-4 right-6 text-6xl animate-pulse-soft pointer-events-none">☀️</div>
      <div className="absolute top-8 left-0 w-full pointer-events-none overflow-hidden">
        <div className="text-7xl opacity-70 animate-drift" style={{ animationDuration: '50s' }}>☁️</div>
      </div>
      <div className="absolute top-24 left-0 w-full pointer-events-none overflow-hidden">
        <div className="text-5xl opacity-40 animate-drift" style={{ animationDuration: '70s', animationDelay: '8s' }}>☁️</div>
      </div>

      {/* Magical particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none text-amber-200 animate-twinkle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: '0.6rem',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          ✦
        </div>
      ))}

      {/* Floating creatures */}
      {creatures.map((c) => (
        <div
          key={c.id}
          className="absolute pointer-events-none animate-float"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            fontSize: '1.5rem',
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          {c.emoji}
        </div>
      ))}

      {/* Ground / hills */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none">
        <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none">
          <ellipse cx="80" cy="200" rx="120" ry="80" fill="#86efac" opacity="0.6" />
          <ellipse cx="320" cy="200" rx="140" ry="90" fill="#6ee7b7" opacity="0.5" />
          <ellipse cx="200" cy="220" rx="200" ry="100" fill="#4ade80" opacity="0.4" />
        </svg>
      </div>

      {/* Top HUD */}
      <div className="relative z-20 flex items-center justify-between px-4 pt-4 max-w-lg mx-auto">
        <div className="flex gap-2">
          <div
            onClick={() => {
              setShowStarBurst(true);
              setTimeout(() => setShowStarBurst(false), 1200);
            }}
            className="cursor-pointer"
          >
            <StarCounter count={profile.stars} />
          </div>
          <StreakBadge streak={profile.streak} />
        </div>
        <button
          onClick={() => onNavigate('parent')}
          className="btn-press bg-white/70 backdrop-blur-sm rounded-full w-11 h-11 flex items-center justify-center shadow-soft text-xl"
        >
          👨‍👩‍👧
        </button>
      </div>

      {/* Greeting */}
      <div className="relative z-20 text-center mt-2 max-w-lg mx-auto">
        <h1 className="text-2xl font-display font-extrabold text-white text-stroke-white drop-shadow-lg">
          {greeting}, {profile.name}! 🌈
        </h1>
      </div>

      {/* World Scene */}
      <div ref={worldRef} className="relative z-10 min-h-[60vh] max-w-lg mx-auto">
        {/* Interactive world objects */}
        {worldObjects.map((obj) => (
          <button
            key={obj.id}
            onClick={() => handleObjectTap(obj)}
            className={`absolute btn-press flex flex-col items-center gap-0.5 transition-all ${tappedObject === obj.id ? 'scale-125' : ''}`}
            style={{
              left: `${obj.x}%`,
              top: `${obj.y}%`,
              transform: `translate(-50%, -50%) ${tappedObject === obj.id ? 'scale(1.2)' : ''}`,
            }}
          >
            <div className={`${obj.size} animate-float`} style={{ animationDelay: `${Math.random() * 2}s`, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' }}>
              {obj.emoji}
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-bold text-slate-600 font-display whitespace-nowrap shadow-soft">
              {obj.label}
            </div>
            {tappedObject === obj.id && (
              <div className="absolute -top-6 text-2xl animate-pop-in">✨</div>
            )}
          </button>
        ))}

        {/* Character + Pet in the world */}
        <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 flex items-end gap-2 z-15">
          <Mascot avatar={profile.avatar} size={90} expression="happy" />
          <div className="mb-2">
            <Pet pet={profile.pet} size={44} mood="happy" animate={false} />
          </div>
        </div>

        {/* Garden items placed by child */}
        {profile.gardenItems.length > 0 && (
          <div className="absolute bottom-[15%] left-[30%] flex gap-1 flex-wrap max-w-[40%]">
            {profile.gardenItems.slice(0, 5).map((item, i) => (
              <div key={i} className="text-2xl animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Daily Adventure Banner — the dominant CTA */}
      {showAdventureBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-4 max-w-lg mx-auto">
          <div className={`rounded-4xl shadow-pop p-4 transition-all ${adventureDone ? 'bg-mint-50' : 'bg-white'}`}>
            {adventureDone ? (
              <div className="text-center">
                <div className="text-3xl mb-1">🎉</div>
                <div className="font-display font-bold text-mint-600 text-lg">Adventure Complete!</div>
                <p className="text-sm text-slate-400 mt-1">Come back tomorrow for a new adventure!</p>
                <button onClick={() => setShowAdventureBanner(false)} className="text-xs text-slate-300 mt-2">Dismiss</button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-4xl animate-bounce-soft">{adventure.storyCharacterEmoji}</div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-sun-500 uppercase">Today's Adventure</div>
                    <div className="text-lg font-display font-bold text-slate-700">{adventure.storyTitle}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mb-3">{adventure.storyIntro}</p>
                {completedMissions > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                      <span>{completedMissions} / {adventure.missions.length} missions</span>
                      <span>{Math.round((completedMissions / adventure.missions.length) * 100)}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-sun-400 rounded-full transition-all duration-500" style={{ width: `${(completedMissions / adventure.missions.length) * 100}%` }} />
                    </div>
                  </div>
                )}
                <button
                  onClick={() => onNavigate('adventure')}
                  className="btn-press w-full bg-gradient-to-r from-sun-400 to-tangerine-400 text-white font-display font-bold text-lg rounded-2xl py-4 shadow-pop"
                >
                  {completedMissions > 0 ? 'Continue Adventure! 🚀' : 'Start Adventure! 🚀'}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Star burst effect */}
      {showStarBurst && (
        <div className="fixed inset-0 pointer-events-none z-40">
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
