import { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '@/lib/store';
import { soundEngine } from '@/lib/soundEngine';
import { HollowRoadStrokeGuide } from './HollowRoadStrokeGuide';
import {
  Sparkles,
  Volume2,
  CheckCircle2,
  RefreshCw,
  Award,
  BookOpen,
  Hash,
  Star,
  PenTool,
  RotateCcw,
  Maximize2,
  Minimize2,
  Eraser,
  Undo2,
  ChevronLeft,
  ChevronRight,
  PartyPopper,
  Palette,
  Eye,
  EyeOff,
  Music,
  Printer,
  Download,
  Flame,
  Check,
  Languages,
  Trophy,
  Image as ImageIcon,
  HelpCircle,
  Rocket,
  ArrowRight,
} from 'lucide-react';

export interface LetterItem {
  letter: string;
  lower: string;
  word: string;
  tamilWord: string;
  emoji: string;
  phonetic: string;
  exampleSentence: string;
  color: string;
  strokeSteps?: { step: number; x: number; y: number; label: string }[];
}

export interface TamilLetterItem {
  letter: string;
  transliteration: string;
  word: string;
  englishMeaning: string;
  emoji: string;
  phonetic: string;
  color: string;
}

export interface NumberItem {
  num: number;
  word: string;
  tamilWord: string;
  tamilNum: string;
  emoji: string;
  color: string;
}

export const ALPHABET_DATA: LetterItem[] = [
  { letter: 'A', lower: 'a', word: 'Apple', tamilWord: 'ஆப்பிள் (Aappil)', emoji: '🍎', phonetic: 'Ah', exampleSentence: 'A is for sweet red Apple', color: 'from-rose-500 to-red-600', strokeSteps: [{ step: 1, x: 25, y: 80, label: '1. Up-Left' }, { step: 2, x: 75, y: 80, label: '2. Down-Right' }, { step: 3, x: 50, y: 55, label: '3. Cross' }] },
  { letter: 'B', lower: 'b', word: 'Butterfly', tamilWord: 'பட்டாம்பூச்சி (Pattampoochi)', emoji: '🦋', phonetic: 'Buh', exampleSentence: 'B is for colorful Butterfly', color: 'from-blue-500 to-indigo-600', strokeSteps: [{ step: 1, x: 30, y: 20, label: '1. Down Line' }, { step: 2, x: 60, y: 35, label: '2. Top Loop' }, { step: 3, x: 60, y: 68, label: '3. Bottom Loop' }] },
  { letter: 'C', lower: 'c', word: 'Cat', tamilWord: 'பூனை (Poonai)', emoji: '🐱', phonetic: 'Kuh', exampleSentence: 'C is for cute playful Cat', color: 'from-amber-500 to-orange-600', strokeSteps: [{ step: 1, x: 75, y: 25, label: '1. Start Top' }, { step: 2, x: 25, y: 50, label: '2. Curve Left' }, { step: 3, x: 75, y: 75, label: '3. Curve Bottom' }] },
  { letter: 'D', lower: 'd', word: 'Dolphin', tamilWord: 'டால்பின் (Dolphin)', emoji: '🐬', phonetic: 'Duh', exampleSentence: 'D is for jumping Dolphin', color: 'from-cyan-500 to-blue-600' },
  { letter: 'E', lower: 'e', word: 'Elephant', tamilWord: 'யானை (Yaanai)', emoji: '🐘', phonetic: 'Eh', exampleSentence: 'E is for giant friendly Elephant', color: 'from-emerald-500 to-teal-600' },
  { letter: 'F', lower: 'f', word: 'Fish', tamilWord: 'மீன் (Meen)', emoji: '🐠', phonetic: 'Fff', exampleSentence: 'F is for shiny swimming Fish', color: 'from-sky-500 to-blue-500' },
  { letter: 'G', lower: 'g', word: 'Giraffe', tamilWord: 'ஒட்டகச்சிவிங்கி (Ottagachivingi)', emoji: '🦒', phonetic: 'Guh', exampleSentence: 'G is for tall Giraffe', color: 'from-yellow-500 to-amber-600' },
  { letter: 'H', lower: 'h', word: 'Horse', tamilWord: 'குதிரை (Kuthirai)', emoji: '🐴', phonetic: 'Huh', exampleSentence: 'H is for fast running Horse', color: 'from-amber-600 to-orange-700' },
  { letter: 'I', lower: 'i', word: 'Ice Cream', tamilWord: 'பனிக்கூழ் (Panikoozh)', emoji: '🍦', phonetic: 'Ih', exampleSentence: 'I is for yummy Ice Cream', color: 'from-pink-500 to-rose-600' },
  { letter: 'J', lower: 'j', word: 'Jungle', tamilWord: 'காடு (Kaadu)', emoji: '🌴', phonetic: 'Juh', exampleSentence: 'J is for green leafy Jungle', color: 'from-green-600 to-emerald-700' },
  { letter: 'K', lower: 'k', word: 'Kangaroo', tamilWord: 'கங்காரு (Kangaroo)', emoji: '🦘', phonetic: 'Kuh', exampleSentence: 'K is for hopping Kangaroo', color: 'from-orange-500 to-amber-600' },
  { letter: 'L', lower: 'l', word: 'Lion', tamilWord: 'சிங்கம் (Singam)', emoji: '🦁', phonetic: 'Lll', exampleSentence: 'L is for brave roaring Lion', color: 'from-amber-500 to-yellow-600' },
  { letter: 'M', lower: 'm', word: 'Mango', tamilWord: 'மாம்பழம் (Maambazham)', emoji: '🥭', phonetic: 'Mmm', exampleSentence: 'M is for sweet golden Mango', color: 'from-yellow-500 to-orange-500' },
  { letter: 'N', lower: 'n', word: 'Nest', tamilWord: 'கூடு (Koodu)', emoji: '🪺', phonetic: 'Nnn', exampleSentence: 'N is for cozy bird Nest', color: 'from-teal-600 to-emerald-700' },
  { letter: 'O', lower: 'o', word: 'Owl', tamilWord: 'ஆந்தை (Aanthai)', emoji: '🦉', phonetic: 'Oh', exampleSentence: 'O is for wise night Owl', color: 'from-indigo-500 to-purple-600' },
  { letter: 'P', lower: 'p', word: 'Peacock', tamilWord: 'மயில் (Mayil)', emoji: '🦚', phonetic: 'Puh', exampleSentence: 'P is for dancing beautiful Peacock', color: 'from-cyan-600 to-teal-700' },
  { letter: 'Q', lower: 'q', word: 'Queen', tamilWord: 'ராணி (Raani)', emoji: '👑', phonetic: 'Kwuh', exampleSentence: 'Q is for kind Queen with crown', color: 'from-purple-500 to-pink-600' },
  { letter: 'R', lower: 'r', word: 'Rainbow', tamilWord: 'வானவில் (Vaanavil)', emoji: '🌈', phonetic: 'Rrr', exampleSentence: 'R is for magical 7-color Rainbow', color: 'from-rose-500 to-violet-600' },
  { letter: 'S', lower: 's', word: 'Sun', tamilWord: 'சூரியன் (Sooriyan)', emoji: '☀️', phonetic: 'Sss', exampleSentence: 'S is for warm shining Sun', color: 'from-amber-400 to-orange-500' },
  { letter: 'T', lower: 't', word: 'Tiger', tamilWord: 'புலி (Puli)', emoji: '🐯', phonetic: 'Tuh', exampleSentence: 'T is for strong striped Tiger', color: 'from-orange-500 to-red-600' },
  { letter: 'U', lower: 'u', word: 'Umbrella', tamilWord: 'குடை (Kudai)', emoji: '☂️', phonetic: 'Uh', exampleSentence: 'U is for rainy day Umbrella', color: 'from-purple-500 to-indigo-600' },
  { letter: 'V', lower: 'v', word: 'Van', tamilWord: 'வாகனம் (Vaaganam)', emoji: '🚐', phonetic: 'Vvv', exampleSentence: 'V is for family adventure Van', color: 'from-blue-600 to-indigo-700' },
  { letter: 'W', lower: 'w', word: 'Watch', tamilWord: 'கடிகாரம் (Kadigaram)', emoji: '⌚', phonetic: 'Wuh', exampleSentence: 'W is for ticking wrist Watch', color: 'from-teal-500 to-cyan-600' },
  { letter: 'X', lower: 'x', word: 'Xylophone', tamilWord: 'சைலோஃபோன் (Xylophone)', emoji: '🎵', phonetic: 'Ks', exampleSentence: 'X is for musical Xylophone', color: 'from-pink-500 to-purple-600' },
  { letter: 'Y', lower: 'y', word: 'Yak', tamilWord: 'யாக் (Yak)', emoji: '🐂', phonetic: 'Yuh', exampleSentence: 'Y is for furry mountain Yak', color: 'from-amber-700 to-orange-800' },
  { letter: 'Z', lower: 'z', word: 'Zebra', tamilWord: 'வரிக்குதிரை (Varikkuthirai)', emoji: '🦓', phonetic: 'Zzz', exampleSentence: 'Z is for black & white Zebra', color: 'from-slate-700 to-slate-900' },
];

export const TAMIL_VOWEL_DATA: TamilLetterItem[] = [
  { letter: 'அ', transliteration: 'A', word: 'அம்மா', englishMeaning: 'Mother (Amma)', emoji: '👩', phonetic: 'Ah', color: 'from-rose-500 to-orange-500' },
  { letter: 'ஆ', transliteration: 'Aa', word: 'ஆடு', englishMeaning: 'Goat (Aadu)', emoji: '🐐', phonetic: 'Aah', color: 'from-amber-500 to-yellow-600' },
  { letter: 'இ', transliteration: 'I', word: 'இலை', englishMeaning: 'Leaf (Ilai)', emoji: '🍃', phonetic: 'Ee', color: 'from-emerald-500 to-teal-600' },
  { letter: 'ஈ', transliteration: 'Ee', word: 'ஈட்டி', englishMeaning: 'Spear (Eetti)', emoji: '🎯', phonetic: 'Eee', color: 'from-sky-500 to-blue-600' },
  { letter: 'உ', transliteration: 'U', word: 'உரல்', englishMeaning: 'Mortar (Ural)', emoji: '🥣', phonetic: 'Oo', color: 'from-indigo-500 to-purple-600' },
  { letter: 'ஊ', transliteration: 'Oo', word: 'ஊஞ்சல்', englishMeaning: 'Swing (Oonjal)', emoji: '🎪', phonetic: 'Ooo', color: 'from-purple-500 to-pink-600' },
  { letter: 'எ', transliteration: 'E', word: 'எலி', englishMeaning: 'Mouse (Eli)', emoji: '🐭', phonetic: 'Eh', color: 'from-orange-500 to-amber-600' },
  { letter: 'ஏ', transliteration: 'Ae', word: 'ஏணி', englishMeaning: 'Ladder (Eani)', emoji: '🪜', phonetic: 'Aay', color: 'from-teal-500 to-emerald-600' },
  { letter: 'ஐ', transliteration: 'Ai', word: 'ஐந்து', englishMeaning: 'Five (Ainthu)', emoji: '🖐️', phonetic: 'Eye', color: 'from-cyan-500 to-blue-600' },
  { letter: 'ஒ', transliteration: 'O', word: 'ஒட்டகம்', englishMeaning: 'Camel (Ottagam)', emoji: '🐪', phonetic: 'Oh', color: 'from-yellow-500 to-amber-600' },
  { letter: 'ஓ', transliteration: 'Oo', word: 'ஓடம்', englishMeaning: 'Boat (Odam)', emoji: '⛵', phonetic: 'Oah', color: 'from-blue-600 to-indigo-700' },
  { letter: 'ஔ', transliteration: 'Au', word: 'ஔவையார்', englishMeaning: 'Wise Poet (Avvaiyar)', emoji: '📜', phonetic: 'Oww', color: 'from-violet-500 to-purple-700' },
  { letter: 'ஃ', transliteration: 'Ayutham', word: 'எஃகு', englishMeaning: 'Steel Shield (Ehgu)', emoji: '🛡️', phonetic: 'Akh', color: 'from-slate-600 to-slate-800' },
];

export const NUMBER_DATA: NumberItem[] = [
  { num: 1, word: 'One', tamilWord: 'ஒன்று (Ondru)', tamilNum: '௧', emoji: '🌞', color: 'from-amber-400 to-orange-500' },
  { num: 2, word: 'Two', tamilWord: 'இரண்டு (Irandu)', tamilNum: '௨', emoji: '🍎', color: 'from-rose-500 to-red-600' },
  { num: 3, word: 'Three', tamilWord: 'மூன்று (Moondru)', tamilNum: '௩', emoji: '🌟', color: 'from-yellow-400 to-amber-500' },
  { num: 4, word: 'Four', tamilWord: 'நான்கு (Naangu)', tamilNum: '௪', emoji: '🐬', color: 'from-cyan-500 to-blue-600' },
  { num: 5, word: 'Five', tamilWord: 'ஐந்து (Ainthu)', tamilNum: '௫', emoji: '🦋', color: 'from-emerald-500 to-teal-600' },
  { num: 6, word: 'Six', tamilWord: 'ஆறு (Aaru)', tamilNum: '௬', emoji: '🌸', color: 'from-pink-500 to-rose-600' },
  { num: 7, word: 'Seven', tamilWord: 'ஏழு (Ezhu)', tamilNum: '௭', emoji: '🌈', color: 'from-indigo-500 to-purple-600' },
  { num: 8, word: 'Eight', tamilWord: 'எட்டு (Ettu)', tamilNum: '௮', emoji: '💎', color: 'from-teal-500 to-cyan-600' },
  { num: 9, word: 'Nine', tamilWord: 'ஒன்பது (Onbathu)', tamilNum: '௯', emoji: '🎈', color: 'from-purple-500 to-pink-600' },
  { num: 10, word: 'Ten', tamilWord: 'பத்து (Pathu)', tamilNum: '௰', emoji: '❤️', color: 'from-red-500 to-rose-600' },
  { num: 11, word: 'Eleven', tamilWord: 'பதினொன்று', tamilNum: '௰௧', emoji: '⭐', color: 'from-sky-500 to-indigo-600' },
  { num: 12, word: 'Twelve', tamilWord: 'பன்னிரண்டு', tamilNum: '௰௨', emoji: '🧁', color: 'from-pink-500 to-amber-500' },
  { num: 13, word: 'Thirteen', tamilWord: 'பதின்மூன்று', tamilNum: '௰௩', emoji: '🚀', color: 'from-blue-600 to-purple-600' },
  { num: 14, word: 'Fourteen', tamilWord: 'பதினான்கு', tamilNum: '௰௪', emoji: '🍀', color: 'from-emerald-600 to-green-600' },
  { num: 15, word: 'Fifteen', tamilWord: 'பதினைந்து', tamilNum: '௰௫', emoji: '🍉', color: 'from-red-500 to-green-500' },
  { num: 16, word: 'Sixteen', tamilWord: 'பதினாறு', tamilNum: '௰௬', emoji: '🎨', color: 'from-violet-500 to-purple-600' },
  { num: 17, word: 'Seventeen', tamilWord: 'பதினேழு', tamilNum: '௰௭', emoji: '🦁', color: 'from-amber-600 to-orange-600' },
  { num: 18, word: 'Eighteen', tamilWord: 'பதினெட்டு', tamilNum: '௰௮', emoji: '⛵', color: 'from-cyan-600 to-blue-700' },
  { num: 19, word: 'Nineteen', tamilWord: 'பத்தொன்பது', tamilNum: '௰௯', emoji: '🪐', color: 'from-indigo-600 to-blue-800' },
  { num: 20, word: 'Twenty', tamilWord: 'இருபது (Irubathu)', tamilNum: '௨௰', emoji: '👑', color: 'from-amber-500 to-yellow-600' },
];

const BRUSH_COLORS = [
  { id: 'sky', name: 'Sky Blue', hex: '#0284c7', bg: 'bg-sky-500' },
  { id: 'amber', name: 'Sunshine', hex: '#f59e0b', bg: 'bg-amber-500' },
  { id: 'rose', name: 'Berry Red', hex: '#e11d48', bg: 'bg-rose-500' },
  { id: 'emerald', name: 'Green', hex: '#10b981', bg: 'bg-emerald-500' },
  { id: 'purple', name: 'Purple', hex: '#9333ea', bg: 'bg-purple-600' },
  { id: 'pink', name: 'Bubblegum', hex: '#ec4899', bg: 'bg-pink-500' },
  { id: 'orange', name: 'Orange', hex: '#ea580c', bg: 'bg-orange-500' },
  { id: 'rainbow', name: 'Magic Rainbow', hex: 'rainbow', bg: 'bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 to-indigo-500' },
];

const BRUSH_SIZES = [
  { id: 'thin', label: 'Pencil', size: 8, icon: '✏️' },
  { id: 'medium', label: 'Crayon', size: 16, icon: '🖍️' },
  { id: 'thick', label: 'Marker', size: 26, icon: '🪄' },
];

interface StrokePath {
  color: string;
  size: number;
  isEraser: boolean;
  isRainbow: boolean;
  points: { x: number; y: number }[];
}

export function AlphabetNumberHub() {
  const { addStars } = useApp();
  const [activeTab, setActiveTab] = useState<'alphabets' | 'tamil' | 'numbers' | 'passport' | 'quiz'>('alphabets');
  const [selectedLetter, setSelectedLetter] = useState<LetterItem>(ALPHABET_DATA[0]);
  const [selectedTamil, setSelectedTamil] = useState<TamilLetterItem>(TAMIL_VOWEL_DATA[0]);
  const [selectedNumber, setSelectedNumber] = useState<NumberItem>(NUMBER_DATA[0]);

  // Tracing Studio Settings
  const [isBroadView, setIsBroadView] = useState(false);
  const [letterTraceMode, setLetterTraceMode] = useState<'upper' | 'lower' | 'both' | 'word' | 'free'>('upper');
  const [numberTraceMode, setNumberTraceMode] = useState<'num' | 'word' | 'tamil' | 'free'>('num');
  const [brushColor, setBrushColor] = useState<string>('#0284c7');
  const [brushSize, setBrushSize] = useState<number>(16);
  const [isEraser, setIsEraser] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [showGuideLetter, setShowGuideLetter] = useState(true);
  const [showStrokeOrder, setShowStrokeOrder] = useState(true);
  const [musicalPenEnabled, setMusicalPenEnabled] = useState(true);
  const [celebrationMessage, setCelebrationMessage] = useState<string | null>(null);

  // Auto Completion & Accuracy Coverage
  const [tracingProgress, setTracingProgress] = useState(0);
  const hasAutoCelebratedRef = useRef(false);

  // Auto-Advance & Rocket Transition State
  const [autoAdvanceData, setAutoAdvanceData] = useState<{
    isOpen: boolean;
    currentId: string;
    currentTitle: string;
    currentEmoji: string;
    nextId: string;
    nextTitle: string;
    nextEmoji: string;
    type: 'alphabets' | 'tamil' | 'numbers';
    nextItem: LetterItem | TamilLetterItem | NumberItem;
    countdown: number;
  }>({
    isOpen: false,
    currentId: 'A',
    currentTitle: 'Apple',
    currentEmoji: '🍎',
    nextId: 'B',
    nextTitle: 'Butterfly',
    nextEmoji: '🦋',
    type: 'alphabets',
    nextItem: ALPHABET_DATA[1],
    countdown: 3,
  });

  // Gamification & Saved Gallery
  const [masteredLetters, setMasteredLetters] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('kidora_mastered_letters');
      return stored ? JSON.parse(stored) : ['A', '1'];
    } catch {
      return ['A', '1'];
    }
  });

  const [savedGallery, setSavedGallery] = useState<{ id: string; title: string; date: string; dataUrl: string }[]>(() => {
    try {
      const stored = localStorage.getItem('kidora_traced_gallery');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [dailyQuestCount, setDailyQuestCount] = useState<number>(() => {
    try {
      const dateKey = `kidora_quest_${new Date().toISOString().slice(0, 10)}`;
      return parseInt(localStorage.getItem(dateKey) || '0', 10);
    } catch {
      return 0;
    }
  });

  // Printable Worksheet Modal State
  const [worksheetModalOpen, setWorksheetModalOpen] = useState(false);

  // Drawing Canvas & History
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const strokesRef = useRef<StrokePath[]>([]);
  const currentStrokeRef = useRef<StrokePath | null>(null);
  const [strokeCount, setStrokeCount] = useState(0);
  const pointCounterRef = useRef(0);

  // Quiz State
  const [quizQuestion, setQuizQuestion] = useState<{
    type: 'letter' | 'number' | 'tamil';
    prompt: string;
    correct: string;
    options: string[];
  }>({
    type: 'letter',
    prompt: 'Which letter is for 🍎 Apple?',
    correct: 'A',
    options: ['A', 'B', 'M', 'S'],
  });
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Speak helper
  const speakText = (text: string) => {
    soundEngine.speak(text);
  };

  // Record Mastered Letter / Number to LocalStorage and Parent Dashboard
  const recordMastery = useCallback((characterId: string) => {
    setMasteredLetters((prev) => {
      if (!prev.includes(characterId)) {
        const next = [...prev, characterId];
        try {
          localStorage.setItem('kidora_mastered_letters', JSON.stringify(next));

          // Also update parent dashboard tracking summary
          const masterySummary = {
            lettersMastered: next.filter((c) => /^[A-Z]$/.test(c)),
            numbersMastered: next.filter((c) => /^\d+$/.test(c)),
            tamilMastered: next.filter((c) => /^[\u0B80-\u0BFF]+$/.test(c)),
            totalCount: next.length,
            lastPracticedAt: new Date().toISOString(),
          };
          localStorage.setItem('kidora_tracing_mastery', JSON.stringify(masterySummary));
        } catch {}
        return next;
      }
      return prev;
    });

    // Update Daily Quest
    const dateKey = `kidora_quest_${new Date().toISOString().slice(0, 10)}`;
    setDailyQuestCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem(dateKey, String(next));
      } catch {}
      if (next === 3) {
        soundEngine.playCelebration();
        addStars(15);
        speakText('Hooray! You completed all 3 Daily Tracing Quests! +15 Bonus Gold Stars!');
      }
      return next;
    });
  }, [addStars]);

  // Re-draw all strokes onto canvas
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const stroke of strokesRef.current) {
      if (stroke.points.length === 0) continue;
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = stroke.size * 1.5;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth = stroke.size;

        if (stroke.isRainbow && stroke.points.length > 1) {
          const start = stroke.points[0];
          const end = stroke.points[stroke.points.length - 1];
          const grad = ctx.createLinearGradient(start.x, start.y, end.x || start.x + 100, end.y || start.y + 100);
          grad.addColorStop(0, '#ef4444');
          grad.addColorStop(0.25, '#f59e0b');
          grad.addColorStop(0.5, '#10b981');
          grad.addColorStop(0.75, '#06b6d4');
          grad.addColorStop(1, '#8b5cf6');
          ctx.strokeStyle = grad;
        } else {
          ctx.strokeStyle = stroke.color;
        }
      }

      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    }

    ctx.globalCompositeOperation = 'source-over';
  }, []);

  // Sync canvas width and height based on DOM container
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
  }, [updateCanvasDimensions, isBroadView, activeTab]);

  // Current Character ID
  const getCurrentCharacterId = () => {
    if (activeTab === 'alphabets') return selectedLetter.letter;
    if (activeTab === 'tamil') return selectedTamil.letter;
    return String(selectedNumber.num);
  };

  // Navigations
  const currentIndexLetter = ALPHABET_DATA.findIndex((l) => l.letter === selectedLetter.letter);
  const handlePrevLetter = () => {
    const nextIdx = (currentIndexLetter - 1 + ALPHABET_DATA.length) % ALPHABET_DATA.length;
    handleSelectLetter(ALPHABET_DATA[nextIdx]);
  };
  const handleNextLetter = () => {
    const nextIdx = (currentIndexLetter + 1) % ALPHABET_DATA.length;
    handleSelectLetter(ALPHABET_DATA[nextIdx]);
  };

  const currentIndexTamil = TAMIL_VOWEL_DATA.findIndex((t) => t.letter === selectedTamil.letter);
  const handlePrevTamil = () => {
    const nextIdx = (currentIndexTamil - 1 + TAMIL_VOWEL_DATA.length) % TAMIL_VOWEL_DATA.length;
    handleSelectTamil(TAMIL_VOWEL_DATA[nextIdx]);
  };
  const handleNextTamil = () => {
    const nextIdx = (currentIndexTamil + 1) % TAMIL_VOWEL_DATA.length;
    handleSelectTamil(TAMIL_VOWEL_DATA[nextIdx]);
  };

  const currentIndexNumber = NUMBER_DATA.findIndex((n) => n.num === selectedNumber.num);
  const handlePrevNumber = () => {
    const nextIdx = (currentIndexNumber - 1 + NUMBER_DATA.length) % NUMBER_DATA.length;
    handleSelectNumber(NUMBER_DATA[nextIdx]);
  };
  const handleNextNumber = () => {
    const nextIdx = (currentIndexNumber + 1) % NUMBER_DATA.length;
    handleSelectNumber(NUMBER_DATA[nextIdx]);
  };

  const handleSelectLetter = (item: LetterItem) => {
    setSelectedLetter(item);
    soundEngine.playPop();
    speakText(`${item.letter}. ${item.word}.`);
    clearCanvas();
  };

  const handleSelectTamil = (item: TamilLetterItem) => {
    setSelectedTamil(item);
    soundEngine.playPop();
    speakText(`${item.phonetic}. ${item.word}. ${item.englishMeaning}.`);
    clearCanvas();
  };

  const handleSelectNumber = (item: NumberItem) => {
    setSelectedNumber(item);
    soundEngine.playPop();
    speakText(`${item.num}. ${item.word}.`);
    clearCanvas();
  };

  // Coordinate Calculation
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  // Drawing Handlers with Musical Crayon & Smart Auto Coverage Detection
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const coords = getCanvasCoords(e);

    setIsDrawing(true);
    soundEngine.triggerHaptic('light');

    if (musicalPenEnabled && !isEraser) {
      pointCounterRef.current += 1;
      soundEngine.playMusicalCrayonNote(pointCounterRef.current);
    }

    const newStroke: StrokePath = {
      color: brushColor,
      size: brushSize,
      isEraser,
      isRainbow: brushColor === 'rainbow',
      points: [coords],
    };
    currentStrokeRef.current = newStroke;
    strokesRef.current.push(newStroke);
    setStrokeCount(strokesRef.current.length);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.arc(coords.x, coords.y, isEraser ? (brushSize * 1.5) / 2 : brushSize / 2, 0, Math.PI * 2);
      if (isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fill();
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = brushColor === 'rainbow' ? '#ef4444' : brushColor;
        ctx.fill();
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStrokeRef.current) return;
    e.preventDefault();
    const coords = getCanvasCoords(e);
    currentStrokeRef.current.points.push(coords);

    // Musical pen sound note progression
    pointCounterRef.current += 1;
    if (musicalPenEnabled && !isEraser && pointCounterRef.current % 5 === 0) {
      soundEngine.playMusicalCrayonNote(Math.floor(pointCounterRef.current / 5));
    }

    redrawCanvas();

    // Auto-calculate coverage progress
    if (!hasAutoCelebratedRef.current) {
      const totalPoints = strokesRef.current.reduce((acc, s) => acc + s.points.length, 0);
      const estProgress = Math.min(100, Math.round((totalPoints / 60) * 100));
      setTracingProgress(estProgress);

      if (estProgress >= 90) {
        hasAutoCelebratedRef.current = true;
        handleCelebrate(true);
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    currentStrokeRef.current = null;
  };

  const clearCanvas = () => {
    strokesRef.current = [];
    currentStrokeRef.current = null;
    setStrokeCount(0);
    setTracingProgress(0);
    hasAutoCelebratedRef.current = false;
    pointCounterRef.current = 0;
    setCelebrationMessage(null);
    redrawCanvas();
  };

  const undoLastStroke = () => {
    if (strokesRef.current.length > 0) {
      strokesRef.current.pop();
      setStrokeCount(strokesRef.current.length);
      redrawCanvas();
    }
  };

  const applyAdvanceToNext = useCallback(() => {
    setAutoAdvanceData((prev) => {
      if (!prev.isOpen) return prev;
      const { type, nextItem } = prev;

      if (type === 'alphabets') {
        const item = nextItem as LetterItem;
        setSelectedLetter(item);
        soundEngine.playCelebration();
        speakText(`${item.letter}. ${item.word}.`);
      } else if (type === 'tamil') {
        const item = nextItem as TamilLetterItem;
        setSelectedTamil(item);
        soundEngine.playCelebration();
        speakText(`${item.phonetic}. ${item.word}. ${item.englishMeaning}.`);
      } else if (type === 'numbers') {
        const item = nextItem as NumberItem;
        setSelectedNumber(item);
        soundEngine.playCelebration();
        speakText(`${item.num}. ${item.word}.`);
      }

      return { ...prev, isOpen: false };
    });
    clearCanvas();
  }, [speakText]);

  // Countdown timer for automatic transition
  useEffect(() => {
    if (!autoAdvanceData.isOpen) return;
    if (autoAdvanceData.countdown <= 0) {
      applyAdvanceToNext();
      return;
    }
    const timer = setTimeout(() => {
      setAutoAdvanceData((prev) => {
        if (!prev.isOpen) return prev;
        if (prev.countdown <= 1) {
          return { ...prev, countdown: 0 };
        }
        return { ...prev, countdown: prev.countdown - 1 };
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [autoAdvanceData.isOpen, autoAdvanceData.countdown, applyAdvanceToNext]);

  const handleCelebrate = (isAuto = false) => {
    const charId = getCurrentCharacterId();
    addStars(5);
    soundEngine.playCelebration();
    soundEngine.triggerHaptic('success');
    recordMastery(charId);

    let currentTitle = '';
    let currentEmoji = '';
    let nextId = '';
    let nextTitle = '';
    let nextEmoji = '';
    let nextItem: LetterItem | TamilLetterItem | NumberItem;

    if (activeTab === 'alphabets') {
      currentTitle = selectedLetter.word;
      currentEmoji = selectedLetter.emoji;
      const nextIdx = (currentIndexLetter + 1) % ALPHABET_DATA.length;
      const next = ALPHABET_DATA[nextIdx];
      nextId = next.letter;
      nextTitle = next.word;
      nextEmoji = next.emoji;
      nextItem = next;
      speakText(`Superstar! Letter ${selectedLetter.letter} for ${selectedLetter.word} mastered! Zooming to letter ${next.letter} for ${next.word}!`);
    } else if (activeTab === 'tamil') {
      currentTitle = selectedTamil.word;
      currentEmoji = selectedTamil.emoji;
      const nextIdx = (currentIndexTamil + 1) % TAMIL_VOWEL_DATA.length;
      const next = TAMIL_VOWEL_DATA[nextIdx];
      nextId = next.letter;
      nextTitle = next.word;
      nextEmoji = next.emoji;
      nextItem = next;
      speakText(`அற்புதம்! ${selectedTamil.letter} ${selectedTamil.word} முடிந்தது! அடுத்து ${next.letter} ${next.word}!`);
    } else {
      currentTitle = selectedNumber.word;
      currentEmoji = selectedNumber.emoji;
      const nextIdx = (currentIndexNumber + 1) % NUMBER_DATA.length;
      const next = NUMBER_DATA[nextIdx];
      nextId = String(next.num);
      nextTitle = next.word;
      nextEmoji = next.emoji;
      nextItem = next;
      speakText(`Awesome! Number ${selectedNumber.num} mastered! Next is number ${next.num}!`);
    }

    const msg = `🎉 ${isAuto ? 'Auto Mastered!' : 'Superstar!'} ${charId} Traced! +5 Gold Stars! ⭐`;
    setCelebrationMessage(msg);

    setAutoAdvanceData({
      isOpen: true,
      currentId: charId,
      currentTitle,
      currentEmoji,
      nextId,
      nextTitle,
      nextEmoji,
      type: activeTab === 'tamil' ? 'tamil' : activeTab === 'numbers' ? 'numbers' : 'alphabets',
      nextItem,
      countdown: 3,
    });
  };

  const handleSaveToGallery = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const item = {
        id: `trace_${Date.now()}`,
        title: `${getCurrentCharacterId()} Tracing Art`,
        date: new Date().toLocaleDateString(),
        dataUrl,
      };
      const next = [item, ...savedGallery.slice(0, 19)];
      setSavedGallery(next);
      localStorage.setItem('kidora_traced_gallery', JSON.stringify(next));
      soundEngine.playStarDing();
      speakText('Saved your lovely artwork to your Kidora Gallery!');
      setCelebrationMessage('🖼️ Saved to My Art Gallery! ⭐');
      setTimeout(() => setCelebrationMessage(null), 2500);
    } catch {}
  };

  // Phonics Rhyme Player
  const handlePlayPhonicsRhyme = () => {
    if (activeTab === 'alphabets') {
      soundEngine.playPhonicsJingle(selectedLetter.letter, selectedLetter.word, selectedLetter.phonetic);
    } else if (activeTab === 'tamil') {
      soundEngine.playCelebration();
      setTimeout(() => {
        speakText(`${selectedTamil.phonetic} for ${selectedTamil.word}! ${selectedTamil.phonetic}, ${selectedTamil.phonetic}, ${selectedTamil.word}! ${selectedTamil.englishMeaning}!`);
      }, 300);
    } else {
      soundEngine.playCelebration();
      setTimeout(() => {
        speakText(`Number ${selectedNumber.num}! Let's count ${selectedNumber.num} ${selectedNumber.word}!`);
      }, 300);
    }
  };

  // Generate Next Quiz Question
  const generateQuiz = () => {
    setQuizFeedback(null);
    const quizTypes: ('letter' | 'number' | 'tamil')[] = ['letter', 'number', 'tamil'];
    const selectedType = quizTypes[Math.floor(Math.random() * quizTypes.length)];

    if (selectedType === 'letter') {
      const target = ALPHABET_DATA[Math.floor(Math.random() * ALPHABET_DATA.length)];
      const others = ALPHABET_DATA.filter((l) => l.letter !== target.letter)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((l) => l.letter);
      const options = [target.letter, ...others].sort(() => Math.random() - 0.5);

      setQuizQuestion({
        type: 'letter',
        prompt: `Which letter is for ${target.emoji} ${target.word}?`,
        correct: target.letter,
        options,
      });
      speakText(`Which letter is for ${target.word}?`);
    } else if (selectedType === 'tamil') {
      const target = TAMIL_VOWEL_DATA[Math.floor(Math.random() * TAMIL_VOWEL_DATA.length)];
      const others = TAMIL_VOWEL_DATA.filter((t) => t.letter !== target.letter)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((t) => t.letter);
      const options = [target.letter, ...others].sort(() => Math.random() - 0.5);

      setQuizQuestion({
        type: 'tamil',
        prompt: `எந்த எழுத்து ${target.emoji} "${target.word}" க்கு வரும்?`,
        correct: target.letter,
        options,
      });
      speakText(`எந்த எழுத்து ${target.word} க்கு வரும்?`);
    } else {
      const target = NUMBER_DATA[Math.floor(Math.random() * 10)];
      const others = NUMBER_DATA.filter((n) => n.num !== target.num)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((n) => String(n.num));
      const options = [String(target.num), ...others].sort(() => Math.random() - 0.5);

      setQuizQuestion({
        type: 'number',
        prompt: `How many ${target.emoji} do you see: ${Array(target.num).fill(target.emoji).join(' ')}?`,
        correct: String(target.num),
        options,
      });
      speakText(`Count the items! How many are there?`);
    }
  };

  const handleAnswerQuiz = (choice: string) => {
    if (choice === quizQuestion.correct) {
      soundEngine.playCelebration();
      setQuizFeedback({ isCorrect: true, message: '🎉 Brilliant Job! That is Correct! +5 Stars!' });
      addStars(5);
      speakText('Brilliant job! That is correct!');
      setTimeout(() => {
        generateQuiz();
      }, 2000);
    } else {
      soundEngine.playWrong();
      setQuizFeedback({ isCorrect: false, message: 'Try again! You can do it! 💪' });
      speakText('Oops! Try again!');
    }
  };

  // Guide Character Text Resolution
  const getGuideText = () => {
    if (!showGuideLetter) return '';
    if (activeTab === 'alphabets') {
      if (letterTraceMode === 'upper') return selectedLetter.letter;
      if (letterTraceMode === 'lower') return selectedLetter.lower;
      if (letterTraceMode === 'both') return `${selectedLetter.letter} ${selectedLetter.lower}`;
      if (letterTraceMode === 'word') return selectedLetter.word;
      return '';
    } else if (activeTab === 'tamil') {
      return selectedTamil.letter;
    } else {
      if (numberTraceMode === 'num') return String(selectedNumber.num);
      if (numberTraceMode === 'word') return selectedNumber.word;
      if (numberTraceMode === 'tamil') return selectedNumber.tamilNum;
      return '';
    }
  };

  // Render the Tracing Studio Canvas & Controls
  const renderPracticeStudio = (isExpanded: boolean) => {
    const guideText = getGuideText();
    const isMastered = masteredLetters.includes(getCurrentCharacterId());

    return (
      <div
        className={`bg-white rounded-3xl shadow-soft border border-slate-200 p-4 sm:p-6 space-y-4 flex flex-col ${
          isExpanded ? 'h-full max-w-6xl mx-auto w-full' : ''
        }`}
      >
        {/* Studio Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-sky-100 text-sky-700">
              <PenTool className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black font-display text-slate-800 flex items-center gap-1.5">
                  <span>
                    {activeTab === 'alphabets'
                      ? `Trace & Write Letter "${selectedLetter.letter}"`
                      : activeTab === 'tamil'
                      ? `தமிழ் உயிர் எழுத்து "${selectedTamil.letter}"`
                      : `Practice & Trace Number "${selectedNumber.num}"`}
                  </span>
                  {isMastered && (
                    <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-500" /> Mastered
                    </span>
                  )}
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    speakText(
                      activeTab === 'alphabets'
                        ? `${selectedLetter.letter}. ${selectedLetter.word}.`
                        : activeTab === 'tamil'
                        ? `${selectedTamil.phonetic}. ${selectedTamil.word}. ${selectedTamil.englishMeaning}.`
                        : `${selectedNumber.num}. ${selectedNumber.word}.`
                    )
                  }
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-sky-100 text-slate-600 hover:text-sky-600 transition-colors"
                  title="Hear Pronunciation"
                >
                  <Volume2 className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={handlePlayPhonicsRhyme}
                  className="btn-press px-2 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-[11px] font-black flex items-center gap-1 transition-colors"
                  title="Play Catchy Rhyme"
                >
                  <Music className="h-3.5 w-3.5 text-amber-600" />
                  <span>Jingle</span>
                </button>
              </div>

              {/* Real-time Progress Bar & Smart Coverage Meter */}
              <div className="flex items-center gap-2 mt-1">
                <div className="w-32 bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-400 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${tracingProgress}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-500">
                  {tracingProgress}% Traced {tracingProgress >= 80 ? '🌟 High Five!' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Controls, Musical Crayon, Printable, & Broad View Toggle */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Musical Pen Toggle */}
            <button
              type="button"
              onClick={() => setMusicalPenEnabled(!musicalPenEnabled)}
              className={`p-2 rounded-2xl text-xs font-bold flex items-center gap-1 transition-colors border ${
                musicalPenEnabled
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}
              title={musicalPenEnabled ? 'Musical Pen ON (Xylophone Tones)' : 'Musical Pen OFF'}
            >
              <Music className={`h-4 w-4 ${musicalPenEnabled ? 'text-amber-500' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Singing Pen</span>
            </button>

            {/* Printable Worksheet Button */}
            <button
              type="button"
              onClick={() => setWorksheetModalOpen(true)}
              className="p-2 rounded-2xl bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 text-xs font-bold flex items-center gap-1 transition-colors"
              title="Printable A4 Practice Sheet"
            >
              <Printer className="h-4 w-4 text-sky-600" />
              <span className="hidden sm:inline">A4 Sheet</span>
            </button>

            {/* Prev / Next Quick Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl">
              <button
                type="button"
                onClick={
                  activeTab === 'alphabets'
                    ? handlePrevLetter
                    : activeTab === 'tamil'
                    ? handlePrevTamil
                    : handlePrevNumber
                }
                className="p-2 rounded-xl hover:bg-white text-slate-700 transition-colors"
                title="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-2 font-black font-display text-xs text-slate-800 min-w-[24px] text-center">
                {activeTab === 'alphabets'
                  ? selectedLetter.letter
                  : activeTab === 'tamil'
                  ? selectedTamil.letter
                  : selectedNumber.num}
              </span>
              <button
                type="button"
                onClick={
                  activeTab === 'alphabets'
                    ? handleNextLetter
                    : activeTab === 'tamil'
                    ? handleNextTamil
                    : handleNextNumber
                }
                className="p-2 rounded-xl hover:bg-white text-slate-700 transition-colors"
                title="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Broad View Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsBroadView(!isBroadView)}
              className={`btn-press px-3 py-2 rounded-2xl text-xs font-black font-display flex items-center gap-1.5 cursor-pointer transition-all border ${
                isBroadView
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-soft hover:shadow-pop border-transparent'
              }`}
              title={isBroadView ? 'Exit Broad View' : 'Open Big Broad View Studio'}
            >
              {isBroadView ? (
                <>
                  <Minimize2 className="h-4 w-4" />
                  <span>Compact</span>
                </>
              ) : (
                <>
                  <Maximize2 className="h-4 w-4" />
                  <span>Big Broad View</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tracing Mode Selector Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {activeTab === 'alphabets' ? (
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setLetterTraceMode('upper');
                  setShowGuideLetter(true);
                }}
                className={`btn-press px-3 py-1.5 rounded-xl text-xs font-black font-display transition-all ${
                  letterTraceMode === 'upper' && showGuideLetter
                    ? 'bg-white text-sky-700 shadow-soft'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Capital ({selectedLetter.letter})
              </button>
              <button
                type="button"
                onClick={() => {
                  setLetterTraceMode('lower');
                  setShowGuideLetter(true);
                }}
                className={`btn-press px-3 py-1.5 rounded-xl text-xs font-black font-display transition-all ${
                  letterTraceMode === 'lower' && showGuideLetter
                    ? 'bg-white text-sky-700 shadow-soft'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Small ({selectedLetter.lower})
              </button>
              <button
                type="button"
                onClick={() => {
                  setLetterTraceMode('both');
                  setShowGuideLetter(true);
                }}
                className={`btn-press px-3 py-1.5 rounded-xl text-xs font-black font-display transition-all ${
                  letterTraceMode === 'both' && showGuideLetter
                    ? 'bg-white text-sky-700 shadow-soft'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Both ({selectedLetter.letter} {selectedLetter.lower})
              </button>
              <button
                type="button"
                onClick={() => {
                  setLetterTraceMode('word');
                  setShowGuideLetter(true);
                }}
                className={`btn-press px-3 py-1.5 rounded-xl text-xs font-black font-display transition-all ${
                  letterTraceMode === 'word' && showGuideLetter
                    ? 'bg-white text-sky-700 shadow-soft'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Word ({selectedLetter.word})
              </button>
              <button
                type="button"
                onClick={() => {
                  setLetterTraceMode('free');
                  setShowGuideLetter(false);
                }}
                className={`btn-press px-3 py-1.5 rounded-xl text-xs font-black font-display transition-all ${
                  letterTraceMode === 'free' || !showGuideLetter
                    ? 'bg-amber-400 text-slate-950 shadow-soft'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🎨 Blank Canvas
              </button>
            </div>
          ) : activeTab === 'tamil' ? (
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl">
              <span className="text-xs font-bold text-slate-600 px-2">
                உயிர் எழுத்து: <strong className="text-slate-900">{selectedTamil.letter}</strong> ({selectedTamil.transliteration})
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {selectedTamil.word} ({selectedTamil.englishMeaning})
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setNumberTraceMode('num');
                  setShowGuideLetter(true);
                }}
                className={`btn-press px-3 py-1.5 rounded-xl text-xs font-black font-display transition-all ${
                  numberTraceMode === 'num' && showGuideLetter
                    ? 'bg-white text-emerald-700 shadow-soft'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Number ({selectedNumber.num})
              </button>
              <button
                type="button"
                onClick={() => {
                  setNumberTraceMode('word');
                  setShowGuideLetter(true);
                }}
                className={`btn-press px-3 py-1.5 rounded-xl text-xs font-black font-display transition-all ${
                  numberTraceMode === 'word' && showGuideLetter
                    ? 'bg-white text-emerald-700 shadow-soft'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Word ({selectedNumber.word})
              </button>
              <button
                type="button"
                onClick={() => {
                  setNumberTraceMode('tamil');
                  setShowGuideLetter(true);
                }}
                className={`btn-press px-3 py-1.5 rounded-xl text-xs font-black font-display transition-all ${
                  numberTraceMode === 'tamil' && showGuideLetter
                    ? 'bg-white text-emerald-700 shadow-soft'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tamil ({selectedNumber.tamilNum})
              </button>
              <button
                type="button"
                onClick={() => {
                  setNumberTraceMode('free');
                  setShowGuideLetter(false);
                }}
                className={`btn-press px-3 py-1.5 rounded-xl text-xs font-black font-display transition-all ${
                  numberTraceMode === 'free' || !showGuideLetter
                    ? 'bg-amber-400 text-slate-950 shadow-soft'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🎨 Blank Canvas
              </button>
            </div>
          )}

          {/* Guideline & Stroke Order Toggles */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowStrokeOrder(!showStrokeOrder)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border ${
                showStrokeOrder
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Stroke Order</span>
            </button>

            <button
              type="button"
              onClick={() => setShowGuidelines(!showGuidelines)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border ${
                showGuidelines
                  ? 'bg-sky-50 text-sky-700 border-sky-200'
                  : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}
            >
              {showGuidelines ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              <span>4-Line Guide</span>
            </button>
          </div>
        </div>

        {/* Drawing Tools Ribbon (Colors, Sizes, Eraser, Undo, Clear) */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brush Colors */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-black text-slate-500 flex items-center gap-1 mr-1">
              <Palette className="h-3.5 w-3.5" /> Color:
            </span>
            {BRUSH_COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setBrushColor(c.hex);
                  setIsEraser(false);
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${c.bg} transition-all transform cursor-pointer flex items-center justify-center ${
                  !isEraser && brushColor === c.hex
                    ? 'ring-4 ring-sky-400 scale-110 shadow-soft'
                    : 'hover:scale-105 opacity-90'
                }`}
                title={c.name}
              >
                {!isEraser && brushColor === c.hex && <div className="w-2 h-2 bg-white rounded-full" />}
              </button>
            ))}
          </div>

          {/* Brush Sizes, Eraser, Undo, Clear Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Sizes */}
            <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              {BRUSH_SIZES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setBrushSize(s.size)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                    brushSize === s.size ? 'bg-sky-100 text-sky-800' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title={`${s.label} (${s.size}px)`}
                >
                  <span>{s.icon}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              ))}
            </div>

            {/* Eraser */}
            <button
              type="button"
              onClick={() => setIsEraser(!isEraser)}
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors border ${
                isEraser
                  ? 'bg-rose-100 text-rose-700 border-rose-300 shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-200'
              }`}
              title="Eraser"
            >
              <Eraser className="h-4 w-4" />
              <span className="hidden sm:inline">Eraser</span>
            </button>

            {/* Undo */}
            <button
              type="button"
              onClick={undoLastStroke}
              disabled={strokeCount === 0}
              className="p-2 rounded-xl text-xs font-bold flex items-center gap-1 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              title="Undo last stroke"
            >
              <Undo2 className="h-4 w-4" />
              <span className="hidden sm:inline">Undo</span>
            </button>

            {/* Clear All */}
            <button
              type="button"
              onClick={clearCanvas}
              className="p-2 rounded-xl text-xs font-bold flex items-center gap-1 bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 transition-colors"
              title="Clear Canvas"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        </div>

        {/* The BIG Broad Practice Canvas Area */}
        <div
          ref={containerRef}
          className={`relative w-full rounded-3xl bg-white border-2 border-dashed border-sky-300 overflow-hidden touch-none select-none flex items-center justify-center shadow-inner ${
            isExpanded ? 'flex-1 min-h-[460px] sm:min-h-[520px]' : 'min-h-[380px] sm:min-h-[430px]'
          }`}
          style={{
            backgroundImage:
              'radial-gradient(#e0f2fe 1px, transparent 1px), radial-gradient(#f8fafc 1px, #ffffff 1px)',
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        >
          {/* Primary School 4-Line Handwriting Guidelines */}
          {showGuidelines && (
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center gap-8 sm:gap-12 px-6 opacity-60">
              <div className="w-full border-b-2 border-rose-300/70" />
              <div className="w-full border-b-2 border-dashed border-sky-400/80" />
              <div className="w-full border-b-2 border-sky-500/70" />
              <div className="w-full border-b-2 border-rose-300/70" />
            </div>
          )}

          {/* Hollow Road Tracing Track with Dotted Centerline & Numbered Stroke Pills */}
          {guideText && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 p-4">
              <HollowRoadStrokeGuide
                character={guideText}
                showStrokeOrder={showStrokeOrder}
              />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-sky-200 shadow-xs text-xs font-bold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Follow ❶ ➔ ❷ ➔ ❸ inside the road track</span>
              </div>
            </div>
          )}

          {/* Active Drawing Canvas */}
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="absolute inset-0 w-full h-full cursor-crosshair z-10"
          />

          {/* Floating Celebration Banner when Done */}
          {celebrationMessage && (
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 text-slate-950 font-black font-display px-6 py-3 rounded-2xl shadow-pop border-2 border-white flex items-center gap-2 animate-bounce">
              <PartyPopper className="h-6 w-6 text-indigo-700" />
              <span className="text-sm sm:text-base">{celebrationMessage}</span>
            </div>
          )}
        </div>

        {/* Studio Bottom Bar: Helper Text, Save to Gallery & Celebrate Finish Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-xs text-slate-500 font-medium text-center sm:text-left flex items-center gap-1.5">
            <span>💡 Draw continuously to fill the progress meter to 100%!</span>
          </p>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
            {/* Save to Art Gallery */}
            <button
              type="button"
              onClick={handleSaveToGallery}
              className="btn-press px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 font-bold text-xs flex items-center gap-1.5 border border-slate-200"
              title="Save artwork to Gallery"
            >
              <ImageIcon className="h-4 w-4 text-sky-600" />
              <span>Save to Gallery</span>
            </button>

            {/* I Finished Tracing Button */}
            <button
              type="button"
              onClick={() => handleCelebrate(false)}
              className="btn-press px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black font-display text-xs sm:text-sm shadow-soft hover:shadow-pop flex items-center justify-center gap-2 cursor-pointer transition-all border border-emerald-400/40"
            >
              <Award className="h-4 w-4 text-amber-300" />
              <span>I Finished Tracing! 🌟</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-pop-in">
      {/* 1. Header Banner & Daily Quest Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-amber-300/40">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
              Early Learning & Phonics Academy
            </span>

            {/* Daily 3-Letter Quest Badge */}
            <div className="bg-amber-400/90 text-slate-950 px-3 py-1 rounded-full text-[11px] font-black flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 text-rose-700" />
              <span>Today's Quest: {Math.min(3, dailyQuestCount)}/3 Traced</span>
              {dailyQuestCount >= 3 && <Check className="h-3.5 w-3.5 text-emerald-800 stroke-[3]" />}
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2">
            <span>ABC & 123 Learning Kingdom</span>
            <span className="text-2xl">🔤🔢</span>
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
            Master English A–Z, Tamil vowels (உயிர் எழுத்துக்கள்), 1–20 numbers, phonics sounds, and big handwriting practice!
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-white/15 backdrop-blur-md p-1.5 rounded-2xl border border-white/25 flex items-center gap-1 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab('alphabets')}
            className={`btn-press px-3 sm:px-4 py-2 rounded-xl text-xs font-black font-display transition-all cursor-pointer ${
              activeTab === 'alphabets'
                ? 'bg-amber-400 text-slate-950 shadow-soft'
                : 'text-white hover:bg-white/15'
            }`}
          >
            🔤 A–Z English
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tamil')}
            className={`btn-press px-3 sm:px-4 py-2 rounded-xl text-xs font-black font-display transition-all cursor-pointer ${
              activeTab === 'tamil'
                ? 'bg-amber-400 text-slate-950 shadow-soft'
                : 'text-white hover:bg-white/15'
            }`}
          >
            🇮🇳 தமிழ் உயிர்
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('numbers')}
            className={`btn-press px-3 sm:px-4 py-2 rounded-xl text-xs font-black font-display transition-all cursor-pointer ${
              activeTab === 'numbers'
                ? 'bg-amber-400 text-slate-950 shadow-soft'
                : 'text-white hover:bg-white/15'
            }`}
          >
            🔢 1–20 Numbers
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('passport')}
            className={`btn-press px-3 sm:px-4 py-2 rounded-xl text-xs font-black font-display transition-all cursor-pointer ${
              activeTab === 'passport'
                ? 'bg-amber-400 text-slate-950 shadow-soft'
                : 'text-white hover:bg-white/15'
            }`}
          >
            🏅 Passport & Art
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('quiz');
              generateQuiz();
            }}
            className={`btn-press px-3 sm:px-4 py-2 rounded-xl text-xs font-black font-display transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-amber-400 text-slate-950 shadow-soft'
                : 'text-white hover:bg-white/15'
            }`}
          >
            🏆 Fun Quiz
          </button>
        </div>
      </div>

      {/* Broad View Full-Screen Modal Overlay */}
      {isBroadView && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md p-3 sm:p-6 flex flex-col justify-center items-center overflow-y-auto animate-pop-in">
          <div className="w-full max-w-6xl h-full flex flex-col max-h-[92vh]">
            {renderPracticeStudio(true)}
          </div>
        </div>
      )}

      {/* 🚀 Super Creative Rocket & Magic Journey Auto-Advance Celebration Modal */}
      {autoAdvanceData.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md p-4 flex items-center justify-center animate-pop-in">
          <div className="relative bg-gradient-to-b from-amber-50 via-white to-sky-50 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border-4 border-amber-300 text-center space-y-6 overflow-hidden">
            {/* Background Decorative Sparkle Blurs */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-300/30 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-sky-300/30 rounded-full blur-xl pointer-events-none" />

            {/* Top Confetti & Trophy Badge */}
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-soft animate-bounce">
                <PartyPopper className="h-4 w-4 text-slate-950" />
                <span>Level Mastered! +5 Gold Stars ⭐</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
                Superstar Handwriting! 🌟
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                You successfully mastered{' '}
                <strong className="text-rose-600 font-black">
                  {autoAdvanceData.currentId} ({autoAdvanceData.currentTitle})
                </strong>
                !
              </p>
            </div>

            {/* Rocket Journey Track: Current Item ➔ 🚀 ➔ Next Item */}
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-3xl border-2 border-dashed border-amber-300 shadow-inner flex items-center justify-between gap-3 relative">
              {/* Finished Card */}
              <div className="flex flex-col items-center p-3 rounded-2xl bg-emerald-50 border border-emerald-300 flex-1">
                <span className="text-2xl sm:text-3xl">{autoAdvanceData.currentEmoji}</span>
                <span className="text-xl sm:text-2xl font-black font-display text-emerald-700">
                  {autoAdvanceData.currentId}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full mt-1 flex items-center gap-0.5">
                  <Check className="h-3 w-3 stroke-[3]" /> Done
                </span>
              </div>

              {/* Rocket Flight Corridor */}
              <div className="flex flex-col items-center justify-center flex-1 space-y-1">
                <div className="text-3xl animate-pulse transform rotate-45">
                  🚀
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden relative border border-slate-300">
                  <div
                    className="bg-gradient-to-r from-emerald-400 via-amber-400 to-sky-500 h-full rounded-full transition-all duration-1000 ease-linear"
                    style={{
                      width: `${((3 - autoAdvanceData.countdown) / 3) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] font-black text-amber-700">
                  Flying in {autoAdvanceData.countdown}s...
                </span>
              </div>

              {/* Next Target Card */}
              <div className="flex flex-col items-center p-3 rounded-2xl bg-sky-50 border-2 border-sky-400 flex-1 shadow-soft scale-105 animate-pulse">
                <span className="text-2xl sm:text-3xl">{autoAdvanceData.nextEmoji}</span>
                <span className="text-xl sm:text-2xl font-black font-display text-sky-700">
                  {autoAdvanceData.nextId}
                </span>
                <span className="text-[10px] font-black text-sky-700 bg-sky-200 px-2 py-0.5 rounded-full mt-1">
                  Next Up!
                </span>
              </div>
            </div>

            {/* Countdown Banner */}
            <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-100 via-indigo-100 to-purple-100 p-3 rounded-2xl border border-sky-200 text-xs font-black text-indigo-900">
              <Sparkles className="h-4 w-4 text-amber-500 animate-spin" />
              <span>
                Launching Next{' '}
                <strong className="text-sky-600 font-display text-sm">
                  "{autoAdvanceData.nextId}" ({autoAdvanceData.nextTitle})
                </strong>{' '}
                in <strong className="text-base text-rose-600 font-display">{autoAdvanceData.countdown}</strong> sec!
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              {/* Practice Current Again */}
              <button
                type="button"
                onClick={() => {
                  setAutoAdvanceData((prev) => ({ ...prev, isOpen: false }));
                  clearCanvas();
                }}
                className="btn-press w-full sm:w-1/2 py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 border border-slate-300 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4 text-slate-500" />
                <span>Trace {autoAdvanceData.currentId} Again</span>
              </button>

              {/* Instant Next Rocket Launch */}
              <button
                type="button"
                onClick={applyAdvanceToNext}
                className="btn-press w-full sm:w-1/2 py-3 px-4 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white font-black font-display text-xs sm:text-sm shadow-pop flex items-center justify-center gap-2 cursor-pointer border border-sky-300/40"
              >
                <Rocket className="h-4 w-4 text-amber-300 animate-bounce" />
                <span>Start {autoAdvanceData.nextId} Now ➔</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Worksheet Preview Modal */}
      {worksheetModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm p-4 flex items-center justify-center animate-pop-in">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Printer className="h-5 w-5 text-sky-600" />
                <h3 className="text-base font-black font-display text-slate-800">
                  Printable A4 Handwriting Sheet
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setWorksheetModalOpen(false)}
                className="p-1 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            {/* A4 Sheet Mock Preview */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 text-center">
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Kidora Adventure World • Practice Worksheet
              </div>
              <div className="text-4xl font-black font-display text-slate-800">
                {getCurrentCharacterId()}
              </div>
              <div className="space-y-2 py-2">
                <div className="w-full border-b border-rose-300" />
                <div className="w-full border-b border-dashed border-sky-400" />
                <div className="w-full border-b border-sky-500" />
              </div>
              <p className="text-xs text-slate-600">
                Ready to print for offline tracing practice with crayons and pencils at home or in class!
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setWorksheetModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="btn-press px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs flex items-center gap-1.5 shadow-soft"
              >
                <Printer className="h-4 w-4" />
                <span>Print Worksheet Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. TAB A: ALPHABETS A-Z */}
      {activeTab === 'alphabets' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Alphabet Grid (Left 7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-soft border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm font-black font-display text-slate-800 flex items-center gap-2">
                  <span>Tap any letter to hear sound & learn:</span>
                </h3>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl">
                  26 Letters (Aa – Zz)
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2.5">
                {ALPHABET_DATA.map((item) => {
                  const isDone = masteredLetters.includes(item.letter);
                  return (
                    <button
                      key={item.letter}
                      type="button"
                      onClick={() => handleSelectLetter(item)}
                      className={`btn-press p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border-2 relative ${
                        selectedLetter.letter === item.letter
                          ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 border-amber-500 shadow-pop scale-105'
                          : 'bg-slate-50 hover:bg-amber-50 text-slate-800 border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      {isDone && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
                      )}
                      <span className="text-xl font-black font-display">{item.letter}</span>
                      <span className="text-xs font-bold opacity-80">{item.lower}</span>
                      <span className="text-sm">{item.emoji}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Letter Showcase Card (Right 5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className={`bg-gradient-to-br ${selectedLetter.color} rounded-3xl p-6 text-white shadow-soft space-y-4`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                    Phonics Sound: "{selectedLetter.phonetic}"
                  </span>
                  <button
                    type="button"
                    onClick={() => speakText(`${selectedLetter.letter}. ${selectedLetter.word}. ${selectedLetter.exampleSentence}`)}
                    className="btn-press p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-colors"
                    title="Speak out loud"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-5xl sm:text-6xl font-black font-display tracking-tight text-white flex items-baseline gap-3">
                      <span>{selectedLetter.letter}</span>
                      <span className="text-3xl font-bold opacity-80">{selectedLetter.lower}</span>
                    </div>
                    <div className="text-xl font-black font-display">{selectedLetter.word}</div>
                    <div className="text-xs text-white/90 font-bold">{selectedLetter.tamilWord}</div>
                  </div>
                  <div className="text-6xl animate-bounce-soft">{selectedLetter.emoji}</div>
                </div>

                <div className="bg-black/20 rounded-2xl p-3 text-xs font-medium text-white/95">
                  💬 <em>"{selectedLetter.exampleSentence}"</em>
                </div>
              </div>

              {/* Broad View Quick Promo Banner */}
              <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200/80 rounded-3xl p-5 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-black font-display text-sky-900 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span>Want a Huge Tracing Board?</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Switch to Fullscreen Broad View for plenty of room to write and draw!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBroadView(true)}
                  className="btn-press px-4 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black font-display text-xs flex items-center gap-1.5 shrink-0 shadow-soft"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Expand Studio</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dedicated Full-Width Large Tracing & Practice Studio */}
          <div className="w-full">
            {renderPracticeStudio(false)}
          </div>
        </div>
      )}

      {/* 3. TAB B: TAMIL UYIR EZHUTHUKKAL (தமிழ் உயிர் எழுத்துக்கள்) */}
      {activeTab === 'tamil' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Tamil Grid (Left 7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-soft border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm font-black font-display text-slate-800 flex items-center gap-2">
                  <span>தமிழ் உயிர் எழுத்துக்கள் (12 உயிர் + 1 ஆய்தம்):</span>
                </h3>
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-xl">
                  13 தமிழ் எழுத்துக்கள்
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {TAMIL_VOWEL_DATA.map((item) => {
                  const isDone = masteredLetters.includes(item.letter);
                  return (
                    <button
                      key={item.letter}
                      type="button"
                      onClick={() => handleSelectTamil(item)}
                      className={`btn-press p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border-2 relative ${
                        selectedTamil.letter === item.letter
                          ? 'bg-gradient-to-br from-rose-500 to-amber-500 text-white border-rose-500 shadow-pop scale-105'
                          : 'bg-slate-50 hover:bg-rose-50 text-slate-800 border-slate-200 hover:border-rose-300'
                      }`}
                    >
                      {isDone && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
                      )}
                      <span className="text-2xl font-black font-display">{item.letter}</span>
                      <span className="text-[11px] font-bold opacity-80">{item.word}</span>
                      <span className="text-base">{item.emoji}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tamil Showcase Card (Right 5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className={`bg-gradient-to-br ${selectedTamil.color} rounded-3xl p-6 text-white shadow-soft space-y-4`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                    ஒலிப்பு: "{selectedTamil.phonetic}"
                  </span>
                  <button
                    type="button"
                    onClick={() => speakText(`${selectedTamil.phonetic}! ${selectedTamil.word}! ${selectedTamil.englishMeaning}.`)}
                    className="btn-press p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-colors"
                    title="Speak out loud"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-6xl font-black font-display tracking-tight text-white">
                      {selectedTamil.letter}
                    </div>
                    <div className="text-2xl font-black font-display">{selectedTamil.word}</div>
                    <div className="text-xs text-white/90 font-bold">{selectedTamil.englishMeaning}</div>
                  </div>
                  <div className="text-6xl">{selectedTamil.emoji}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Large Tamil Tracing Studio */}
          <div className="w-full">
            {renderPracticeStudio(false)}
          </div>
        </div>
      )}

      {/* 4. TAB C: NUMBERS 1-20 & COUNTING */}
      {activeTab === 'numbers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Numbers Grid (Left 7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-soft border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm font-black font-display text-slate-800 flex items-center gap-2">
                  <span>Tap any number to count & learn:</span>
                </h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">
                  Numbers 1 to 20
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {NUMBER_DATA.map((item) => {
                  const isDone = masteredLetters.includes(String(item.num));
                  return (
                    <button
                      key={item.num}
                      type="button"
                      onClick={() => handleSelectNumber(item)}
                      className={`btn-press p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border-2 relative ${
                        selectedNumber.num === item.num
                          ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 border-emerald-500 shadow-pop scale-105'
                          : 'bg-slate-50 hover:bg-emerald-50 text-slate-800 border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      {isDone && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
                      )}
                      <span className="text-2xl font-black font-display">{item.num}</span>
                      <span className="text-[11px] font-bold text-slate-600">{item.word}</span>
                      <span className="text-xs text-slate-400">{item.tamilNum}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Number Visualizer & Counter (Right 5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className={`bg-gradient-to-br ${selectedNumber.color} rounded-3xl p-6 text-white shadow-soft space-y-4`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                    Tamil Numeral: {selectedNumber.tamilNum}
                  </span>
                  <button
                    type="button"
                    onClick={() => speakText(`${selectedNumber.num}. ${selectedNumber.word}. Let's count ${selectedNumber.num} items!`)}
                    className="btn-press p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-colors"
                    title="Speak out loud"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-6xl font-black font-display tracking-tight text-white">
                      {selectedNumber.num}
                    </div>
                    <div className="text-xl font-black font-display">{selectedNumber.word}</div>
                    <div className="text-xs text-white/90 font-bold">{selectedNumber.tamilWord}</div>
                  </div>
                  <div className="text-6xl">{selectedNumber.emoji}</div>
                </div>
              </div>

              {/* Interactive Counting Objects Showcase */}
              <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black font-display text-slate-800">
                    Counting {selectedNumber.num} {selectedNumber.word} items:
                  </h4>
                  <span className="text-xs font-bold text-emerald-600">
                    Tap to count!
                  </span>
                </div>

                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex flex-wrap gap-2.5 justify-center min-h-[100px] items-center">
                  {Array.from({ length: selectedNumber.num }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => speakText(String(idx + 1))}
                      className="btn-press w-10 h-10 rounded-2xl bg-white shadow-soft flex items-center justify-center text-lg hover:scale-110 transition-transform cursor-pointer border border-emerald-200"
                      title={`Item ${idx + 1}`}
                    >
                      <span>{selectedNumber.emoji}</span>
                    </button>
                  ))}
                </div>

                <p className="text-[11px] text-center text-slate-500 font-medium">
                  Tap each item to count out loud from 1 to {selectedNumber.num}! 🌟
                </p>
              </div>
            </div>
          </div>

          {/* Full-Width Large Number Tracing Studio */}
          <div className="w-full">
            {renderPracticeStudio(false)}
          </div>
        </div>
      )}

      {/* 5. TAB D: GOLDEN PASSPORT & SAVED GALLERY */}
      {activeTab === 'passport' && (
        <div className="space-y-6">
          {/* Mastered Badge Passport */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-3">
              <div className="flex items-center gap-2.5">
                <Trophy className="h-6 w-6 text-amber-500" />
                <div>
                  <h3 className="text-lg font-black font-display text-slate-900">
                    Golden Handwriting & Tracing Passport
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Collect golden badges for every character and number you master!
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-2xl text-xs font-black text-amber-900 flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                <span>{masteredLetters.length} Characters Mastered</span>
              </div>
            </div>

            {/* Badges Flow */}
            <div className="flex flex-wrap gap-2.5 justify-start">
              {ALPHABET_DATA.map((item) => {
                const isMastered = masteredLetters.includes(item.letter);
                return (
                  <div
                    key={item.letter}
                    className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center border-2 transition-all ${
                      isMastered
                        ? 'bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 border-amber-400 text-slate-950 shadow-soft scale-105'
                        : 'bg-slate-50 border-slate-200 text-slate-300 opacity-60'
                    }`}
                    title={isMastered ? `${item.letter} Mastered!` : `${item.letter} Not yet mastered`}
                  >
                    <span className="font-black font-display text-base">{item.letter}</span>
                    <span className="text-[9px]">{isMastered ? '⭐' : '🔒'}</span>
                  </div>
                );
              })}

              {NUMBER_DATA.map((item) => {
                const isMastered = masteredLetters.includes(String(item.num));
                return (
                  <div
                    key={item.num}
                    className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center border-2 transition-all ${
                      isMastered
                        ? 'bg-gradient-to-br from-emerald-300 via-teal-400 to-emerald-500 border-emerald-400 text-slate-950 shadow-soft scale-105'
                        : 'bg-slate-50 border-slate-200 text-slate-300 opacity-60'
                    }`}
                    title={isMastered ? `Number ${item.num} Mastered!` : `Number ${item.num} Not yet mastered`}
                  >
                    <span className="font-black font-display text-sm">{item.num}</span>
                    <span className="text-[9px]">{isMastered ? '🌟' : '🔒'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Saved Art Gallery */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-indigo-600" />
                <h3 className="text-base font-black font-display text-slate-900">
                  My Tracing Art Gallery ({savedGallery.length})
                </h3>
              </div>
              <span className="text-xs font-bold text-indigo-600">Saved Creations</span>
            </div>

            {savedGallery.length === 0 ? (
              <div className="text-center py-10 space-y-2 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <div className="text-3xl">🎨</div>
                <p className="text-xs text-slate-500 font-medium">
                  No saved artwork yet! Trace any letter and click "Save to Gallery" to showcase your drawings here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {savedGallery.map((art) => (
                  <div
                    key={art.id}
                    className="bg-slate-50 rounded-2xl p-2.5 border border-slate-200 shadow-sm space-y-2 flex flex-col items-center"
                  >
                    <img
                      src={art.dataUrl}
                      alt={art.title}
                      className="w-full h-32 object-contain bg-white rounded-xl border border-slate-200"
                    />
                    <div className="text-center">
                      <div className="text-xs font-black text-slate-800">{art.title}</div>
                      <div className="text-[10px] text-slate-400">{art.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. TAB E: FUN QUIZ GAME */}
      {activeTab === 'quiz' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6 text-center">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
              Interactive Phonics & Counting Quiz
            </span>
            <h3 className="text-2xl font-black font-display text-slate-900">
              {quizQuestion.prompt}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-3.5 pt-2">
            {quizQuestion.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleAnswerQuiz(opt)}
                className="btn-press py-5 px-4 rounded-2xl bg-gradient-to-br from-slate-50 to-amber-50 hover:from-amber-100 hover:to-orange-100 text-slate-800 hover:text-amber-950 font-black font-display text-2xl border-2 border-slate-200 hover:border-amber-400 shadow-soft cursor-pointer transition-all"
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Feedback Banner */}
          {quizFeedback && (
            <div
              className={`p-4 rounded-2xl font-black font-display text-sm animate-pop-in ${
                quizFeedback.isCorrect
                  ? 'bg-emerald-500 text-white shadow-soft'
                  : 'bg-rose-100 text-rose-800 border border-rose-200'
              }`}
            >
              {quizFeedback.message}
            </div>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={generateQuiz}
              className="btn-press px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 mx-auto cursor-pointer transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Next Question</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
