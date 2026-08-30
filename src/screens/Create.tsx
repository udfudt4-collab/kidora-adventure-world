import { useRef, useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { Companion } from '@/components/Companion';
import { ArrowLeft, Sparkles, Check, Trash2, Brush, Stamp, MapPin } from 'lucide-react';
import type { Screen } from '@/lib/types';

interface CreateProps {
  onNavigate: (screen: Screen) => void;
}

const colors = [
  '#ef4444', '#f97316', '#fbbf24', '#22c55e', '#38bdf8', '#818cf8', '#f472b6', '#1e293b', '#ffffff'
];
const brushSizes = [4, 8, 14, 24];
const stampItems = [
  { emoji: '🌳', label: 'Magic Tree', type: 'tree' },
  { emoji: '🌸', label: 'Blossom Flower', type: 'flower' },
  { emoji: '🚀', label: 'Cosmic Rocket', type: 'rocket' },
  { emoji: '🐉', label: 'Baby Dragon', type: 'creature' },
  { emoji: '🦄', label: 'Unicorn', type: 'creature' },
  { emoji: '🏰', label: 'Mini Castle', type: 'castle' },
  { emoji: '⭐', label: 'Wishing Star', type: 'custom' },
  { emoji: '🌈', label: 'Rainbow Arc', type: 'custom' },
  { emoji: '🍎', label: 'Golden Fruit', type: 'flower' },
  { emoji: '🦋', label: 'Crystal Butterfly', type: 'creature' },
];

export function Create({ onNavigate }: CreateProps) {
  const { addCreation, addWorldItem, profile } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState(colors[4] ?? '#38bdf8');
  const [brushSize, setBrushSize] = useState(8);
  const [mode, setMode] = useState<'draw' | 'stamp'>('draw');
  const [activeStamp, setActiveStamp] = useState(stampItems[0]!);
  const [isDrawing, setIsDrawing] = useState(false);
  const [stamps, setStamps] = useState<{ x: number; y: number; emoji: string; label: string; type: string }[]>([]);
  const [artTitle, setArtTitle] = useState('My Magic Creation');
  const [showLiveDialog, setShowLiveDialog] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

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
    if (mode === 'stamp') {
      const pos = getPos(e);
      const cw = canvasRef.current?.width ?? 340;
      const ch = canvasRef.current?.height ?? 300;
      const newStamp = {
        x: pos.x / cw,
        y: pos.y / ch,
        emoji: activeStamp.emoji,
        label: activeStamp.label,
        type: activeStamp.type,
      };
      setStamps((prev) => [...prev, newStamp]);

      // Draw stamp onto canvas
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) {
        ctx.font = '36px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(activeStamp.emoji, pos.x, pos.y);
      }
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

  const handleSaveAndBringToLife = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');

    // Save creation into gallery
    await addCreation('drawing', artTitle, { image: dataUrl, stamps });

    // Also place into living world landscape!
    const primaryEmoji = stamps.length > 0 ? stamps[stamps.length - 1]!.emoji : '🎨';
    const primaryType = stamps.length > 0 ? (stamps[stamps.length - 1]!.type as any) : 'custom';

    // Place randomly in garden/world
    const randomX = 25 + Math.floor(Math.random() * 50);
    const randomY = 60 + Math.floor(Math.random() * 25);

    await addWorldItem({
      title: artTitle,
      emoji: primaryEmoji,
      type: primaryType,
      imageUrl: dataUrl,
      x: randomX,
      y: randomY,
      scale: 1,
    });

    setSavedSuccess(true);
    setShowLiveDialog(false);
    setTimeout(() => {
      onNavigate('home');
    }, 1200);
  };

  return (
    <div
      className="min-h-screen pb-12 font-sans select-none"
      style={{
        background: 'linear-gradient(180deg, #fdf2f8 0%, #fef3c7 50%, #e0f2fe 100%)',
      }}
    >
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* Header HUD */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="btn-press bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-soft text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-black font-display text-slate-800 flex items-center gap-1.5 justify-center">
              <span>🎨</span> Kidora Create
            </h1>
            <p className="text-[11px] font-bold text-slate-400">Where Your Art Comes Alive!</p>
          </div>
          <button
            onClick={() => setShowLiveDialog(true)}
            className="btn-press bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-display font-black text-xs px-3.5 py-2 rounded-2xl shadow-pop flex items-center gap-1"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Bring Alive!
          </button>
        </div>

        {/* Companion Kido Encouraging Message */}
        <div className="flex justify-center">
          <Companion
            emotion="excited"
            dialogue="Draw a tree, vehicle, or magical creature! Then we'll plant it in your world! 🌟"
            childName={profile?.name}
            size={55}
            showDialogue={true}
          />
        </div>

        {/* Art Canvas Box */}
        <div className="bg-white rounded-3xl p-3 shadow-pop border-4 border-amber-300 relative flex justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            width={340}
            height={300}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
            className="rounded-2xl cursor-crosshair touch-none w-full max-w-[340px] aspect-[34/30] bg-white border border-slate-100"
          />

          {savedSuccess && (
            <div className="absolute inset-0 bg-emerald-500/90 backdrop-blur-sm flex flex-col items-center justify-center text-white text-center p-4 animate-pop-in">
              <div className="text-5xl mb-2">🎉</div>
              <h2 className="text-xl font-black font-display">Your Art Came Alive!</h2>
              <p className="text-xs text-white/90 mt-1">Placing it right into your Living World...</p>
            </div>
          )}
        </div>

        {/* Mode Selector & Clear */}
        <div className="flex items-center justify-between gap-2">
          <div className="bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-soft flex gap-1 flex-1">
            <button
              onClick={() => setMode('draw')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold font-display transition-all flex items-center justify-center gap-1 ${
                mode === 'draw' ? 'bg-amber-400 text-white shadow-soft' : 'text-slate-600'
              }`}
            >
              <Brush className="h-3.5 w-3.5" />
              Draw
            </button>
            <button
              onClick={() => setMode('stamp')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold font-display transition-all flex items-center justify-center gap-1 ${
                mode === 'stamp' ? 'bg-pink-500 text-white shadow-soft' : 'text-slate-600'
              }`}
            >
              <Stamp className="h-3.5 w-3.5" />
              Stickers
            </button>
          </div>

          <button
            onClick={clearCanvas}
            className="btn-press bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-2xl shadow-soft text-slate-500 hover:text-rose-500 text-xs font-bold flex items-center gap-1"
            title="Clear Canvas"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </button>
        </div>

        {/* Draw Tools (Colors & Sizes) */}
        {mode === 'draw' ? (
          <div className="bg-white rounded-3xl p-3 shadow-soft space-y-3">
            {/* Color Palette */}
            <div className="flex justify-between items-center gap-1 px-1">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full transition-transform ${
                    color === c ? 'scale-120 ring-3 ring-amber-400 ring-offset-2' : ''
                  }`}
                  style={{ background: c, border: c === '#ffffff' ? '1px solid #cbd5e1' : 'none' }}
                />
              ))}
            </div>

            {/* Brush Size */}
            <div className="flex items-center justify-center gap-4 pt-1 border-t border-slate-100">
              {brushSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setBrushSize(size)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full transition-transform ${
                    brushSize === size ? 'bg-amber-100 scale-115' : 'bg-slate-50'
                  }`}
                >
                  <div
                    className="rounded-full bg-slate-700"
                    style={{ width: size, height: size }}
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Stamp Stickers Palette */
          <div className="bg-white rounded-3xl p-3 shadow-soft">
            <div className="grid grid-cols-5 gap-2">
              {stampItems.map((stamp) => (
                <button
                  key={stamp.label}
                  onClick={() => setActiveStamp(stamp)}
                  className={`p-2 rounded-2xl text-center text-3xl transition-all ${
                    activeStamp.label === stamp.label
                      ? 'bg-pink-100 ring-2 ring-pink-400 scale-110'
                      : 'bg-slate-50 hover:bg-slate-100'
                  }`}
                  title={stamp.label}
                >
                  {stamp.emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* "Bring to Life in World" Modal Dialog */}
      {showLiveDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-pop-in">
          <div className="bg-white rounded-4xl p-6 max-w-sm w-full shadow-pop text-center space-y-4">
            <div className="text-6xl animate-float">🌱✨</div>
            <h2 className="text-xl font-black font-display text-slate-800">
              Bring Your Art into Kidora!
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your creation will be planted and live permanently in your home world landscape!
            </p>

            <input
              type="text"
              value={artTitle}
              onChange={(e) => setArtTitle(e.target.value)}
              placeholder="Name your creation..."
              className="w-full text-center px-4 py-2.5 rounded-2xl border-2 border-slate-200 font-bold text-slate-800 text-sm focus:border-emerald-400 focus:outline-none"
            />

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowLiveDialog(false)}
                className="btn-press flex-1 py-3 rounded-2xl bg-slate-100 font-display font-bold text-xs text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAndBringToLife}
                className="btn-press flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 font-display font-black text-xs text-white shadow-pop flex items-center justify-center gap-1"
              >
                <Check className="h-4 w-4" />
                Yes, Place in World!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Create;
