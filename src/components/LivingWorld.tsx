import { useState, useEffect } from 'react';
import { HeroCharacter } from './HeroCharacter';
import { Pet } from './Pet';
import { Companion } from './Companion';
import { useApp } from '@/lib/store';
import { plantEmoji, getPlantStage, plantStageName } from '@/lib/content';
import { useVoice } from '@/lib/useVoice';
import type { Screen } from '@/lib/types';

interface LivingWorldProps {
  onNavigate: (screen: Screen) => void;
  onSelectHero?: () => void;
}

export function LivingWorld({ onNavigate, onSelectHero }: LivingWorldProps) {
  const { profile } = useApp();
  const { speak } = useVoice();
  const [tappedId, setTappedId] = useState<string | null>(null);
  const [sparkleCoord, setSparkleCoord] = useState<{ x: number; y: number } | null>(null);

  const hour = new Date().getHours();
  const isNight = hour >= 20 || hour < 6;
  const isSunset = (hour >= 17 && hour < 20) || (hour >= 6 && hour < 8);

  const plantStage = getPlantStage(profile?.totalAdventures ?? 0);
  const gardenEmoji = plantEmoji[plantStage];
  const gardenStageText = plantStageName[plantStage];

  // Floating ambient wildlife
  const [butterflies] = useState(() =>
    Array.from({ length: 4 }).map((_, i) => ({
      id: `bf-${i}`,
      emoji: ['🦋', '🐝', '🕊️', '🌸'][i] ?? '🦋',
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 45,
      speed: 6 + Math.random() * 6,
      delay: Math.random() * 3,
    }))
  );

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!profile) return null;

  const handleLandmarkTap = (id: string, label: string, targetScreen: Screen, x?: number, y?: number) => {
    setTappedId(id);
    if (x && y) {
      setSparkleCoord({ x, y });
      setTimeout(() => setSparkleCoord(null), 1000);
    }
    if (profile.voiceEnabled) {
      speak(label, true);
    }
    setTimeout(() => {
      setTappedId(null);
      onNavigate(targetScreen);
    }, 450);
  };

  const skyBackground = isNight
    ? 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #064e3b 100%)'
    : isSunset
    ? 'linear-gradient(180deg, #fb923c 0%, #f472b6 35%, #a78bfa 70%, #86efac 100%)'
    : 'linear-gradient(180deg, #7dd3fc 0%, #a7f3d0 35%, #fde68a 70%, #fed7aa 100%)';

  return (
    <div
      className="relative w-full min-h-[580px] overflow-hidden rounded-4xl shadow-xl transition-all duration-700 select-none border-4 border-white/60"
      style={{ background: skyBackground }}
    >
      {/* Sun / Moon & Clouds */}
      {isNight ? (
        <div className="absolute top-5 right-8 text-5xl animate-float pointer-events-none drop-shadow-lg">
          🌙
        </div>
      ) : (
        <div className="absolute top-4 right-7 text-6xl animate-pulse-soft pointer-events-none drop-shadow-md">
          ☀️
        </div>
      )}

      {/* Rainbow in daytime */}
      {!isNight && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-40 text-7xl pointer-events-none animate-pulse-soft">
          🌈
        </div>
      )}

      {/* Drifting Fluffy Clouds */}
      <div className="absolute top-4 left-0 w-full pointer-events-none overflow-hidden">
        <div className="text-7xl opacity-75 animate-drift" style={{ animationDuration: '60s' }}>
          ☁️
        </div>
      </div>
      <div className="absolute top-20 left-0 w-full pointer-events-none overflow-hidden">
        <div className="text-5xl opacity-40 animate-drift" style={{ animationDuration: '85s', animationDelay: '8s' }}>
          ☁️
        </div>
      </div>

      {/* Floating Ambient Wildlife */}
      {butterflies.map((b) => (
        <div
          key={b.id}
          className="absolute pointer-events-none animate-float text-2xl z-10"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            animationDuration: `${b.speed}s`,
            animationDelay: `${b.delay}s`,
          }}
        >
          {b.emoji}
        </div>
      ))}

      {/* Natural Rolling Hills SVG */}
      <div className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none z-5">
        <svg viewBox="0 0 500 200" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,120 Q120,40 250,110 T500,80 L500,200 L0,200 Z" fill="#86efac" opacity="0.85" />
          <path d="M0,140 Q180,90 340,150 T500,120 L500,200 L0,200 Z" fill="#4ade80" opacity="0.9" />
          <path d="M0,165 Q250,130 500,165 L500,200 L0,200 Z" fill="#22c55e" opacity="0.95" />
        </svg>
      </div>

      {/* Sparkle burst upon landmark tap */}
      {sparkleCoord && (
        <div
          className="absolute z-40 pointer-events-none text-3xl animate-pop-in"
          style={{ left: `${sparkleCoord.x}%`, top: `${sparkleCoord.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          ✨🌟✨
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🗺️ INTERACTIVE LANDMARKS                                                  */}
      {/* ========================================================================= */}

      {/* 1. 🏠 MY HOME (Opens My Kidora Sanctuary) */}
      <button
        type="button"
        onClick={(e) => handleLandmarkTap('home', 'My Home', 'my-kidora', 48, 48)}
        className={`absolute btn-press flex flex-col items-center z-15 transition-transform ${
          tappedId === 'home' ? 'scale-125' : 'hover:scale-105'
        }`}
        style={{ left: '48%', top: '46%', transform: 'translate(-50%, -50%)' }}
        title="Tap to enter My Home!"
      >
        <div className="text-6xl animate-float drop-shadow-xl">🏠</div>
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-0.5 text-xs font-black text-slate-800 font-display shadow-pop border border-amber-300">
          My Home
        </div>
      </button>

      {/* 2. 🌳 LIVING GARDEN & VISIBLE PROGRESSION */}
      <button
        type="button"
        onClick={(e) => handleLandmarkTap('garden', 'Living Garden', 'my-kidora', 20, 72)}
        className={`absolute btn-press flex flex-col items-center z-15 transition-transform ${
          tappedId === 'garden' ? 'scale-125' : 'hover:scale-105'
        }`}
        style={{ left: '20%', top: '70%', transform: 'translate(-50%, -50%)' }}
        title={`Your garden is at stage: ${gardenStageText}`}
      >
        <div className="text-5xl animate-float drop-shadow-lg" style={{ animationDelay: '0.6s' }}>
          {gardenEmoji}
        </div>
        <div className="bg-emerald-500 text-white rounded-full px-2.5 py-0.5 text-[11px] font-black font-display shadow-soft">
          {gardenStageText}
        </div>
      </button>

      {/* 3. 🚀 SPACE STATION */}
      <button
        type="button"
        onClick={() => handleLandmarkTap('space', 'Space Realm', 'world', 82, 18)}
        className={`absolute btn-press flex flex-col items-center z-15 transition-transform ${
          tappedId === 'space' ? 'scale-125' : 'hover:scale-105'
        }`}
        style={{ left: '82%', top: '20%', transform: 'translate(-50%, -50%)' }}
        title="Explore Deep Space"
      >
        <div className="text-5xl animate-float drop-shadow-lg" style={{ animationDelay: '1.2s' }}>
          🚀
        </div>
        <div className="bg-white/85 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-[10px] font-bold text-slate-700 font-display shadow-soft">
          Space Port
        </div>
      </button>

      {/* 4. 🦖 DINO VALLEY */}
      <button
        type="button"
        onClick={() => handleLandmarkTap('dino', 'Dino Valley', 'world', 86, 52)}
        className={`absolute btn-press flex flex-col items-center z-15 transition-transform ${
          tappedId === 'dino' ? 'scale-125' : 'hover:scale-105'
        }`}
        style={{ left: '86%', top: '50%', transform: 'translate(-50%, -50%)' }}
        title="Explore Dino Valley"
      >
        <div className="text-5xl animate-float drop-shadow-lg" style={{ animationDelay: '1.8s' }}>
          🦖
        </div>
        <div className="bg-white/85 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-[10px] font-bold text-slate-700 font-display shadow-soft">
          Dino Valley
        </div>
      </button>

      {/* 5. 🌊 CORAL OCEAN */}
      <button
        type="button"
        onClick={() => handleLandmarkTap('ocean', 'Coral Ocean', 'world', 14, 48)}
        className={`absolute btn-press flex flex-col items-center z-15 transition-transform ${
          tappedId === 'ocean' ? 'scale-125' : 'hover:scale-105'
        }`}
        style={{ left: '14%', top: '48%', transform: 'translate(-50%, -50%)' }}
        title="Dive into Ocean World"
      >
        <div className="text-5xl animate-float drop-shadow-lg" style={{ animationDelay: '0.8s' }}>
          🌊
        </div>
        <div className="bg-white/85 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-[10px] font-bold text-slate-700 font-display shadow-soft">
          Ocean World
        </div>
      </button>

      {/* 6. 🏰 MAGIC CASTLE */}
      <button
        type="button"
        onClick={() => handleLandmarkTap('castle', 'Magic Castle', 'world', 48, 16)}
        className={`absolute btn-press flex flex-col items-center z-15 transition-transform ${
          tappedId === 'castle' ? 'scale-125' : 'hover:scale-105'
        }`}
        style={{ left: '48%', top: '16%', transform: 'translate(-50%, -50%)' }}
        title="Enter the Magic Castle"
      >
        <div className="text-5xl animate-float drop-shadow-lg" style={{ animationDelay: '0.3s' }}>
          🏰
        </div>
        <div className="bg-white/85 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-[10px] font-bold text-slate-700 font-display shadow-soft">
          Magic Castle
        </div>
      </button>

      {/* 7. 🎨 KIDORA CREATE STUDIO */}
      <button
        type="button"
        onClick={() => handleLandmarkTap('create', 'Create Studio', 'create', 76, 74)}
        className={`absolute btn-press flex flex-col items-center z-15 transition-transform ${
          tappedId === 'create' ? 'scale-125' : 'hover:scale-105'
        }`}
        style={{ left: '78%', top: '72%', transform: 'translate(-50%, -50%)' }}
        title="Create & Paint New World Items!"
      >
        <div className="text-5xl animate-float drop-shadow-lg" style={{ animationDelay: '1.5s' }}>
          🎨
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-amber-500 text-white rounded-full px-2.5 py-0.5 text-[11px] font-black font-display shadow-soft">
          Art Studio
        </div>
      </button>

      {/* ========================================================================= */}
      {/* 🌟 PLACED CREATIONS (CHILD'S CREATIONS COME ALIVE IN THE WORLD)            */}
      {/* ========================================================================= */}
      {profile.worldItems &&
        profile.worldItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              if (profile.voiceEnabled) speak(`Look at your ${item.title}!`, true);
            }}
            className="absolute z-12 btn-press flex flex-col items-center group"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `translate(-50%, -50%) scale(${item.scale ?? 1})`,
            }}
            title={item.title}
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-12 h-12 rounded-xl object-contain drop-shadow-md animate-float"
              />
            ) : (
              <div className="text-4xl animate-float">{item.emoji}</div>
            )}
            <div className="bg-white/80 backdrop-blur-xs rounded-full px-2 py-0.2 text-[9px] font-bold text-slate-700 shadow-xs opacity-0 group-hover:opacity-100 transition-opacity">
              {item.title}
            </div>
          </button>
        ))}

      {/* ========================================================================= */}
      {/* 🧒 HERO + 🐾 PET + 🦊 COMPANION KIDO                                      */}
      {/* ========================================================================= */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-3 flex items-end justify-center gap-3 z-20"
      >
        {/* Companion Kido on the left */}
        <div className="mb-2">
          <Companion
            emotion="welcoming"
            childName={profile.name}
            size={72}
            showDialogue={false}
            voiceEnabled={profile.voiceEnabled}
          />
        </div>

        {/* Child Hero in Center */}
        <div
          onClick={onSelectHero}
          className="cursor-pointer"
          title="Tap to customize your hero!"
        >
          <HeroCharacter
            avatar={profile.avatar}
            size={110}
            name={profile.name}
            showNameTag={true}
            pose="idle"
          />
        </div>

        {/* Pet on the Right */}
        <div
          onClick={() => onNavigate('pets')}
          className="cursor-pointer mb-2"
          title="Tap to play with your pet!"
        >
          <Pet pet={profile.pet} size={48} mood="happy" animate={true} />
        </div>
      </div>
    </div>
  );
}
