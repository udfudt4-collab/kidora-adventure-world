import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/lib/store';
import {
  Printer,
  PenTool,
  RotateCcw,
  Sparkles,
  Download,
  BookOpen,
  CheckCircle2,
  Palette,
  Eraser,
  Save,
  FileText,
  Star,
} from 'lucide-react';
import { waterSound } from '@/lib/waterSound';

type WorksheetCategory = 'alphabet' | 'number' | 'colors' | 'maze';

interface WorksheetTemplate {
  id: string;
  category: WorksheetCategory;
  title: string;
  subtitle: string;
  age: string;
  emoji: string;
  instructions: string;
  renderType: 'alphabet_grid' | 'number_grid' | 'color_shapes' | 'animal_maze';
  items: { char: string; word: string; emoji: string; dotted: string }[];
}

const WORKSHEET_TEMPLATES: WorksheetTemplate[] = [
  {
    id: 'ws-abc-1',
    category: 'alphabet',
    title: 'A to E Alphabet Tracing & Words',
    subtitle: 'Trace Uppercase & Lowercase letters and color the cute animal guides.',
    age: 'Ages 4–6 (Preschool & Kindergarten)',
    emoji: '🔤',
    instructions: '1. Trace along the dashed lines with your pencil. 2. Color each matching picture!',
    renderType: 'alphabet_grid',
    items: [
      { char: 'Aa', word: 'Apple', emoji: '🍎', dotted: 'A A A a a a' },
      { char: 'Bb', word: 'Butterfly', emoji: '🦋', dotted: 'B B B b b b' },
      { char: 'Cc', word: 'Cat', emoji: '🐱', dotted: 'C C C c c c' },
      { char: 'Dd', word: 'Dolphin', emoji: '🐬', dotted: 'D D D d d d' },
      { char: 'Ee', word: 'Elephant', emoji: '🐘', dotted: 'E E E e e e' },
    ],
  },
  {
    id: 'ws-abc-2',
    category: 'alphabet',
    title: 'F to J Alphabet Adventure',
    subtitle: 'Practice smooth stroke order for letters F, G, H, I, J.',
    age: 'Ages 4–6',
    emoji: '🌳',
    instructions: 'Trace the letters starting from top to bottom. Say the phonetic sound out loud!',
    renderType: 'alphabet_grid',
    items: [
      { char: 'Ff', word: 'Fish', emoji: '🐠', dotted: 'F F F f f f' },
      { char: 'Gg', word: 'Grapes', emoji: '🍇', dotted: 'G G G g g g' },
      { char: 'Hh', word: 'Horse', emoji: '🐴', dotted: 'H H H h h h' },
      { char: 'Ii', word: 'Igloo', emoji: '🧊', dotted: 'I I I i i i' },
      { char: 'Jj', word: 'Juice', emoji: '🧃', dotted: 'J J J j j j' },
    ],
  },
  {
    id: 'ws-num-1',
    category: 'number',
    title: '1 to 5 Number Counting & Writing',
    subtitle: 'Count the real-world objects and trace numerals 1 through 5.',
    age: 'Ages 3–5',
    emoji: '🔢',
    instructions: 'Count the items on each line, trace the numeral, and write the number in the box.',
    renderType: 'number_grid',
    items: [
      { char: '1', word: 'One Sun', emoji: '☀️', dotted: '1 1 1 1 1 1' },
      { char: '2', word: 'Two Apples', emoji: '🍎 🍎', dotted: '2 2 2 2 2 2' },
      { char: '3', word: 'Three Stars', emoji: '⭐ ⭐ ⭐', dotted: '3 3 3 3 3 3' },
      { char: '4', word: 'Four Dolphins', emoji: '🐬 🐬 🐬 🐬', dotted: '4 4 4 4 4 4' },
      { char: '5', word: 'Five Butterflies', emoji: '🦋 🦋 🦋 🦋 🦋', dotted: '5 5 5 5 5 5' },
    ],
  },
  {
    id: 'ws-num-2',
    category: 'number',
    title: '6 to 10 Number Mastery',
    subtitle: 'Count up to ten and practice double-digit baseline recognition.',
    age: 'Ages 4–7',
    emoji: '🧮',
    instructions: 'Trace the numbers 6 to 10 along the guide arrows.',
    renderType: 'number_grid',
    items: [
      { char: '6', word: 'Six Flowers', emoji: '🌸 🌸 🌸 🌸 🌸 🌸', dotted: '6 6 6 6 6 6' },
      { char: '7', word: 'Seven Rainbows', emoji: '🌈 🌈 🌈 🌈 🌈 🌈 🌈', dotted: '7 7 7 7 7 7' },
      { char: '8', word: 'Eight Crystals', emoji: '💎 💎 💎 💎 💎 💎 💎 💎', dotted: '8 8 8 8 8 8' },
      { char: '9', word: 'Nine Balloons', emoji: '🎈 🎈 🎈 🎈 🎈 🎈 🎈 🎈 🎈', dotted: '9 9 9 9 9 9' },
      { char: '10', word: 'Ten Hearts', emoji: '❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️', dotted: '10 10 10 10 10' },
    ],
  },
  {
    id: 'ws-col-1',
    category: 'colors',
    title: 'Color by Word & Shape Matching',
    subtitle: 'Match color names to their vibrant shades and identify 2D shapes.',
    age: 'Ages 4–6',
    emoji: '🎨',
    instructions: 'Trace the shape outlines and color each shape according to the color label!',
    renderType: 'color_shapes',
    items: [
      { char: 'Circle 🔴', word: 'Color it RED (சிவப்பு)', emoji: '⭕', dotted: 'Circle • Circle • Circle' },
      { char: 'Square 🟦', word: 'Color it BLUE (நீலம்)', emoji: '⬛', dotted: 'Square • Square • Square' },
      { char: 'Triangle 🔺', word: 'Color it YELLOW (மஞ்சள்)', emoji: '🔺', dotted: 'Triangle • Triangle' },
      { char: 'Star ⭐', word: 'Color it GOLD (தங்கம்)', emoji: '⭐', dotted: 'Star • Star • Star' },
    ],
  },
  {
    id: 'ws-maze-1',
    category: 'maze',
    title: 'Animal Habitat Maze & Path Finder',
    subtitle: 'Draw a path connecting our furry explorer friends to their homes.',
    age: 'Ages 4–8',
    emoji: '🧩',
    instructions: 'Help the puppy reach the cozy doghouse without touching the fences!',
    renderType: 'animal_maze',
    items: [
      { char: '🐶 -> 🏠', word: 'Help Puppy reach home!', emoji: '🦴', dotted: '══════════════╗' },
      { char: '🐬 -> 🌊', word: 'Guide Dolphin to lagoon!', emoji: '🏝️', dotted: '══════════════╝' },
      { char: '🦉 -> 🌲', word: 'Guide Owl to tree hollow!', emoji: '🌙', dotted: '══════════════╗' },
    ],
  },
];

const BRUSH_COLORS = ['#0284c7', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#0f172a'];

export function WorksheetsStudio() {
  const { profile, addStars } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<WorksheetCategory>('alphabet');
  const [selectedTemplate, setSelectedTemplate] = useState<WorksheetTemplate>(WORKSHEET_TEMPLATES[0]);

  // Digital Drawing Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [brushColor, setBrushColor] = useState<string>('#0284c7');
  const [brushSize, setBrushSize] = useState<number>(6);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const childName = profile?.name || 'Student';

  const filteredTemplates = WORKSHEET_TEMPLATES.filter((t) => t.category === selectedCategory);

  const handleSelectTemplate = (tmpl: WorksheetTemplate) => {
    setSelectedTemplate(tmpl);
    clearCanvas();
  };

  // Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = isEraser ? '#ffffff' : brushColor;
    ctx.lineWidth = isEraser ? 24 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSaveCompleted = () => {
    waterSound.playGoalCelebration();
    addStars(10);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-pop-in">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-emerald-400/40">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
            Printable & Interactive Canvas Worksheets
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2">
            <span>Worksheets Studio</span>
            <span className="text-2xl">📝🖨️</span>
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
            Practice handwriting, tracing, counting, and coloring directly on screen, or print clean A4 worksheets for offline home and classroom learning!
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handlePrint}
            className="btn-press px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black font-display text-xs shadow-soft flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>Print Worksheet</span>
          </button>
        </div>
      </div>

      {/* 2. Category Selector */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'alphabet', label: '🔤 Alphabet Tracing', count: 'A–Z Letters' },
          { id: 'number', label: '🔢 Number Tracing & Count', count: '1–20 Numbers' },
          { id: 'colors', label: '🎨 Colors & Shapes', count: 'Shape Match' },
          { id: 'maze', label: '🧩 Mazes & Paths', count: 'Logic Fun' },
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => {
              setSelectedCategory(cat.id as WorksheetCategory);
              const first = WORKSHEET_TEMPLATES.find((t) => t.category === cat.id);
              if (first) setSelectedTemplate(first);
            }}
            className={`btn-press px-4 py-2.5 rounded-2xl font-black font-display text-xs flex items-center gap-2 transition-all cursor-pointer border ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-soft scale-105'
                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
            }`}
          >
            <span>{cat.label}</span>
            <span className="text-[10px] opacity-75 font-normal">({cat.count})</span>
          </button>
        ))}
      </div>

      {/* 3. Main Workspace & Worksheet Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Template List & Tool Drawer (Left) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 shadow-soft border border-slate-200 space-y-3">
            <h3 className="text-xs font-black font-display text-slate-800">
              Select Worksheet:
            </h3>

            <div className="space-y-2">
              {filteredTemplates.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => handleSelectTemplate(tmpl)}
                  className={`btn-press w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedTemplate.id === tmpl.id
                      ? 'bg-emerald-50 border-emerald-500 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-black font-display text-slate-900 flex items-center gap-1.5">
                      <span>{tmpl.emoji}</span>
                      <span>{tmpl.title}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">{tmpl.age}</div>
                  </div>
                  <span className="text-xs">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Digital Pen Tool Palette */}
          <div className="bg-white rounded-3xl p-5 shadow-soft border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-black font-display text-slate-800">
                <Palette className="h-4 w-4 text-emerald-600" />
                <span>Digital Tracing Pen</span>
              </div>
              <button
                type="button"
                onClick={clearCanvas}
                className="btn-press text-[11px] font-bold text-slate-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" /> Clear
              </button>
            </div>

            {/* Colors */}
            <div className="flex flex-wrap gap-2 justify-center">
              {BRUSH_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setBrushColor(c);
                    setIsEraser(false);
                  }}
                  style={{ backgroundColor: c }}
                  className={`btn-press w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                    brushColor === c && !isEraser ? 'border-slate-950 scale-110 shadow-xs' : 'border-white'
                  }`}
                />
              ))}

              <button
                type="button"
                onClick={() => setIsEraser(!isEraser)}
                className={`btn-press px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 cursor-pointer border ${
                  isEraser ? 'bg-rose-500 text-white border-rose-500' : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <Eraser className="h-3.5 w-3.5" />
                <span>Eraser</span>
              </button>
            </div>

            {/* Brush Size */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-500 font-bold">Pen Width:</span>
              <div className="flex gap-2">
                {[
                  { label: 'Fine', size: 4 },
                  { label: 'Medium', size: 8 },
                  { label: 'Thick', size: 14 },
                ].map((b) => (
                  <button
                    key={b.size}
                    type="button"
                    onClick={() => setBrushSize(b.size)}
                    className={`btn-press px-2.5 py-1 rounded-xl text-[11px] font-bold cursor-pointer border ${
                      brushSize === b.size
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveCompleted}
              className="btn-press w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black font-display text-xs shadow-soft flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>Complete & Earn 10 Stars! 🌟</span>
            </button>

            {savedSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-center text-xs font-black animate-pop-in">
                🎉 Great Work! Worksheet Completed & +10 Stars Awarded!
              </div>
            )}
          </div>
        </div>

        {/* Worksheet Print/Canvas Viewport (Right) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-soft border-2 border-slate-200 space-y-6 relative print:p-0 print:border-none print:shadow-none">
          {/* Printable Header */}
          <div className="border-b-2 border-dashed border-slate-300 pb-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌟</span>
                <span className="font-black font-display text-lg text-slate-900">
                  Kidora Adventure Academy Worksheet
                </span>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                Grade Level: {selectedTemplate.age}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold text-slate-600 pt-1">
              <div>Name: <span className="border-b-2 border-dotted border-slate-400 px-8 inline-block">{childName}</span></div>
              <div>Date: <span className="border-b-2 border-dotted border-slate-400 px-6 inline-block">{new Date().toLocaleDateString()}</span></div>
              <div>Score: <span className="border-b-2 border-dotted border-slate-400 px-6 inline-block">⭐⭐⭐⭐⭐</span></div>
            </div>
          </div>

          {/* Worksheet Title & Instructions */}
          <div className="space-y-1">
            <h3 className="text-xl font-black font-display text-slate-900">
              {selectedTemplate.title}
            </h3>
            <p className="text-xs text-slate-600 font-medium bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              📌 <strong>Instructions:</strong> {selectedTemplate.instructions}
            </p>
          </div>

          {/* Worksheet Interactive Canvas Wrapper */}
          <div className="relative min-h-[420px] bg-slate-50/50 rounded-2xl border border-slate-200 p-4 select-none touch-none">
            {/* Background Guided Worksheet Content */}
            <div className="space-y-4">
              {selectedTemplate.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-3.5 border border-slate-200 flex items-center justify-between gap-4 shadow-2xs"
                >
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="text-2xl font-black font-display text-slate-900 min-w-[50px]">
                      {item.char}
                    </span>
                  </div>

                  {/* Dotted Tracing Line */}
                  <div className="flex-1 border-b-2 border-t-2 border-dashed border-sky-300 py-1.5 text-center font-display font-black text-2xl tracking-[0.35em] text-slate-300 select-none">
                    {item.dotted}
                  </div>

                  <div className="text-xs font-bold text-slate-600 min-w-[80px] text-right">
                    {item.word}
                  </div>
                </div>
              ))}
            </div>

            {/* Foreground Digital Inking Canvas */}
            <canvas
              ref={canvasRef}
              width={700}
              height={460}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="absolute inset-0 w-full h-full cursor-crosshair z-20 pointer-events-auto"
            />
          </div>

          {/* Worksheet Footer Stamp */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>Kidora Adventure World • Early Education Series</span>
            <span>Great Job, Explorer! ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
