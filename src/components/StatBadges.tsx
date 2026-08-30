interface StarCounterProps {
  count: number;
  size?: 'sm' | 'md' | 'lg';
}

export function StarCounter({ count, size = 'md' }: StarCounterProps) {
  const sizes = { sm: 'text-base', md: 'text-xl', lg: 'text-2xl' };
  return (
    <div className="inline-flex items-center gap-1.5 bg-sun-100 rounded-full px-3 py-1.5 shadow-soft">
      <span className={`${sizes[size]}`}>⭐</span>
      <span className={`font-display font-bold text-sun-600 ${sizes[size]}`}>{count}</span>
    </div>
  );
}

interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  if (streak === 0) return null;
  return (
    <div className="inline-flex items-center gap-1.5 bg-tangerine-100 rounded-full px-3 py-1.5 shadow-soft">
      <span className="text-lg">🔥</span>
      <span className="font-display font-bold text-tangerine-600">{streak} day{streak > 1 ? 's' : ''}</span>
    </div>
  );
}
