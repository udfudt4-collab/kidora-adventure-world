import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  emoji: string;
  delay: number;
  duration: number;
}

const emojis = ['⭐', '🎉', '✨', '🌟', '💫', '🎊', '🏆', '🎈'];

export function Confetti({ show, count = 40 }: { show: boolean; count?: number }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!show) {
      setPieces([]);
      return;
    }
    const newPieces: ConfettiPiece[] = [];
    for (let i = 0; i < count; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        emoji: emojis[Math.floor(Math.random() * emojis.length)] ?? '⭐',
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
      });
    }
    setPieces(newPieces);
    const timer = setTimeout(() => setPieces([]), 4000);
    return () => clearTimeout(timer);
  }, [show, count]);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute text-2xl"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        >
          {p.emoji}
        </div>
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
