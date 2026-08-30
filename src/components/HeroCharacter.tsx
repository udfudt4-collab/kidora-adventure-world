import { useState } from 'react';
import type { AvatarConfig } from '@/lib/types';

interface HeroCharacterProps {
  avatar: AvatarConfig;
  size?: number;
  pose?: 'idle' | 'walk' | 'celebrate' | 'wave' | 'thinking';
  animate?: boolean;
  onTap?: () => void;
  className?: string;
  name?: string;
  showNameTag?: boolean;
}

export function HeroCharacter({
  avatar,
  size = 140,
  pose = 'idle',
  animate = true,
  onTap,
  className = '',
  name,
  showNameTag = false,
}: HeroCharacterProps) {
  const [bouncing, setBouncing] = useState(false);

  const handleTap = () => {
    setBouncing(true);
    if (onTap) onTap();
    setTimeout(() => setBouncing(false), 900);
  };

  const hatEmojis: Record<string, string> = {
    crown: '👑',
    cap: '🧢',
    wizard: '🧙',
    safari: '🤠',
    party: '🥳',
    mask: '🦹',
  };

  const backpackEmojis: Record<string, string> = {
    explorer: '🎒',
    rocket: '🚀',
    wings: '🪽',
    cape: '🦸',
  };

  const accessoryEmojis: Record<string, string> = {
    glasses: '👓',
    bowtie: '🎀',
    scarf: '🧣',
    wand: '🪄',
    magnifier: '🔍',
  };

  const getPoseClass = () => {
    if (bouncing || pose === 'celebrate') return 'animate-bounce-soft';
    if (pose === 'walk') return 'animate-wiggle';
    if (animate) return 'animate-float';
    return '';
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Optional Name Tag */}
      {showNameTag && name && (
        <div className="mb-1 bg-white/90 backdrop-blur-md px-3 py-0.5 rounded-full border-2 border-amber-300 shadow-soft text-slate-800 text-xs font-display font-black tracking-wide">
          ⭐ {name}
        </div>
      )}

      {/* Hero Body */}
      <button
        type="button"
        onClick={handleTap}
        className={`relative btn-press cursor-pointer ${getPoseClass()}`}
        style={{ width: size, height: size * 1.2 }}
        title="Your Hero Character"
      >
        {/* Backpack / Wings Behind */}
        {avatar.backpack && avatar.backpack !== 'none' && (
          <div
            className="absolute z-0 text-3xl"
            style={{
              top: size * 0.4,
              right: size * 0.05,
              fontSize: size * 0.35,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
            }}
          >
            {backpackEmojis[avatar.backpack] ?? ''}
          </div>
        )}

        {/* Hat / Headwear */}
        {avatar.hat && avatar.hat !== 'none' && (
          <div
            className="absolute z-30 flex justify-center w-full"
            style={{
              top: -size * 0.06,
              fontSize: size * 0.36,
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
            }}
          >
            {hatEmojis[avatar.hat] ?? ''}
          </div>
        )}

        {/* Head */}
        <div
          className="relative mx-auto rounded-full shadow-pop z-10"
          style={{
            width: size * 0.65,
            height: size * 0.65,
            background: avatar.skin,
            border: '3px solid rgba(255,255,255,0.7)',
          }}
        >
          {/* Hair */}
          {avatar.hair !== 'bald' && (
            <div
              className="absolute -top-1 left-0 right-0 rounded-t-full z-15"
              style={{
                height: size * 0.28,
                background: avatar.hairColor,
                clipPath:
                  avatar.hair === 'short'
                    ? 'polygon(0 40%, 10% 0, 90% 0, 100% 40%, 100% 30%, 0 30%)'
                    : avatar.hair === 'long'
                    ? 'polygon(0 40%, 10% 0, 90% 0, 100% 40%, 110% 100%, -10% 100%)'
                    : avatar.hair === 'curly'
                    ? 'polygon(0 50%, 5% 0, 20% 20%, 35% 0, 50% 20%, 65% 0, 80% 20%, 95% 0, 100% 50%, 100% 30%, 0 30%)'
                    : avatar.hair === 'spiky'
                    ? 'polygon(10% 0, 20% 30%, 30% 0, 40% 30%, 50% 0, 60% 30%, 70% 0, 80% 30%, 90% 0, 100% 40%, 100% 30%, 0 30%)'
                    : 'polygon(35% 0, 65% 0, 80% 50%, 50% 40%, 20% 50%)',
              }}
            />
          )}

          {/* Eyes */}
          <div
            className="absolute flex justify-between px-3 w-full z-20"
            style={{ top: size * 0.26 }}
          >
            <div className="relative">
              <div
                className="rounded-full bg-slate-800"
                style={{ width: size * 0.08, height: size * 0.08 }}
              >
                <div
                  className="rounded-full bg-white absolute top-0.5 left-0.5"
                  style={{ width: size * 0.025, height: size * 0.025 }}
                />
              </div>
            </div>
            <div className="relative">
              <div
                className="rounded-full bg-slate-800"
                style={{ width: size * 0.08, height: size * 0.08 }}
              >
                <div
                  className="rounded-full bg-white absolute top-0.5 left-0.5"
                  style={{ width: size * 0.025, height: size * 0.025 }}
                />
              </div>
            </div>
          </div>

          {/* Rosy Cheeks */}
          <div
            className="absolute rounded-full bg-rose-400/40 z-15"
            style={{ width: size * 0.1, height: size * 0.06, top: size * 0.35, left: size * 0.08 }}
          />
          <div
            className="absolute rounded-full bg-rose-400/40 z-15"
            style={{ width: size * 0.1, height: size * 0.06, top: size * 0.35, right: size * 0.08 }}
          />

          {/* Mouth Smile */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-20"
            style={{ top: size * 0.38 }}
          >
            {pose === 'celebrate' ? (
              <div className="text-sm">😄</div>
            ) : (
              <div
                className="w-4 h-2 border-b-2 border-slate-800 rounded-full"
                style={{ width: size * 0.12, height: size * 0.06 }}
              />
            )}
          </div>

          {/* Accessory on Face (Glasses/Wand) */}
          {avatar.accessory && avatar.accessory !== 'none' && (
            <div
              className="absolute z-25 flex justify-center w-full"
              style={{
                top: size * 0.16,
                fontSize: size * 0.32,
              }}
            >
              {accessoryEmojis[avatar.accessory] ?? ''}
            </div>
          )}
        </div>

        {/* Body / Shirt */}
        <div
          className="relative mx-auto rounded-t-3xl shadow-md z-10 -mt-2"
          style={{
            width: size * 0.54,
            height: size * 0.38,
            background: avatar.outfitColor || avatar.outfit || '#38bdf8',
            border: '2px solid rgba(255,255,255,0.4)',
          }}
        >
          {/* Star Crest on Shirt */}
          <div className="flex justify-center items-center h-full text-amber-200 text-xs">
            ✨
          </div>
        </div>

        {/* Legs & Shoes */}
        <div className="flex justify-center gap-2 z-5 -mt-1">
          <div
            className="rounded-b-xl bg-slate-700 shadow-sm"
            style={{ width: size * 0.15, height: size * 0.18 }}
          >
            <div
              className="w-full h-2 rounded-b-md bg-amber-400 mt-auto"
              style={{ height: size * 0.06 }}
            />
          </div>
          <div
            className="rounded-b-xl bg-slate-700 shadow-sm"
            style={{ width: size * 0.15, height: size * 0.18 }}
          >
            <div
              className="w-full h-2 rounded-b-md bg-amber-400 mt-auto"
              style={{ height: size * 0.06 }}
            />
          </div>
        </div>
      </button>
    </div>
  );
}
