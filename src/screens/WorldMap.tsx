import { useState } from 'react';
import { useApp } from '@/lib/store';
import { getStoryAdventure, type StoryAdventure } from '@/lib/adventure';
import type { Screen, Theme } from '@/lib/types';

interface WorldProps {
  onNavigate: (screen: Screen) => void;
}

interface WorldLocation {
  theme: Theme;
  name: string;
  emoji: string;
  x: number;
  y: number;
  bgGradient: string;
  decorations: string[];
}

const locations: WorldLocation[] = [
  { theme: 'castle', name: 'Fantasy Castle', emoji: '🏰', x: 50, y: 15, bgGradient: 'from-berry-300 to-grape-400', decorations: ['👑', '💎', '✨'] },
  { theme: 'jungle', name: 'Magical Forest', emoji: '🌳', x: 18, y: 35, bgGradient: 'from-mint-300 to-mint-500', decorations: ['🦜', '🌺', '🦋'] },
  { theme: 'space', name: 'Space Station', emoji: '🚀', x: 82, y: 35, bgGradient: 'from-grape-400 to-slate-700', decorations: ['⭐', '🪐', '🌙'] },
  { theme: 'dinosaurs', name: 'Dino Valley', emoji: '🦖', x: 82, y: 62, bgGradient: 'from-tangerine-300 to-tangerine-500', decorations: ['🦴', '🌋', '🥚'] },
  { theme: 'ocean', name: 'Ocean World', emoji: '🌊', x: 18, y: 62, bgGradient: 'from-sky-300 to-sky-500', decorations: ['🐠', '🐙', '🐚'] },
  { theme: 'science', name: 'Science Lab', emoji: '🔬', x: 50, y: 85, bgGradient: 'from-mint-300 to-sky-400', decorations: ['🧪', '⚙️', '💡'] },
];

export function WorldMap({ onNavigate }: WorldProps) {
  const { profile, unlocks } = useApp();
  const [selected, setSelected] = useState<WorldLocation | null>(null);
  const [showAdventurePreview, setShowAdventurePreview] = useState<StoryAdventure | null>(null);

  const unlockedBadges = new Set(unlocks.filter(u => u.category === 'badge').map(u => u.key));
  const totalUnlocked = unlockedBadges.size;

  const handleLocationTap = (loc: WorldLocation) => {
    setSelected(loc);
    const adv = getStoryAdventure(loc.theme);
    setShowAdventurePreview(adv);
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(180deg, #c4b5fd 0%, #7dd3fc 30%, #a7f3d0 60%, #fde68a 100%)' }}>
      {/* Floating clouds */}
      <div className="absolute top-6 left-0 w-full pointer-events-none overflow-hidden">
        <div className="text-6xl opacity-50 animate-drift" style={{ animationDuration: '60s' }}>☁️</div>
      </div>
      <div className="absolute top-16 left-0 w-full pointer-events-none overflow-hidden">
        <div className="text-4xl opacity-30 animate-drift" style={{ animationDuration: '80s', animationDelay: '10s' }}>☁️</div>
      </div>

      {/* Magical particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="absolute text-amber-200 animate-twinkle pointer-events-none" style={{
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          fontSize: '0.5rem', animationDelay: `${Math.random() * 4}s`,
        }}>✦</div>
      ))}

      <div className="relative z-10 min-h-screen px-4 py-4 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="btn-press bg-white/70 backdrop-blur-sm rounded-full w-11 h-11 flex items-center justify-center shadow-soft text-xl"
          >
            ←
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-display font-extrabold text-white text-stroke-white drop-shadow-lg">
              Adventure World
            </h1>
            <p className="text-xs text-white/80 font-display font-bold">Tap a world to explore! 🗺️</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-soft">
            <span className="text-sm font-display font-bold text-slate-600">{totalUnlocked}/{locations.length}</span>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="relative bg-white/20 backdrop-blur-sm rounded-4xl p-4 mb-4" style={{ height: '440px' }}>
          {/* Path lines (SVG) */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <path d="M50,15 L18,35 L18,62 L50,85 L82,62 L82,35 Z" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" fill="none" opacity="0.4" />
          </svg>

          {/* Center home marker */}
          <button
            onClick={() => onNavigate('home')}
            className="absolute btn-press flex flex-col items-center"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <div className="text-4xl animate-float" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))' }}>🏠</div>
            <div className="bg-white/70 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-bold text-slate-600 font-display">Home</div>
          </button>

          {/* World locations */}
          {locations.map((loc) => {
            const isUnlocked = totalUnlocked > 0 || profile?.totalAdventures !== 0;
            return (
              <button
                key={loc.theme}
                onClick={() => handleLocationTap(loc)}
                className="absolute btn-press flex flex-col items-center gap-1"
                style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className={`bg-gradient-to-br ${loc.bgGradient} rounded-3xl p-3 shadow-pop ${isUnlocked ? '' : 'opacity-60 grayscale'}`}>
                  <div className="text-4xl animate-float" style={{ animationDelay: `${Math.random() * 2}s`, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                    {loc.emoji}
                  </div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-bold text-slate-600 font-display whitespace-nowrap shadow-soft">
                  {loc.name}
                </div>
                {!isUnlocked && <div className="text-xs">🔒</div>}
              </button>
            );
          })}
        </div>

        {/* Adventure Preview when a location is tapped */}
        {showAdventurePreview && selected && (
          <div className="bg-white/90 backdrop-blur-md rounded-4xl p-5 shadow-pop animate-pop-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-4xl animate-float">{showAdventurePreview.storyCharacterEmoji}</div>
              <div className="flex-1">
                <div className="text-xs font-bold text-sun-500 uppercase">{selected.name}</div>
                <div className="text-lg font-display font-bold text-slate-700">{showAdventurePreview.storyTitle}</div>
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-4">{showAdventurePreview.storyIntro}</p>
            <button
              onClick={() => onNavigate('adventure')}
              className="btn-press w-full bg-gradient-to-r from-sun-400 to-tangerine-400 text-white font-display font-bold text-lg rounded-2xl py-3.5 shadow-pop"
            >
              Start This Adventure! 🚀
            </button>
            <button
              onClick={() => { setSelected(null); setShowAdventurePreview(null); }}
              className="btn-press w-full text-sm text-slate-400 mt-2"
            >
              Close
            </button>
          </div>
        )}

        {/* Progress */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-4 shadow-soft mt-4">
          <div className="text-sm font-display font-bold text-slate-700 mb-2">Worlds Discovered</div>
          <div className="flex gap-1">
            {locations.map((w) => (
              <div key={w.theme} className="flex-1 h-2.5 rounded-full bg-mint-400" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
