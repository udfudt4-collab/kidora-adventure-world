import { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '@/lib/store';
import { waterSound } from '@/lib/waterSound';
import {
  Printer,
  Sparkles,
  RotateCcw,
  Download,
  PenTool,
  Eraser,
  Palette,
  CheckCircle2,
  BookOpen,
  Award,
  Layers,
  Star,
  Flame,
} from 'lucide-react';

type WorksheetCategory = 'alphabet' | 'tamil' | 'number' | 'colors' | 'maze';

interface WorksheetTemplate {
  id: string;
  category: WorksheetCategory;
  title: string;
  subtitle: string;
  age: string;
  emoji: string;
  instructions: string;
  renderType: 'alphabet_grid' | 'number_grid' | 'color_shapes' | 'maze';
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
      { char: 'Aa', word: 'Apple', emoji: '🍎', dotted: 'A · A · a · a' },
      { char: 'Bb', word: 'Butterfly', emoji: '🦋', dotted: 'B · B · b · b' },
      { char: 'Cc', word: 'Cat', emoji: '🐱', dotted: 'C · C · c · c' },
      { char: 'Dd', word: 'Dolphin', emoji: '🐬', dotted: 'D · D · d · d' },
      { char: 'Ee', word: 'Elephant', emoji: '🐘', dotted: 'E · E · e · e' },
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
      { char: 'Ff', word: 'Fish', emoji: '🐠', dotted: 'F · F · f · f' },
      { char: 'Gg', word: 'Grapes', emoji: '🍇', dotted: 'G · G · g · g' },
      { char: 'Hh', word: 'Horse', emoji: '🐴', dotted: 'H · H · h · h' },
      { char: 'Ii', word: 'Igloo', emoji: '🧊', dotted: 'I · I · i · i' },
      { char: 'Jj', word: 'Juice', emoji: '🧃', dotted: 'J · J · j · j' },
    ],
  },
  {
    id: 'ws-tam-1',
    category: 'tamil',
    title: 'அ முதல் ஊ வரை தமிழ் உயிர் எழுத்துக்கள்',
    subtitle: 'உயிர் எழுத்துக்களை அழகாக எழுதிப் பழகவும்.',
    age: 'Ages 3–7 (தமிழ் பயிற்சி)',
    emoji: '🪔',
    instructions: 'புள்ளிகளை இணைத்து எழுத்துக்களை அழகாக எழுதிப் பழகவும்!',
    renderType: 'alphabet_grid',
    items: [
      { char: 'அ', word: 'அம்மா (Mother)', emoji: '👩', dotted: 'அ · அ · அ · அ' },
      { char: 'ஆ', word: 'ஆடு (Goat)', emoji: '🐐', dotted: 'ஆ · ஆ · ஆ · ஆ' },
      { char: 'இ', word: 'இலை (Leaf)', emoji: '🍃', dotted: 'இ · இ · இ · இ' },
      { char: 'ஈ', word: 'ஈட்டி (Spear)', emoji: '🗡️', dotted: 'ஈ · ஈ · ஈ · ஈ' },
      { char: 'உ', word: 'உரல் (Mortar)', emoji: '🥣', dotted: 'உ · உ · உ · உ' },
      { char: 'ஊ', word: 'ஊஞ்சல் (Swing)', emoji: '🎡', dotted: 'ஊ · ஊ · ஊ · ஊ' },
    ],
  },
  {
    id: 'ws-tam-2',
    category: 'tamil',
    title: 'எ முதல் ஔ வரை தமிழ் உயிர் எழுத்துக்கள்',
    subtitle: 'எ, ஏ, ஐ, ஒ, ஓ, ஔ எழுத்துக்களை வரிசையாக எழுதிப் பழகவும்.',
    age: 'Ages 3–7',
    emoji: '⭐',
    instructions: 'எழுத்துக்களின் வழியில் விரலால் அல்லது பென்சிலால் அழகாக எழுதவும்.',
    renderType: 'alphabet_grid',
    items: [
      { char: 'எ', word: 'எலி (Mouse)', emoji: '🐭', dotted: 'எ · எ · எ · எ' },
      { char: 'ஏ', word: 'ஏணி (Ladder)', emoji: '🪜', dotted: 'ஏ · ஏ · ஏ · ஏ' },
      { char: 'ஐ', word: 'ஐந்து (Five)', emoji: '🖐️', dotted: 'ஐ · ஐ · ஐ · ஐ' },
      { char: 'ஒ', word: 'ஒட்டகம் (Camel)', emoji: '🐪', dotted: 'ஒ · ஒ · ஒ · ஒ' },
      { char: 'ஓ', word: 'ஓடம் (Boat)', emoji: '⛵', dotted: 'ஓ · ஓ · ஓ · ஓ' },
      { char: 'ஔ', word: 'ஔவையார் (Poet)', emoji: '📜', dotted: 'ஔ · ஔ · ஔ · ஔ' },
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
      { char: '1', word: 'One Sun', emoji: '☀️', dotted: '1 · 1 · 1 · 1 · 1' },
      { char: '2', word: 'Two Apples', emoji: '🍎', dotted: '2 · 2 · 2 · 2 · 2' },
      { char: '3', word: 'Three Stars', emoji: '⭐', dotted: '3 · 3 · 3 · 3 · 3' },
      { char: '4', word: 'Four Dolphins', emoji: '🐬', dotted: '4 · 4 · 4 · 4 · 4' },
      { char: '5', word: 'Five Butterflies', emoji: '🦋', dotted: '5 · 5 · 5 · 5 · 5' },
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
      { char: '6', word: 'Six Flowers', emoji: '🌸', dotted: '6 · 6 · 6 · 6 · 6' },
      { char: '7', word: 'Seven Rainbows', emoji: '🌈', dotted: '7 · 7 · 7 · 7 · 7' },
      { char: '8', word: 'Eight Crystals', emoji: '💎', dotted: '8 · 8 · 8 · 8 · 8' },
      { char: '9', word: 'Nine Balloons', emoji: '🎈', dotted: '9 · 9 · 9 · 9 · 9' },
      { char: '10', word: 'Ten Hearts', emoji: '❤️', dotted: '10 · 10 · 10 · 10' },
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
      { char: 'Circle 🔴', word: 'RED (சிவப்பு)', emoji: '⭕', dotted: 'Circle · Circle · Circle' },
      { char: 'Square 🟦', word: 'BLUE (நீலம்)', emoji: '⬛', dotted: 'Square · Square · Square' },
      { char: 'Triangle 🔺', word: 'YELLOW (மஞ்சள்)', emoji: '🔺', dotted: 'Triangle · Triangle' },
      { char: 'Star ⭐', word: 'GOLD (தங்கம்)', emoji: '⭐', dotted: 'Star · Star · Star' },
    ],
  },
];

const BRUSH_COLORS = ['#0284c7', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#0f172a'];

interface Stroke {
  points: { x: number; y: number }[];
  color: string;
  size: number;
  isEraser: boolean;
}

export function WorksheetsStudio() {
  const { profile, addStars } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<WorksheetCategory>('alphabet');
  const [selectedTemplate, setSelectedTemplate] = useState<WorksheetTemplate>(WORKSHEET_TEMPLATES[0]);

  // Digital Drawing Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [brushColor, setBrushColor] = useState<string>('#0284c7');
  const [brushSize, setBrushSize] = useState<number>(6);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const childName = profile?.name || 'Student';
  const filteredTemplates = WORKSHEET_TEMPLATES.filter((t) => t.category === selectedCategory);

  // Redraw all saved strokes
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const s of strokesRef.current) {
      if (s.points.length === 0) continue;
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (s.isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = s.size * 2;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.size;
      }

      ctx.moveTo(s.points[0].x, s.points[0].y);
      for (let i = 1; i < s.points.length; i++) {
        ctx.lineTo(s.points[i].x, s.points[i].y);
      }
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
  }, []);

  // Responsive Canvas Sizing based on container
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    canvas.width = rect.width;
    canvas.height = rect.height;
    redrawCanvas();
  }, [redrawCanvas]);

  useEffect(() => {
    updateCanvasDimensions();
    const handleResize = () => updateCanvasDimensions();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateCanvasDimensions, selectedTemplate]);

  const handleSelectTemplate = (tmpl: WorksheetTemplate) => {
    setSelectedTemplate(tmpl);
    clearCanvas();
  };

  // Accurate Coordinate Normalization for Touch & Pointer
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / (rect.width || 1);
    const scaleY = canvas.height / (rect.height || 1);

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  // Digital Inking Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if ('touches' in e) {
      e.preventDefault();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const pt = getCanvasCoords(e);

    const newStroke: Stroke = {
      points: [pt],
      color: brushColor,
      size: brushSize,
      isEraser: isEraser,
    };

    currentStrokeRef.current = newStroke;
    strokesRef.current.push(newStroke);

    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize * 2;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
    }
    ctx.moveTo(pt.x, pt.y);
    ctx.lineTo(pt.x + 0.1, pt.y + 0.1);
    ctx.stroke();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStrokeRef.current) return;
    if ('touches' in e) {
      e.preventDefault();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pt = getCanvasCoords(e);
    currentStrokeRef.current.points.push(pt);

    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize * 2;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
    }
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    currentStrokeRef.current = null;
  };

  const clearCanvas = () => {
    strokesRef.current = [];
    currentStrokeRef.current = null;
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
            Practice handwriting, tracing, counting, and coloring directly on screen with your finger or stylus, or print clean A4 worksheets for offline classroom & home study!
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

      {/* 2. Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'alphabet', label: '🔤 Alphabets (A-Z)' },
          { id: 'tamil', label: '🪔 தமிழ் உயிர் எழுத்துக்கள்' },
          { id: 'number', label: '🔢 Numbers (1-10)' },
          { id: 'colors', label: '🎨 Shapes & Colors' },
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => {
              setSelectedCategory(cat.id as WorksheetCategory);
              const first = WORKSHEET_TEMPLATES.find((t) => t.category === cat.id);
              if (first) {
                setSelectedTemplate(first);
                clearCanvas();
              }
            }}
            className={`px-4 py-2.5 rounded-2xl font-black font-display text-xs transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white shadow-soft scale-102'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3. Main Workspace & Worksheet Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Template Selector & Inking Toolkit (Left) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-sky-600" />
                Select Worksheet:
              </span>
              <span className="text-xs font-bold text-sky-600">
                {filteredTemplates.length} sheets
              </span>
            </div>

            <div className="space-y-2">
              {filteredTemplates.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => handleSelectTemplate(tmpl)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    selectedTemplate.id === tmpl.id
                      ? 'border-sky-500 bg-sky-50 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl">{tmpl.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-black font-display text-slate-800 truncate">
                      {tmpl.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 truncate">{tmpl.age}</p>
                  </div>
                  {selectedTemplate.id === tmpl.id && (
                    <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Digital Inking Toolkit */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5 text-indigo-600" />
                Digital Pencil & Crayon:
              </span>
              <button
                type="button"
                onClick={clearCanvas}
                className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Clear All</span>
              </button>
            </div>

            {/* Colors */}
            <div className="flex items-center gap-2 justify-between">
              {BRUSH_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setBrushColor(c);
                    setIsEraser(false);
                  }}
                  className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                    brushColor === c && !isEraser
                      ? 'border-slate-900 scale-110 shadow-xs'
                      : 'border-white'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            {/* Tools & Brush Size */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEraser(false)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                  !isEraser ? 'bg-sky-500 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <PenTool className="h-3.5 w-3.5" />
                <span>Pencil</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEraser(true)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                  isEraser ? 'bg-rose-500 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Eraser className="h-3.5 w-3.5" />
                <span>Eraser</span>
              </button>
            </div>

            {/* Complete & Claim Reward Button */}
            <button
              type="button"
              onClick={handleSaveCompleted}
              className="w-full btn-press py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black font-display text-xs shadow-soft flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Complete Worksheet & Claim +10 Stars</span>
            </button>

            {savedSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-center text-xs font-black animate-pop-in">
                🎉 Great Work! Worksheet Completed & +10 Stars Awarded!
              </div>
            )}
          </div>
        </div>

        {/* Worksheet Print/Canvas Viewport (Right) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-8 shadow-soft border-2 border-slate-200 space-y-6 relative print:p-0 print:border-none print:shadow-none">
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
          <div
            ref={containerRef}
            className="relative bg-slate-50/50 rounded-2xl border border-slate-200 p-3 sm:p-4 select-none touch-none overflow-hidden"
          >
            {/* Background Guided Worksheet Content */}
            <div className="space-y-3 sm:space-y-4">
              {selectedTemplate.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="text-2xl font-black font-display text-slate-900 min-w-[45px]">
                      {item.char}
                    </span>
                    <span className="text-xs font-bold text-slate-500 sm:hidden">
                      {item.word}
                    </span>
                  </div>

                  {/* Dotted Tracing Handwriting Practice Line */}
                  <div className="flex-1 bg-sky-50/50 rounded-xl px-4 py-2 border-y-2 border-dashed border-sky-300 flex items-center justify-center overflow-x-auto no-scrollbar">
                    <span className="font-display font-black text-xl sm:text-2xl tracking-[0.25em] text-slate-400 select-none whitespace-nowrap">
                      {item.dotted}
                    </span>
                  </div>

                  <div className="hidden sm:block text-xs font-bold text-slate-600 min-w-[80px] text-right shrink-0">
                    {item.word}
                  </div>
                </div>
              ))}
            </div>

            {/* Foreground Digital Inking Canvas (Matches exact container width and height) */}
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="absolute inset-0 w-full h-full cursor-crosshair z-20 pointer-events-auto touch-none"
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
