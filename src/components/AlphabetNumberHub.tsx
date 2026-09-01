import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/lib/store';
import {
  Sparkles,
  Volume2,
  CheckCircle2,
  RefreshCw,
  Award,
  ArrowRight,
  BookOpen,
  Hash,
  Star,
  PenTool,
  RotateCcw,
  Check,
} from 'lucide-react';

interface LetterItem {
  letter: string;
  lower: string;
  word: string;
  tamilWord: string;
  emoji: string;
  phonetic: string;
  exampleSentence: string;
  color: string;
}

const ALPHABET_DATA: LetterItem[] = [
  { letter: 'A', lower: 'a', word: 'Apple', tamilWord: 'ஆப்பிள் (Aappil)', emoji: '🍎', phonetic: 'Ah', exampleSentence: 'A is for sweet red Apple', color: 'from-rose-500 to-red-600' },
  { letter: 'B', lower: 'b', word: 'Butterfly', tamilWord: 'பட்டாம்பூச்சி (Pattampoochi)', emoji: '🦋', phonetic: 'Buh', exampleSentence: 'B is for colorful Butterfly', color: 'from-blue-500 to-indigo-600' },
  { letter: 'C', lower: 'c', word: 'Cat', tamilWord: 'பூனை (Poonai)', emoji: '🐱', phonetic: 'Kuh', exampleSentence: 'C is for cute playful Cat', color: 'from-amber-500 to-orange-600' },
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

interface NumberItem {
  num: number;
  word: string;
  tamilWord: string;
  tamilNum: string;
  emoji: string;
  color: string;
}

const NUMBER_DATA: NumberItem[] = [
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

export function AlphabetNumberHub() {
  const { addStars } = useApp();
  const [activeTab, setActiveTab] = useState<'alphabets' | 'numbers' | 'quiz'>('alphabets');
  const [selectedLetter, setSelectedLetter] = useState<LetterItem>(ALPHABET_DATA[0]);
  const [selectedNumber, setSelectedNumber] = useState<NumberItem>(NUMBER_DATA[0]);
  
  // Tracing Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Quiz State
  const [quizQuestion, setQuizQuestion] = useState<{
    type: 'letter' | 'number';
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

  // Speak sound helper
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectLetter = (item: LetterItem) => {
    setSelectedLetter(item);
    speakText(`${item.letter}. ${item.word}.`);
    clearCanvas();
  };

  const handleSelectNumber = (item: NumberItem) => {
    setSelectedNumber(item);
    speakText(`${item.num}. ${item.word}.`);
  };

  // Drawing Canvas Methods
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
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 14;
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

  // Generate Next Quiz Question
  const generateQuiz = () => {
    setQuizFeedback(null);
    const isLetterQuiz = Math.random() > 0.5;

    if (isLetterQuiz) {
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
      setQuizFeedback({ isCorrect: true, message: '🎉 Brilliant Job! That is Correct! +5 Stars!' });
      addStars(5);
      speakText('Brilliant job! That is correct!');
      setTimeout(() => {
        generateQuiz();
      }, 2000);
    } else {
      setQuizFeedback({ isCorrect: false, message: 'Try again! You can do it! 💪' });
      speakText('Oops! Try again!');
    }
  };

  return (
    <div className="space-y-6 animate-pop-in">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-amber-300/40">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
            Early Learning & Phonics Academy
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2">
            <span>ABC & 123 Learning Kingdom</span>
            <span className="text-2xl">🔤🔢</span>
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
            Master upper & lowercase letters, phonics sounds, English & Tamil vocabulary, number counting, and letter tracing!
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-white/15 backdrop-blur-md p-1.5 rounded-2xl border border-white/25 flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('alphabets')}
            className={`btn-press px-4 py-2 rounded-xl text-xs font-black font-display transition-all cursor-pointer ${
              activeTab === 'alphabets'
                ? 'bg-amber-400 text-slate-950 shadow-soft'
                : 'text-white hover:bg-white/15'
            }`}
          >
            🔤 A–Z Alphabets
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('numbers')}
            className={`btn-press px-4 py-2 rounded-xl text-xs font-black font-display transition-all cursor-pointer ${
              activeTab === 'numbers'
                ? 'bg-amber-400 text-slate-950 shadow-soft'
                : 'text-white hover:bg-white/15'
            }`}
          >
            🔢 1–20 Numbers
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('quiz');
              generateQuiz();
            }}
            className={`btn-press px-4 py-2 rounded-xl text-xs font-black font-display transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-amber-400 text-slate-950 shadow-soft'
                : 'text-white hover:bg-white/15'
            }`}
          >
            🏆 Fun Quiz Game
          </button>
        </div>
      </div>

      {/* 2. TAB A: ALPHABETS A-Z */}
      {activeTab === 'alphabets' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Alphabet Grid (Left) */}
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
              {ALPHABET_DATA.map((item) => (
                <button
                  key={item.letter}
                  type="button"
                  onClick={() => handleSelectLetter(item)}
                  className={`btn-press p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border-2 ${
                    selectedLetter.letter === item.letter
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 border-amber-500 shadow-pop scale-105'
                      : 'bg-slate-50 hover:bg-amber-50 text-slate-800 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <span className="text-xl font-black font-display">{item.letter}</span>
                  <span className="text-xs font-bold opacity-80">{item.lower}</span>
                  <span className="text-sm">{item.emoji}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Letter Showcase & Tracing Canvas (Right) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Big Letter Card */}
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
                  <div className="text-lg font-black font-display">{selectedLetter.word}</div>
                  <div className="text-xs text-white/90 font-bold">{selectedLetter.tamilWord}</div>
                </div>
                <div className="text-6xl animate-bounce-soft">{selectedLetter.emoji}</div>
              </div>

              <div className="bg-black/20 rounded-2xl p-3 text-xs font-medium text-white/95">
                💬 <em>"{selectedLetter.exampleSentence}"</em>
              </div>
            </div>

            {/* Interactive Tracing Canvas */}
            <div className="bg-white rounded-3xl p-5 shadow-soft border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-black font-display text-xs text-slate-800">
                  <PenTool className="h-4 w-4 text-sky-600" />
                  <span>Trace & Draw "{selectedLetter.letter}"</span>
                </div>
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="btn-press text-[11px] font-bold text-slate-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer bg-slate-100 hover:bg-rose-50 px-2.5 py-1 rounded-xl"
                >
                  <RotateCcw className="h-3 w-3" /> Clear
                </button>
              </div>

              {/* Drawing Area with Dotted Guide */}
              <div className="relative w-full h-44 bg-slate-50 rounded-2xl border-2 border-dashed border-sky-300 flex items-center justify-center overflow-hidden touch-none">
                {/* Background Dotted Letter Outline */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-8xl font-black text-slate-200 font-display">
                  {selectedLetter.letter}
                </div>

                <canvas
                  ref={canvasRef}
                  width={300}
                  height={176}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="absolute inset-0 w-full h-full cursor-crosshair z-10"
                />
              </div>
              <p className="text-[11px] text-center text-slate-500 font-medium">
                Use your finger or mouse to trace the dotted letter guide! 🎨
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB B: NUMBERS 1-20 & COUNTING */}
      {activeTab === 'numbers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Numbers Grid (Left) */}
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
              {NUMBER_DATA.map((item) => (
                <button
                  key={item.num}
                  type="button"
                  onClick={() => handleSelectNumber(item)}
                  className={`btn-press p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border-2 ${
                    selectedNumber.num === item.num
                      ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 border-emerald-500 shadow-pop scale-105'
                      : 'bg-slate-50 hover:bg-emerald-50 text-slate-800 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <span className="text-2xl font-black font-display">{item.num}</span>
                  <span className="text-[11px] font-bold text-slate-600">{item.word}</span>
                  <span className="text-xs text-slate-400">{item.tamilNum}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Number Visualizer & Counter (Right) */}
          <div className="lg:col-span-5 space-y-5">
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

              {/* Emoji Items Flow Grid */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex flex-wrap gap-2.5 justify-center min-h-[120px] items-center">
                {Array.from({ length: selectedNumber.num }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => speakText(String(idx + 1))}
                    className="btn-press w-11 h-11 rounded-2xl bg-white shadow-soft flex items-center justify-center text-xl hover:scale-110 transition-transform cursor-pointer border border-emerald-200"
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
      )}

      {/* 4. TAB C: FUN QUIZ GAME */}
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
