import { useState } from 'react';
import { useApp } from '@/lib/store';
import { getStoryAdventure, type StoryAdventure } from '@/lib/adventure';
import { Companion } from '@/components/Companion';
import { ArrowLeft, Compass, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import type { Screen, Theme } from '@/lib/types';

interface WorldProps {
  onNavigate: (screen: Screen) => void;
}

interface WorldLocation {
  theme: Theme;
  name: string;
  emoji: string;
  description: string;
  x: number;
  y: number;
  bgGradient: string;
  borderColor: string;
  decorations: string[];
}

const locations: WorldLocation[] = [
  {
    theme: 'castle',
    name: 'Magic Castle',
    emoji: '🏰',
    description: 'Enchanted kingdom with glowing towers and mysterious spells.',
    x: 50,
    y: 15,
    bgGradient: 'from-purple-500 via-indigo-500 to-purple-800',
    borderColor: 'border-purple-300',
    decorations: ['👑', '💎', '✨', '🪄'],
  },
  {
    theme: 'jungle',
    name: 'Magical Forest',
    emoji: '🌳',
    description: 'Lush green jungle with exotic animals and secret treehouses.',
    x: 18,
    y: 35,
    bgGradient: 'from-emerald-400 via-green-500 to-teal-700',
    borderColor: 'border-emerald-300',
    decorations: ['🦜', '🌺', '🦋', '🐒'],
  },
  {
    theme: 'space',
    name: 'Space Port',
    emoji: '🚀',
    description: 'Cosmic orbit with twinkling stars, nebulas, and Martian rovers.',
    x: 82,
    y: 35,
    bgGradient: 'from-slate-800 via-indigo-900 to-purple-950',
    borderColor: 'border-indigo-300',
    decorations: ['⭐', '🪐', '🌙', '🤖'],
  },
  {
    theme: 'dinosaurs',
    name: 'Dino Valley',
    emoji: '🦖',
    description: 'Prehistoric valley with friendly dinosaurs, volcanoes, and giant eggs.',
    x: 82,
    y: 65,
    bgGradient: 'from-amber-500 via-orange-600 to-red-700',
    borderColor: 'border-amber-300',
    decorations: ['🦴', '🌋', '🥚', '🦕'],
  },
  {
    theme: 'ocean',
    name: 'Coral Ocean',
    emoji: '🌊',
    description: 'Sunken underwater paradise with playful dolphins, pearls, and coral reefs.',
    x: 18,
    y: 65,
    bgGradient: 'from-cyan-400 via-sky-500 to-blue-700',
    borderColor: 'border-cyan-300',
    decorations: ['🐠', '🐬', '🐚', '🐙'],
  },
  {
    theme: 'science',
    name: 'Science Lab',
    emoji: '🔬',
    description: 'Inventive discovery lab with bubbling potions, gadgets, and robots.',
    x: 50,
    y: 86,
    bgGradient: 'from-teal-400 via-emerald-500 to-sky-600',
    borderColor: 'border-teal-300',
    decorations: ['🧪', '⚙️', '💡', '🔭'],
  },
];

export function WorldMap({ onNavigate }: WorldProps) {
  const { profile, unlocks } = useApp();
  const [selected, setSelected] = useState<WorldLocation | null>(null);
  const [previewAdventure, setPreviewAdventure] = useState<StoryAdventure | null>(null);

  const unlockedBadges = new Set(unlocks.filter((u) => u.category === 'badge').map((u) => u.key));
  const totalUnlocked = unlockedBadges.size;

  const handleLocationTap = (loc: WorldLocation) => {
    setSelected(loc);
    const adv = getStoryAdventure(loc.theme);
    setPreviewAdventure(adv);
  };

  return (
    <div
      className="relative min-h-screen pb-12 font-sans select-none overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #312e81 0%, #1e1b4b 30%, #064e3b 70%, #022c22 100%)',
      }}
    >
      {/* Ambient Twinkling Stars in Map Sky */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-amber-200 animate-twinkle pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: '0.6rem',
            animationDelay: `${Math.random() * 4}s`,
          }}
        >
          ✦
        </div>
      ))}

      <div className="relative z-10 max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* Header HUD */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="btn-press bg-white/20 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center text-white shadow-soft hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-black font-display text-white flex items-center gap-1.5 justify-center drop-shadow-md">
              <Compass className="h-5 w-5 text-amber-300" />
              Kidora World Map
            </h1>
            <p className="text-[11px] font-bold text-amber-200">Tap a realm to explore!</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-white font-display shadow-soft">
            {totalUnlocked}/6 Realms
          </div>
        </div>

        {/* Interactive World Map Canvas Box */}
        <div
          className="relative bg-white/10 backdrop-blur-md rounded-4xl p-4 border-2 border-white/20 shadow-2xl"
          style={{ height: '460px' }}
        >
          {/* Constellation Connection SVG Lines */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            <path
              d="M50,15 L18,35 L18,65 L50,86 L82,65 L82,35 Z"
              stroke="#fde047"
              strokeWidth="0.6"
              strokeDasharray="2,2"
              fill="none"
              opacity="0.5"
            />
            <line x1="50" y1="50" x2="50" y2="15" stroke="#fde047" strokeWidth="0.4" strokeDasharray="1,2" opacity="0.3" />
            <line x1="50" y1="50" x2="18" y2="35" stroke="#fde047" strokeWidth="0.4" strokeDasharray="1,2" opacity="0.3" />
            <line x1="50" y1="50" x2="82" y2="35" stroke="#fde047" strokeWidth="0.4" strokeDasharray="1,2" opacity="0.3" />
            <line x1="50" y1="50" x2="18" y2="65" stroke="#fde047" strokeWidth="0.4" strokeDasharray="1,2" opacity="0.3" />
            <line x1="50" y1="50" x2="82" y2="65" stroke="#fde047" strokeWidth="0.4" strokeDasharray="1,2" opacity="0.3" />
            <line x1="50" y1="50" x2="50" y2="86" stroke="#fde047" strokeWidth="0.4" strokeDasharray="1,2" opacity="0.3" />
          </svg>

          {/* Center: Kidora Living World Home */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="absolute btn-press flex flex-col items-center z-20 group"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            title="Return to My World"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center text-3xl shadow-pop border-2 border-white animate-pulse-soft">
              🏠
            </div>
            <div className="bg-white/90 backdrop-blur-xs rounded-full px-2.5 py-0.5 text-[10px] font-black text-slate-800 font-display shadow-soft mt-1">
              Kidora Home
            </div>
          </button>

          {/* 6 Outer Realms */}
          {locations.map((loc) => {
            const isSelected = selected?.theme === loc.theme;
            return (
              <button
                key={loc.theme}
                type="button"
                onClick={() => handleLocationTap(loc)}
                className={`absolute btn-press flex flex-col items-center gap-1 z-15 transition-all duration-300 ${
                  isSelected ? 'scale-120 z-30' : 'hover:scale-110'
                }`}
                style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div
                  className={`w-13 h-13 rounded-3xl bg-gradient-to-br ${loc.bgGradient} flex items-center justify-center text-3xl shadow-pop border-2 ${
                    isSelected ? 'border-amber-300 ring-4 ring-amber-400/50' : loc.borderColor
                  }`}
                >
                  <div className="animate-float" style={{ animationDelay: `${Math.random() * 2}s` }}>
                    {loc.emoji}
                  </div>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-xs rounded-full px-2 py-0.5 text-[10px] font-bold text-white font-display whitespace-nowrap shadow-soft">
                  {loc.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Realm Preview Drawer */}
        {selected && previewAdventure && (
          <div className="bg-white rounded-4xl p-5 shadow-pop border-4 border-amber-300 animate-pop-in space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="text-4xl animate-float">{previewAdventure.storyCharacterEmoji || selected.emoji}</div>
                <div>
                  <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider font-display">
                    {selected.name}
                  </span>
                  <h2 className="text-base font-black font-display text-slate-800">
                    {previewAdventure.storyTitle}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {previewAdventure.storyIntro}
            </p>

            <button
              onClick={() => onNavigate('adventure')}
              className="btn-press w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-2xl font-black font-display text-sm shadow-pop flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Enter This Realm Adventure! 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WorldMap;
