import type { PetConfig } from '@/lib/types';

const petEmojis: Record<string, string> = {
  puppy: '🐶', kitten: '🐱', bunny: '🐰', panda: '🐼',
  fox: '🦊', dino: '🦖', dragon: '🐉', unicorn: '🦄',
};

interface PetProps {
  pet: PetConfig;
  size?: number;
  animate?: boolean;
  mood?: 'happy' | 'sleeping' | 'playing' | 'celebrating';
}

export function Pet({ pet, size = 64, animate = true, mood = 'happy' }: PetProps) {
  const emoji = petEmojis[pet.type] ?? '🐶';
  const moodEmoji: Record<string, string> = {
    happy: '💚', sleeping: '💤', playing: '✨', celebrating: '🎉',
  };

  return (
    <div className={`relative inline-flex flex-col items-center ${animate ? 'animate-float' : ''}`}>
      <div
        className="rounded-full flex items-center justify-center shadow-soft"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 30% 30%, ${pet.color}40, ${pet.color}15)`,
          fontSize: size * 0.55,
        }}
      >
        {emoji}
      </div>
      {mood !== 'happy' && (
        <div className="absolute -top-1 -right-1 text-lg">{moodEmoji[mood]}</div>
      )}
      <div className="mt-1 text-xs font-bold text-slate-500 font-display">{pet.name}</div>
    </div>
  );
}
