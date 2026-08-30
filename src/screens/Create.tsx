import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { useApp } from '@/lib/store';
import type { Screen } from '@/lib/types';

interface CreateProps {
  onNavigate: (screen: Screen) => void;
}

const colors = ['#ef4444', '#f97316', '#fbbf24', '#34d399', '#38bdf8', '#a78bfa', '#f472b6', '#1e293b', '#ffffff'];
const brushSizes = [4, 8, 14, 22];
const stickers = ['⭐', '🌈', '🌸', '🦋', '🐝', '☀️', '🌙', '❤️', '😄', '🍎', '🌳', '☁️'];

export function Create({ onNavigate }: CreateProps) {
  const { addCreation, creations } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState(colors[4] ?? '#38bdf8');
  const [brushSize, setBrushSize] = useState(8);
  const [mode, setMode] = useState<'draw' | 'sticker'>('draw');
  const [activeSticker, setActiveSticker] = useState('⭐');
  const [isDrawing, setIsDrawing] = useState(false);
  const [stamps, setStamps] = useState<{ x: number; y: number; emoji: string }[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      const t = e.touches[0] ?? e.changedTouches[0];
      if (!t) return { x: 0, y: 0 };
      return { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (mode === 'sticker') {
      const pos = getPos(e);
      const cw = canvasRef.current?.width ?? 320;
      const ch = canvasRef.current?.height ?? 280;
      setStamps(prev => [...prev, { x: pos.x / cw, y: pos.y / ch, emoji: activeSticker }]);
      return;
    }
    setIsDrawing(true);
    const pos = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, brushSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || mode !== 'draw') return;
    const pos = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  };

  const stopDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    setStamps([]);
  };

  const handleSave = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    await addCreation('drawing', 'My Drawing', { image: dataUrl, stamps });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AnimatedBackground variant="day">
      <div className="min-h-screen px-4 py-4 max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="btn-press bg-white/80 rounded-full w-11 h-11 flex items-center justify-center shadow-soft text-xl"
          >
            ←
          </button>
          <h1 className="text-2xl font-display font-extrabold text-white text-stroke-white drop-shadow-lg">
            Creative Studio 🎨
          </h1>
        </div>

        {/* Canvas */}
        <div className="bg-white rounded-3xl p-4 shadow-pop mb-4">
          <div className="relative rounded-2xl overflow-hidden shadow-soft mb-3 bg-white">
            <canvas
              ref={canvasRef}
              width={320}
              height={280}
              className="w-full touch-none"
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
            />
            <div className="absolute inset-0 pointer-events-none">
              {stamps.map((s, i) => (
                <div
                  key={i}
                  className="absolute text-2xl"
                  style={{ left: `${s.x * 100}%`, top: `${s.y * 100}%`, transform: 'translate(-50%, -50%)' }}
                >
                  {s.emoji}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setMode('draw')}
              className={`btn-press flex-1 rounded-xl py-2 text-sm font-bold font-display ${mode === 'draw' ? 'bg-sky-400 text-white' : 'bg-slate-100 text-slate-500'}`}
            >
              ✏️ Draw
            </button>
            <button
              onClick={() => setMode('sticker')}
              className={`btn-press flex-1 rounded-xl py-2 text-sm font-bold font-display ${mode === 'sticker' ? 'bg-berry-400 text-white' : 'bg-slate-100 text-slate-500'}`}
            >
              ✨ Stickers
            </button>
          </div>

          {mode === 'draw' ? (
            <>
              <div className="flex gap-2 justify-center mb-3">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`btn-press rounded-full w-8 h-8 border-3 ${color === c ? 'border-slate-400 scale-110' : 'border-white'}`}
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="flex gap-2 justify-center mb-3">
                {brushSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setBrushSize(s)}
                    className={`btn-press rounded-full bg-slate-100 flex items-center justify-center ${brushSize === s ? 'ring-2 ring-sky-400' : ''}`}
                    style={{ width: 36, height: 36 }}
                  >
                    <div className="rounded-full bg-slate-400" style={{ width: s, height: s }} />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex gap-2 flex-wrap justify-center mb-3">
              {stickers.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSticker(s)}
                  className={`btn-press text-2xl rounded-xl p-2 ${activeSticker === s ? 'bg-berry-100 scale-110' : 'bg-slate-50'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="ghost" size="md" onClick={clearCanvas} className="flex-1">🗑️ Clear</Button>
            <Button variant="success" size="md" onClick={handleSave} className="flex-1" disabled={saved}>
              {saved ? '✅ Saved!' : '💾 Save'}
            </Button>
          </div>
        </div>

        {/* Recent creations */}
        {creations.filter(c => c.type === 'drawing').length > 0 && (
          <div className="bg-white rounded-3xl p-4 shadow-soft">
            <h2 className="text-sm font-display font-bold text-slate-700 mb-2">Recent Art</h2>
            <div className="grid grid-cols-4 gap-2">
              {creations.filter(c => c.type === 'drawing').slice(0, 4).map((c) => (
                <div key={c.id} className="bg-slate-50 rounded-xl p-2 text-center">
                  <div className="text-2xl">🎨</div>
                  <div className="text-xs text-slate-400 truncate">{c.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AnimatedBackground>
  );
}
