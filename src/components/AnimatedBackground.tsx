interface AnimatedBackgroundProps {
  variant?: 'day' | 'night' | 'sunset' | 'ocean' | 'space' | 'jungle';
  children: React.ReactNode;
}

const gradients: Record<string, string> = {
  day: 'from-sky-200 via-mint-100 to-sun-100',
  night: 'from-slate-800 via-slate-700 to-sky-900',
  sunset: 'from-sun-300 via-berry-200 to-grape-300',
  ocean: 'from-sky-300 via-cyan-200 to-blue-300',
  space: 'from-slate-900 via-grape-900 to-slate-800',
  jungle: 'from-mint-200 via-mint-100 to-sun-100',
};

export function AnimatedBackground({ variant = 'day', children }: AnimatedBackgroundProps) {
  return (
    <div className={`relative min-h-screen bg-gradient-to-b ${gradients[variant]} overflow-hidden`}>
      {/* Floating clouds (day variants) */}
      {(variant === 'day' || variant === 'sunset' || variant === 'ocean' || variant === 'jungle') && (
        <>
          <div className="absolute top-8 left-0 w-full pointer-events-none">
            <div className="text-6xl opacity-60 animate-drift" style={{ animationDuration: '40s' }}>☁️</div>
          </div>
          <div className="absolute top-20 left-0 w-full pointer-events-none">
            <div className="text-4xl opacity-40 animate-drift" style={{ animationDuration: '55s', animationDelay: '5s' }}>☁️</div>
          </div>
        </>
      )}

      {/* Twinkling stars (night/space) */}
      {(variant === 'night' || variant === 'space') && (
        <>
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-white animate-twinkle"
              style={{
                top: `${Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${0.5 + Math.random() * 1}rem`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              ✦
            </div>
          ))}
          <div className="absolute top-10 right-10 text-5xl animate-float-slow">🌙</div>
        </>
      )}

      {/* Floating particles for jungle */}
      {variant === 'jungle' && (
        <>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-mint-300/50 to-transparent pointer-events-none" />
          <div className="absolute top-1/4 left-10 text-3xl animate-float-slow">🦋</div>
          <div className="absolute top-1/3 right-12 text-2xl animate-float" style={{ animationDelay: '1s' }}>🐝</div>
        </>
      )}

      {/* Sun for day */}
      {variant === 'day' && (
        <div className="absolute top-6 right-8 text-5xl animate-pulse-soft">☀️</div>
      )}

      {/* Sun for sunset */}
      {variant === 'sunset' && (
        <div className="absolute top-1/3 right-10 text-6xl animate-float-slow">🌅</div>
      )}

      {/* Ocean waves */}
      {variant === 'ocean' && (
        <>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-sky-500/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-20 left-1/4 text-3xl animate-float">🐠</div>
          <div className="absolute bottom-32 right-1/4 text-2xl animate-float-slow">🐡</div>
        </>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
