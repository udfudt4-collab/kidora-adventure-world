import type { AvatarConfig } from '@/lib/types';

interface MascotProps {
  avatar: AvatarConfig;
  expression?: 'happy' | 'excited' | 'surprised' | 'thinking' | 'celebrating' | 'resting';
  size?: number;
  animate?: boolean;
}

const expressions: Record<string, string> = {
  happy: '😊',
  excited: '🤩',
  surprised: '😮',
  thinking: '🤔',
  celebrating: '🥳',
  resting: '😴',
};

export function Mascot({ avatar, expression = 'happy', size = 120, animate = true }: MascotProps) {
  const hatMap: Record<string, string> = {
    none: '', crown: '👑', cap: '🧢', wizard: '🧙', party: '🥳',
  };
  const accMap: Record<string, string> = {
    none: '', glasses: '👓', bowtie: '🎀', scarf: '🧣', wings: '🪽',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${animate ? 'animate-float' : ''}`}
      style={{ width: size, height: size }}
    >
      {/* Hat */}
      {avatar.hat !== 'none' && (
        <div className="absolute -top-2 z-20 text-3xl" style={{ fontSize: size * 0.28 }}>
          {hatMap[avatar.hat] ?? ''}
        </div>
      )}
      {/* Head */}
      <div
        className="relative rounded-full shadow-pop"
        style={{
          width: size * 0.75,
          height: size * 0.75,
          background: avatar.skin,
          border: '3px solid rgba(255,255,255,0.5)',
        }}
      >
        {/* Hair */}
        {avatar.hair !== 'bald' && (
          <div
            className="absolute -top-1 left-0 right-0 rounded-t-full"
            style={{
              height: size * 0.22,
              background: avatar.hairColor,
              clipPath: avatar.hair === 'short' ? 'polygon(0 40%, 10% 0, 90% 0, 100% 40%, 100% 30%, 0 30%)' :
                         avatar.hair === 'long' ? 'polygon(0 40%, 10% 0, 90% 0, 100% 40%, 110% 100%, -10% 100%)' :
                         avatar.hair === 'curly' ? 'polygon(0 50%, 5% 0, 20% 20%, 35% 0, 50% 20%, 65% 0, 80% 20%, 95% 0, 100% 50%, 100% 30%, 0 30%)' :
                         avatar.hair === 'spiky' ? 'polygon(10% 0, 20% 30%, 30% 0, 40% 30%, 50% 0, 60% 30%, 70% 0, 80% 30%, 90% 0, 100% 40%, 100% 30%, 0 30%)' :
                         'polygon(35% 0, 65% 0, 80% 50%, 50% 40%, 20% 50%)',
            }}
          />
        )}
        {/* Eyes */}
        <div className="absolute flex gap-3" style={{ top: size * 0.3, left: '50%', transform: 'translateX(-50%)' }}>
          <div className="rounded-full bg-slate-700" style={{ width: size * 0.07, height: size * 0.07 }} />
          <div className="rounded-full bg-slate-700" style={{ width: size * 0.07, height: size * 0.07 }} />
        </div>
        {/* Expression mouth */}
        <div className="absolute" style={{ top: size * 0.45, left: '50%', transform: 'translateX(-50%)', fontSize: size * 0.2 }}>
          {expressions[expression]}
        </div>
        {/* Blush */}
        <div className="absolute rounded-full bg-pink-300/40" style={{ width: size * 0.1, height: size * 0.06, top: size * 0.42, left: size * 0.12 }} />
        <div className="absolute rounded-full bg-pink-300/40" style={{ width: size * 0.1, height: size * 0.06, top: size * 0.42, right: size * 0.12 }} />
      </div>
      {/* Body / outfit */}
      <div
        className="absolute rounded-t-3xl"
        style={{
          bottom: 0,
          width: size * 0.6,
          height: size * 0.28,
          background: avatar.outfit,
        }}
      />
      {/* Accessory */}
      {avatar.accessory !== 'none' && (
        <div className="absolute z-20" style={{ bottom: size * 0.08, left: '50%', transform: 'translateX(-50%)', fontSize: size * 0.15 }}>
          {accMap[avatar.accessory] ?? ''}
        </div>
      )}
    </div>
  );
}
